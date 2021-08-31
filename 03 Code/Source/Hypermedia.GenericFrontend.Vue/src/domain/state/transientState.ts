﻿export class TransientState {
  public readonly apiUrl: string;
  public readonly currentUrl: string;
  public readonly history: string[];

  constructor(apiUrl: string, currentUrl: string, history: string[]) {
    this.apiUrl = apiUrl;
    this.currentUrl = currentUrl;
    this.history = history;
  }
}

export default TransientState;
