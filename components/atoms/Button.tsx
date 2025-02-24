import React from 'react';
import styled from 'styled-components/native';

const StyledButton = styled.TouchableOpacity`
  padding: 10px;
  width: 35%;
  border-radius: 15px;
  margin-top: 10px;
  background-color: #066068;
`;

const StyledText = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

const Button = ({ onPress, title, style, textStyle }: any) => (
  <StyledButton onPress={onPress} style={style}>
    <StyledText style={textStyle}>{title}</StyledText>
  </StyledButton>
);

export default Button;
