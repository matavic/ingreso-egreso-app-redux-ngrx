import * as fromUI from './ui.actions';

export interface State {
    isLoading: boolean
}

const initState: State = {
    isLoading: false
}

export function uiReducer(state: State = initState, action: fromUI.actions): State {

    switch (action.type) {
        case fromUI.ACTIVAR_LOADING:
            return {
                isLoading: true
            }
            break;

        case fromUI.DESACTIVAR_LOADING:
            return {
                isLoading: false
            }
            break;
    
        default:
            return state;
            break;
    }
}