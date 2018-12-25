import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Label from '../Label';
import TextInput from '../TextInput';

class CardNumberField extends Component {
  constructor(props) {
    super(props);

    CardNumberField.propTypes = {
      autoFocus: PropTypes.bool,
    };

    CardNumberField.defaultProps = {
      autoFocus: false,
    };
  }

  render() {
    const { autoFocus } = this.props;

    return (
      <div>
        <Label>카드 유효기간</Label>
        <TextInput autoFocus={autoFocus} />
      </div>
    );
  }
}

export default CardNumberField;
