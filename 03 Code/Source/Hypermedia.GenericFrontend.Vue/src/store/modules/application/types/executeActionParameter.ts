import HypermediaAction from '@/domain/hypermedia/hypermediaAction';

export default class ExecuteActionParameter {
  public readonly id: string;
  public readonly action: HypermediaAction;

  constructor(id: string, action: HypermediaAction) {
    this.id = id;
    this.action = action;
  }
}
