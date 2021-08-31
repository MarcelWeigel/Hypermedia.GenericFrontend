import Dictionary from '@/utils/dictionary';
import TransientState from '@/domain/state/transientState';

interface State {
    api: string;
    url: string;
    h: string;
}

export default class TransientStateService {
    public static transientStateToQuery(transientState: TransientState): Dictionary<string> {
        const state: State = {
            api: transientState.apiUrl,
            url: transientState.currentUrl,
            h: TransientStateService.serializeHistory(transientState.history),
        };
        return state as any;
    }

    public static transientStateFromQuery(query: Dictionary<string>): TransientState | undefined {
        const state = (query as any) as State;
        if (!('api' in query) || !('url' in query) || !('h' in query)) {
            return undefined;
        }
        return {
            apiUrl: state.api,
            currentUrl: state.url,
            history: TransientStateService.deserializeHistory(state.h),
        };
    }

    private static serializeHistory(history: string[]): string {
        return history.join(';');
    }

    private static deserializeHistory(history: string): string[] {
        return history.split(';');
    }
}
