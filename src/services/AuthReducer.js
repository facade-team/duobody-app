import React, { createContext, useEffect, useState, useMemo, useReducer, useContext } from 'react';

const initialAuthState = {
  isLoading: true,
  token: null,
}

const AuthReducer = (prevState, action) => {
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

const [authState, dispatch] = useReducer(AuthReducer, initialAuthState)

export default {authState, dispatch}

