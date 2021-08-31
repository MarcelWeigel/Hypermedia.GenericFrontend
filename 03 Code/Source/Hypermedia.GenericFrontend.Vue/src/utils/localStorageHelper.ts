export default class LocalStorageHelper {
  public static set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  public static get<T>(key: string, defaultValue?: T): T {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  }
}
