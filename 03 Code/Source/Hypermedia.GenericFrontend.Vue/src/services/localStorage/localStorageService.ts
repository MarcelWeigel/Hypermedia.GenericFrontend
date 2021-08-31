import Settings from '@/domain/settings/settings';
import TransientState from '@/domain/state/transientState';

export class LocalStorageService {
  private static storageKeySettings = 'hypermedia-generic-frontend:settings';
  private static storageKeyIsIntroduced = 'hypermedia-generic-frontend:is-introduced';
  private static storageKeyTransientState = 'hypermedia-generic-frontend:transient-state';

  public static setSettings(settings: Settings): void {
    localStorage.setItem(LocalStorageService.storageKeySettings, JSON.stringify(settings));
  }

  public static getSettings(): Settings | undefined {
    const settings = localStorage.getItem(LocalStorageService.storageKeySettings);
    return settings ? JSON.parse(settings) : undefined;
  }

  public static setIsIntroduced(value: boolean): void {
    localStorage.setItem(LocalStorageService.storageKeyIsIntroduced, JSON.stringify(value));
  }

  public static getIsIntroduced(): boolean {
    const value = localStorage.getItem(LocalStorageService.storageKeyIsIntroduced);
    return value ? JSON.parse(value) : false;
  }

  public static setTransientState(state: TransientState): void {
    localStorage.setItem(LocalStorageService.storageKeyTransientState, JSON.stringify(state));
  }

  public static getTransientState(): TransientState | undefined {
    const state = localStorage.getItem(LocalStorageService.storageKeyTransientState);
    return state ? JSON.parse(state) : undefined;
  }
}
