import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-native-material-bottom-tabs';
import { Colors } from '../styles';
import { Home_cal } from '../screens/#2_dashboard/calendar';

const TabNavigator = createMaterialBottomTabNavigator(
    {
        
        Dashboard: {
            screen: '',
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style = {[{color: tintColor}]} size = {25} name ={'ios-home'} />
                    </View>
                )
            }
        },
        Calendar: {
            screen: Calendarscreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style = {[{color: tintColor}]} size = {25} name ={'ios-calendar'} />
                    </View>
                )
            }
        },
        Messenger: {
            screen: Messengerscreen,
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

export default TabNavigator;