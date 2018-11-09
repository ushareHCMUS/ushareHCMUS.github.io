import chartData from '../routes/app/routes/dashboard/sagas/';
import authFlow from '../routes/login/sagas';
import registerFlow from '../routes/sign-up/sagas';
import userFlow from '../routes/app/routes/userlist/sagas';
import areaFlow from '../routes/app/routes/areas/sagas';
import { fork } from 'redux-saga/effects';

export function* startup() {
	yield console.log('Hello Redux-Saga');
}

export default function* root() {
	// combine your saga here
	yield fork(startup);
	yield fork(authFlow);
	yield fork(areaFlow);
	yield fork(userFlow);
	yield fork(chartData);
	yield fork(registerFlow);
}