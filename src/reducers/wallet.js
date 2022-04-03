// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SET_CURRENCIES, SET_EXPENSES, SET_TOTALVALUE } from '../actions';

const INITTIAL_STATE = {
  currencies: [],
  expenses: [],
  totalValue: 0,
};

const wallet = (state = INITTIAL_STATE, action) => {
  // console.log(action.payload);

  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case SET_TOTALVALUE:
    return {
      ...state,
      totalValue: state.totalValue + action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
