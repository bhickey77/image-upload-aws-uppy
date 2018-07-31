import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import partnerSaga from './partnerSaga';
import postSaga from './postSaga';
import mailerSaga from './mailerSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    partnerSaga(),
    postSaga(),
    mailerSaga(),
    // watchIncrementAsync()
  ]);
}
