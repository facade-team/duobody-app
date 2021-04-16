import React, { useEffect, useMemo, useReducer } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Navigation from './src/navigation/navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Auth_Nav from './src/navigation/auth_nav';
import { AuthContext } from './src/services/AuthContext';
import axios from './src/axios/api'



const App = () => {
  useEffect(() => {
    setTimeout(async () => {
      let token = null;
      try {
        token = await AsyncStorage.getItem('token')
      } catch (err) {
        console.log(err)
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: token})
    }, 1000)
  }, [])
  
const authContextValue = useMemo(() => ({
  signIn: async (trainerId, password) => {
    axios.post('/auth/login',
    {
      trainerId,
      password,
    }).then(async (res) => {
      try {
        await AsyncStorage.setItem('token', res.data.token)
        token = await AsyncStorage.getItem('token')
        dispatch({type: 'LOGIN', token})
      } catch (error) {
        console.log(error)
      }
    }).catch(error => {
      const errJson = JSON.parse(error.response.request._response)
      const message = errJson.msg || errJson.message
      Alert.alert(message)
      console.log(message === '인증에 실패하였습니다')
      if (message === '인증에 실패하였습니다') {
        return String(trainerId)
      } else {
        throw new Error(message)
      }
    })
  },
  signUp: (name, trainerId, password) => {
    axios.post('/auth/register',
    {
      name,
      trainerId,
      password,
    }).then((res) => {
      Alert.alert('인증코드가 발송되었습니다.')
    }).catch(error => {
      const errJson = JSON.parse(error.response.request._response)
      const message = errJson.msg || errJson.message
      Alert.alert(message)
      return errJson
    })
  },
  confirmSecret: (trainerId, secretText) => {
    axios.post('/auth/confirmsecret',
    {
      trainerId,
      secret: secretText,
    }).then((res) => {
      console.log(res.data)
      Alert.alert('회원가입에 성공했습니다. 로그인 해주세요.')
    }).catch(error => {
      const errJson = JSON.parse(error.response.request._response)
      console.log(errJson)
      Alert.alert(errJson.message)
    })
  }
  ,
  signOut: async () => {
    try {
      await AsyncStorage.removeItem('token')
    } catch (err) {
      console.log(err)
    }
    dispatch({type: 'LOGOUT'})
    }
  }), [])

  const initialAuthState = {
    isLoading: true,
    token: null,
  }

  const AuthReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          token: action.token,
          isLoading: false,
        }
      case 'LOGIN':
        return {
          ...prevState,
          token: action.token,
          isLoading: false,
        }
      case 'LOGOUT':
        return {
          ...prevState,
          token: null,
          isLoading: false,
        }
    }
  }

  const [authState, dispatch] = useReducer(AuthReducer, initialAuthState)


  if (authState.isLoading) {
    return (
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text>This is loading...</Text>
      </View>
    )
  }

  const NavController = () => {
    const isLoggedIn = authState.token
    return isLoggedIn !== null ? <Navigation /> : <Auth_Nav />
  }

  return (
    <AuthContext.Provider value={authContextValue}>
        <View style={styles.container}>
          <NavController />
        </View>
    </AuthContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App