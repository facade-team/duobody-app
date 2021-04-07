import * as React from 'react';
import { Colors, Spacing } from '../styles';
import { NavigationContainer } from '@react-navigation/native';
import { Button, View, Text, TabBarIOS } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Dash_dash from '../screens/#2_dashboard/dashboard';
import Dash_cal from '../screens/#2_dashboard/calendar';
import Messenger from '../screens/#2_dashboard/messenger';

import mem_search from '../screens/#3_mem_admin/mem_search';
import mem_add from '../screens/#3_mem_admin/mem_add';
import mem_edit from '../screens/#3_mem_admin/mem_edit';

import indiv_profile from '../screens/#4_individual/indiv_profile';
import indiv_session from '../screens/#4_individual/indiv_session';
import indiv_calendar from '../screens/#4_individual/indiv_calendar';
import indiv_msg from '../screens/#4_individual/indiv_msg';
import indiv_etc from '../screens/#4_individual/indiv_etc';

import change_add from '../screens/#5_profile/change_add';
import change_view from '../screens/#5_profile/change_view';
import Footer_dash from '../screens/#2_dashboard/Footer_dash';

const Stack = createStackNavigator();

function TopLogo() {
    return (
        <Image
            style={{width: 100, height: 50}}
            source = {require('../assets/toplogo.png')}
        />
    );
}

function Header() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            {/* 로고만 존재 */}
                <Stack.Screen name = "dash_dash" component = {Dash_dash} />


            {/* 로고, 뒤로가기 버튼, 페이지 이름 */}
                <Stack.Screen name = "dash_cal" component = {Dash_cal} />
                <Stack.Screen name = "dash_msg" component = {Messenger} />
                <Stack.Screen name = "mem_search" component = {mem_search} />
                <Stack.Screen name = "mem_add" component = {mem_add} />
                <Stack.Screen name = "mem_edit" component = {mem_edit} />
                <Stack.Screen name = "change_add" component = {change_add} />
                <Stack.Screen name = "change_view" component = {change_view} />

            {/* 홈버튼, 로고 */}
                <Stack.Screen name = "indiv_profile" component = {indiv_profile} />
                <Stack.Screen name = "indiv_session" component = {indiv_session} />
                <Stack.Screen name = "indiv_calendar" component = {indiv_calendar} />
                <Stack.Screen name = "indiv_msg" component = {indiv_msg} />
                <Stack.Screen name = "indiv_etc" component = {indiv_etc} />
                
                
                
                


            </Stack.Navigator>

        </NavigationContainer>

        
    )
}

export default Header;