import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Colors, Spacing } from '../../styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import indiv_profile from './indiv_profile';
import indiv_session from './indiv_session';
import indiv_calendar from './indiv_calendar';
import indiv_msg from './indiv_msg';
import indiv_etc from './indiv_etc';

const Tab = createMaterialBottomTabNavigator();

function Footer_indiv() {
    return (    
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName='indiv_profile'
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
                name='indiv_profile'
                component={indiv_profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Icon name="person" color = {color} size = {Spacing.SCALE_24} />
                    ),  
                }}
            />

            <Tab.Screen
                name='indiv_session'
                component={indiv_session}
                options={{
                    tabBarLabel: 'Session',
                    tabBarIcon: ({ color }) => (
                        <Icon name="fitness" color = {color} size = {Spacing.SCALE_24} />
                    ),
                }}
            />

            <Tab.Screen
                name='indiv_calendar'
                component={indiv_calendar}
                options={{
                    tabBarLabel: 'Calendar',
                    tabBarIcon: ({ color }) => (
                        <Icon name="calendar" color = {color} size = {Spacing.SCALE_24} />
                    ),
                }}
            />

            <Tab.Screen
                name='indiv_msg'
                component={indiv_msg}
                options={{
                    tabBarLabel: 'Messenger',
                    tabBarIcon: ({ color }) => (
                        <Icon name="mail" color = {color} size = {Spacing.SCALE_24} />
                    ),
                }}
            />

            <Tab.Screen
                name='indiv_etc'
                component={indiv_etc}
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

export default Footer_indiv;