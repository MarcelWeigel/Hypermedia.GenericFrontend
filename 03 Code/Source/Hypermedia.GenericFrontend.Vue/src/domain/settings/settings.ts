export class Settings {
  public readonly isDarkTheme: boolean;
  public readonly showRawObject: boolean;
  public readonly useWebComponents: boolean;
  public readonly defaultApiUrl?: string;

  constructor(isDarkTheme: boolean, showRawObject: boolean, useWebComponents: boolean, apiUrl?: string) {
    this.isDarkTheme = isDarkTheme;
    this.showRawObject = showRawObject;
    this.useWebComponents = useWebComponents;
    this.defaultApiUrl = apiUrl;
  }
}

export default Settings;
