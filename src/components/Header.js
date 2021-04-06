import * as React from 'react';
import { Colors, Spacing } from '../../styles';
import { NavigationContainer } from '@react-navigation/native';
import { Button, View, Text } from 'react-native';
import { CreateStackNavigator } from '@react-navigation/stack';

import Dash_dash from '../screens/#2_dashboard/dashboard';
import Dash_cal from '../screens/#2_dashboard/calendar';
import Messenger from '../screens/#2_dashboard/messenger';

import indiv_profile from '../screens/#4_individual/indiv_profile';

const Stack = CreateStackNavigator();

function Header() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name = "dash_dash" component = {Dash_dash} />
                <Stack.Screen name = "dash_cal" component = {Dash_cal} />
                <Stack.Screen name = "dash_msg" component = {Messenger} />
                <Stack.Screen name = "mem_search" component = {mem_search} />
                <Stack.Screen name = "mem_add" component = {mem_add} />
                <Stack.Screen name = "mem_edit" component = {mem_edit} />
                <Stack.Screen name = "indiv_profile" component = {indiv_profile} />
                <Stack.Screen name = "indiv_session" component = {indiv_session} />
                <Stack.Screen name = "indiv_calendar" component = {indiv_calendar} />
                <Stack.Screen name = "indiv_msg" component = {indiv_msg} />
                <Stack.Screen name = "indiv_etc" component = {indiv_etc} />
                <Stack.Screen name = "change_add" component = {change_add} />
                <Stack.Screen name = "change_view" component = {change_view} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}