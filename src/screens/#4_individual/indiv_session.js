import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Spacing, Typography, Colors } from '../../styles';
import SetsInput from '../../components/SetsInput';
import AddSetButton from '../../components/AddSetButton';
import DeleteFieldButton from '../../components/DeleteFieldButton';
import partAndField from '../../utils/partAndField';
import AddFieldIOS from '../../components/AddFieldIOS';
import AddFieldAndroid from '../../components/AddFieldAndroid';
import axios from '../../axios/api';
import getDateStringWithNumber from '../../utils/getDateStringWithNumber'
import SetsInputWithMinutes from '../../components/SetsInputWithMinutes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: Spacing.SCALE_12,
  },
  title: {
    fontSize: Typography.FONT_SIZE_20,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    margin: Spacing.SCALE_12,
  },
  whiteBox: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    borderColor: Colors.WHITE,
    paddingLeft: Spacing.SCALE_12,
    paddingRight: Spacing.SCALE_12,
    margin: Spacing.SCALE_8,
    borderWidth: 1,
    flex:1,
  }
})

export default IndividualSession = () => {
  // toggle
  const [partToggle, setPartToggle] = useState([false, false, false, false, false, false, false])
  
  const addSession = (part, fieldName, index) => {
    if (index === 5) {
      const newSession = {
        part,
        field: fieldName,
        sets: [
          {
            set: 1,
            weight: null,
            minutes: '10',
            rep: null,
          },
        ],
      }
  
      setSessions(oldSessions => [...oldSessions, newSession])
    } else if (index === 6) {
      console.log('not yet!')
    } else {
      const newSession = {
        part,
        field: fieldName,
        sets: [
          {
            set: 1,
            weight: '20',
            minutes: null,
            rep: '10',
          },
        ],
      }
  
      setSessions(oldSessions => [...oldSessions, newSession])
    }
  }

  const [sessions, setSessions] = useState([])

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

  const [renderedDate, setRenderedDate] = useState(new Date('2021-04-10'))
  const [renderedStringDate, setRenderedStringDate] = useState('')
  const [isSearched, setIsSearched] = useState(false)

  const getDate = () => {
    const date = getDateStringWithNumber(renderedDate)
    setRenderedStringDate(date)
  }

  const callGetLessonByDateAPI = () => {
    console.log(renderedStringDate)
    axios.get(`/trainee/607991803f0da34aa063c3aa/lesson/date/${renderedStringDate}`)
      .then(res => {
        let sessionsArr = []
        let start = ''
        let end = ''
        let trainerId = ''
        
        res.data.data[0].sessions.map(data => {
          let newSession = {}
          newSession.part = data.part
          newSession.field = data.field
          
          let setsArr = []

          data.sets.map(data_ => {
            let newSet = {}
            newSet.set = data_.set
            newSet.weight = data_.weight
            newSet.minutes = data_.minutes
            newSet.rep = data_.rep

            setsArr.push(newSet)
          })

          newSession.sets = setsArr

          sessionsArr.push(newSession)
        })
        console.log(sessionsArr)
        setSessions(sessionsArr)
        setIsSearched(true)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    // 오늘 날짜로 api 조회
    if (!isSearched) {
      getDate()
      callGetLessonByDateAPI()
    }
    // 한번 조회 했으면 toggle on
  })

  return (
  <View style={styles.container}>
    <View style={styles.whiteBox}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Session</Text>
        <Text style={styles.title}>{renderedDate.getFullYear()}년 {renderedDate.getMonth() + 1}월 {renderedDate.getDate()}일</Text>
      </View>
      <ScrollView>
        <View>
        {isSearched && 
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
                            (index__ === 5 ) &&
                            data.sets.map((data_, index_) => (
                              <SetsInputWithMinutes
                                key={index_}
                                index={index_}
                                setNumber={data_.set} 
                                dbMinutes={String(data_.minutes)}
                                dimensions={[index, index_]}
                                sessions={sessions}
                                setSessions={setSessions}
                              />
                            ))
                          }
                          { 
                            (index__ !== 5) &&
                            data.sets.map((data_ , index_)=> (
                              <SetsInput
                                key={index_} 
                                index={index_}
                                setNumber={data_.set} 
                                dbWeight={String(data_.weight)} 
                                dbRep={String(data_.rep)} 
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
            )
          )
        }
        </View>
      </ScrollView>
    </View>
  </View>
  )
}

/*
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
  */
