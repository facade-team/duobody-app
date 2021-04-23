import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Colors, Spacing, Typography } from '../styles';


const styles = StyleSheet.create({
    container: {
        marginBottom: 18,
    },
    textinput: {
        width: Spacing.SCALE_200,
        paddingBottom: Spacing.SCALE_8,
        backgroundColor: Colors.WHITE,
        borderBottomColor : Colors.GRAY,
        borderBottomWidth: 1,
        color: Colors.BLACK,
        textAlign: 'center',
        fontSize: Typography.FONT_SIZE_16,
        fontWeight: Typography.FONT_WEIGHT_BOLD,
    } 
})

const UnderLinedTextInputBig = ({
  placeholder,
  value,
  onChangeText,
  keyboardType
}) => (
  <View style = {styles.container}>
    <TextInput style = {styles.textinput} 
      placeholder={placeholder}
      value={value}
      onChangeText={text => onChangeText(text)}
      placeholderTextColor = {Colors.GRAY_LIGHT}
      keyboardType = {keyboardType}
    />
  </View>
)

export default UnderLinedTextInputBig;
