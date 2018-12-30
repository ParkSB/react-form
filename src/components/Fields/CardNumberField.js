import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Label from '../Label';
import TextInput from '../TextInput';
import ErrorMessage from '../ErrorMessage';

import Validator from '../../app/Validator';
import Formatter from '../../app/Formatter';

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
    const formatter = new Formatter(4, 4);

    const { onCompleted } = this.props;
    const { value } = this.state;

    const result = formatter.convertCardNumber(
      e.target.value,
      value,
      e.target.selectionStart,
    );

    if (onCompleted && result.shouldFocusNext) {
      onCompleted();
    }

    this.setState({
      value: result.cardNumber,
      caretPos: result.caretPos,
    });
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
