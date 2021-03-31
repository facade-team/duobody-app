import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {Colors, Mixins, Spacing, Typography} from '../styles'

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: Spacing.SCALE_18,
    padding: Spacing.SCALE_8,
    width: Spacing.SCALE_200,

  },
  innerButtonTextStyle: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
});


const GreenButton_auth = ({content}) => {
  return(
    <TouchableOpacity style={styles.buttonStyle}>
      <Text style={styles.innerButtonTextStyle}>{content}</Text>
    </TouchableOpacity>
  )
}

export default GreenButton_auth