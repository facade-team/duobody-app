import React from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Colors, Spacing } from '../../styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import indiv_profile from './indiv_profile';
import indiv_session from './indiv_session';
import indiv_calendar from './indiv_calendar';
import ChatScreen from './indiv_msg';
import indiv_etc from './indiv_etc';


function TopLogo() {
    return (
        <Image
            style={{width: Spacing.SCALE_150,
                    height: 50}}
            source = {require('../../assets/toplogo_white.png')}
        />
    );
}



const Tab = createMaterialBottomTabNavigator();

const Footer_indiv = () => (
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
                component={IndivProfileStackScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Icon name="person" color = {color} size = {Spacing.SCALE_24} />
                    ),  
                }}
            />

            <Tab.Screen
                name='indiv_session'
                component={IndivSessionStackScreen}
                options={{
                    tabBarLabel: 'Session',
                    tabBarIcon: ({ color }) => (
                        <Icon name="fitness" color = {color} size = {Spacing.SCALE_24} />
                    ),
                }}
            />

            <Tab.Screen
                name='indiv_calendar'
                component={IndivCalendarStackScreen}
                options={{
                    tabBarLabel: 'Calendar',
                    tabBarIcon: ({ color }) => (
                        <Icon name="calendar" color = {color} size = {Spacing.SCALE_24} />
                    ),
                }}
            />

            <Tab.Screen
                name='indiv_msg'
                component={IndivMessageStackScreen}
                options={{
                    tabBarLabel: 'Messenger',
                    tabBarIcon: ({ color }) => (
                        <Icon name="mail" color = {color} size = {Spacing.SCALE_24} />
                    ),
                }}
            />

            <Tab.Screen
                name='indiv_etc'
                component={IndivEtcStackScreen}
                options={{
                    tabBarLabel: 'Etc',
                    tabBarIcon: ({ color }) => (
                        <Icon name="add" color = {color} size = {Spacing.SCALE_24} />
                    ),
                }}
            />
            
        </Tab.Navigator>
        </NavigationContainer>
)

export default Footer_indiv;

const IndivProfileStack = createStackNavigator();
const IndivSessionStack = createStackNavigator();
const IndivCalendarStack = createStackNavigator();
const IndivMessageStack = createStackNavigator();
const IndivEtcStack = createStackNavigator();

const IndivProfileStackScreen = ({navigation}) => (
    <IndivProfileStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: Colors.PRIMARY,
        },
    }}>
        <IndivProfileStack.Screen
        name = 'IndivProfile' component = {indiv_profile} options={{
            headerTitle: props => <TopLogo {...props} />,
            headerLeft: () => (
                <Icon.Button 
                    name = "home" 
                    size = {26}
                    backgroundColor = {Colors.PRIMARY}
                    onPress = {() => navigation.navigate('Dashboard')}/>
            )
        }} />
    </IndivProfileStack.Navigator>
)

const IndivSessionStackScreen = ({navigation}) => (
    <IndivSessionStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: Colors.PRIMARY,
        },
    }}>
        <IndivSessionStack.Screen
        name = 'IndivSession' component = {indiv_session} options={{
            headerTitle: props => <TopLogo {...props} />,
            headerLeft: () => (
                <Icon.Button 
                    name = "home" 
                    size = {26}
                    backgroundColor = {Colors.PRIMARY}
                    onPress = {() => navigation.navigate('Dashboard')}/>
            )
        }} />
    </IndivSessionStack.Navigator>
)

const IndivMessageStackScreen = ({navigation}) => (
    <IndivMessageStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: Colors.PRIMARY,
        },
    }}>
        <IndivMessageStack.Screen
        name = 'IndivMessage' component = {ChatScreen} options={{
            headerTitle: props => <TopLogo {...props} />,
            headerLeft: () => (
                <Icon.Button 
                    name = "home" 
                    size = {26}
                    backgroundColor = {Colors.PRIMARY}
                    onPress = {() => navigation.navigate('Dashboard')}/>
            )
        }} />
    </IndivMessageStack.Navigator>
)

const IndivCalendarStackScreen = ({navigation}) => (
    <IndivCalendarStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: Colors.PRIMARY,
        },
    }}>
        <IndivCalendarStack.Screen
        name = 'IndivCalendar' component = {indiv_calendar} options={{
            headerTitle: props => <TopLogo {...props} />,
            headerLeft: () => (
                <Icon.Button 
                    name = "home" 
                    size = {26}
                    backgroundColor = {Colors.PRIMARY}
                    onPress = {() => navigation.navigate('Dashboard')}/>
            )
        }} />
    </IndivCalendarStack.Navigator>
)

const IndivEtcStackScreen = ({navigation}) => (
    <IndivEtcStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: Colors.PRIMARY,
        },
    }}>
        <IndivEtcStack.Screen
        name = 'IndivEtc' component = {indiv_etc} options={{
            headerTitle: props => <TopLogo {...props} />,
            headerLeft: () => (
                <Icon.Button 
                    name = "home" 
                    size = {26}
                    backgroundColor = {Colors.PRIMARY}
                    onPress = {() => navigation.navigate('Dashboard')}/>
            )
        }} />
    </IndivEtcStack.Navigator>
)
