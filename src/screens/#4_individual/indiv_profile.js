import React, { useState } from 'react'
import styled from 'styled-components'
import { View, Text } from 'react-native';
import GrayTextButton from '../../components/GrayTextButton';
import GreenButton from '../../components/GreenButton';
import UnderLinedTextInput_ from '../../components/UnderlinedTextInput';
import { Spacing, Colors, Typography } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.GRAY_LIGHT};
`

const ProfileContainer = styled.View`
  background-color: ${Colors.WHITE};
  flex: 1;
  justify-content: center;
  margin-bottom: ${Spacing.SCALE_16};
  align-self: stretch;
`

const InbodyContainer = styled.View`
  background-color: ${Colors.WHITE};
  flex: 1;
  justify-content: center;
  align-self: stretch;
`

const NameAndEditIcon = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-right: ${Spacing.SCALE_16};
  margin-left: ${Spacing.SCALE_16};
  
`
const Name = styled.Text`
  font-size: ${Typography.FONT_SIZE_24};
  font-weight: ${Typography.FONT_WEIGHT_BOLD};
`

export default ({navigation}) => {
  const [loginText, setLoginText] = useState('');
  const [singupText, setSignupText] = useState('');
  return (
  <Container>
    <ProfileContainer>
      <NameAndEditIcon>
        <Name>김승우 회원님</Name>
        <Icon name='edit' size={30} color='#4F8EF6'
              onPress={() => navigation.navigate('Mem_Add')} />
      </NameAndEditIcon>
    </ProfileContainer>
    <InbodyContainer>
      <Text>hello</Text>
    </InbodyContainer>
  </Container>
)}