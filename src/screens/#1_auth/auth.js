import React, {Component} from 'react';
import { StyleSheet, Button, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import GrayTextButton from '../../components/GrayTextButton';
<<<<<<< HEAD
import GreenButton from '../../components/GreenButton';
import UnderLinedTextInput from '../../components/UnderlinedTextInput';
import { Mixins, Spacing } from '../../styles';
import {Dimensions,PixelRatio} from 'react-native';

const HomeScreen = () => {
  const [loginText, setLoginText] = React.useState('');
  const [singupText, setSignupText] = React.useState('');
=======
import GreenButton_auth from '../../components/GreenButton_auth'
import UnderLinedTextInput from '../../components/UnderlinedTextInput';
import { Spacing } from '../../styles';
import {Dimensions,PixelRatio} from 'react-native';
import { BLACK, WHITE } from '../../styles/colors';

const HomeScreen = () => {
  const [loginText, setLoginText] = React.useState('');
  const [signupText, setSignupText] = React.useState('');
>>>>>>> 6ac43fe67f3bd7d1f48220921db4cc35c79c6d71
  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <Image 
          style={styles.squarelogo}
          source={require('../../assets/logo_square.png')}>
        </Image>
      </View>
<<<<<<< HEAD
      <View style={{flex:1}} />
      <View style={styles.auth_container}>
        <View style={{flex: 1, justifyContent: 'flex-end', width: '100%'}}>
          <UnderLinedTextInput placeHolderValue={'아이디'}  value={loginText} onChangeText={setLoginText} />
          <UnderLinedTextInput placeHolderValue={'비밀번호'} value={singupText} onChangeText={setSignupText} />
          <GreenButton content={'로그인'} />
        </View>
        <View style={{flex: 1, justifyContent: 'flex-start', width: '100%'}}>
          <View style={{
            width: '100%',
            flex: 1,
            flexDirection: 'row',
            justifyContent:'flex-end'
          }}>
            <GrayTextButton content='회원가입' />
          </View>                    
        </View>
=======
      <View style={styles.auth_container}>
        <View style={{width: 200}}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <UnderLinedTextInput placeHolderValue={'아이디'}  value={loginText} onChangeText={setLoginText} />
            <UnderLinedTextInput placeHolderValue={'비밀번호'} value={signupText} onChangeText={setSignupText} />
          </View>
        </View>
        <GreenButton_auth content={'로그인'} />
        <View style={{
          width: Spacing.SCALE_200,
          flexDirection: 'row',
          justifyContent:'flex-end'
        }}>
          <GrayTextButton content='회원가입' />
        </View>                    
>>>>>>> 6ac43fe67f3bd7d1f48220921db4cc35c79c6d71
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
<<<<<<< HEAD
    backgroundColor: '#fff',
=======
    backgroundColor: WHITE,
>>>>>>> 6ac43fe67f3bd7d1f48220921db4cc35c79c6d71
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo_container: {
<<<<<<< HEAD
      flex: 2,
=======
      flex: 1,
>>>>>>> 6ac43fe67f3bd7d1f48220921db4cc35c79c6d71
      alignItems: 'center',
      justifyContent: 'flex-end'
  },
  auth_container: {
<<<<<<< HEAD
      flex: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: Mixins.scaleSize(200),
=======
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: BLACK,
>>>>>>> 6ac43fe67f3bd7d1f48220921db4cc35c79c6d71
  },
  squarelogo: {
      width: 250,
      height: 250,
  },
<<<<<<< HEAD
  underline: {
      marginVertical: 10,
      borderBottomColor: 'black',
      borderBottomWidth: 11,
      height: 1,
  },
=======
>>>>>>> 6ac43fe67f3bd7d1f48220921db4cc35c79c6d71
});
