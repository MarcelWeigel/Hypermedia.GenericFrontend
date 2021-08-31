export default class ErrorResult {
  constructor(statusCode: string, statusText: string, content: string) {
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.content = content;
  }
  public readonly statusCode: string;
  public readonly statusText: string;
  public readonly content: string;
}
