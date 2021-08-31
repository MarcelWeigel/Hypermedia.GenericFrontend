import HypermediaAction, { HttpMethodType } from '@/domain/hypermedia/hypermediaAction';
import axios from 'axios';
import ErrorResult from '@/domain/hypermedia/results/errorResult';
import HypermediaActionResult from '@/domain/hypermedia/results/hypermediaActionResult';
import HypermediaObjectRequestResult from '@/domain/hypermedia/results/hypermediaObjectRequestResult';
import ResultType from '@/domain/hypermedia/results/resultType';

export default class HypermediaService {
  public static async navigateToUrl(url: string): Promise<HypermediaObjectRequestResult> {
    return axios(url, {
      method: 'get',
      withCredentials: true,
    })
      .then((r) => {
        const contentType = r.headers['content-type'];
        if (contentType !== 'application/vnd.siren+json') {
          return axios(url, {
            method: 'get',
            responseType: 'blob',
            withCredentials: true,
          }).then((r) => {
            return new HypermediaObjectRequestResult(ResultType.Blob, r.data, undefined, undefined);
          });
        }
        return new HypermediaObjectRequestResult(ResultType.Siren, undefined, r.data, undefined);
      })
      .catch((e) => {
        return new HypermediaObjectRequestResult(
          ResultType.Error,
          undefined,
          undefined,
          HypermediaService.getErrorResult(e),
        );
      });
  }

  private static getErrorResult(e: any) {
    const content = `${e.config.method}: ${e.config.url}`;
    if (e.response && 'data' in e.response) {
      return new ErrorResult(
        HypermediaService.getStatusMessage(HypermediaService.GetStatusCodeFromError(e.response)),
        HypermediaService.GetTitleFromError(e.response),
        HypermediaService.GetMessageFromError(content, e.response),
      );
    }
    if(e.response) {
      return new ErrorResult(e.response.status, e.response.statusText, content);
    }
    return new ErrorResult('503', e.message, content);
  }

  private static GetStatusCodeFromError(response: any): number {
    if ('status' in response) {
      return response.status;
    }
    const data = response.data;
    if ('Status' in data) {
      return data.Status;
    }
    if ('status' in data) {
      return data.status;
    }
    if ('StatusCode' in data) {
      return data.StatusCode;
    }
    return -2;
  }

  private static GetTitleFromError(response: any) {
    if ('statusText' in response) {
      return response.statusText;
    }
    const data = response.data;
    if ('Title' in data) {
      return data.Title;
    }
    if ('title' in data) {
      return data.title;
    }
    return '-';
  }

  private static GetMessageFromError(content: string, response: any) {
    const data = response.data;
    if ('Errors' in data) {
      const errors = data.Errors;
      return (
        'Errors:\n' +
        Object.keys(errors)
          .map((p) => `${p}:${errors[p].join('\n')}`)
          .join('\n')
      );
    }
    if ('errors' in data) {
      const errors = data.errors;
      return (
        'Errors:\n' +
        Object.keys(errors)
          .map((p) => `${p}:${errors[p].join('\n')}`)
          .join('\n')
      );
    }
    if ('Detail' in data) {
      return `Detail: ${data.Detail}`;
    }
    if ('detail' in data) {
      return `Detail: ${data.detail}`;
    }
    if ('ProblemType' in data) {
      return `Problem type: ${data.ProblemType}`;
    }
    if ('data' in response) {
      return response.data;
    }
    return content;
  }

  public static async loadSchema(url: string): Promise<any> {
    const response = await axios.get<string>(url);
    return response.data;
  }

  public static async executeAction(action: HypermediaAction): Promise<HypermediaActionResult> {
    switch (action.method) {
      case HttpMethodType.POST:
        return axios(action.hyperlink, {
          method: 'post',
          // data: ,
          withCredentials: true,
        })
          .then((r) => {
            return new HypermediaActionResult(ResultType.Siren, r.headers?.locatio, r.data, undefined);
          })
          .catch((e) => {
            return new HypermediaActionResult(
              ResultType.Error,
              undefined,
              undefined,
              HypermediaService.getErrorResult(e),
            );
          });
      default:
        // TODO implement other methods
        throw Error('Unsupported method used for execution action');
    }
  }

  public static async executeActionWithParameters(
    action: HypermediaAction,
    data: any,
  ): Promise<HypermediaActionResult> {
    switch (action.method) {
      case HttpMethodType.POST:
        return axios(action.hyperlink, {
          method: 'post',
          data: data,
          headers: { Accept: 'application/vnd.siren+json' },
          withCredentials: true,
        })
          .then((r) => {
            return new HypermediaActionResult(ResultType.Siren, r.headers?.location, r.data, undefined);
          })
          .catch((e) => {
            return new HypermediaActionResult(
              ResultType.Error,
              undefined,
              undefined,
              HypermediaService.getErrorResult(e),
            );
          });
      default:
        // TODO implement other methods
        throw Error('Unsupported method used for execution action');
    }
  }

  private static getStatusMessage(statusCode: number): string {
    return `${HypermediaService.mapStatusCodeToString(statusCode)} [${statusCode}]`;
  }

  private static mapStatusCodeToString(statusCode: number): string {
    if (statusCode >= 200 && statusCode < 300) {
      return 'Executed';
    } else if (statusCode === 400) {
      return 'Bad Request';
    } else if (statusCode === 401) {
      return 'Unauthorized';
    } else if (statusCode === 403) {
      return 'Forbidden';
    } else if (statusCode === 404) {
      return 'Action resource not found';
    } else if (statusCode === 409) {
      return 'Resource has changed: conflict.';
    } else if (statusCode >= 400 && statusCode < 500) {
      return 'Client Error';
    } else if (statusCode >= 500) {
      return 'Internal Server Error';
    } else if (statusCode === -1) {
      return 'Client Error';
    }
    return 'Unknown';
  }
}
