import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, setExpenses, setTotalValue } from '../actions';

const alimentation = 'Alimentação';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      descriptionValue: '',
      coinName: 'USD',
      payChoice: 'Dinheiro',
      categoryTag: alimentation,
      idPayment: 0,
      valuePayment: '',
      receivedExchangeRates: '',
    };
  }

  componentDidMount() {
    const { callCurrencies } = this.props;
    callCurrencies();
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  callFetchAPI = async () => {
    const urlApi = 'https://economia.awesomeapi.com.br/json/all';
    const callAPI = await fetch(urlApi);
    const dataApi = await callAPI.json();

    const { sendSetTotalValue } = this.props;
    const { coinName, valuePayment } = this.state;
    // console.log(dataApi[coinName].ask);
    const cotation = Number(dataApi[coinName].ask);
    const resultConverse = (Number(valuePayment) * cotation);

    sendSetTotalValue(Number(resultConverse));

    this.setState({
      receivedExchangeRates: dataApi,
    });
    // sendSetTotalValue(valuePayment);
    this.setExpenseStore();
  }

  setExpenseStore = () => {
    const { sendSetExpenses } = this.props;
    const { descriptionValue, coinName, payChoice,
      categoryTag, idPayment, valuePayment, receivedExchangeRates } = this.state;

    this.setState({
      idPayment: idPayment + 1,
    });

    const objForm = {
      id: idPayment,
      value: valuePayment,
      description: descriptionValue,
      currency: coinName,
      method: payChoice,
      tag: categoryTag,
      exchangeRates: receivedExchangeRates,
    };

    this.setState({
      descriptionValue: '',
      coinName: 'USD',
      payChoice: 'Dinheiro',
      categoryTag: alimentation,
      valuePayment: '',
    });
    sendSetExpenses(objForm);
  }

  handleClick = () => {
    this.callFetchAPI();
  }

  render() {
    const { email, currencies, totalValue } = this.props;
    const { descriptionValue, valuePayment, coinName,
      payChoice, categoryTag } = this.state;

    return (
      <div>
        <header>
          <h3>
            TrybeWallet
          </h3>
          <h4 data-testid="email-field">{ email }</h4>
          <h4 data-testid="total-field" name="totalValue">
            { totalValue }
          </h4>
          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </header>

        <form>
          <label htmlFor="descriptionValue">
            Descrição:
            {' '}
            <input
              type="text"
              data-testid="description-input"
              name="descriptionValue"
              onChange={ this.handleChange }
              value={ descriptionValue }
            />
          </label>
          {' '}
          <label htmlFor="valuePayment">
            Valor:
            {' '}
            <input
              type="number"
              data-testid="value-input"
              name="valuePayment"
              onChange={ this.handleChange }
              value={ valuePayment }
            />
          </label>
          {' '}
          <label htmlFor="coinName">
            Moeda:
            {' '}
            <select
              data-testid="rare-input"
              type="select"
              name="coinName"
              id="coinName"
              onChange={ this.handleChange }
              value={ coinName }
            >
              {
                currencies.map((currencie) => (
                  <option
                    key={ currencie }
                    name={ currencie }
                    value={ currencie }
                  >
                    { currencie }
                  </option>
                ))
              }
            </select>
          </label>
          {' '}
          <label htmlFor="payChoice">
            Método de Pagamento:
            {' '}
            <select
              data-testid="method-input"
              type="select"
              name="payChoice"
              id="payChoice"
              onChange={ this.handleChange }
              value={ payChoice }
            >
              <option name="payChoice" value="Dinheiro">Dinheiro</option>
              <option name="payChoice" value="Cartão de crédito">
                Cartão de crédito
              </option>
              <option name="payChoice" value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          {' '}
          <label htmlFor="categoryTag">
            Categoria:
            {' '}
            <select
              data-testid="tag-input"
              type="select"
              name="categoryTag"
              id="categoryTag"
              onChange={ this.handleChange }
              value={ categoryTag }
            >
              <option name="categoryTag" value="Alimentação">Alimentação</option>
              <option name="categoryTag" value="Lazer">Lazer</option>
              <option name="categoryTag" value="Trabalho">Trabalho</option>
              <option name="categoryTag" value="Transporte">Transporte</option>
              <option name="categoryTag" value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar Despesas
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  callCurrencies: (payload) => dispatch(fetchCurrencies(payload)),
  sendSetTotalValue: (payload) => dispatch(setTotalValue(payload)),
  sendSetExpenses: (payload) => dispatch(setExpenses(payload)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  idPayment: state.wallet.idPayment,
  totalValue: state.wallet.totalValue.toFixed(2),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  callCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalValue: PropTypes.string.isRequired,
  sendSetTotalValue: PropTypes.func.isRequired,
  sendSetExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
