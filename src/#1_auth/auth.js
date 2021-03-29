import React, {Component} from 'react';
import { StyleSheet, Button, View, Image } from 'react-native';

const Line_underline = () => (
    <View style={styles.underline} />
);//not working rn...no matter with code, but maybe function has been changed in RN...?


export default class HomeScreen extends Component {
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.logo_container}>
                    <Image 
                        style={styles.squarelogo}
                        source={require('/Users/moong/Desktop/programming/facade/duobody-app/assets/logo_square.png')}>
                    </Image>
                </View>
                <View style={styles.auth_container}>
                    <View style={{width: 200}}>
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
  },
});