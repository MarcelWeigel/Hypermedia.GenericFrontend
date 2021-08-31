import { make } from 'vuex-pathify';

import customMutations from './mutations';
import actions from './actions';
import getters from './getters';
import { SettingsState } from './types';
import { RootState } from '@/store/storeType';
import { Module } from 'vuex';

function getDefaultState(): SettingsState {
  return {
    isDarkTheme: false,
    showRawObject: true,
    useWebComponents: false,
    defaultApiUrl: 'http://localhost:5000/api/EntryPoint',
  };
}

const state = getDefaultState();

const taskModule: Module<SettingsState, RootState> = {
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
