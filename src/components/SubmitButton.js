import styled from 'styled-components';

const SubmitButton = styled.input.attrs({
  type: 'submit',
  value: '확인',
})`
  display: block;
  font-size: 12px;
  border: 1px #000000 solid;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
`;

export default SubmitButton;
