

const initState = { sending: false };
const requestStatus = (state = initState, action) => {
  switch (action.type) {
    case 'START_REQUEST':
      return { sending: true };
    case 'STOP_REQUEST':
      return initState;
    case 'REQUEST_ERROR':
      return { sending: false, error: action.payload };
    default:
      return state;
  }
};

export default requestStatus;