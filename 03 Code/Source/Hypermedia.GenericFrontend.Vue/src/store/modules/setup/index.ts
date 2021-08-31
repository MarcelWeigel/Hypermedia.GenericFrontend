import { make } from 'vuex-pathify';

import customMutations from './mutations';
import actions from './actions';
import getters from './getters';
import { SetupState } from './types';
import { RootState } from '@/store/storeType';
import { Module } from 'vuex';

function getDefaultState(): SetupState {
  return {
    showForm: false,
    showBackground: false,
    isIntroduced: false,
  };
}

const state = getDefaultState();

const taskModule: Module<SetupState, RootState> = {
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
