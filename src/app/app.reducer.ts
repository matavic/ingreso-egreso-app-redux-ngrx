import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
// import * as fromIE from './ingreso-egreso/ingreso-egreso.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: fromUI.State,
    auth: fromAuth.AuthState
    // ingresoEgreso: fromIE.IngresoEgresoState  (Comentado para cargarlo por LazyLoad)
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.AuthReducer
    // ingresoEgreso: fromIE.IngresoEgresoReducer
}
