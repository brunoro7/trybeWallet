import React from 'react';

class TableExpense extends React.Component {
  render() {
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
            <tr className="blankLine">
              <td>{' '}</td>
              <td>{' '}</td>
              <td>{' '}</td>
              <td>{' '}</td>
              <td>{' '}</td>
              <td>{' '}</td>
              <td>{' '}</td>
              <td>{' '}</td>
              <td>{' '}</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

export default TableExpense;
