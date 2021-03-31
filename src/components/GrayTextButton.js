import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {Colors, Typography} from '../styles'

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 8,
  },
  innerButtonTextStyle: {
    color: Colors.GRAY,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
});


const GrayTextButton = ({content}) => {
  return(
    <TouchableOpacity style={styles.buttonStyle}>
      <Text style={styles.innerButtonTextStyle}>{content}</Text>
    </TouchableOpacity>
  )
}

export default GrayTextButton
