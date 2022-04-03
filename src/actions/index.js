// Coloque aqui suas actions

export const SENDING_EMAIL = 'SENDING_EMAIL';
export const SET_CURRENCIES = 'FETCH_CURRENCIES';
export const SET_EXPENSES = 'SET_EXPENSES';
export const SET_TOTALVALUE = 'SET_TOTALVALUE';

export const sendingEmailToState = (payload) => ({ type: SENDING_EMAIL, payload });

export const setTotalValue = (payload) => ({ type: SET_TOTALVALUE, payload });

export const setCurrencies = (payload) => ({ type: SET_CURRENCIES, payload });

export const setExpenses = (payload) => ({ type: SET_EXPENSES, payload });

export function fetchCurrencies() {
  return async (dispatch) => {
    const callAPIcurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
    const getCurrencies = await callAPIcurrencies.json();
    // console.log(getCurrencies);

    const filterCurrencies = Array.from(Object.keys(getCurrencies))
      .filter((currencie) => currencie !== 'USDT');

    // console.log(filterCurrencies);

    dispatch(setCurrencies(filterCurrencies));
  };
}

// 2 tipos:

// 1- quando a ação é objeto!
// ela vai direto.

// 2- quando a ação é uma função;
// ela primeiro vai na pagina, e depois volta aqui nas actions,
// para disparar a ação correta, que será o objeto.
