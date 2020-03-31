import * as fromAuth from './auth.actions';
import { User } from './user.model';

export interface AuthState {
    user: User
}

const initState: AuthState = {
    user: null
}

export function AuthReducer(state: AuthState = initState, action: fromAuth.actions) : AuthState {

    switch (action.type) {
        case fromAuth.SET_USER:
            return {
                user: {
                    ... action.user
                }
            }
            break;

        case fromAuth.UNSET_USER:
            return {
                user: null
            }
            break;
    
        default:
            return state;
            break;
    }
}