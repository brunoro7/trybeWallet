// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITTIAL_STATE = {
  email: '',
};

const user = (state = INITTIAL_STATE, action) => {
  switch (action.type) {
  case 'SENDING_EMAIL':
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
