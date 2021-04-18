import React from 'react';
import { NavigationEvents } from 'react-navigation';
import styled from 'styled-components';
import { Colors, Spacing } from '../styles'

const Container = styled.View`
  margin-bottom: 18px;
`;

const TextInput = styled.TextInput`
  padding-bottom: ${Spacing.SCALE_8};
  background-color: ${Colors.WHITE};
  border-bottom-color: ${Colors.GRAY};
  border-bottom-width: 2;
  color: ${Colors.GRAY};
  text-align: center;
`;

const UnderLinedTextInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  autoCapitalize,
  width = Spacing.SCALE_200,
}) => (
  <Container>
    <TextInput
      width={width}
      autoCapitalize='none'
      placeholder={placeholder}
      value={value}
      onChangeText={text => onChangeText(text)}
      secureTextEntry={secureTextEntry}
      autoCapitalize = {autoCapitalize}
    />
  </Container>
)

export default UnderLinedTextInput
