import React, { Component} from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { Colors, Mixins, Spacing, Typography } from '../../styles'

class Dash_cal extends Component {
    render() {
        return (
            <View style = {StyleSheet.container}>
                <View style = {{flex:1,backgroundColor: Colors.WHITE}}>
                    <Text style = {{fontSize:30}}>달력, 스케쥴 박스</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
    }
})

export default Dash_cal;