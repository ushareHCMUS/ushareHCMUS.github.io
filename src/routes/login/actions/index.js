export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export function login(payload, next) {
  return {
    type: LOGIN,
    payload
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}

// export function login(payload) {
// 	return (dispatch, getState, { getFirebase }) => {
//     const firebase = getFirebase();

// 		firebase.auth().signInWithEmailAndPassword(
// 			payload.email,
// 			payload.password
// 		).then(() => {
//       dispatch({ type: LOGIN_SUCCESS });
// 		}).catch((err) => {
// 			dispatch({ type: LOGIN_ERROR, err });
// 		})
// 	}
// }

export function logOut() {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		firebase.auth().signOut().then(() => {
			dispatch({ type: 'SIGNOUT_SUCCESS' });
		})
	}
}