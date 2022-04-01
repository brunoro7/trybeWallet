// Coloque aqui suas actions

export const SENDING_EMAIL = 'SENDING_EMAIL';
export const SET_CURRENCIES = 'FETCH_CURRENCIES';

export const sendingEmailToState = (payload) => ({ type: SENDING_EMAIL, payload });

export const setCurrencies = (payload) => ({ type: SET_CURRENCIES, payload });

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

// export function fetchExpenses() {
//   return async (dispatch) => {
//     const callAPIexpenses = await fetch('https://economia.awesomeapi.com.br/json/all');
//     const getExpenses = await callAPIexpenses.json();
//     console.log(getExpenses.ask);

//     // console.log(filterCurrencies);

//     dispatch();
//   };
// }

// 2 tipos:

// 1- quando a ação é objeto!
// ela vai direto.

// 2- caso em que a ação é uma função;
// ela primeiro vai na pagina, e depois volta aqui nas actions,
// para disparar a ação correta, que será o objeto.
