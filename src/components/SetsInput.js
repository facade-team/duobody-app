import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { Spacing, Colors } from '../styles';

export default ({setNumber, dbWeight, dbRep  }) => {
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
      borderBottomColor: Colors.GRAY,
      borderBottomWidth: 1,
      padding: Spacing.SCALE_4,
      margin: Spacing.SCALE_4,
    },
    textInputBox: {
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      width: 60,
      borderRadius: Spacing.SCALE_12,
      borderColor: Colors.GRAY_MEDIUM,
      borderWidth: 1,
    }
  })

  const WeightInput = ({weightVal, setWeightVal}) => {
    return (
      <View style={setsStyles.textInputBox}>
        <TextInput
          autoCorrect={ false }
          value={weightVal} 
          onChangeText={(text) => setWeightVal(text)} 
        />
        <Text>kg</Text>
      </View>
    )
  }

  const RepsInput = ({repsVal, setRepVal}) => {
    return (
      <View style={setsStyles.textInputBox}>
        <TextInput
          autoCorrect={ false }
          value={repsVal} 
          onChangeText={(text) => setRepVal(text)} 
        />
        <Text>회</Text>
      </View>
    )
  }

  const [weightVal, setWeightVal] = useState(dbWeight)
  const [repVal, setRepVal] = useState(dbRep)

  return (
    <View style={setsStyles.container}>
      <View style={setsStyles.setBox}>
        <Text>{setNumber}세트</Text>
        <WeightInput weightVal={weightVal} setWeightVal={setWeightVal} />
        <RepsInput repsVal={repVal} setRepVal={setRepVal} />
      </View>
    </View>
  )
}
