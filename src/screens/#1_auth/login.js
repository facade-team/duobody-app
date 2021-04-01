import React from 'react'
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
  const [loginText, setLoginText] = React.useState('');
  const [singupText, setSignupText] = React.useState('');
  return (
  <Container>
    <LogoContainer>
      <LogoImage source={require('../../assets/logo_square.png')} />
    </LogoContainer>
    <AuthContainer>
      <UnderLinedTextInput_ placeholder={'아이디'}  value={loginText} onChangeText={setLoginText} />
      <UnderLinedTextInput_ placeholder={'비밀번호'} value={singupText} onChangeText={setSignupText} secureTextEntry={true} />
      <GreenButton content={'로그인'} />
      <View style={{alignSelf:'flex-end'}}>
        <GrayTextButton content='회원가입' />
      </View>
    </AuthContainer>
  </Container>
)}