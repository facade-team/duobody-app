import React, { useState } from 'react'
import { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated, TextInput, TouchableOpacity } from 'react-native';
import { Spacing, Typography, Colors } from '../../styles';
import WorkoutInput from '../../components/WorkoutInput';
import SetsInput from '../../components/SetsInput';
import AddSetButton from '../../components/AddSetButton';

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
  // new field
  const [fieldValue, setFieldValue] = useState('');

  /*
  // new set
  const [setValue, setSetValue] = useState([]);

  const [weight, setWeight] = useState('20')
  const [rep, setRep] = useState('10')

  const addSet = (weight, rep) => {
    const newSet = {
      id: 1,
      setNumber: 2,
      weight,
      rep,
    }

    setSets(sets => [...sets, newSet])
  }
*/

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

  useEffect(() => {
    //console.log(sessions)
  })

  return (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Session</Text>
      <Text style={styles.title}>2021년 3월 17일</Text>
    </View>
    <View style={styles.whiteBox}>
      <ScrollView>
      <Text style={{fontSize: Typography.FONT_SIZE_20}}>-등</Text>
        {
          sessions.map(data => 
            (data && data.part && (data.part === "등")) ? (
              <View key={data.id}>
                <View key={data.id} style={{margin:Spacing.SCALE_4}}>
                  <Text key={data.id} style={{fontSize: Typography.FONT_SIZE_16}}>{data.field}</Text>
                  {
                    data.set.map(data_ => (
                      <SetsInput 
                        key={data_.id}
                        setNumber={data_.setNumber} 
                        dbWeight={data_.weight} 
                        dbRep={data_.rep} 
                        dimensions={[data.id, data_.id]}
                        sessions={sessions}
                        setSessions={setSessions}
                      />
                    ))
                  }
                </View>
                <AddSetButton sessionId={data.id}  />
              </View>
            ) : '' 
          )
        }
        <WorkoutInput fieldValue={fieldValue} setFieldValue={setFieldValue} addSession={addSession} />
      </ScrollView>
    </View>
  </View>
)}


/*

{
          sessions.map(data => (
            <View>
              <Text>{data.part}</Text>
              {
                data.fields.map(d => (
                  <View>
                    <Text>{d.field}</Text>
                  </View>
                ))
              }
            </View>
          ))
        }

*/

/*

const [sessions, setSessions] = useState([
    {
      id: 0,
      part: '등',
      fields: [
        {
          id: 0,
          field: '렛풀다운',
          sets: [
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
          field: '데드리프트',
          sets: [
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
      ]
    }
  ])

  */

  