import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Label from '../Label';
import TextInput from '../TextInput';

class CardDateField extends Component {
  constructor(props) {
    super(props);

    CardDateField.propTypes = {
      autoFocus: PropTypes.bool,
    };

    CardDateField.defaultProps = {
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

export default CardDateField;
