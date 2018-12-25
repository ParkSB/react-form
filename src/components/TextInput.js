import styled from 'styled-components';

const TextInput = styled.input.attrs({
  type: 'text',
  autoFocus: props => props.autoFocus,
})`
  display: block;
  font-size: 12px;
  border: 1px #000000 solid;
  border-radius: 5px;
  padding: 5px;
  width: 96%;
`;

export default TextInput;
