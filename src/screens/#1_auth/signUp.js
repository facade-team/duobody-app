import React, { useState } from 'react'
import styled from 'styled-components'
import { View } from 'react-native';
import GrayTextButton from '../../components/GrayTextButton';
import GreenButton from '../../components/GreenButton';
import UnderLinedTextInput_ from '../../components/UnderlinedTextInput_login';
import { Spacing } from '../../styles';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const LogoContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`

const AuthContainer = styled.View`
  flex: 1;
  justify-content: center;
`

const LogoImage = styled.Image`
  width: ${Spacing.SCALE_200};
  height: ${Spacing.SCALE_200};
`

export default () => {
  const [nameText, setNameText] = useState('')
  const [idText, setIdtext] = useState('')
  const [passwordText, setPasswordText] = useState('')
  const [checkPasswordText, setCheckPasswordText] = useState('')
  return (
  <Container>
    <LogoContainer>
      <LogoImage source={require('../../assets/logo_square.png')} />
    </LogoContainer>
    <AuthContainer>
      <UnderLinedTextInput_ placeholder={'이름'}  value={nameText} onChangeText={setNameText} />
      <UnderLinedTextInput_ placeholder={'아이디'}  value={idText} onChangeText={setIdtext} />
      <UnderLinedTextInput_ placeholder={'비밀번호'} value={passwordText} onChangeText={setPasswordText} secureTextEntry={true} />
      <UnderLinedTextInput_ placeholder={'비밀번호 확인'} value={checkPasswordText} onChangeText={setCheckPasswordText} secureTextEntry={true} />
      <GreenButton content={'인증코드 발송'} />
      <View style={{alignSelf:'flex-end'}}>
        <GrayTextButton content='로그인' />
      </View>
    </AuthContainer>
  </Container>
)}