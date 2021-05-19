import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import useInput from '../hooks/useInput';
import { Spacing, Colors, Typography } from '../styles';
import DeleteSetButton from './DeleteSetButton';

export default ({
  index, 
  setNumber, 
  dbMinutes,
  dimensions, 
  sessions, 
  setSessions,
}) => {
  const setsStyles = StyleSheet.create({
    container: {
      marginLeft: Spacing.SCALE_8,
      marginRight: Spacing.SCALE_8,
      flexDirection: 'row',
    },
    setBox: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: Colors.GRAY,
      borderBottomWidth: 1,
      padding: Spacing.SCALE_4,
      margin: Spacing.SCALE_4,
    },
    textInputBox: {
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      borderRadius: Spacing.SCALE_12,
      borderColor: Colors.GRAY_MEDIUM,
      borderWidth: 1,
    },
  })

  const btnStyles = StyleSheet.create({
    roundBtn: {
      borderRadius: 50,
      borderColor: Colors.BLACK,
      borderWidth: 1,
      padding: Spacing.SCALE_2,
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    }
  })

  const MinutesInput = () => {
    return (
      <View style={btnStyles.btnContainer}>
        <View style={setsStyles.textInputBox}>
          <Text>{dbMinutes}분</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={setsStyles.container} >
      <View style={setsStyles.setBox}>
        <Text>{index+1}세트</Text>
        <MinutesInput/>
      </View>
    </View>
  )
}
