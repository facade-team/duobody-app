import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Alert, View } from 'react-native';
import GrayTextButton from '../../components/GrayTextButton';
import GreenButton from '../../components/GreenButton';
import UnderLinedTextInput from '../../components/UnderlinedTextInput';
import { Spacing, Colors } from '../../styles';
import { AuthContext } from '../../services/AuthContext';

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.WHITE}
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

export default ({navigation}) => {
  const [nameText, setNameText] = useState('')
  const [idText, setIdtext] = useState('')
  const [passwordText, setPasswordText] = useState('')
  const [checkPasswordText, setCheckPasswordText] = useState('')

  const { signUp } = useContext(AuthContext)

  const handleOnCickSendSecret = () => {
    if (nameText === '') {
      Alert.alert('이름을 입력하세요')
    }
    else if (idText === '') {
      Alert.alert('아이디를 입력하세요')
    }
    else if (passwordText === '') {
      Alert.alert('비밀번호를 입력하세요')
    }
    else if (checkPasswordText === '') {
      Alert.alert('비밀번호 확인란을 입력하세요')
    }
    else if (checkPasswordText !== passwordText) {
      Alert.alert('비밀번호가 틀립니다')
    }
    else {
      const p = new Promise((resolve, reject) => {
        resolve(signUp(nameText, idText, passwordText, navigation))
      })
      // signUp(nameText, idText, passwordText, navigation)
      p.then(navigation.navigate('Confirm'))
    }
  }
  return (
  <Container>
    <LogoContainer>
      <LogoImage source={require('../../assets/logo_square.png')} />
    </LogoContainer>
    <AuthContainer>
      <UnderLinedTextInput placeholder={'이름'}  value={nameText} onChangeText={setNameText} />
      <UnderLinedTextInput placeholder={'아이디'}  value={idText} onChangeText={setIdtext} />
      <UnderLinedTextInput placeholder={'비밀번호'} value={passwordText} onChangeText={setPasswordText} secureTextEntry={true} />
      <UnderLinedTextInput placeholder={'비밀번호 확인'} value={checkPasswordText} onChangeText={setCheckPasswordText} secureTextEntry={true} />
      <GreenButton
        content={'인증코드 발송'} 
        onClick = {handleOnCickSendSecret}
      />
      <View style={{alignSelf:'flex-end'}}>
        <GrayTextButton
          content='로그인'
          onClick = {()=>navigation.goBack()} />
      </View>
    </AuthContainer>
  </Container>
)}