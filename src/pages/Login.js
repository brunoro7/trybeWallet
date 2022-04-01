import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendingEmailToState } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailValue: '',
      passwordValue: '',
      buttonLoginDisable: true,
    };
  }

  handleBtnValidation = () => {
    const { emailValue, passwordValue } = this.state;

    const NumberCompare = 6;// obs: até 6, pq o indice inicia no 0;
    const checkedPasswordlValue = (passwordValue.length >= NumberCompare);

    const regexEmail = (/^[^@]+@[^@]+\.[^@]+$/i);
    const comparEmail = regexEmail.test(emailValue);

    // console.log(comparEmail);
    /** regex usado foi retirado dessa fonte:
     * ==> https://stackoverflow.com/questions/50330109/simple-regex-pattern-for-email */

    const checkedBtn = (comparEmail && checkedPasswordlValue);

    if (checkedBtn === true) {
      this.setState({
        buttonLoginDisable: false,
      });
    } else {
      this.setState({
        buttonLoginDisable: true,
      });
    }
  };

  handleEmailValue = ({ target }) => {
    const userEmailValue = target.value;
    this.setState({
      emailValue: userEmailValue,
    }, () => {
      this.handleBtnValidation();
    });
  };

  handlePasswordValue = ({ target }) => {
    const userPasswordValue = target.value;
    this.setState({
      passwordValue: userPasswordValue,
    }, () => {
      this.handleBtnValidation();
    });
  };

  handleSaveEmail = () => {
    const { history, sendEmailValue } = this.props;
    const { emailValue } = this.state;

    sendEmailValue(emailValue);

    history.push('/carteira');
  }

  render() {
    const { emailValue, passwordValue, buttonLoginDisable } = this.state;

    // console.log(passwordValue.length);
    return (
      <div>
        <section>

          <div>
            <label htmlFor="inputEmail">
              Email:
              {' '}
              <input
                type="text"
                data-testid="email-input"
                name="inputEmail"
                id="inputEmail"
                value={ emailValue }
                onChange={ this.handleEmailValue }
              />
            </label>
            <br />
            <label htmlFor="passwordValue">
              Senha:
              {' '}
              <input
                type="password"
                data-testid="password-input"
                name="passwordValue"
                id="passwordValue"
                value={ passwordValue }
                onChange={ this.handlePasswordValue }
              />
            </label>
          </div>

          <br />
          <button
            type="button"
            id="btn_enter"
            disabled={ buttonLoginDisable }
            onClick={ this.handleSaveEmail }
          >
            Entrar
          </button>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmailValue: (payload) => dispatch(sendingEmailToState(payload)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  sendEmailValue: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
