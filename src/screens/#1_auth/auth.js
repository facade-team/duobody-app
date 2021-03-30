import React, {Component} from 'react';
import { StyleSheet, Button, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import GrayTextButton from '../../components/GrayTextButton';
import GreenButton from '../../components/GreenButton';
import UnderLinedTextInput from '../../components/UnderlinedTextInput';
import { Spacing } from '../../styles';
import {Dimensions,PixelRatio} from 'react-native';

const HomeScreen = () => {
  const [loginText, setLoginText] = React.useState('');
  const [singupText, setSignupText] = React.useState('');
  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <Image 
          style={styles.squarelogo}
          source={require('../../assets/logo_square.png')}>
        </Image>
      </View>
      <View style={styles.auth_container}>
        <View style={{width: 200}}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <UnderLinedTextInput placeHolderValue={'아이디'}  value={loginText} onChangeText={setLoginText} />
            <UnderLinedTextInput placeHolderValue={'비밀번호'} value={singupText} onChangeText={setSignupText} />
          </View>
        </View>
        <GreenButton content={'로그인'} />
        <View style={{
          width: Spacing.SCALE_200,
          flexDirection: 'row',
          justifyContent:'flex-end'
        }}>
          <GrayTextButton content='회원가입' />
        </View>                    
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo_container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end'
  },
  auth_container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
  },
  squarelogo: {
      width: 250,
      height: 250,
  },
  underline: {
      marginVertical: 10,
      borderBottomColor: 'black',
      borderBottomWidth: 11,
      height: 1,
  },
});
