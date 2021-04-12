import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    },
    roundButton: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      backgroundColor: 'green',
    }
  });

const CircleButton = ({content}) => {
  return(
    <View style={styles.roundButton}>
      <Text style={styles.text}>{content}</Text>
    </View>
  )
}

export default CircleButton
