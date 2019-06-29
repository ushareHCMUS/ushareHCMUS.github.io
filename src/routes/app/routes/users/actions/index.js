import MD5 from 'md5';

export const addUser = (userInfo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    var batch = firestore.batch();
    
    batch.set(firestore.collection('users').doc(userInfo.id), {
      ...userInfo,
      sex: userInfo.sex.toLowerCase() == 'nam' ? 'male' : 'female',
      avatar: '',
      groups: [],
      password: MD5(userInfo.id),
      username: userInfo.id,
      pinned: []
    })
    batch.commit().then(() => {
      dispatch({ type: 'ADD_USER' });
    }).catch((err) => {
      dispatch({ type: 'ADD_USER_ERROR', err });
    })
  }
}

export const removeUser = (userId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    var batch = firestore.batch();

    console.log(userId)

    batch.delete(firestore.collection('users').doc(userId));

    batch.commit().then(() => {
      dispatch({ type: 'REMOVE_USER' });
    }).catch((err) => {
      dispatch({ type: 'REMOVE_USER_ERROR', err });
    })
  }
}

export const editUserInfo = (userId, newUserInfo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    var batch = firestore.batch();

    batch.update(firestore.collection('users').doc(userId), newUserInfo);

    batch.commit().then(() => {
      dispatch({ type: 'EDIT_USER_INFO' });
    }).catch((err) => {
      dispatch({ type: 'EDIT_USER_INFO_ERROR', err });
    })
  }
}