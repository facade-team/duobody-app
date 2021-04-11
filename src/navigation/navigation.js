import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Colors, Spacing } from '../styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dash_dash from '../screens/#2_dashboard/dashboard';
import Dash_Cal from '../screens/#2_dashboard/calendar';
import Messenger from '../screens/#2_dashboard/messenger';
import mem_add from '../screens/#3_mem_admin/mem_add';
import mem_edit from '../screens/#3_mem_admin/mem_edit';
import indiv_profile from '../screens/#4_individual/indiv_profile';
import indiv_session from '../screens/#4_individual/indiv_session';
import indiv_calendar from '../screens/#4_individual/indiv_calendar';
import ChatScreen from '../screens/#4_individual/indiv_msg';
import indiv_etc from '../screens/#4_individual/indiv_etc';


function TopLogo() {
    return (
        <Image
            style={{width: Spacing.SCALE_150,
                    height: 50}}
            source = {require('../assets/toplogo_white.png')}
        />
    );
}

const Tab = createMaterialBottomTabNavigator();

const Footer_dash = () => (
        <Tab.Navigator
        initialRouteName='Dashboard'
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
                name='Dashboard'
                component={DashStackScreen}
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ color }) => (
                        <Icon name="clipboard" color = {color} size = {Spacing.SCALE_24} />
                    ),  
                }}
            />

            <Tab.Screen
                name='Calendar'
                component={DashCalStackScreen}
                options={{
                    tabBarLabel: 'Calendar',
                    tabBarIcon: ({ color }) => (
                        <Icon name="calendar" color = {color} size = {Spacing.SCALE_24} />
                    ),
                }}
            />

            <Tab.Screen
                name='Messenger'
                component={DashMsgStackScreen}
                options={{
                    tabBarLabel: 'Messenger',
                    tabBarIcon: ({ color }) => (
                        <Icon name="mail" color = {color} size = {Spacing.SCALE_24} />
                    ),
                }}
            />
        </Tab.Navigator>
)

const Footer_indiv = () => (
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
)

const DashStack = createStackNavigator();
const DashCalStack = createStackNavigator();
const DashMsgStack = createStackNavigator();
const MemAddStack = createStackNavigator();
const MemEditStack = createStackNavigator();
const IndivProfileStack = createStackNavigator();
const IndivSessionStack = createStackNavigator();
const IndivCalendarStack = createStackNavigator();
const IndivMessageStack = createStackNavigator();
const IndivEtcStack = createStackNavigator();

const DashStackScreen = ({navigation}) => (
    <DashStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: Colors.PRIMARY,
        },
    }}>
        <DashStack.Screen
        name = 'Dashboard' component = {Dash_dash} options={{
            headerTitle: props => <TopLogo {...props} />
        }} />
    </DashStack.Navigator>
)

const DashCalStackScreen = ({navigation}) => (
    <DashCalStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: Colors.PRIMARY,
        },
    }}>
        <DashCalStack.Screen
        name = 'Dash_Cal' component = {Dash_Cal} options={{
            headerTitle: props => <TopLogo {...props} />
        }} />
    </DashCalStack.Navigator>
)

const DashMsgStackScreen = ({navigation}) => (
    <DashMsgStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: Colors.PRIMARY,
        },
    }}>
        <DashMsgStack.Screen
        name = 'DashMsg' component = {Messenger} options={{
            headerTitle: props => <TopLogo {...props} />
        }} />
    </DashMsgStack.Navigator>
)

const MemAddStackScreen = ({navigation}) => (
    <MemAddStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: Colors.PRIMARY,
        },
    }}>
        <MemAddStack.Screen
        name = "Mem_Add" component = {mem_add} options = {{
            title: 'Overview',
            headerLeft: () => (
                <Icon.Button 
                    name = "ios-menu" 
                    size = {26}
                    backgroundColor = {Colors.PRIMARY}
                    onPress = {() => navigation.goBack()}/>
            )
            }} />
    </MemAddStack.Navigator>
)

const MemEditStackScreen = ({navigation}) => (
    <MemEditStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: Colors.PRIMARY,
        },
    }}>
        <MemEditStack.Screen
        name = "Mem_Edit" component = {mem_edit} options = {{
            title: 'Overview',
            headerLeft: () => (
                <Icon.Button 
                    name = "ios-menu" 
                    size = {26}
                    backgroundColor = {Colors.PRIMARY}
                    onPress = {() => navigation.goBack()}/>
            )
            }} />
    </MemEditStack.Navigator>
)

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
                    onPress = {() => navigation.navigate('Dash', { screen  : 'Dashboard'})}/>
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
                    onPress = {() => navigation.navigate('Dash', { screen  : 'Dashboard'})}/>
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
                    onPress = {() => navigation.navigate('Dash', { screen  : 'Dashboard'})}/>
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
                    onPress = {() => navigation.navigate('Dash', { screen  : 'Dashboard'})}/>
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
                    onPress = {() => navigation.navigate('Dash', { screen  : 'Dashboard'})}/>
            )
        }} />
    </IndivEtcStack.Navigator>
)

const Drawer = createDrawerNavigator();

const Navigation = () => (
    <NavigationContainer>
        <Drawer.Navigator
        screenOptions= {{ gestureEnabled: false}}>
            <Drawer.Screen name = "Dash" component={Footer_dash} />
            <Drawer.Screen name = "Indiv" component = {Footer_indiv} />
        </Drawer.Navigator>
    </NavigationContainer>
)

export default Navigation;