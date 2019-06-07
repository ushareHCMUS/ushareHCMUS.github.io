import { START_REQUEST, STOP_REQUEST } from "../../../constants/ActionTypes";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export function login(payload, onSuccess, onError) {
	return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: LOGIN });
    const firebase = getFirebase();

    dispatch({ type: START_REQUEST });
		firebase.auth().signInWithEmailAndPassword(
			payload.email,
			payload.password
		).then(() => {
      dispatch({ type: STOP_REQUEST });
      dispatch({ type: LOGIN_SUCCESS });
      onSuccess();
		}).catch((err) => {
     dispatch({ type: STOP_REQUEST });
      dispatch({ type: LOGIN_ERROR, err });
      onError();
		})
	}
}

export function logOut() {
	return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    
    dispatch({ type: START_REQUEST });

		firebase.auth().signOut().then(() => {
			dispatch({ type: 'SIGNOUT_SUCCESS' });
		})
	}
}