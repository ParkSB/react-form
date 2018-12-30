import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Label from '../Label';
import TextInput from '../TextInput';
import ErrorMessage from '../ErrorMessage';

import Validator from '../../app/Validator';

class SocialNumberField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      displayValue: '',
      caretPos: 0,
      errorMessage: '',
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
    let socialNumber = e.target.value;
    let caret = e.target.selectionStart;

    const { onCompleted } = this.props;
    const { value, caretPos } = this.state;

    const isDeleted = value.replace(/\s/g, '').length > socialNumber.length; // 삭제 동작 여부
    const unit = 6;

    if (value === '') {
      this.setState({ value: socialNumber });
    } else if (isDeleted) {
      socialNumber = `${value.slice(0, caret)}${value.slice(caretPos)}`;
    } else {
      socialNumber = `${value}${socialNumber.slice(-1)}`;
    }

    if (socialNumber.length > unit) { // 입력완료
      caret -= 1;
      if (onCompleted && caret >= value.length) {
        onCompleted();
      }
    } else {
      this.setState({
        value: socialNumber,
        displayValue: socialNumber.replace(/[0-9]/g, '•'),
      });
      if (socialNumber.length >= unit) { // 입력완료
        if (onCompleted && caret >= value.length) {
          onCompleted();
        }
      }
    }

    this.setState({ caretPos: caret });
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
