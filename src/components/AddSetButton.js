import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Spacing, Colors, Typography } from '../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
      marginRight: Spacing.SCALE_8,
      marginTop: Spacing.SCALE_4,
      marginBottom: Spacing.SCALE_4,
  },
  input: {
      backgroundColor: Colors.WHITE,
      paddingLeft: Spacing.SCALE_8,
      paddingRight: Spacing.SCALE_8,
      height: Spacing.SCALE_32,
      alignItems: "center",
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'flex-end',
  },
  textStyle: {
      fontSize: Typography.FONT_SIZE_12,
      color: Colors.BLACK,
      marginRight: Spacing.SCALE_4,
  },
  addBtn: {
      color: Colors.PRIMARY,
  }
});

export default ({dimensions, sessions, setSessions}) => {

  const addNewSet = () => {
    // console.log(dimensions)
    //console.log('sessions: ' + JSON.stringify(sessions))
    const newSessions = [...sessions]
    const setsNum = newSessions[dimensions[0]].sets.length - 1
    const prevWeight = newSessions[dimensions[0]].sets[setsNum].weight
    const prevRep = newSessions[dimensions[0]].sets[setsNum].rep
    const prevMinutes = newSessions[dimensions[0]].sets[setsNum].minutes

    const newSessionOne = {
      set: setsNum + 1,
      weight: prevWeight,
      rep: prevRep,
      minutes: prevMinutes,
    }

    newSessions[dimensions[0]].sets.push(newSessionOne)
    setSessions(newSessions)
  }

  return (
    <View style={styles.container}>
        <View style={styles.input}> 
            <TouchableOpacity onPressOut={addNewSet} style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.textStyle}>세트 추가하기</Text>
              <MaterialCommunityIcons style={styles.addBtn} size={24} name='plus' />
            </TouchableOpacity>
        </View>
    </View>
  )
}