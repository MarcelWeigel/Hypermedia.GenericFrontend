export default class LoadSchemaParameter {
  public readonly classes: string[];
  public readonly schemaUrl: string;

  constructor(classes: string[], schemaUrl: string) {
    this.classes = classes;
    this.schemaUrl = schemaUrl;
  }
}
