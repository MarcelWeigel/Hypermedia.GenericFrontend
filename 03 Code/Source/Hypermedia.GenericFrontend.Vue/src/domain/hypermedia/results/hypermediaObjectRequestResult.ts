import ErrorResult from '@/domain/hypermedia/results/errorResult';
import ResultType from '@/domain/hypermedia/results/resultType';

export default class HypermediaObjectRequestResult {
  public readonly resultType: ResultType;
  public readonly blob?: Blob;
  public readonly sirenObject?: any;
  public readonly errorResult?: ErrorResult;

  constructor(resultType: ResultType, blob?: Blob, sirenObject?: any, errorResult?: ErrorResult) {
    this.resultType = resultType;
    this.blob = blob;
    this.sirenObject = sirenObject;
    this.errorResult = errorResult;
  }
}
