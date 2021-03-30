import React, {Component} from 'react';
import { StyleSheet, Button, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
//test
const Line_underline = () => (
    <View style={styles.underline}> </View>
);//not working rn...no matter with code, but maybe function has been changed in RN...?


const HomeScreen = () => {

  const UnderLinedTextInput = ({placeHolderValue}) => {
    const [value, onChangeText] = React.useState('');
    return(
      <View 
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'white',
          borderBottomColor: '#000000',
          borderBottomWidth: 2,
          marginBottom: 20,
          padding: 6
      }}>
        <TextInput
          onChangeText={text => onChangeText(text)}
          value={value}
          placeholder={placeHolderValue}
          editable
          maxLength={40}
          style={{
            textAlign: 'center'
          }}
        />
    </View>
    )
  }  
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
                        <UnderLinedTextInput placeHolderValue={'아이디'} />
                        <UnderLinedTextInput placeHolderValue={'비밀번호'} />
                      </View>
                      <TouchableOpacity style={styles.loginButtonStyle}>
                        <Text style={styles.innerLoginButtonTextStyle}>로그인</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{
                      width: 200,
                      flexDirection: 'row',
                      justifyContent:'flex-end'}}>
                      <TouchableOpacity style={styles.signupButtonStyle}>
                        <Text style={styles.innerSignupButtonTextStyle}>회원가입</Text>
                      </TouchableOpacity>
                    </View>                    
                </View>
            </View>
          );
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
  loginButtonStyle: {
    backgroundColor: '#54a445',
    borderRadius: 12,
    padding: 8,
  },
  innerLoginButtonTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 800,
  },
  signupButtonStyle: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8
  },
  innerSignupButtonTextStyle: {
    color: '#707070',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 800,
  }
});
