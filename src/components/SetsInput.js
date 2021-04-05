import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Spacing, Colors, Typography } from '../styles';
import DeleteSetButton from './DeleteSetButton';

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
      alignItems: 'center',
      borderBottomColor: Colors.GRAY,
      borderBottomWidth: 1,
      padding: Spacing.SCALE_4,
      margin: Spacing.SCALE_4,
    },
    textInputBox: {
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      borderRadius: Spacing.SCALE_12,
      borderColor: Colors.GRAY_MEDIUM,
      borderWidth: 1,
    },
  })

  const btnStyles = StyleSheet.create({
    roundBtn: {
      borderRadius: 50,
      borderColor: Colors.BLACK,
      borderWidth: 1,
      padding: Spacing.SCALE_2,
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    }
  })

  const RoundButton = ({number}) => {
    return (
      <View style={btnStyles.roundBtn}>
        <TouchableOpacity>
          <Text style={{fontSize: Typography.FONT_SIZE_12,}}>{number}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const WeightInput = ({weightVal, setWeightVal}) => {
    return (
      <View style={btnStyles.btnContainer}>
        <View style={setsStyles.textInputBox}>
          <TextInput
            autoCorrect={ false }
            value={weightVal} 
            onChangeText={(text) => setWeightVal(text)}
            onFocus={(e) => console.log(e.target)}
          />
          <Text>kg</Text>
        </View>
        <RoundButton number={'+5'} />
        <RoundButton number={'-5'} />
      </View>
    )
  }

  const RepsInput = ({repsVal, setRepVal}) => {
    return (
      <View style={btnStyles.btnContainer}>
        <View style={setsStyles.textInputBox}>
          <TextInput
            autoCorrect={ false }
            value={repsVal} 
            onChangeText={(text) => setRepVal(text)} 
          />
          <Text>회</Text>
        </View>
        <RoundButton number={'+1'} />
        <RoundButton number={'-1'} />
      </View>
    )
  }

  const [weightVal, setWeightVal] = useState(dbWeight)
  const [repVal, setRepVal] = useState(dbRep)

  return (
    <View style={setsStyles.container} >
      <View style={setsStyles.setBox}>
        <Text>{setNumber}세트</Text>
        <WeightInput weightVal={weightVal} setWeightVal={setWeightVal} />
        <RepsInput repsVal={repVal} setRepVal={setRepVal} />
        <DeleteSetButton />
      </View>
    </View>
  )
}
