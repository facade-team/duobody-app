import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Colors, Spacing } from '../../styles';
import { NavigationContainer } from '@react-navigation/native';

import Messenger from './messenger';
import login from '../#1_auth/login';
import signUp from '../#1_auth/signUp';

const Tab = createMaterialBottomTabNavigator();

function Footer_dash() {
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName='Dashboard'
            activeColor = {Colors.BLACK}
            inactiveColor = {Colors.WHITE}
            labeled = {true}
            barStyle = {{
                backgroundColor: Colors.PRIMARY,
                paddingBottom: Spacing.SCALE_4,
                paddingTop: Spacing.SCALE_4,
            }}
            >

                <Tab.Screen
                    name='Dashboard'
                    component={signUp}
                    options={{
                        tabBarLabel: 'Dashboard',
                        tabBarIcon: ({ color }) => (
                            <Icon name="clipboard" color = {color} size = {Spacing.SCALE_24} />
                        ),  
                    }}
                />

                <Tab.Screen
                    name='Calendar'
                    component={login}
                    options={{
                        tabBarLabel: 'Calendar',
                        tabBarIcon: ({ color }) => (
                            <Icon name="calendar" color = {color} size = {Spacing.SCALE_24} />
                        ),
                    }}
                />

                <Tab.Screen
                    name='Messenger'
                    component={Messenger}
                    options={{
                        tabBarLabel: 'Messenger',
                        tabBarIcon: ({ color }) => (
                            <Icon name="mail" color = {color} size = {Spacing.SCALE_24} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Footer_dash;