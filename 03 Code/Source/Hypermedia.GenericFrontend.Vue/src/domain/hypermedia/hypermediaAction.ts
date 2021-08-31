export enum HttpMethodType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export default class HypermediaAction {
  public readonly name: string;
  public readonly method: HttpMethodType;
  public readonly hyperlink: string;
  public readonly title: string;

  constructor(name: string, method: HttpMethodType, hyperlink: string, title: string) {
    this.name = name;
    this.method = method;
    this.hyperlink = hyperlink;
    this.title = title;
  }
}
