class Formatter {
  constructor(unit = 0, set = 0) {
    this.unit = unit;
    this.set = set;
  }

  /**
   * 카드번호 형식을 적용한다
   *
   * @param {string} newString - 입력을 반영한 문자열
   * @param {string} oldString - 직전 문자열
   * @param {number} caretPosition - caret 위치
   * @return {object}
   */
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

    // 구분자 삽입
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

  /**
   * 카드 유효기간 형식을 적용한다
   *
   * @param {string} newString - 입력을 반영한 문자열
   * @param {string} oldString - 직전 문자열
   * @param {number} caretPosition - caret 위치
   * @return {object}
   */
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
      // 구분자 삽입
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

  /**
   * 주민번호 앞 6자리 형식을 적용한다
   *
   * @param {string} displayString - 입력을 반영한 문자열
   * @param {string} oldString - 직전 문자열
   * @param {number} caretPosition - caret 위치
   * @param {number} oldCaretPosition - 직전 caret 위치
   * @return {object}
   */
  convertSocialNumber(displayString, string, caretPosition, oldCaretPosition) {
    let caret = caretPosition;

    const isDeleted = string.length > displayString.length;

    const mask = '•';
    const result = {
      socialNumber: string,
      displaySocialNumber: '',
      caretPos: caretPosition,
      shouldFocusNext: false,
    };

    if (string === '') {
      result.socialNumber = displayString;
    } else if (isDeleted) { // 삭제 동작
      if (caret > oldCaretPosition) {
        result.socialNumber = `${result.socialNumber.slice(0, oldCaretPosition)}${result.socialNumber.slice(caret)}`;
      } else {
        result.socialNumber = `${result.socialNumber.slice(0, caret)}${result.socialNumber.slice(oldCaretPosition)}`;
      }
    } else {
      result.socialNumber = `${string}${displayString.slice(-1)}`;
    }

    if (result.socialNumber.length > this.unit) {
      caret -= 1;
      if (caret >= string.length) {
        result.socialNumber = string;
        result.displaySocialNumber = string.replace(/[0-9]/g, mask);
        result.shouldFocusNext = true;
      }
    } else {
      result.displaySocialNumber = result.socialNumber.replace(/[0-9]/g, mask);

      if (result.socialNumber.length >= this.unit) { // 입력완료
        if (caret >= string.length) {
          result.shouldFocusNext = true;
        }
      }
    }

    return result;
  }
}

export default Formatter;
