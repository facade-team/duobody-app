import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Spacing, Typography, Colors } from '../../styles';
import SetsInput from '../../components/SetsInput';
import AddSetButton from '../../components/AddSetButton';
import DeleteFieldButton from '../../components/DeleteFieldButton';
import partAndField from '../../utils/partAndField';
import AddFieldIOS from '../../components/AddFieldIOS';
import AddFieldAndroid from '../../components/AddFieldAndroid';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: Typography.FONT_SIZE_20,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    margin: Spacing.SCALE_12,
  },
  whiteBox: {
    borderColor: Colors.BLACK,
    padding: Spacing.SCALE_12,
    margin: Spacing.SCALE_8,
    borderWidth: 1,
  }
})

export default IndividualSession = () => {
  // toggle
  const [partToggle, setPartToggle] = useState([false, false, false, false, false, false, false])
  
  const addSession = (part, fieldName) => {
    const newSession = {
      id: sessions.length,
      part,
      field: fieldName,
      set: [
        {
          id: 0,
          setNumber: 1,
          weight: '20',
          rep: '10',
        },
      ],
    }

    setSessions(oldSessions => [...oldSessions, newSession])
  }

  const [sessions, setSessions] = useState([
    {
      id: 0,
      part: '등',
      field: '렛풀다운',
      set: [
        {
          id: 0,
          setNumber: 1,
          weight: '40',
          rep: '9'
        },
        {
          id: 1,
          setNumber: 2,
          weight: '30',
          rep: '8'
        },
      ]
    },
    {
      id: 1,
      part: '등',
      field: '데드리프트',
      set: [
        {
          id: 0,
          setNumber: 1,
          weight: '80',
          rep: '8'
        },
        {
          id: 1,
          setNumber: 2,
          weight: '90',
          rep: '5'
        },
      ]
    },
  ])

 

  const PartTitle = ({data__, index__}) => {

    const handlePartToggle = () => {
      let newPartToggle = [...partToggle]
      if (newPartToggle[index__]) {
        newPartToggle[index__] = false
      }
      else {
        newPartToggle = newPartToggle.map((val, idx) => (index__ === idx) ? true : false)
      }
      setPartToggle(newPartToggle)
    }

    const styles = StyleSheet.create({
      container: {
        marginBottom: Spacing.SCALE_12,
      },
      textStyle: {
        fontSize: Typography.FONT_SIZE_20,
        color: !partToggle[index__] ? Colors.BLACK : Colors.ALERT,
      }
    })

    return (
      <View style={styles.container}>
        <TouchableOpacity onPressOut={handlePartToggle}>
          <Text key={index__} style={styles.textStyle} >-{data__.part}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Session</Text>
      <Text style={styles.title}>2021년 3월 17일</Text>
    </View>
    <View style={styles.whiteBox}>
      <ScrollView>
        <View>
        {
          partAndField.map((data__, index__) => (
            <View key={index__}>
              <PartTitle data__={data__} index__={index__} />
              {
                sessions.map((data, index) => 
                  (data && data.part && data__.part === data.part && partToggle[index__]) && (
                    <View key={index}>
                      <View key={index}>
                        <View key={index} style={{margin:Spacing.SCALE_4}}>
                          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text key={index} style={{fontSize: Typography.FONT_SIZE_16}}>{data.field}</Text>
                            <DeleteFieldButton
                              dimensions={[index]}
                              sessions={sessions}
                              setSessions={setSessions}
                            />
                          </View>
                          {
                            data.set.map((data_ , index_)=> (
                              <SetsInput
                                key={index_} 
                                index={index_}
                                setNumber={data_.setNumber} 
                                dbWeight={data_.weight} 
                                dbRep={data_.rep} 
                                dimensions={[index, index_]}
                                sessions={sessions}
                                setSessions={setSessions}
                              />
                            ))
                          }
                        </View>
                        <AddSetButton
                          dimensions={[index]}
                          sessions={sessions}
                          setSessions={setSessions}
                        />
                      </View>
                    </View>
                  )
                )
              }
              {
                (partToggle[index__]) && (Platform.OS === 'ios') &&
                  <AddFieldIOS
                    addSession={addSession}
                    index={index__}
                  />
              }
              {
                (partToggle[index__]) && (Platform.OS !== 'ios') &&
                  <AddFieldAndroid
                    addSession={addSession}
                    index={index__}
                  /> 
              }
            </View>
          ))
        }
        </View>
      </ScrollView>
    </View>
  </View>
  )
}
