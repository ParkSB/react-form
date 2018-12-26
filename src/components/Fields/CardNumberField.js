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

    validator.testCardNumber(value).then((result) => {
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
