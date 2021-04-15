import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Button, TouchableOpacity, View, Text } from 'react-native';
import GrayTextButton from '../../components/GrayTextButton';
import UnderLinedTextInput from '../../components/UnderlinedTextInput';
import { Spacing, Colors } from '../../styles';
import GreenButton from '../../components/GreenButton';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../services/AuthContext';
import axios from 'axios'

const Container = styled.View`
  flex: 1;
  background-Color: ${Colors.PRIMARY};
  justify-content: center;
  align-items: center;
`

const WhiteboxContainer = styled.View`
  flex: 1;
  background-Color: ${Colors.WHITE};
  border-radius: ${Spacing.SCALE_18};
  margin-top: ${Spacing.SCALE_32};
  margin-bottom: ${Spacing.SCALE_4};
  justify-content: center;
  align-items: center;
  width: 98%;
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
export default ({navigation}) => {
  const [loginText, setLoginText] = useState('');
  const [singupText, setSignupText] = useState('');

  const { signIn } = useContext(AuthContext);

  const getApiTest = () => {
    axios.get('http:/3.35.110.129/api/trainee')
    .then(res => console.log(res.data.data))
    .catch(error => console.log(error.response.request._response))
  }
  return (
  <Container>
    <WhiteboxContainer>
      <LogoContainer>
        <LogoImage source={require('../../assets/logo_square.png')} />
      </LogoContainer>
      <AuthContainer>
        <UnderLinedTextInput placeholder={'아이디'}  value={loginText} onChangeText={setLoginText} />
        <UnderLinedTextInput placeholder={'비밀번호'} value={singupText} onChangeText={setSignupText} secureTextEntry={true} />
        <GreenButton content={'로그인'} onPressOut={signIn} />
        <View style={{alignSelf:'flex-end'}}>
          <GrayTextButton
          content='회원가입'
          onClick = {() => navigation.navigate('Signup')}
          />
          {
            /*
            <TouchableOpacity onPressOut={async () => {
              let token = await AsyncStorage.getItem('token')
              console.log(`current token is : ${token}`)
            }}>
              <Text>Check token</Text>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={getApiTest}>
              <Text>API Check!</Text>
            </TouchableOpacity>
            */
          }
        </View>
      </AuthContainer>
    </WhiteboxContainer>
  </Container>
)}