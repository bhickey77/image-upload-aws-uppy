import { combineReducers } from 'redux';
import { PERSON_ACTIONS } from '../actions/partnerActions';

const persons = ( state = [], action ) => {
    switch ( action.type ) {
        case PERSON_ACTIONS.SET_PERSONS :
        console.log( 'persons', action.payload)
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
    persons,
});

export default store;