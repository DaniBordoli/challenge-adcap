import React from 'react';
import styled from 'styled-components/native';

const StyledTextInput = styled.TextInput`
  flex: 1;
  height: 40px;
  color: #000;
`;

const TextInput = (props: any) => <StyledTextInput {...props} />;

export default TextInput;
