import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Colors, Spacing, Typography } from '../../styles';
import CalendarView from '../../components/Calendar';
import axios from '../../axios/api';
import partAndField from '../../utils/partAndField';
import SetsView from '../../components/SetsView';
import SetsIViewWithMinutes from '../../components/SetsIViewWithMinutes';
import Loader from '../../components/Loader'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

function Indiv_calendar({ navigation }) {

  const [selectedNull,setSelectedNull] = useState(false)

  let urlstring = ''
  //flag 사용
  const [didMount,setDidMount] = useState(true)
  const [gotDataFlag, setGotDataFlag] = useState(urlstring)

  const today = new Date()

  const [selectedDatePick,setSelectedDatePick] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
    day: today.getDay()
  })
  const [trainee_id,setTrainee_id] = useState('')

  // 해당 날짜의 lesson data
  const [lesson,setLesson] = useState({})

  //selectedDatePick => string으로 변환하는 함수
  const selectedDateToString = () => {
    let stringmonth = selectedDatePick.month
    let stringdate = selectedDatePick.date
    if(stringmonth < 10){
        stringmonth = '0' + stringmonth.toString()
    }else{
        stringmonth = stringmonth.toString()
    }
    if(stringdate < 10){
        stringdate = '0' + stringdate.toString()
    }else{
        stringdate = stringdate.toString()
    }
    urlstring = selectedDatePick.year.toString() + stringmonth + stringdate
  }

  
  //김문기 trainee라고 가정, 실제로는 prop으로 trainee_id 받아서 쓸 예정

  //trainee의 모든 lesson 날짜 조회 -> lesson id로 조회

  const [gotId, setGotId] = useState(false)
  useFocusEffect(
    useCallback(() => {
      let isActive = true
      console.log('useFocusEffect')
      const getTraineeId = async () => {
        try {
          const id = await AsyncStorage.getItem('traineeId')
          if (isActive && (id !== trainee_id)) {
            console.log('아이디를 새로 등록하는 과정...')
            setDotDatesFromDB(null)
            callGetAllLessonDatesAPI(id)
            setTrainee_id(id)
            setDidMount(false)
            setGotId(true)
            //console.log(`this is id: ${id}`)
          }
        } catch (err) {
          console.log(err)
        }
      }

      getTraineeId()

      return () => {
        isActive = false
      }
    })
  )

  useEffect(()=>{
    //모든 lesson 날짜 조회하기 - 처음 한 번만
    if(!didMount){
      // trainee의 모든 lesson 가져와서 달력에 점찍기 구현해야됨
      selectedDateToString()      
      callGetAllLessonDatesAPI(trainee_id)
      setDidMount(true)
    }

    // 해당 날짜 일정 불러오기 - url 형식에 맞게 날짜 string으로 변경
    selectedDateToString()
    if(gotDataFlag !== urlstring && gotId) {
      console.log('call get lesson by date API...')
      setLesson({})
      axios.get(`/trainee/${trainee_id}/lesson/date/${urlstring}`)
      .then((res) => {
        if(res.data.data === null) {
          // 해당 date lesson 없음
          setSelectedNull(false)
        }else {
          // 해당 date lesson 있음
          setSelectedNull(true)
          
          //console.log(res.data.data[0])

          let newData = {}
          let startDate = new Date(res.data.data[0].start)
          let endDate = new Date(res.data.data[0].end)

          newData._id = res.data.data[0]._id
          newData.start =("0" + startDate.getHours()).slice(-2) + ":" + ("0" + startDate.getMinutes()).slice(-2)
          newData.end = ("0" + endDate.getHours()).slice(-2) + ":" + ("0" + endDate.getMinutes()).slice(-2)
          newData.sessions = res.data.data[0].sessions

          setLesson(newData)

          let partToggleArr = [false, false, false, false, false, false, false]
          res.data.data[0].sessions.map((data) => {
            partAndField.map((data_,index_) => {
              if (data_.part === data.part) {
                partToggleArr[index_] = true
              }
            })
          })
          setPartToggle(partToggleArr)
        }
      })
      .catch(error => {
        console.log(error)
      })
      setGotDataFlag(urlstring)
    }
  })

  // 요 아래는 승우가 만든 컴포넌트, state, function ^^
  const [partToggle, setPartToggle] = useState([false, false, false, false, false, false, false])
  const [dotDates, setDotDates] = useState([])
  const [dotDatesFromDB, setDotDatesFromDB] = useState(null)

  const callGetAllLessonDatesAPI = async (id) => {
    console.log('callGetAllLessonDatesAPI ' + id)
    await axios.get(`/trainee/${id}/lesson/date`)
      .then((res) => {
        if (res.data.data) {
          const workout = {key:'workout', color: 'red',selectedDotColor: 'blue'}
          let newObj = {}
          res.data.data.map((d) => {
            newObj[d.date] = {dots: [workout]}
          })
          setDotDatesFromDB(newObj)
        }
        else {
          setDotDatesFromDB({})
        }
      })
      .catch((err) => {
        console.log(err.response)
      })
  }

  const isEmpty = (param) => {
    return Object.keys(param).length === 0 && param.constructor === Object
    }

  const PartTitle = ({data__, index__}) => {

    const styles = StyleSheet.create({
      container: {
        marginBottom: Spacing.SCALE_8,
      },
      textStyle: {
        fontSize: Typography.FONT_SIZE_20,
        color: Colors.BLACK,
      }
    })

    return (
      <View style={styles.container}>
        <Text key={index__} style={styles.textStyle} >-{data__.part}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.wrap}>
      <View style = {styles.whiteBox}>
        <View style={{flex:1,}}>
          {!dotDatesFromDB ? 
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Loader />
          </View>
          :
            <CalendarView
              setSelectedDatePick={setSelectedDatePick}
              dotDates={dotDates}
              dotDatesFromDB={dotDatesFromDB}
            />
          }
        </View>
      </View>
      <View style={styles.whiteBox}>
        <View style={styles.container}>
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text>{selectedDatePick.year}년 {selectedDatePick.month}월 {selectedDatePick.date}일</Text>
            {
              lesson && lesson.start && (
                <Text>{lesson.start} - {lesson.end}</Text>
              )
            }
          </View>
        </View>
        <View style={{flex:6, borderTopWidth:0.5, marginBottom: 5,}}>
          {
            selectedNull === true && lesson && lesson.sessions && (
            <View>
              <ScrollView>
                {
                  partAndField.map((data__, index__) => 
                    (partToggle[index__]) && (
                      <View style={{margin: Spacing.SCALE_8}}>
                        <PartTitle data__={data__} index__={index__} />
                        {
                          lesson.sessions.map((data_, index_) => 
                            (data_.part === data__.part) && (
                              <View style={{marginBottom: Spacing.SCALE_20, marginLeft: Spacing.SCALE_4}}>
                                <View style={{margin: Spacing.SCALE_4,}}>
                                  <Text key={index_} style={{fontSize: Typography.FONT_SIZE_16}}>{data_.field}</Text>
                                </View>
                                {
                                  data_.sets.map((data, index) => 
                                    (data_.part !== '유산소') && (data_.field !== '플랭크')? 
                                    <SetsView index={index} dbWeight={data.weight} dbRep={data.rep} />
                                    :
                                    <SetsIViewWithMinutes index={index} dbMinutes={data.minutes} />
                                  )
                                }
                              </View>
                            )
                          )
                        }
                      </View>
                    )
                  )
                }
              </ScrollView>
            </View>
            )
          }
          {
            selectedNull === true && lesson && lesson.sessions && lesson.sessions.length === 0 && (
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>운동 스케줄을 등록해주세요!</Text>
              </View>
            )
          }
          {
            (selectedNull === false) && 
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>등록된 레슨이 없어요!</Text>
            </View>
          }
          {
            (selectedNull === true && isEmpty(lesson)) && 
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Loader />
            </View>
          }
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
  },
  upcontainer:{
    backgroundColor: Colors.WHITE,
    flex: 1,
    margin: 1,
  },
  container: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
  },
  whiteBox: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    borderColor: Colors.WHITE,
    paddingLeft: Spacing.SCALE_4,
    paddingRight: Spacing.SCALE_4,
    margin: Spacing.SCALE_4,
    borderWidth: 1,
    flex:1,
  }
});

export default Indiv_calendar;
