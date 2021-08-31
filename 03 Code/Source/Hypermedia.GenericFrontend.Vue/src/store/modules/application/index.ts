import { make } from 'vuex-pathify';

import customMutations from './mutations';
import actions from './actions';
import getters from './getters';
import { ApplicationState } from './types';
import { RootState } from '@/store/storeType';
import { Module } from 'vuex';
import LinkHistory from '@/domain/history/linkHistory';

function getDefaultState(): ApplicationState {
  return {
    username: '',
    loadingPage: true,
    apiUrl: undefined,
    currentUrl: undefined,
    hypermediaObject: undefined,
    rawObject: undefined,
    history: new LinkHistory([]),
    actionModules: {},
    schemaModules: {},
    errorResult: undefined,
  };
}

const state = getDefaultState();

const taskModule: Module<ApplicationState, RootState> = {
  namespaced: true,
  state,
  mutations: {
    ...make.mutations(state),
    ...customMutations,
  },
  actions,
  getters,
};

export default taskModule;
