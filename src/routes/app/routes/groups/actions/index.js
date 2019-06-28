export const addMember = (member, group) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    var batch = firestore.batch();

    member.map(mem => {
      batch.update(firestore.collection('groups').doc(group), {
        members: firestore.FieldValue.arrayUnion(mem)
      });
      batch.update(firestore.collection('users').doc(mem), {
        groups: firestore.FieldValue.arrayUnion(group)
      })
    });
    
    batch.commit().then(() => {
      dispatch({ type: 'ADD_MEMBER', member: member, group: group });
    }).catch((err) => {
      dispatch({ type: 'ADD_MEMBER_ERROR', err });
    })
  }
}

export const removeMember = (member, group) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    var batch = firestore.batch();
    batch.update(firestore.collection('groups').doc(group), {
      members: firestore.FieldValue.arrayRemove(member)
    });
    batch.update(firestore.collection('users').doc(member), {
      groups: firestore.FieldValue.arrayRemove(group)
    })
    batch.commit().then(() => {
      dispatch({ type: 'REMOVE_MEMBER', member: member, group: group });
    }).catch((err) => {
      dispatch({ type: 'REMOVE_MEMBER_ERROR', err });
    })
  }
}

export const addGroup = (groupInfo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    var batch = firestore.batch();
    groupInfo['timeCreated'] = firestore.FieldValue.serverTimestamp();

    batch.set(firestore.collection('groups').doc(groupInfo.groupId), groupInfo)
    batch.commit().then(() => {
      dispatch({ type: 'ADD_GROUP' });
    }).catch((err) => {
      dispatch({ type: 'ADD_GROUP_ERROR', err });
    })
  }
}

export const changeRemoveStatus = () => {
  return (dispatch) => {
    dispatch({type:'CHANGE_REMOVE_STATUS'});
  }
}

export const changeAddStatus = () => {
  return (dispatch) => {
    dispatch({type:'CHANGE_ADD_STATUS'});
  }
}

export const addNewMember = (member) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('users').add({
    }).then((docRef) => {
      var batch = firestore.batch();
      batch.update(firestore.collection('groups').doc(group), {
        news: firestore.FieldValue.arrayUnion(id.toString())
      })

      batch.set(firestore.collection('users').doc(createRandomString(20)), {
        title: news.title,
        content: news.content,
        groups: group,
        isImportant: news.isImportant,
        time: news.time,
        place: news.place,
        timeStamp: firestore.FieldValue.serverTimestamp(),
        isPublic: news.isPublic
      })
    })

    batch.commit().then(() => {
      dispatch({ type: 'ADD_NEWS', news: news, groups: groups });
    }).catch((err) => {
      dispatch({ type: 'ADD_NEWS_ERROR', err });
    })
  }
}

function createRandomString( length ) {
  var str = "";
  for ( ; str.length < length; str += Math.random().toString( 36 ).substr( 2 ) );
  return str.substr( 0, length );
}