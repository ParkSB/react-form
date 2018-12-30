import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Label from '../Label';
import TextInput from '../TextInput';
import ErrorMessage from '../ErrorMessage';

import Validator from '../../app/Validator';
import Formatter from '../../app/Formatter';

class SocialNumberField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      displayValue: '',
      errorMessage: '',
      caretPos: 0,
    };

    this.input = null;

    SocialNumberField.propTypes = {
      onCompleted: PropTypes.func,
      autoFocus: PropTypes.bool,
    };

    SocialNumberField.defaultProps = {
      onCompleted: undefined,
      autoFocus: false,
    };
  }

  testValidation = () => {
    const { value } = this.state;
    const validator = new Validator();

    validator.testSocialNumber(value).then((result) => {
      if (typeof result === 'string') {
        this.setState({ errorMessage: result });
      } else {
        this.setState({ errorMessage: '' });
      }
    });
  }

  applyFormat = (e) => {
    const formatter = new Formatter(6);

    const { onCompleted } = this.props;
    const { value, caretPos } = this.state;

    const result = formatter.convertSocialNumber(
      e.target.value,
      value,
      e.target.selectionStart,
      caretPos,
    );

    if (onCompleted && result.shouldFocusNext) {
      onCompleted();
    }

    this.setState({
      value: result.socialNumber,
      displayValue: result.displaySocialNumber,
      caretPos: result.caretPos,
    });
  }

  focusIt = () => {
    this.input.focus();
  }

  render() {
    const { autoFocus } = this.props;
    const { displayValue, errorMessage } = this.state;

    return (
      <div>
        <Label>주민번호 앞 6자리</Label>
        <TextInput
          ref={(el) => { this.input = el; }}
          autoFocus={autoFocus}
          onBlur={this.testValidation}
          onChange={this.applyFormat}
          value={displayValue}
        />
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      </div>
    );
  }
}

export default SocialNumberField;
