import React from 'react';
import { View, TextInput } from 'react-native';
import { Colors, Spacing } from '../styles'

const UnderLinedTextInput = ({placeHolderValue, value, onChangeText}) => {
  return(
    <View 
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: Colors.WHITE,
        borderBottomColor: Colors.GRAY,
        borderBottomWidth: 1,
        marginBottom: Spacing.SCALE_18,
        padding: Spacing.SCALE_8,
    }}>
      <TextInput
        onChangeText={text => onChangeText(text)}
        value={value}
        placeholder={placeHolderValue}
        editable
        maxLength={40}
        style={{
          textAlign: 'center'
        }}
      />
  </View>
  )
}

export default UnderLinedTextInput
