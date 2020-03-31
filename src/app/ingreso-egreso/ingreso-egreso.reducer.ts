import * as fromIE from "./ingreso-egreso.actions";
import { IngresoEgreso } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface IngresoEgresoState {
    items: IngresoEgreso[]
}

export interface AppStateWithIE extends AppState {
    ingresoEgreso: IngresoEgresoState
}

const initState: IngresoEgresoState = {
    items: []
}

export function IngresoEgresoReducer(state: IngresoEgresoState = initState, action: fromIE.actions) : IngresoEgresoState {

    switch (action.type) {
        case fromIE.SET_ITEMS:
            return {
                items: [...action.items.map( item => {
                        return {...item}
                    })
                ]
            }
            break;

        case fromIE.UNSET_ITEMS:
            return {
                items: []
            }
            break;
    
        default:
            return state;
            break;
    }
}