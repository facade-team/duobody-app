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
  minusBtn: {
      color: Colors.PRIMARY,
  }
});

export default ({dimensions, sessions, setSessions}) => {

  const handleDeleteSet = () => {
    const newSessions = [...sessions]
    const popedSet = newSessions[dimensions[0]].sets.splice(dimensions[1], 1)
    // console.log(newSessions[dimensions[0]].set.length)
    console.log(newSessions)
    if (newSessions[dimensions[0]].sets.length === 0) {
      const popedSession = newSessions.splice(dimensions[0], 1)
    }
    setSessions(newSessions)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPressOut={handleDeleteSet}>
          <MaterialCommunityIcons style={styles.minusBtn} size={24} name='minus' />
      </TouchableOpacity>
    </View>
  )
}