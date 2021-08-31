import HypermediaObject from '@/domain/hypermedia/hypermediaObject';
import LinkHistory from '@/domain/history/linkHistory';
import Dictionary, {dictionaryCopy} from '@/utils/dictionary';
import HypermediaActionResult from '@/domain/hypermedia/results/hypermediaActionResult';
import ErrorResult from '@/domain/hypermedia/results/errorResult';

export interface SchemaModule {
    isLoadingSchema?: boolean;
    isSchemaLoaded?: boolean;
    schema?: any;
    schemaUrl?: string;
    classes?: string[];
}

export interface ActionModule {
    isExecutingAction?: boolean;
    isActionExecuted?: boolean;
    actionResult?: HypermediaActionResult;
}

export function updateDictionary<T>(dictionary: Dictionary<T>, key: string, entry: T): Dictionary<T> {
    const dic = dictionaryCopy(dictionary);
    if (!dic[key]) {
        dic[key] = {} as T;
    }
    const actionModuleOld = dic[key];
    dic[key] = {...actionModuleOld, ...entry};
    return dic;
}

export interface ApplicationState {
    username: string;
    loadingPage: boolean;
    apiUrl?: string;
    currentUrl?: string;
    hypermediaObject?: HypermediaObject;
    rawObject?: any;
    history: LinkHistory;
    actionModules: Dictionary<ActionModule>;
    schemaModules: Dictionary<SchemaModule>;
    errorResult?: ErrorResult;
}
