import React from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Spacing, Colors } from '../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const inputStyles = StyleSheet.create({
  container: {
      marginLeft: Spacing.SCALE_4,
      marginRight: Spacing.SCALE_4,
  },
  input: {
      borderRadius: 10,
      backgroundColor: Colors.WHITE,
      paddingLeft: Spacing.SCALE_8,
      paddingRight: Spacing.SCALE_8,
      height: Spacing.SCALE_32,
      alignItems: "center",
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomColor: Colors.GRAY,
      borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputText: {
      flex: 1,
  },
  addBtn: {
      color: Colors.PRIMARY,
  }
});

export default ({fieldValue, setFieldValue, addSession}) => {

  const addNewFields = () => {
    addSession('등', fieldValue)
  }

  return (
    <View style={inputStyles.container}>
        <View style={inputStyles.input}> 
            <TextInput 
                style={inputStyles.inputText}
                placeholder='운동을 선택하세요'
                autoCorrect={ false }
                value={fieldValue}
                onChangeText={(text) => setFieldValue(text)}
            />
            <TouchableOpacity onPressOut={addNewFields}>
                <MaterialCommunityIcons style={inputStyles.addBtn} size={30} name='plus-circle' />
            </TouchableOpacity>
        </View>
    </View>
  )
}