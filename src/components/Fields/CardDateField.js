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
    const removeWhitespace = (str) => {
      return str.replace(/\s[/]\s/g, '');
    };

    let cardDate = removeWhitespace(e.target.value);
    let offset = 0;
    let caret = e.target.selectionStart;

    const { onCompleted } = this.props;
    const { value } = this.state;

    const cardDateLen = cardDate.length;
    const isDeleted = removeWhitespace(value).length > cardDate.length; // 삭제 동작 여부

    const unit = 2;
    const set = 2;

    // 입력 값에서 연, 월 분리
    for (let i = 1; i < cardDateLen; i += 1) {
      if (i % unit === 0) {
        cardDate = `${cardDate.slice(0, i + offset)} / ${cardDate.slice(i + offset)}`;
        offset += 3;

        if (!isDeleted && caret - offset === i) {
          caret += 3;
        }
      }
    }

    if (removeWhitespace(cardDate).length > (unit * set)) { // 입력완료
      caret -= 1;
      if (onCompleted && caret >= value.length) {
        onCompleted();
      }
    } else {
      this.setState({ value: cardDate });
      if (removeWhitespace(cardDate).length >= (unit * set)) { // 입력완료
        if (onCompleted && caret >= value.length) {
          onCompleted();
        }
      }
    }

    if (caret >= value.length) {
      this.setState({ caretPos: caret + offset });
    } else {
      this.setState({ caretPos: caret });
    }
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
