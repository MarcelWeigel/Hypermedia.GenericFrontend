import { SettingsState } from './types';
import { ActionTree } from 'vuex';
import { RootState } from '@/store/storeType';
import { LocalStorageService } from '@/services/localStorage/localStorageService';
import Settings from '@/domain/settings/settings';

const actions: ActionTree<SettingsState, RootState> = {
  async saveSettings({ state }) {
    LocalStorageService.setSettings(
      new Settings(state.isDarkTheme, state.showRawObject, state.useWebComponents, state.defaultApiUrl),
    );
  },
  async loadSettings({ commit }) {
    const settings = LocalStorageService.getSettings();

    if (settings) {
      commit('SET_IS_DARK_THEME', settings.isDarkTheme);
      commit('SET_SHOW_RAW_OBJECT', settings.showRawObject);
      commit('SET_USE_WEB_COMPONENTS', settings.useWebComponents);
      commit('SET_DEFAULT_API_URL', settings.defaultApiUrl);
    }
  },
};

export default actions;
