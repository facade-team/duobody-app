import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import useInput from '../hooks/useInput';
import { Spacing, Colors, Typography } from '../styles';
import DeleteSetButton from './DeleteSetButton';

export default ({index, setNumber, dbWeight, dbRep, dimensions, sessions, setSessions }) => {
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
    const handleWeight = (text) => {
      setWeightVal(text)
      const newSessions = [...sessions]
      newSessions[dimensions[0]].set[dimensions[1]].weight = text
      setSessions(newSessions)
    }

    return (
      <View style={btnStyles.btnContainer}>
        <View style={setsStyles.textInputBox}>
          <TextInput
            autoCorrect={ false }
            value={weightVal} 
            onChangeText={(text) => handleWeight(text)}
          />
          <Text>kg</Text>
        </View>
        <RoundButton number={'+5'} />
        <RoundButton number={'-5'} />
      </View>
    )
  }

  const RepsInput = ({repsVal, setRepVal}) => {
    
    const handleReps = (text) => {
      setRepVal(text)
      const newSessions = [...sessions]
      newSessions[dimensions[0]].set[dimensions[1]].rep = text
      setSessions(newSessions)
    }

    return (
      <View style={btnStyles.btnContainer}>
        <View style={setsStyles.textInputBox}>
          <TextInput
            autoCorrect={ false }
            value={repsVal}
            onChangeText={(text) => handleReps(text)}
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

  useEffect(() => {
    //console.log(sessions)
    //console.log('------------------------------------------')
    //console.log(dimensions)
    //console.log('=========================================')
  })

  return (
    <View style={setsStyles.container} >
      <View style={setsStyles.setBox}>
        <Text>{index+1}세트</Text>
        <WeightInput weightVal={weightVal} setWeightVal={setWeightVal} />
        <RepsInput repsVal={repVal} setRepVal={setRepVal} />
        <DeleteSetButton dimensions={dimensions} sessions={sessions} setSessions={setSessions} />
      </View>
    </View>
  )
}
