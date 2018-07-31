import { combineReducers } from 'redux';
import { POST_ACTIONS } from '../actions/postActions';

const posts = ( state = [], action ) => {
    switch ( action.type ) {
        case POST_ACTIONS.SET_POSTS :
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
    posts,
});

export default store;