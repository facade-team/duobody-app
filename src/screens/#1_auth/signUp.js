import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Alert, View } from 'react-native';
import GrayTextButton from '../../components/GrayTextButton';
import GreenButton from '../../components/GreenButton';
import UnderLinedTextInput from '../../components/UnderlinedTextInput';
import { Spacing, Colors } from '../../styles';
import { AuthContext } from '../../services/AuthContext';
import axios from '../../axios/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const Container = styled.View`
  flex: 1;
  background-color: ${Colors.WHITE};
  padding-vertical: ${Spacing.SCALE_80};
  justify-content: center;
  align-items: center;
`

const LogoContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-bottom: ${Spacing.SCALE_48};
`

const AuthContainer = styled.View`
  flex: 1;
  justify-content: center;
`

const LogoImage = styled.Image`
  width: ${Spacing.SCALE_200};
  height: ${Spacing.SCALE_200};
`

export default ({ navigation }) => {
  const [nameText, setNameText] = useState('')
  const [idText, setIdtext] = useState('')
  const [passwordText, setPasswordText] = useState('')
  const [checkPasswordText, setCheckPasswordText] = useState('')

  const { signUp } = useContext(AuthContext)

  const handleOnCickSendSecret = async () => {
    if (nameText === '') {
      return Alert.alert('이름을 입력하세요')
    }
    else if (idText === '') {
      return Alert.alert('아이디를 입력하세요')
    }
    else if (passwordText === '') {
      return Alert.alert('비밀번호를 입력하세요')
    }
    else if (checkPasswordText === '') {
      return Alert.alert('비밀번호 확인란을 입력하세요')
    }
    else if (checkPasswordText !== passwordText) {
      return Alert.alert('비밀번호가 틀립니다')
    }
    try {
      signUp(nameText, idText, passwordText)
      navigation.navigate('Confirm', {
        trainerId: idText
      })
    } catch (e) {
      console.log(e)
      Alert.alert('회원가입에 실패했습니다')
    }
  }

  return (
  <Container>
        <KeyboardAwareScrollView style = {{flex:1, padding: Spacing.SCALE_2, marginTop: Spacing.SCALE_2}}>

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
    </KeyboardAwareScrollView>
  </Container>
)}