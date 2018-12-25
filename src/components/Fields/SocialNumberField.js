import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Label from '../Label';
import TextInput from '../TextInput';

class SocialNumberField extends Component {
  constructor(props) {
    super(props);

    SocialNumberField.propTypes = {
      autoFocus: PropTypes.bool,
    };

    SocialNumberField.defaultProps = {
      autoFocus: false,
    };
  }

  render() {
    const { autoFocus } = this.props;

    return (
      <div>
        <Label>주민번호 앞 6자리</Label>
        <TextInput autoFocus={autoFocus} />
      </div>
    );
  }
}

export default SocialNumberField;
