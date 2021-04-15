import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState()

  const addToken = (data) => {
    setToken(data)
    AsyncStorage.setItem('token', data)
  }

  const getToken = () => {
    try {
      const data = AsyncStorage.getItem('token')
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const initData = async () => {
    try {
      const data = await AsyncStorage.getItem('token');
      if (data !== null) {
        setToken(data);
      }
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <AuthContext.Provider  
      value={{    // provider value에 넣어준다.
        addToken,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthContext,
  AuthContextProvider
};