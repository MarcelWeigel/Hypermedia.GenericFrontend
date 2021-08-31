import HypermediaActionWithParameters from '@/domain/hypermedia/hypermediaActionWithParameters';

export default class ExecuteActionWithParParameter {
  public readonly id: string;
  public readonly action: HypermediaActionWithParameters;
  public readonly data: any;

  constructor(id: string, action: HypermediaActionWithParameters, data: any) {
    this.id = id;
    this.action = action;
    this.data = data;
  }
}
