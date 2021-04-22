import React, { useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Spacing, Colors } from '../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import partAndField from '../utils/partAndField'
import { Picker } from '@react-native-picker/picker';

const inputStyles = StyleSheet.create({
  container: {
      marginLeft: Spacing.SCALE_4,
      marginRight: Spacing.SCALE_4,
      marginBottom: Spacing.SCALE_20,
      flexDirection: 'row',
      alignItems: 'center',
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

export default ({addSession, index}) => {
  const [selectedPart, setSelectedPart] = useState(partAndField[index].fields[0].field);
  const addNewFields = () => {
    if (selectedPart !== '') {
      addSession(partAndField[index].part, selectedPart, index)
    }
    else {
      Alert.alert('운동을 선택한 후 추가해주세요')
    }
  }

  return (
    <View style={inputStyles.container}>
            <Picker
              selectedValue={selectedPart}
              onValueChange={(itemValue, itmeIndex) => setSelectedPart(itemValue)}
              style={inputStyles.inputText}
            >
              {
                partAndField[index].fields.map((data) =>
                  <Picker.Item value={data.field} label={data.field} />
                )
              }
            </Picker>
            <TouchableOpacity onPressOut={addNewFields}>
                <MaterialCommunityIcons style={inputStyles.addBtn} size={30} name='plus-circle' />
            </TouchableOpacity>
    </View>
  )
}

/*
<TextInput 
                style={inputStyles.inputText}
                placeholder='운동을 선택하세요'
                autoCorrect={ false }
                value={fieldValue}
                onChangeText={(text) => setFieldValue(text)}
            />
*/