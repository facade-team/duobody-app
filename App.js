import React, { createContext, useEffect, useState, useMemo, useReducer } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Dash_cal from './src/screens/#2_dashboard/calendar';
import IndividualSession from './src/screens/#4_individual/indiv_session';
import Change_view from './src/screens/#5_profile/change_view';
import Navigation from './src/navigation/navigation';
import { AuthContextProvider } from './src/context/AuthContextProvider';
import { Provider as PaperProvider } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//test
import { AuthContext } from './src/context/testContext'
import Login from './src/screens/#1_auth/login';

const App = () => {
  const [token, setToken] = useState(null);

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
      setToken(token)
      console.log(token)
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  const preLoad = async () => {
    axios.post('http://3.35.110.129/api/auth/login',
    {
      trainerId : "soul4927",
      password: "123"
    }).then(res => {
      console.log(res.data.token)
      storeToken(res.data.token)
    })
  }

  useEffect(() => {
    //preLoad()
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken')
        console.log(`initial token! : ${userToken}`)
      } catch (err) {
        console.log(err)
      }
      //setIsLoading(false)
      dispatch({type: 'RETRIEVE_TOKEN', id: 1, token: userToken})
    }, 1000)
  }, [])

  // tutorial below... 
  //const [isLoading, setIsLoading] = useState(true)
  //const [userToken, setUserToken] = useState(null)

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  }

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        }
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        }
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        }
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        }
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  const authContext = useMemo(() => ({
    signIn: async () => {
      //setIsLoading(false)
      // 여기에 로그인 로직을 불러온다... if 로그인 성공시?
      //setUserToken('abc')
      let userToken = null;
      userToken = 'abcdefg!!'
      try {
        await AsyncStorage.setItem('userToken', userToken)
        const tokenFromAsyncStorage = await AsyncStorage.getItem('userToken')
        console.log(tokenFromAsyncStorage)
        userToeken = tokenFromAsyncStorage
      } catch (err) {
        console.log(err)
      }
      dispatch({type: 'LOGIN', id: 1, token: userToken})
    },
    signUp: () => {
      setUserToken('abc')
      setIsLoading(false)
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken')
        const temp = await AsyncStorage.getItem('userToken')
      } catch (err) {
        console.log(err)
      }
      dispatch({type: 'LOGOUT'})
    }
  }), [])

  if (loginState.isLoading) {
    return (
      <View>
        <Text>This is loading...</Text>
      </View>
    )
  }


  // tutorial end...

  return (
    <AuthContext.Provider value={authContext}>
        <View style={styles.container}>
          {loginState.userToken !== null ? (
            <Navigation/>) : (
              <Login />
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