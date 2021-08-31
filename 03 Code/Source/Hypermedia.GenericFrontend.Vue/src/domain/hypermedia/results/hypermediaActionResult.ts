import ErrorResult from '@/domain/hypermedia/results/errorResult';
import ResultType from '@/domain/hypermedia/results/resultType';

export default class HypermediaActionResult {
  public readonly resultType: ResultType;
  public readonly location?: string;
  public readonly content?: any;
  public readonly errorResult?: ErrorResult;

  constructor(resultType: ResultType, location?: string, content?: any, errorResult?: ErrorResult) {
    this.resultType = resultType;
    this.location = location;
    this.content = content;
    this.errorResult = errorResult;
  }
}
