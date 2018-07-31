import { combineReducers } from 'redux';
import { PARTNER_ACTIONS } from '../actions/partnerActions';

const partners = ( state = [], action ) => {
    switch ( action.type ) {
        case PARTNER_ACTIONS.SET_PARTNERS :
        console.log( 'partners', action.payload)
        state = [];
            return [
                ...state,
                action.payload,
            ];
        default:
            return state;
    }
}

const store = combineReducers({
    partners,
});

export default store;