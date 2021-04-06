import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Colors, Spacing } from '../../styles';
import { NavigationContainer } from '@react-navigation/native';

import login from '../#1_auth/login';
import signUp from '../#1_auth/signUp';
import confirmSecret from '../#1_auth/confirmSecret';
import Messenger from '../#2_dashboard/messenger';
import indivProfile from './indiv_profile';


const Tab = createMaterialBottomTabNavigator();

function Footer_dash() {
    return (    
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName='Profile'
            activeColor = {Colors.BLACK}
            inactiveColor = {Colors.PRIMARY}
            labeled = {true}
            barStyle = {{
                backgroundColor: Colors.WHITE,
                paddingBottom: Spacing.SCALE_4,
                paddingTop: Spacing.SCALE_4,
            }}
        >
            <Tab.Screen
                name='Profile'
                component={signUp}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Icon name="person" color = {color} size = {Spacing.SCALE_24} />
                    ),  
                }}
            />

            <Tab.Screen
                name='Session'
                component={login}
                options={{
                    tabBarLabel: 'Session',
                    tabBarIcon: ({ color }) => (
                        <Icon name="fitness" color = {color} size = {Spacing.SCALE_24} />
                    ),
                }}
            />

            <Tab.Screen
                name='Calendar'
                component={confirmSecret}
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

            <Tab.Screen
                name='Etc'
                component={indivProfile}
                options={{
                    tabBarLabel: 'Etc',
                    tabBarIcon: ({ color }) => (
                        <Icon name="add" color = {color} size = {Spacing.SCALE_24} />
                    ),
                }}
            />

        </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Footer_dash;