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
      errorMessage: '',
    };

    SocialNumberField.propTypes = {
      autoFocus: PropTypes.bool,
    };

    SocialNumberField.defaultProps = {
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
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { autoFocus } = this.props;
    const { value, errorMessage } = this.state;

    return (
      <div>
        <Label>주민번호 앞 6자리</Label>
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

export default SocialNumberField;
