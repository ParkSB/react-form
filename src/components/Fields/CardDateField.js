import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Label from '../Label';
import TextInput from '../TextInput';
import ErrorMessage from '../ErrorMessage';

import Validator from '../../app/Validator';
import Formatter from '../../app/Formatter';

class CardDateField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      caretPos: 0,
      errorMessage: '',
    };

    this.input = null;

    CardDateField.propTypes = {
      onCompleted: PropTypes.func,
      autoFocus: PropTypes.bool,
    };

    CardDateField.defaultProps = {
      onCompleted: undefined,
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
    const month = value.split('/')[0] || undefined;
    const year = value.split('/')[1] || undefined;

    validator.testCardDate(month, year).then((result) => {
      if (typeof result === 'string') {
        this.setState({ errorMessage: result });
      } else {
        this.setState({ errorMessage: '' });
      }
    });
  }

  applyFormat = (e) => {
    const formatter = new Formatter(2, 2);

    const { onCompleted } = this.props;
    const { value } = this.state;

    const result = formatter.convertCardDate(
      e.target.value,
      value,
      e.target.selectionStart,
    );

    if (onCompleted && result.shouldFocusNext) {
      onCompleted();
    }

    this.setState({
      value: result.cardDate,
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
        <Label>카드 유효기간</Label>
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

export default CardDateField;
