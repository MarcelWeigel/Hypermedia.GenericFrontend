import Vue from 'vue';
import Vuex, { Store as VuexStore } from 'vuex';
import pathify from 'vuex-pathify';

import application from './modules/application';
import setup from './modules/setup';
import settings from './modules/settings';
import { RootState } from './storeType';

export type Store = VuexStore<RootState>;

Vue.use(Vuex);

const store: Store = new Vuex.Store({
  plugins: [pathify.plugin],
  state: {},
  mutations: {},
  actions: {},
  modules: { application, setup, settings },
});

export default store;
