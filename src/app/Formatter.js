class Formatter {
  constructor(unit = 0, set = 0) {
    this.unit = unit;
    this.set = set;
  }

  convertCardNumber(newString, oldString, caretPosition) {
    const removeSep = (str) => {
      return str.replace(/\s/g, '');
    };

    let cardNumber = removeSep(newString);

    let offset = 0;
    let caret = caretPosition;
    let unitSet = 0;

    const isDeleted = removeSep(oldString).length > cardNumber.length;
    const cardNumberLen = cardNumber.length;
    const result = {
      cardNumber: '',
      caretPos: 0,
      shouldFocusNext: false,
    };

    for (let i = 1; i < cardNumberLen; i += 1) {
      if (i % this.unit === 0) {
        const index = i + offset;

        cardNumber = `${cardNumber.slice(0, index)} ${cardNumber.slice(index)}`;
        offset += 1;

        if (!isDeleted && (caret - offset === i)) {
          caret += 1;
        }
      }
    }

    unitSet = this.unit * this.set;

    if (removeSep(cardNumber).length > unitSet) { // 입력완료
      result.cardNumber = oldString;
      caret -= 1;
      if (caret >= oldString.length) {
        result.shouldFocusNext = true;
      }
    } else {
      result.cardNumber = cardNumber;
      if (removeSep(cardNumber).length >= unitSet) { // 입력완료
        if (caret >= oldString.length) {
          result.shouldFocusNext = true;
        }
      }
    }

    if (caret >= oldString.length) {
      result.caretPos = caret + offset;
    } else {
      result.caretPos = caret;
    }

    return result;
  }

  convertCardDate(newString, oldString, caretPosition) {
    const removeSep = (str) => {
      return str.replace(/\s[/]\s/g, '');
    };

    let cardDate = removeSep(newString);

    let offset = 0;
    let caret = caretPosition;
    let unitSet = 0;

    const isDeleted = removeSep(oldString).length > cardDate.length;
    const cardDateLen = cardDate.length;
    const result = {
      cardDate: '',
      caretPos: 0,
      shouldFocusNext: false,
    };

    if (!Number.isNaN(Number(cardDate))) { // 문자 입력 무시
      for (let i = 1; i < cardDateLen; i += 1) {
        if (i % this.unit === 0) {
          const index = i + offset;

          cardDate = `${cardDate.slice(0, index)} / ${cardDate.slice(index)}`;
          offset += 3;

          if (!isDeleted && (caret - offset === i)) {
            caret += 3;
          }
        }
      }

      unitSet = this.unit * this.set;

      if (removeSep(cardDate).length > unitSet) { // 입력완료
        result.cardDate = oldString;
        caret -= 1;
        if (caret >= oldString.length) {
          result.shouldFocusNext = true;
        }
      } else {
        result.cardDate = cardDate;
        if (removeSep(cardDate).length >= unitSet) { // 입력완료
          if (caret >= oldString.length) {
            result.shouldFocusNext = true;
          }
        }
      }

      if (caret >= oldString.length) {
        result.caretPos = caret + offset;
      } else {
        result.caretPos = caret;
      }
    } else {
      result.cardDate = oldString;
    }

    return result;
  }

  convertSocialNumber(newString, oldString, caretPosition, oldCaretPosition) {
    let caret = caretPosition;

    const socialNumber = newString;
    const isDeleted = oldString.length > socialNumber.length;

    const mask = '•';
    const result = {
      socialNumber: '',
      displaySocialNumber: '',
      caretPos: 0,
      shouldFocusNext: false,
    };

    if (oldString === '') {
      result.socialNumber = socialNumber;
    } else if (isDeleted) {
      result.socialNumber = `${oldString.slice(0, caret)}${oldString.slice(oldCaretPosition)}`;
    } else {
      result.socialNumber = `${oldString}${socialNumber.slice(-1)}`;
    }

    if (socialNumber.length > this.unit) {
      caret -= 1;
      if (caret >= oldString.length) {
        result.socialNumber = oldString;
        result.displaySocialNumber = oldString.replace(/[0-9]/g, mask);
        result.shouldFocusNext = true;
      }
    } else {
      result.socialNumber = socialNumber;
      result.displaySocialNumber = socialNumber.replace(/[0-9]/g, mask);

      if (socialNumber.length >= this.unit) { // 입력완료
        if (caret >= oldString.length) {
          result.shouldFocusNext = true;
        }
      }
    }

    return result;
  }
}

export default Formatter;
