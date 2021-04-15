import React, { createContext, useEffect, useState, useMemo, useReducer, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Dash_cal from './src/screens/#2_dashboard/calendar';
import IndividualSession from './src/screens/#4_individual/indiv_session';
import Change_view from './src/screens/#5_profile/change_view';
import Navigation from './src/navigation/navigation';
import { Provider as PaperProvider } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//test
// import { AuthContext } from './src/context/testContext'
import Auth_Nav from './src/navigation/auth_nav';
import { AuthContext } from './src/services/AuthContext';
// import authContextValue from './src/services/AuthService';
// import {initialAuthState, AuthReducer} from './src/services/AuthReducer'

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
    }, 1)
  }, [])

  /*
  const initialLoginState = {
    isLoading: true,
    token: null,
  }

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          token: null,
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

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  const authContext = useMemo(() => ({
    signIn: async () => {
      let token = null;
      axios.post('http://3.35.110.129/api/auth/login',
        {
          trainerId : "soul4927",
          password: "123"
        }).then(async (res) => {
            try {
              await AsyncStorage.setItem('token', res.data.token)
              token = await AsyncStorage.getItem('token')
              console.log(`logging in... token is : ${token}`)
            } catch (err) {
              console.log(err)
            }
            dispatch({type: 'LOGIN', id: 'soul4927', token: token})
        })
    },
    signUp: () => {
      //setUserToken('abc')
      //setIsLoading(false)
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
  */

  
const authContextValue = useMemo(() => ({
  signIn: async () => {
    let token = null;
    axios.post('http://3.35.110.129/api/auth/login',
      {
        trainerId : "soul4927",
        password: "123"
      }).then(async (res) => {
          try {
            await AsyncStorage.setItem('token', res.data.token)
            token = await AsyncStorage.getItem('token')
            console.log(`logging in... token is : ${token}`)
          } catch (err) {
            console.log(err)
          }
          dispatch({type: 'LOGIN', id: 'soul4927', token: token})
      })
  },
  signUp: () => {
    //setUserToken('abc')
    //setIsLoading(false)
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
      <View>
        <Text>This is loading...</Text>
      </View>
    )
  }


  // tutorial end...

  return (
    <AuthContext.Provider value={authContextValue}>
        <View style={styles.container}>
          {(authState.token !== null) ? (
              <Navigation/>
            ) : (
              <Auth_Nav />
            )
          }
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