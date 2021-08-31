import HypermediaActionParameter from '@/domain/hypermedia/hypermediaActionParamter';
import hypermediaAction, { HttpMethodType } from '@/domain/hypermedia/hypermediaAction';

export default class HypermediaActionWithParameters extends hypermediaAction {
  public readonly parameter: HypermediaActionParameter;

  constructor(
    name: string,
    method: HttpMethodType,
    hyperlink: string,
    title: string,
    parameter: HypermediaActionParameter,
  ) {
    super(name, method, hyperlink, title);
    this.parameter = parameter;
  }
}
