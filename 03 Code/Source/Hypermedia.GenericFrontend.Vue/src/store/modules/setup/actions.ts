import { SetupState } from './types';
import { ActionTree } from 'vuex';
import { RootState } from '@/store/storeType';
import sleep from '@/utils/sleep';
import { LocalStorageService } from '@/services/localStorage/localStorageService';

const actions: ActionTree<SetupState, RootState> = {
  async introduceUser({ commit, state }) {
    const isIntroduced = LocalStorageService.getIsIntroduced();
    if (!isIntroduced) {
      commit('SET_SHOW_BACKGROUND', true);
      await sleep(3000);
      commit('SET_SHOW_FORM', true);
      LocalStorageService.setIsIntroduced(true);
    }
  },
  async updateIntroduce({ commit }) {
    const isIntroduced = LocalStorageService.getIsIntroduced();
    if (!isIntroduced) {
      commit('SET_IS_INTRODUCED', false);
    } else {
      commit('SET_IS_INTRODUCED', true);
    }
  },
};

export default actions;
