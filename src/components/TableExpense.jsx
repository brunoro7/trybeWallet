import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TableExpense extends React.Component {
  // handleDelete = (event) => {
  //   const { expenses, dispatchSendUpdateExpenses } = this.props;
  //   const getElement = event.target.parentNode.parentNode;
  //   console.log('para conferencia', getElement);

  //   const filterExpense = expenses
  //     .filter((expense) => expense.description !== getElement.className);
  //   const getValueExpense = event.target.parentNode.parentNode.children[6].innerHTML;

  //   console.log(getValueExpense);
  //   dispatchSendUpdateExpenses(filterExpense);
  // };

  render() {
    const { expenses } = this.props;

    return (
      <section>
        <table border="2" id="tabela">
          <caption>
            Tabela Dev
          </caption>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr
                key={ expense.id }
                className={ expense.description }
              >
                <td className={ expense.description }>
                  {expense.description}
                </td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td className="valueExpense">
                  {Number(expense.value).toFixed(2)}
                </td>
                <td>
                  {(expense.exchangeRates[expense.currency].name)}
                </td>
                <td>
                  { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td>
                  { (expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ this.handleDelete }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // dispatchSendUpdateExpenses: (payload) => dispatch(sendUpdateExpenses(payload)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currency: state.wallet.expenses.currency,
});

TableExpense.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableExpense);
