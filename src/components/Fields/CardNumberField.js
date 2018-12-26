import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Label from '../Label';
import TextInput from '../TextInput';
import ErrorMessage from '../ErrorMessage';

import Validator from '../../app/Validator';

class CardNumberField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      errorMessage: '',
    };

    CardNumberField.propTypes = {
      autoFocus: PropTypes.bool,
    };

    CardNumberField.defaultProps = {
      autoFocus: false,
    };
  }

  testValidation = () => {
    const { value } = this.state;
    const validator = new Validator();

    validator.testCardNumber(value.replace(/\s/g, '')).then((result) => {
      if (typeof result === 'string') {
        this.setState({ errorMessage: result });
      } else {
        this.setState({ errorMessage: '' });
      }
    });
  }

  applyFormat = (e) => {
    let cardNumber = e.target.value;

    const { value } = this.state;
    const cardNumberLen = cardNumber.length;
    const unit = 4;
    const set = 4;

    const isCompleted = (cardNum) => {
      return cardNum.length >= (unit * set + (set - 1));
    };

    if (value.length < cardNumberLen) { // not backspace
      if (!isCompleted(value)) {
        if (cardNumberLen % (unit + 1) === 0) {
          cardNumber = `${value} ${cardNumber.slice(-1)}`;
        }

        if (isCompleted(cardNumber)) {
          console.log('focus on next field');
        }

        this.setState({
          value: cardNumber,
        });
      }
    } else {
      if (cardNumber.slice(-1) === ' ') {
        cardNumber = cardNumber.slice(0, -1);
      }

      this.setState({
        value: cardNumber,
      });
    }
  }

  render() {
    const { autoFocus } = this.props;
    const { value, errorMessage } = this.state;

    return (
      <div>
        <Label>카드번호</Label>
        <TextInput
          autoFocus={autoFocus}
          onBlur={this.testValidation}
          onChange={this.applyFormat}
          value={value}
        />
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      </div>
    );
  }
}

export default CardNumberField;
