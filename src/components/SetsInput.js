import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import useInput from '../hooks/useInput';
import { Spacing, Colors, Typography } from '../styles';
import DeleteSetButton from './DeleteSetButton';

export default ({
  index, 
  setNumber, 
  dbWeight, 
  dbRep, 
  dimensions, 
  sessions, 
  setSessions,
}) => {
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

  const RoundButton = ({number, type}) => {
    const handleAddOrMinus = () => {
      if (type === 'rep'){
        const num = parseInt(number)
        const repValNum = parseInt(repVal)
        if (+num + +repVal > 0) {
          const sumRepVal = String(num+repValNum)
          setRepVal(sumRepVal)
          const newSessions = [...sessions]
          newSessions[dimensions[0]].sets[dimensions[1]].rep = sumRepVal
          setSessions(newSessions)
        }

      }
      if (type === 'weight') {
        const num = parseInt(number)
        const weightValNum = parseInt(weightVal)
        if (+num + +weightValNum >= 0) {
          const sumWeightVal = String(num+weightValNum)
          setWeightVal(sumWeightVal)
          const newSessions = [...sessions]
          newSessions[dimensions[0]].sets[dimensions[1]].weight = sumWeightVal
          setSessions(newSessions)
        }
      } 
    }

    return (
      <View style={btnStyles.roundBtn}>
        <TouchableOpacity onPressOut={handleAddOrMinus}>
          <Text style={{fontSize: Typography.FONT_SIZE_12,}}>{number}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const WeightInput = ({weightVal, setWeightVal}) => {
    const handleWeight = (text) => {
      if (text >= 0) {
        setWeightVal(text)
        const newSessions = [...sessions]
        newSessions[dimensions[0]].sets[dimensions[1]].weight = text
        setSessions(newSessions)
      }
      else {
        Alert.alert('올바른 숫자를 입력해주세요')
      }
    }

    return (
      <View style={btnStyles.btnContainer}>
        <View style={setsStyles.textInputBox}>
          <TextInput
            autoCorrect={ false }
            value={weightVal} 
            onChangeText={(text) => handleWeight(text)}
            keyboardType={'number-pad'}
          />
          <Text>kg</Text>
        </View>
        <RoundButton number={'+5'} type={'weight'} />
        <RoundButton number={'-5'} type={'weight'} />
      </View>
    )
  }

  const RepsInput = ({repsVal, setRepVal}) => {
    
    const handleReps = (text) => {
      if (text > 0) {
        setRepVal(text)
        const newSessions = [...sessions]
        newSessions[dimensions[0]].sets[dimensions[1]].rep = text
        setSessions(newSessions)
      }
      else {
        Alert.alert('올바른 숫자를 입력해주세요')
      }
    }

    return (
      <View style={btnStyles.btnContainer}>
        <View style={setsStyles.textInputBox}>
          <TextInput
            autoCorrect={ false }
            value={repsVal}
            onChangeText={(text) => handleReps(text)}
            keyboardType={'number-pad'}
          />
          <Text>회</Text>
        </View>
        <RoundButton number={'+1'} type={'rep'} />
        <RoundButton number={'-1'} type={'rep'} />
      </View>
    )
  }

  const [weightVal, setWeightVal] = useState(Number(dbWeight))
  const [repVal, setRepVal] = useState(Number(dbRep))

  useEffect(() => {
    setWeightVal(Number(dbWeight))
    setRepVal(Number(dbRep))
    console.log(weightVal)
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
