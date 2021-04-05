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

export default () => {

  return (
    <View style={styles.container}>
      <TouchableOpacity >
          <MaterialCommunityIcons style={styles.minusBtn} size={24} name='minus' />
      </TouchableOpacity>
    </View>
  )
}