export default class HypermediaActionParameter {
  public readonly name: string;
  public readonly className: string;
  public readonly schemaUrl: string;
  public readonly prefilledValue: any;

  constructor(name: string, className: string, schemaUrl: string, prefilledValue: any) {
    this.name = name;
    this.className = className;
    this.schemaUrl = schemaUrl;
    this.prefilledValue = prefilledValue;
  }
}
