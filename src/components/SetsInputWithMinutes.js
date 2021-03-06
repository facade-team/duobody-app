import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import useInput from '../hooks/useInput';
import { Spacing, Colors, Typography } from '../styles';
import DeleteSetButton from './DeleteSetButton';

export default ({
  index, 
  setNumber, 
  dbMinutes,
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
        const num = parseFloat(number)
        const repValNum = parseFloat(repVal)
        if (+num + +repVal > 0) {
          const sumRepVal = String(num+repValNum)
          setRepVal(sumRepVal)
          const newSessions = [...sessions]
          newSessions[dimensions[0]].sets[dimensions[1]].rep = sumRepVal
          setSessions(newSessions)
        }

      }
      if (type === 'weight') {
        const num = parseFloat(number)
        const weightValNum = parseFloat(weightVal)
        if (+num + +weightValNum >= 0) {
          const sumWeightVal = String(num+weightValNum)
          setWeightVal(sumWeightVal)
          const newSessions = [...sessions]
          newSessions[dimensions[0]].sets[dimensions[1]].weight = sumWeightVal
          setSessions(newSessions)
        }
      }
      if (type === 'minute') {
        const num = parseFloat(number)
        const minutesValNum = parseFloat(minutesVal)
        if (+num + +minutesValNum >= 0) {
          const sumMinutesVal = String(num+minutesValNum)
          setMinutesVal(sumMinutesVal)
          const newSessions = [...sessions]
          newSessions[dimensions[0]].sets[dimensions[1]].minutes = sumMinutesVal
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

  const MinutesInput = ({minutesVal, setMinutesVal}) => {
    const handleMinutes = (text) => {
      if (text >= 0) {
        setMinutesVal(text)
        const newSessions = [...sessions]
        newSessions[dimensions[0]].sets[dimensions[1]].minutes = text
        setSessions(newSessions)
      }
      else {
        Alert.alert('????????? ????????? ??????????????????')
      }
    }

    return (
      <View style={btnStyles.btnContainer}>
        <View style={setsStyles.textInputBox}>
          <TextInput
            autoCorrect={ false }
            value={minutesVal} 
            onChangeText={(text) => handleMinutes(text)}
            keyboardType={'number-pad'}
          />
          <Text>???</Text>
        </View>
        <RoundButton number={'+1'} type={'minute'} />
        <RoundButton number={'-1'} type={'minute'} />
      </View>
    )
  }

  const [minutesVal, setMinutesVal] = useState(dbMinutes)

  useEffect(() => {
    setMinutesVal(dbMinutes)
  })

  return (
    <View style={setsStyles.container} >
      <View style={setsStyles.setBox}>
        <Text>{index+1}??????</Text>
        <MinutesInput minutesVal={minutesVal} setMinutesVal={setMinutesVal} />
        <DeleteSetButton dimensions={dimensions} sessions={sessions} setSessions={setSessions} />
      </View>
    </View>
  )
}
