import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Label from '../Label';
import TextInput from '../TextInput';
import ErrorMessage from '../ErrorMessage';

import Validator from '../../app/Validator';

class CardDateField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      errorMessage: '',
    };

    CardDateField.propTypes = {
      autoFocus: PropTypes.bool,
    };

    CardDateField.defaultProps = {
      autoFocus: false,
    };
  }

  testValidation = () => {
    const { value } = this.state;
    const validator = new Validator();

    validator.testCardDate(value).then((result) => {
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
        <Label>카드 유효기간</Label>
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

export default CardDateField;
