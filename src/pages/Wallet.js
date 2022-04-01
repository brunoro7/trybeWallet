import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { callCurrencies } = this.props;
    callCurrencies();
  }

  render() {
    const { email } = this.props;
    const totalValue = 0;

    return (
      <div>
        <header>
          <h3>
            TrybeWallet
          </h3>
          <h4 data-testid="email-field">{ email }</h4>
          <h4 data-testid="total-field">
            { `Despesa Total: ${totalValue}` }
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
              placeholder="Nome da despesa"
            />
          </label>
          {' '}
          <label htmlFor="coastValue">
            Valor:
            {' '}
            <input
              type="number"
              data-testid="value-input"
              name="coastValue"
              placeholder="0"
            />
          </label>
          {' '}
          <label htmlFor="coinName">
            { /** Aqui tem que criar o map das options */ }
            Moeda:
            {' '}
            <select
              data-testid="rare-input"
              type="select"
              name="coinName"
              id="coinName"
            >
              <option name="coinName" value="normal">Normal</option>
              <option name="coinName" value="raro">Raro</option>
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
            >
              <option name="categoryTag" value="Alimentação">Alimentação</option>
              <option name="categoryTag" value="Lazer">Lazer</option>
              <option name="categoryTag" value="Trabalho">Trabalho</option>
              <option name="categoryTag" value="Transporte">Transporte</option>
              <option name="categoryTag" value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  callCurrencies: (payload) => dispatch(fetchCurrencies(payload)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  // currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  callCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
