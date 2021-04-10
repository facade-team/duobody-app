import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Colors, Spacing } from '../../styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Dash_dash from './dashboard';
import Dash_Cal from './calendar';
import Messenger from './messenger';
import mem_add from '../#3_mem_admin/mem_add';
import mem_edit from '../#3_mem_admin/mem_edit';



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

const Footer_dash = () => (
        <NavigationContainer>
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
        </NavigationContainer>
)

export default Footer_dash;

const DashStack = createStackNavigator();
const DashCalStack = createStackNavigator();
const DashMsgStack = createStackNavigator();
const MemAddStack = createStackNavigator();
const MemEditStack = createStackNavigator();


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



{/*}const MemAddStackScreen = ({navigation}) => (
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

아래 두개는 각각 Mem_Add.js/ Mem_Edit.js 에 들어가야할듯
*/}