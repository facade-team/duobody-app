import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Alert, Text, View } from 'react-native';
import GrayTextButton from '../../components/GrayTextButton';
import GreenButton from '../../components/GreenButton';
import { Spacing, Colors } from '../../styles';
import UnderLinedTextInput from '../../components/UnderlinedTextInput';
import { AuthContext } from '../../services/AuthContext';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.WHITE};
`

const LogoContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`

const AuthContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const LogoImage = styled.Image`
  width: ${Spacing.SCALE_200};
  height: ${Spacing.SCALE_200};
`

const GuideText = styled.Text`
  font-size: 10;
  margin-bottom: ${Spacing.SCALE_8};
`



export default ({ route, navigation}) => {

  const { trainerId } = route.params
  const { confirmSecret } = useContext(AuthContext)

  const handleOnCickConfirmSecret = () => {
    if (secretText === '') {
      return Alert.alert('인증코드를 입력하세요')
    }
    confirmSecret(trainerId, String(secretText))
    navigation.navigate('Login')
  }

  const [secretText, setSecretText] = useState('');
  return (
  <Container>
    <LogoContainer>
      <LogoImage source={require('../../assets/logo_square.png')} />
    </LogoContainer>
    <AuthContainer>
      <GuideText>이메일 인증코드를 입력하세요</GuideText>
      <UnderLinedTextInput placeholder={'인증코드'}  value={secretText} onChangeText={setSecretText} />
      <GreenButton
        content={'회원가입 완료'} 
        onClick = {handleOnCickConfirmSecret}
      />
    </AuthContainer>
  </Container>
)}