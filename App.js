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
    await axios.post('/auth/login',
    {
      trainerId,
      password,
    }).then(async (res) => {
      try {
        console.log(res.data.token)
        await AsyncStorage.setItem('token', res.data.token)
        token = await AsyncStorage.getItem('token')
        dispatch({type: 'LOGIN', token})
      } catch (error) {
        console.log(error)
      }
    }).catch(error => {
      const errJson = JSON.parse(error.response.request._response)
      console.log(errJson)
      Alert.alert(errJson.message)
    })
  },
  signUp: async (name, trainerId, password) => {
    await axios.post('/auth/register',
    {
      name,
      trainerId,
      password,
    }).then((res) => {
      console.log(res.data)
      dispatch({type: 'REGISTER'})
      return null;
    }).catch(error => {
      const errJson = JSON.parse(error.response.request._response)
      console.log(errJson)
      Alert.alert(errJson.message)
    })
  },
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
      case 'REGISTER':
        return {
          ...prevState,
          token: null,
          isLoading: false,
        }
      case 'CONFIRM_SECRET':
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