import React, { useState } from 'react'
import styled from 'styled-components'
import { View } from 'react-native';
import GrayTextButton from '../../components/GrayTextButton';
import UnderLinedTextInput from '../../components/UnderlinedTextInput';
import { Spacing } from '../../styles';
import GreenButton from '../../components/GreenButton';

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
  const [loginText, setLoginText] = useState('');
  const [singupText, setSignupText] = useState('');
  return (
  <Container>
    <LogoContainer>
      <LogoImage source={require('../../assets/logo_square.png')} />
    </LogoContainer>
    <AuthContainer>
      <UnderLinedTextInput placeholder={'아이디'}  value={loginText} onChangeText={setLoginText} />
      <UnderLinedTextInput placeholder={'비밀번호'} value={singupText} onChangeText={setSignupText} secureTextEntry={true} />
      <GreenButton content={'로그인'} />
      <View style={{alignSelf:'flex-end'}}>
        <GrayTextButton content='회원가입' />
      </View>
    </AuthContainer>
  </Container>
)}