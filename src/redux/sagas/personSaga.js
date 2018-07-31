import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { PERSON_ACTIONS } from '../actions/personActions';


function* getPersons( action ) {
    try {
        const personResponse = yield call( axios.get, `/api/person` );
        console.log( 'personResponse', personResponse.data )
        yield put({ type: 'SET_PERSONS', payload: personResponse.data });
    }
    catch ( error ) {
        console.log( 'Error in getPersons', error );
    }
}

// Not sure if we want this?
function* addPerson( action ) {
    try {
        const personResponse = yield call( axios.post, `/api/person`, action.payload );
        yield put({ type: 'FETCH_PERSONS' })
    }
    catch ( error ) {
        console.log( 'Error in addPerson', error );
    }
}

function* hidePerson( action ) {
    try {
        // const personResponse = yield call( axios.put, `/api/person/${id}`, action.payload );
        yield put({ type: 'FETCH_PERSONS' })
    }
    catch ( error ) {
        console.log( 'Error in editPerson', error );
    }
}

function* deletePerson( action ) {
    let id = action.payload.id;
    try {
        const personResponse = yield call( axios.delete, `/api/person/${ id }` );
        yield put({ type: 'FETCH_PERSONS' })
    }
    catch ( error ) {
        console.log( 'Error in deletePerson', error );
    }
}

function* personSaga() {
    yield takeLatest(PERSON_ACTIONS.FETCH_PERSONS, getPersons);
    yield takeLatest(PERSON_ACTIONS.ADD_PERSON, addPerson);
    // yield takeLatest(PERSON_ACTIONS.EDIT_PERSON, editPerson);
    yield takeLatest(PERSON_ACTIONS.HIDE_PERSON, hidePerson);
    yield takeLatest(PERSON_ACTIONS.DELETE_PERSON, deletePerson);
  }
  
  export default personSaga;