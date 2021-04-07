import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Colors, Mixins, Spacing, Typography } from '../../styles';

const Test_dash = () => {
    return (
            <View style = {StyleSheet.container}>
                <View style = {{flex:1, backgroundColor: Colors.BLACK}}>
                    <Text style = {{fontSize:30}}>달력, 스케쥴 박스</Text>
                </View>
            </View>
    );
}

export default Test_dash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        backgroundColor: Colors.BLACK,
    }
})
