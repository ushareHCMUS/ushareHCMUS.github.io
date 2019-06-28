export const addNews = (news, groups) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    var batch = firestore.batch();
    groups.map((group) => {
      const id = createRandomString(20);
      batch.update(firestore.collection('groups').doc(group), {
        news: firestore.FieldValue.arrayUnion(id.toString())
      })

      batch.set(firestore.collection('news').doc(id), {
        title: news.title,
        content: news.content,
        groups: group,
        isImportant: news.isImportant,
        time: news.time,
        place: news.place,
        timeStamp: firestore.FieldValue.serverTimestamp(),
        isPublic: news.isPublic
      })
    });

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

export const changeAddStatus = () => {
  return (dispatch) => {
    dispatch({ type: 'CHANGE_ADD_STATUS' });
  }
}

export const editNews = (news) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    var batch = firestore.batch();

    const id = news.id
    delete news.id

    batch.update(firestore.collection('news').doc(id), {
      ...news,
      timeStamp: new Date(news.timeStamp.seconds * 1000)
    });
    batch.commit().then(() => {
      dispatch({ type: 'CHANGE_ROOM_BOOKING_STATUS' });
    }).catch((err) => {
      dispatch({ type: 'CHANGE_ROOM_BOOKING_STATUS_ERROR', err });
    })
  }
}

export const changeEditStatus = () => {
  return (dispatch) => {
    dispatch({ type: 'CHANGE_EDIT_STATUS' });
  }
}
