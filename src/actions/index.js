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

    dispatch(setCurrencies(filterCurrencies));
  };
}
