import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, Dimensions, Alert } from 'react-native';
import { Spacing, Typography, Colors } from '../../styles';
import SetsInput from '../../components/SetsInput';
import AddSetButton from '../../components/AddSetButton';
import DeleteFieldButton from '../../components/DeleteFieldButton';
import partAndField from '../../utils/partAndField';
import AddFieldIOS from '../../components/AddFieldIOS';
import AddFieldAndroid from '../../components/AddFieldAndroid';
import axios from '../../axios/api';
import getDateStringWithNumber from '../../utils/getDateStringWithNumber'
import SetsInputWithMinutes from '../../components/SetsInputWithMinutes'
import DateTimePicker from '@react-native-community/datetimepicker';
import UnderLinedTextInput from '../../components/UnderlinedTextInput';
import GreenButton from '../../components/GreenButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: Spacing.SCALE_4,
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: Spacing.SCALE_4,
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

  const [renderedDate, setRenderedDate] = useState(new Date())
  const [renderedStringDate, setRenderedStringDate] = useState('')
  const [isSearched, setIsSearched] = useState(false)
  const [lessonId, setLessonId] = useState(null)
  const [lesson, setLesson] = useState(null)
  const [traineeId, setTraineeId] = useState('607991803f0da34aa063c3aa')

  const getDate = () => {
    const date = getDateStringWithNumber(renderedDate)
    setRenderedStringDate(date)
  }

  const callGetLessonByDateAPI = () => {
    axios.get(`/trainee/${traineeId}/lesson/date/${renderedStringDate}`)
      .then(res => {
        let sessionsArr = []
        setLessonId(null)
        setStartTime(renderedDate)
        setEndTime(renderedDate)
        if (res.data.data !== null) {
          const startStr = res.data.data[0].start
          const endStr = res.data.data[0].end
          const startObj = new Date(startStr)
          const endObj = new Date(endStr)
          setStartTime(startObj)
          setEndTime(endObj)
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
          setLessonId(res.data.data[0]._id)
        }
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

  const [show, setShow] = useState(false)
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [isStart, setIsStart] = useState(true)

  const onChangeStartTime = (event, selectedDate) => {
    const currentTime = selectedDate
    setShow(false)
    setStartTime(currentTime)
  }

  const onChangeEndTime = (event, selectedDate) => {
    const currentTime = selectedDate
    setShow(false)
    setEndTime(currentTime)
  }

  const handelSetShow = (type) => {
    setIsStart(type)
    if (!show){
      setShow(true)
    }
  }

  const RenderTime = (timeString) => {
    console.log(timeString.timeString)
    let time = new Date(timeString.timeString)
    let minute = (time.getMinutes() / 10 < 1) ? '0'+String(time.getMinutes()) : String(time.getMinutes())
    let hour = time.getHours()
    
    const styles = StyleSheet.create ({
      renderTimeContainer: {
        paddingRight: Spacing.SCALE_8,
        paddingLeft: Spacing.SCALE_8,
        flexDirection:'row', 
        alignItems:'center', 
        marginTop: Spacing.SCALE_4, 
        backgroundColor:Colors.GRAY_LIGHT,
        justifyContent: 'center',
        borderRadius: 10,
      }
    })

    return (
      <View style={styles.renderTimeContainer}>
        <Text style={{fontSize: Typography.FONT_SIZE_16, justifyContent: 'center', alignSelf:'center', color: Colors.PRIMARY}}>
          {hour}:{minute}
        </Text>
      </View>
    )
  }

  const onSaveSessionhandler = () => {

    if(lessonId) {
      axios.delete(`/trainee/${traineeId}/lesson/${lessonId}`)
        .then(res => {
          console.log(res.data.data)
        })
        .catch(error => {
          console.log(error.response.request._response)
        })
    }
    
    let wholeLesson = {}
    wholeLesson.start = startTime
    wholeLesson.end = endTime
    wholeLesson.traineeId = traineeId
    wholeLesson.session = sessions

    axios.post('/trainee/lesson', wholeLesson)
      .then(res => {
        Alert.alert('저장이 완료되었습니다')
      })
      .catch(error => {
        console.log(error.response)
      })

  }

  const [showCal, setShowCal] = useState(false)

  const onDateSelectorClickHandler = () => {
    setShowCal(true)
  }

  const onDateSelectHandler = (event, selectedDate) => {
    const currentDate = selectedDate
    setShowCal(false)
    setRenderedDate(currentDate)
    setIsSearched(false)
  }

  return (
  <View style={styles.container}>
    <View style={styles.whiteBox}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Session</Text>
        {
          Platform.OS === 'ios' && (
            <View>
              <DateTimePicker
                style={{width: Spacing.SCALE_80, flex:1}}
                testID="dateTimePicker"
                value={renderedDate}
                mode={'date'}
                is24Hour={true}
                display="defalut"
                onChange={(event, selectedDate) => onDateSelectHandler(event, selectedDate)}
              />
            </View>
          )
        }
        {
          Platform.OS !== 'ios' && (
            <TouchableOpacity onPressOut={onDateSelectorClickHandler}>
              <Text style={styles.title}>{renderedDate.getFullYear()}년 {renderedDate.getMonth() + 1}월 {renderedDate.getDate()}일</Text>
              {showCal && (
                <DateTimePicker
                  style={{width: Spacing.SCALE_80,}}
                  testID="dateTimePicker"
                  value={renderedDate}
                  mode={'date'}
                  is24Hour={true}
                  display="compact"
                  onChange={(event, selectedDate) => onDateSelectHandler(event, selectedDate)}
                />
              )}
            </TouchableOpacity>
          )
        }
      </View>
      <View style={styles.timePickerContainer}>
        {
          (Platform.OS === 'ios') && (
            <View style={styles.timePickerContainer}>
              <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'flex-end', marginRight: Spacing.SCALE_8}}>
                <Text style={{marginRight: Spacing.SCALE_4}}>시작시간</Text>
                <DateTimePicker
                  style={{width: Spacing.SCALE_80,}}
                  testID="dateTimePicker"
                  value={startTime}
                  mode={'time'}
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => onChangeStartTime(event, selectedDate)}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'flex-end'}}>
                <Text style={{marginRight: Spacing.SCALE_4}}>종료시간</Text>
                <DateTimePicker
                  style={{width: Spacing.SCALE_80,}}
                  testID="dateTimePicker"
                  value={endTime}
                  mode={'time'}
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => onChangeEndTime(event, selectedDate)}
                />
              </View>
            </View>
          )
        }
        {
          (Platform.OS !== 'ios') && (
            show ? (
              <View>
                {
                  isStart ? (
                    <DateTimePicker
                      style={{width: Spacing.SCALE_100,}}
                      testID="dateTimePicker"
                      value={startTime}
                      mode={'time'}
                      is24Hour={true}
                      display="default"
                      onChange={(event, selectedDate) => onChangeStartTime(event, selectedDate)}
                    />
                  ) : (
                    <DateTimePicker
                      style={{width: Spacing.SCALE_100,}}
                      testID="dateTimePicker"
                      value={endTime}
                      mode={'time'}
                      is24Hour={true}
                      display="default"
                      onChange={(event, selectedDate) => onChangeEndTime(event, selectedDate)}
                    />
                  )
                }
              </View>
          )
            :
          (
            <View style={{flexDirection: 'row', justifyContent:'flex-end', alignItems:'center'}}>
              {startTime && (
                <TouchableOpacity onPressOut={() => handelSetShow(true)}>
                  <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'flex-end', marginRight: Spacing.SCALE_8}}>
                    <Text style={{marginRight: Spacing.SCALE_4}}>시작시간</Text>
                    <RenderTime
                      timeString={startTime}
                    />
                  </View>
                </TouchableOpacity>
              )}
              {endTime && (
                <TouchableOpacity onPressOut={() => handelSetShow(false)}>
                  <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'flex-end'}}>
                    <Text style={{marginRight: Spacing.SCALE_4}}>종료시간</Text>
                    <RenderTime
                      timeString={endTime}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          )
          )
        }
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
      <View style={{marginBottom: Spacing.SCALE_8, marginTop: Spacing.SCALE_8}}>
        <GreenButton
          content={'저장하기'}
          onClick={onSaveSessionhandler}
        /> 
      </View>
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
