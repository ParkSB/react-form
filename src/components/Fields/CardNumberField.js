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
      caretPos: 0,
      errorMessage: '',
    };

    this.input = null;

    CardNumberField.propTypes = {
      onCompleted: PropTypes.func.isRequired,
      autoFocus: PropTypes.bool,
    };

    CardNumberField.defaultProps = {
      autoFocus: false,
    };
  }

  componentDidUpdate = () => {
    const { caretPos } = this.state;

    this.input.setSelectionRange(caretPos, caretPos);
  }

  testValidation = () => {
    const { value } = this.state;
    const validator = new Validator();

    validator.testCardNumber(value).then((result) => {
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
    let caret = e.target.selectionStart;

    const { onCompleted } = this.props;
    const { value } = this.state;

    const cardNumberLen = cardNumber.length;
    const isDeleted = removeWhitespace(value).length > cardNumber.length; // 삭제 동작 여부

    const unit = 4;
    const set = 4;

    // 입력 값을 공백으로 분리
    for (let i = 1; i < cardNumberLen; i += 1) {
      if (i % unit === 0) {
        cardNumber = `${cardNumber.slice(0, i + offset)} ${cardNumber.slice(i + offset)}`;
        offset += 1;

        if (!isDeleted && caret - offset === i) {
          caret += 1;
        }
      }
    }

    if (removeWhitespace(cardNumber).length > (unit * set)) { // 입력완료
      caret -= 1;
      if (caret >= value.length) {
        onCompleted();
      }
    } else {
      this.setState({ value: cardNumber });
      if (removeWhitespace(cardNumber).length >= (unit * set)) { // 입력완료
        if (caret >= value.length) {
          onCompleted();
        }
      }
    }

    if (caret >= value.length) {
      this.setState({ caretPos: caret + offset });
    } else {
      this.setState({ caretPos: caret });
    }
  }

  focusIt = () => {
    this.input.focus();
  }

  render() {
    const { autoFocus } = this.props;
    const { value, errorMessage } = this.state;

    return (
      <div>
        <Label>카드번호</Label>
        <TextInput
          ref={(el) => { this.input = el; }}
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
