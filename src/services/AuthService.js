import React, { createContext, useEffect, useState, useMemo, useReducer, useContext } from 'react';
import {authState, dispatch} from '../services/AuthReducer'

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

export default authContext