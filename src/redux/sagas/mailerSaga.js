import { call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* sendEmail(action){
    try{
        console.log('action.payload in sendEmail saga', action.payload);
        yield call(axios.post, '/api/mail/send', action.payload)
    } catch (error) {
        console.log('Error in saga sendMail', error);
    }
}

function* mailerSaga() {
    yield takeEvery('SEND_NEW_PARTNER_EMAIL', sendEmail);
  }
  
  export default mailerSaga;