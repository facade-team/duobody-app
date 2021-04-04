import React, { Component} from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { Colors, Mixins, Spacing, Typography } from '../../styles'
import { Footer_dash } from '../../components/Footer_dash'
import { Link } from '@react-navigation/native';

class Dash_index extends Component {
    render() {
        return (
            <View style = {StyleSheet.container}>
                <View style = {{flex:1,backgroundColor: Colors.WHITE}}>
                    <Link to Dash_dash></Link>
                </View>
                <Footer_dash />
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

export default Dash_index;