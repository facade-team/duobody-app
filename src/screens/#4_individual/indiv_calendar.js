import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Colors } from '../../styles';
import CalendarView from '../../components/Calendar';
import axios from '../../axios/api';

function Indiv_calendar({ navigation }) {

  const [selectedNull,setSelectedNull] = useState(false)

  let urlstring = ''
  //flag 사용
  const [didMount,setDidMount] = useState(false)
  const [gotDataFlag, setGotDataFlag] = useState(urlstring)

  const today = new Date()

  const [selectedDatePick,setSelectedDatePick] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
    day: today.getDay()
  })
  const [trainee_id,setTrainee_id] = useState('607991633f0da34aa063c3a9')

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

  useEffect(()=>{
    //모든 lesson 날짜 조회하기 - 처음 한 번만
    if(!didMount){
      // trainee의 모든 lesson 가져와서 달력에 점찍기 구현해야됨

      setDidMount(true)
    }

    // 해당 날짜 일정 불러오기 - url 형식에 맞게 날짜 string으로 변경
    selectedDateToString()
    if(gotDataFlag !== urlstring) {
      setLesson({})
      axios.get(`/trainee/${trainee_id}/lesson/date/${urlstring}`)
      .then((res) => {
        if(res.data.data === null) {
          // 해당 date lesson 없음
          setSelectedNull(false)
        }else {
          // 해당 date lesson 있음
          setSelectedNull(true)
          
          console.log(res.data.data[0])

          let newData = {}
          let startDate = new Date(res.data.data[0].start)
          let endDate = new Date(res.data.data[0].end)

          newData._id = res.data.data[0]._id
          newData.start =("0" + startDate.getHours()).slice(-2) + ":" + ("0" + startDate.getMinutes()).slice(-2)
          newData.end = ("0" + endDate.getHours()).slice(-2) + ":" + ("0" + endDate.getMinutes()).slice(-2)
          newData.sessions = res.data.data[0].sessions

          setLesson(newData)
        }
      })
      .catch(error => {
        console.log(error)
      })
      setGotDataFlag(urlstring)
    }
    
  })

  return (
    <SafeAreaView style={styles.wrap}>
      <View style = {styles.upcontainer}>
      <View style={{flex:1}}>
        <CalendarView
          setSelectedDatePick={setSelectedDatePick}
        />
      </View>
      </View>
      <View style={{flex: 1, marginHorizontal: 5, borderWidth: 0.5,backgroundColor: Colors.WHITE}}>
        <View style={styles.container}>
          {
            lesson.start === '' ?
            <Text>{selectedDatePick.year}년 {selectedDatePick.month}월 {selectedDatePick.date}일</Text> :
            <>
            <Text>{selectedDatePick.year}년 {selectedDatePick.month}월 {selectedDatePick.date}일</Text>
            <Text>{lesson.start} - {lesson.end}</Text>
            </>
          }
        </View>
        <View style={{flex:6, borderTopWidth:0.5, marginBottom: 5,}}>
          {
            selectedNull === true ?
            <View>
              
            </View>
            :
            <Text>lesson 없음</Text>
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
    margin: 5,
  },
  container: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
},
});

export default Indiv_calendar;
