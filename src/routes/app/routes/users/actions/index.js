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

export const addMessage = (userId, messData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    var batch = firestore.batch();
    const time = Date.now();

    const dest = 'ad:' + userId;
    batch.set(firestore.collection('w2m-messages').doc(dest).collection(dest).doc(time.toString()), {
      ...messData,
      time
    });

    batch.commit().then(() => {
      dispatch({ type: 'ADD_MESS_' + dest });
    }).catch((err) => {
      dispatch({ type: 'ADD_MESS_' + dest +'ERROR', err });
    })
  }
}

export const getMessages = (userId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const dest = 'ad:' + userId;

    firestore.collection('w2m-messages').doc(dest).collection(dest).get().then((usersSnapshot) => {
      var messages = []
      usersSnapshot.forEach((doc) => messages.push(doc.data()));
      dispatch({ type: 'GET_MESS_' + dest, messages });
    }).catch((err) => {
      dispatch({ type: 'GET_MESS_' + dest +'ERROR', err });
    })
  }
}