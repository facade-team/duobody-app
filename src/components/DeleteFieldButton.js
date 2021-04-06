import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Spacing, Colors, Typography } from '../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
      backgroundColor: Colors.WHITE,
      paddingLeft: Spacing.SCALE_8,
      paddingRight: Spacing.SCALE_8,
  },
  deleteBtn: {
      color: Colors.WARNING,
  }
});

export default ({ dimensions, sessions, setSessions}) => {

  const handleDeleteSet = () => {
    const newSessions = [...sessions]
    const popedSession = newSessions.splice(dimensions[0], 1)
    setSessions(newSessions)
    console.log(newSessions)
    //console.log(newSessions.splice(dimensions[0], 1))
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPressOut={handleDeleteSet}>
          <MaterialCommunityIcons style={styles.deleteBtn} size={24} name='trash-can' />
      </TouchableOpacity>
    </View>
  )
}