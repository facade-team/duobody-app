import React from 'react';
import { Colors } from '../styles';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Auth_login from '../screens/#1_auth/login';
import Auth_signup from '../screens/#1_auth/signUp';
import Auth_confirm from  '../screens/#1_auth/confirmSecret';

const LoginStack = createStackNavigator();
const SignupStack = createStackNavigator();
const ConfirmStack = createStackNavigator();

const LoginStackScreen = ({navigation}) => (
    <LoginStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.WHITE,
        shadowColor: 'transparent',
      },
      headerTintColor: Colors.WHITE,
      headerTitleStyle: {
        color: Colors.WHITE,
      },
    }}>
        <LoginStack.Screen
            name = 'login'
            component = {Auth_login}
        />
    </LoginStack.Navigator>
)

const SignupStackScreen = ({navigation}) => (
    <SignupStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.WHITE,
        shadowColor: 'transparent',
      },
      headerTintColor: Colors.WHITE,
      headerTitleStyle: {
        color: Colors.WHITE,
      },
    }}>
        <SignupStack.Screen
            name = 'Signup'
            component = {Auth_signup}
        />
    </SignupStack.Navigator>
)

const ConfirmStackScreen = ({navigation}) => (
    <ConfirmStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.WHITE,
        shadowColor: 'transparent',
      },
      headerTintColor: Colors.WHITE,
      headerTitleStyle: {
        color: Colors.WHITE,
      },
    }}>
        <ConfirmStack.Screen
            name = 'Confirm'
            component = {Auth_confirm}
        />
    </ConfirmStack.Navigator>
)

const A_Drawer = createDrawerNavigator();

const Auth_Nav = () => (
    <NavigationContainer>
        <A_Drawer.Navigator
            screenOptions = {{gestureEnabled: true, headerShown: false,}}>
                <A_Drawer.Screen name = 'Login' component = {LoginStackScreen}/>
                <A_Drawer.Screen name = 'Signup' component = {SignupStackScreen}/>
                <A_Drawer.Screen name = 'Confirm' component = {ConfirmStackScreen}/>
            </A_Drawer.Navigator>
    </NavigationContainer>
)

export default Auth_Nav