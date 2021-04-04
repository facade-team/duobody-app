import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Colors } from '../styles';
import { Dash_cal } from '../screens/#2_dashboard/calendar';
import { Dash_dash } from '../screens/#2_dashboard/dashboard';
import { Messenger } from '../screens/#2_dashboard/messenger';
import IndivSession from '../screens/#4_individual/indiv_session';
import login from '../screens/#1_auth/login';

const Tab = createMaterialBottomTabNavigator();

function Footer_dash() {
    return (
        <Tab.Navigator
            initialRouteName='IndivSession'
            activeColor={Colors.BLACK}
            barStyle = {{backgroundColor: Colors.PRIMARY}}
        >
            <Tab.Screen
                name='IndivSession'
                component={IndivSession}
                options={{
                    tabBarLabel: 'IndivSession',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color = {color} size = {26} />
                    ),
                }}
            />
            <Tab.Screen
                name='login'
                component={login}
                options={{
                    tabBarLabel: 'login',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color = {color} size = {26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default Footer_dash;

/*
    {
        Dashboard: {
            screen: Dash_dash,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style = {[{color: tintColor}]} size = {25} name ={'ios-home'} />
                    </View>
                )
            }
        },
        Calendar: {
            screen: Dash_cal,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style = {[{color: tintColor}]} size = {25} name ={'ios-calendar'} />
                    </View>
                )
            }
        },
        Messenger: {
            screen: Messenger,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style = {[{color: tintColor}]} size = {25} name ={'ios-messenger'} />
                    </View>
                )
            }
        },
        {
            InitialRouteName: 'dashboard',
            activeColor: Colors.BLACK,
            inactiveColor: Colors.WHITE,
            barStyle: { backgroundColor: Colors.PRIMARY},
        }
    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Footer_dash;
*/