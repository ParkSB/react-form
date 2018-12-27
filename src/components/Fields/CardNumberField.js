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
    const removeWhitespace = (str) => {
      return str.replace(/\s/g, '');
    };

    let cardNumber = removeWhitespace(e.target.value);
    let offset = 0;

    const cardNumberLen = cardNumber.length;
    const unit = 4;
    const set = 4;

    for (let i = 1; i < cardNumberLen; i += 1) {
      if (i % unit === 0) {
        cardNumber = `${cardNumber.slice(0, i + offset)} ${cardNumber.slice(i + offset)}`;
        offset += 1;
      }
    }

    if (removeWhitespace(cardNumber).length > (unit * set)) {
      console.log('focus on next field');
    } else {
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
