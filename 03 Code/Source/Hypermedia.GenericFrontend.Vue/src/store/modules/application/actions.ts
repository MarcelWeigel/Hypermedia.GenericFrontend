import { ApplicationState, updateDictionary } from './types';
import { ActionTree } from 'vuex';
import { RootState } from '@/store/storeType';
import SirenToHypermediaMapper from '@/domain/mapper/sirenToHypermdiaMapper';
import UpdateHistoryService from '@/services/history/updateHistoryService';
import SchemaSimplifierService from '@/services/schema/schemaSimplifierService';
import HypermediaService from '@/services/hypermedia/hypermediaService';
import ExecuteActionWithParParameter from '@/store/modules/application/types/executeActionWithParParameter';
import ExecuteActionParameter from '@/store/modules/application/types/executeActionParameter';
import LoadSchemaParameter from '@/store/modules/application/types/loadSchemaParameter';
import TransientStateService from '@/services/state/transientStateService';
import router from '@/router';
import { dispatch } from 'vuex-pathify';
import { dictionaryEquals } from '@/utils/dictionary';
import LinkHistory from '@/domain/history/linkHistory';
import ResultType from '@/domain/hypermedia/results/resultType';
import { LocalStorageService } from '@/services/localStorage/localStorageService';
import TransientState from '@/domain/state/transientState';

const actions: ActionTree<ApplicationState, RootState> = {
  async navigateToUrl({ commit, state }, url: string) {
    commit('SET_ERROR_RESULT', undefined);
    const hypermediaObjectRequestResult = await HypermediaService.navigateToUrl(url);
    if (hypermediaObjectRequestResult.resultType === ResultType.Siren) {
      const object = SirenToHypermediaMapper.mapObject(hypermediaObjectRequestResult.sirenObject);
      const history = UpdateHistoryService.update(state.history, object.getSelfLink().hyperlink);
      commit('SET_HYPERMEDIA_OBJECT', object);
      commit('SET_RAW_OBJECT', hypermediaObjectRequestResult.sirenObject);
      commit('SET_HISTORY', history);
      commit('SET_CURRENT_URL', url);
      await dispatch('application/updateTransientState');
    } else if (hypermediaObjectRequestResult.resultType === ResultType.Blob) {
      const url = window.URL.createObjectURL(hypermediaObjectRequestResult.blob);
      window.open(url);
    } else if (hypermediaObjectRequestResult.resultType === ResultType.Error) {
      commit('SET_ERROR_RESULT', hypermediaObjectRequestResult.errorResult);
    }
  },
  async loadFormSchema({ commit, state }, parameters: LoadSchemaParameter) {
    commit(
      'SET_SCHEMA_MODULES',
      updateDictionary(state.schemaModules, parameters.schemaUrl, {
        isLoadingSchema: true,
        isSchemaLoaded: false,
        schema: undefined,
        schemaUrl: parameters.schemaUrl,
        classes: parameters.classes,
      }),
    );
    const schema = await HypermediaService.loadSchema(parameters.schemaUrl);
    const simpleSchema = SchemaSimplifierService.simplifySchema(schema);
    // await sleep(2000);

    commit(
      'SET_SCHEMA_MODULES',
      updateDictionary(state.schemaModules, parameters.schemaUrl, {
        isLoadingSchema: false,
        isSchemaLoaded: true,
        schema: simpleSchema,
      }),
    );
  },
  async executeAction({ commit, state }, parameters: ExecuteActionParameter) {
    commit(
      'SET_ACTION_MODULES',
      updateDictionary(state.actionModules, parameters.id, { isExecutingAction: true, isActionExecuted: false }),
    );
    const actionResult = await HypermediaService.executeAction(parameters.action);
    // await sleep(2000);

    commit(
      'SET_ACTION_MODULES',
      updateDictionary(state.actionModules, parameters.id, {
        isExecutingAction: false,
        isActionExecuted: true,
        actionResult: actionResult,
      }),
    );
  },
  async executeActionWithParameters({ commit, state }, parameters: ExecuteActionWithParParameter) {
    commit(
      'SET_ACTION_MODULES',
      updateDictionary(state.actionModules, parameters.id, { isExecutingAction: true, isActionExecuted: false }),
    );

    const actionResult = await HypermediaService.executeActionWithParameters(parameters.action, parameters.data);
    // await sleep(2000);

    commit(
      'SET_ACTION_MODULES',
      updateDictionary(state.actionModules, parameters.id, {
        isExecutingAction: false,
        isActionExecuted: true,
        actionResult: actionResult,
      }),
    );
  },
  async updateTransientState({ state }) {
    if (state.apiUrl && state.currentUrl && state.history) {
      const transientState = new TransientState(state.apiUrl, state.currentUrl, state.history.hyperlinks);
      LocalStorageService.setTransientState(transientState);
      const newQuery = TransientStateService.transientStateToQuery(transientState);
      const currentQuery = router.currentRoute.query;
      if (currentQuery && !dictionaryEquals(newQuery, currentQuery)) {
        await router.push({ query: newQuery });
      }
    }
  },
  async updateStateFromTransientState({ commit }) {
    let transientState = TransientStateService.transientStateFromQuery(router.currentRoute.query as any);
    if (!transientState) {
      transientState = LocalStorageService.getTransientState();
    } else {
      LocalStorageService.setTransientState(transientState);
    }
    if (transientState) {
      commit('SET_API_URL', transientState.apiUrl);
      commit('SET_HISTORY', new LinkHistory(transientState.history));
      commit('SET_CURRENT_URL', transientState.currentUrl);
    }
  },
};

export default actions;
