import React, {Component} from 'react';
import { StyleSheet, Button, View, Text, Image, TextInput } from 'react-native';
//test
import { Value } from 'react-native-reanimated';

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
      width: 200,
      backgroundColor: 'white',
      borderBottomColor: '#000000',
      borderBottomWidth: 2,
      marginBottom: 20,
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
                      <Button
                          title="로그인"
                          color='#54a445'>
                      </Button>
                      </View>
                      <Line_underline />
                      <View style={{
                          flexDirection: 'row',
                          justifyContent:'flex-end'}}>
                      <Button
                          title='회원가입'
                          color='#707070'
                          onPress={() => alert('회원가입 창')}>
                      </Button>
                    </View>
                    <Line_underline />
                    
                </View>
            </View>
          );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default HomeScreen
