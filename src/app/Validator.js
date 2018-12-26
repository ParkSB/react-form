import * as yup from 'yup';

class Validator {
  testCardNumber(cardNumber) {
    const cardNumberSchema = yup.object().shape({
      cardNumber: yup.string()
        .matches(/^\d{14,16}$/, '유효하지 않은 카드번호입니다.')
        .required('카드번호를 입력해주세요.'),
    });

    return cardNumberSchema.validate({
      cardNumber,
    }).catch((err) => {
      return err.message;
    });
  }

  testCardDate(cardDate) {
    const cardExpiryDateSchema = yup.object().shape({
      cardExpiryMonth: yup.string()
        .matches(/^(0[1-9]|1[0-2])$/, '유효기간 월은 01부터 12까지의 문자열입니다.')
        .required('유효기간 월을 입력해주세요.'),
      cardExpiryYear: yup.string()
        .matches(/^\d{2}$/, '유효기간 연도가 올바르지 않습니다.')
        .required('유효기간 연도를 입력해주세요.'),
    });

    return cardExpiryDateSchema.validate({
      cardExpiryMonth: cardDate,
      cardExpirtyYear: cardDate,
    }).catch((err) => {
      return err.message;
    });
  }

  testSocialNumber(socialNumber) {
    const rrnSchema = yup.object().shape({
      rrn: yup.string()
        .matches(/^\d{6}$/, '주민등록번호 앞자리가 올바르지 않습니다.')
        .required('주민등록번호 앞자리를 입력해주세요.'),
    });

    return rrnSchema.validate({
      rrn: socialNumber,
    }).catch((err) => {
      return err.message;
    });
  }
}

export default Validator;
