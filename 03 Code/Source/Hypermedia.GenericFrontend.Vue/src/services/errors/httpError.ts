export default class HttpError extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly url: string;
  public readonly request: any;

  constructor(message: string, status: number, statusText: string, url: string, request: any) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.url = url;
    this.request = request;
  }
}
