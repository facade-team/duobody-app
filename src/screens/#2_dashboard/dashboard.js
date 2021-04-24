import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, Text, Image, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Colors, Spacing } from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from '../../axios/api';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';

const Dash_dash = () => {
  
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [traineeDidMount, settraineeDidMount] = useState(false);
  const [TraineeListFromDB, setTraineeListFromDB] = useState([]);
  const [isNewFlag, setisNewFlag] = useState(true)
  const [trainerLesson, setTrainerLesson] = useState([])

  let todaystr = '';
  const today = new Date()
  const koreaday = ['일','월','화','수','목','금','토']

  const [selectedDatePick,setSelectedDatePick] = useState({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      date: today.getDate(),
      day: today.getDay()
  })

  let strmonth = selectedDatePick.month
  let strdate = selectedDatePick.date

  if(strmonth < 10){
    strmonth = '0'+ strmonth.toString()
  } else {
    strmonth = strmonth.toString()
  }
  if(strdate < 10){
    strdate = '0'+ strdate.toString()
  } else {
    strdate = strdate.toString()
  }

  todaystr = selectedDatePick.year.toString() + strmonth + strdate

  
  useFocusEffect(
    useCallback(()=>{
      //if(isNewFlag === true){
      //  getTrainee()
      //}

      getTrainee()
      setisNewFlag(false)
    }, [])
  )

  const getTrainee = () => {
    setTraineeListFromDB([]);
    //trainee, chatroomid 가져오기
    axios.get('/trainee')
    .then(res => {
      res.data.data.map(tmp=>{
      let newTrainee = {}
      newTrainee._id = tmp._id
      newTrainee.name = tmp.name

      /*
      //chatroom 생성 - 없을시
      if(tmp.chatRoomId === undefined){
        axios.post('/messenger',{
          traineeId:tmp._id
        }).then((res)=>{
          //res에 온 채팅방으로 초기 메시지 보내기
          axios.post(`/messenger/${res.data.data._id}`,{
            content: '환영합니다!'
          })
        })
      }
      */
    
      //chatroomid가 이미 있을 경우
      newTrainee.chatRoomId = tmp.chatRoomId

      // api 세팅
      setTraineeListFromDB(prevArray => [...prevArray, newTrainee])
      })
    })

    //오늘 일정 가져오기

    const timeArr = ["09", "10", "11", "12", "13", "14", "15", "16" ,"17" ,"18", "19", "20"]

    let newTrainerLessonArr = []
    timeArr.map((time, idx) => {
      let newObj = {}
      newObj.time = time
      newObj.name = ''
      newTrainerLessonArr.push(newObj)
    })

    axios.get(`/trainer/lesson/date/${todaystr}`)
    .then((res)=>{
      if(res.data.data !== null){
        //lesson array
        let arr = newTrainerLessonArr

        res.data.data.map(d=>{
          let timeIdx = String(d.start.substr(0, 2))

          newTrainerLessonArr.map((t, idx) => {
            let newObj_ = {}
            newObj_.time = t.time
            if(t.time === timeIdx) {
              newObj_.name = d.name
              arr[idx] = newObj_
            }
            else{
              newObj_.name = ''
            }
            }
          )
          })
          setTrainerLesson(arr)
      }else{
        //no lesson
        console.log('today no lesson')
        //오늘은 일정이 없습니다 띄우기
      }
    })

    settraineeDidMount(true)
    setIsLoading(false) 
  }

  // 오늘날짜 일정 api 가져오고 state에 저장
  // 상단 시간별로 랜더링 -> flag 설정해서 다른데로 갔을 때 정보 업데이트시 api호출부터 다시해야됨.




  useEffect(()=>{
  //아래 고객명단 함수
  if(isNewFlag === false) {
    if(!traineeDidMount) {
    getTrainee()
    };
  }
  }, [isNewFlag]);

  const AddControler = () => {
    setisNewFlag(true)
    navigation.navigate('Mem_Add')
  }

  const SearchControler = async () => {
    await AsyncStorage.setItem('newloadflag', 'hello')
    navigation.navigate('Mem_Search')
    setisNewFlag(true)
  }


  return ( isLoading ? <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}><Loader /></View> : 
  <View style={styles.container}>
    <View style={styles.main}>    
        
      <View style={styles.upper}>
        <View style={{flexDirection: "row", width: '90%', justifyContent: 'space-between'}}>
          <Text style={styles.listupleft}>{selectedDatePick.month}월 {selectedDatePick.date}일 ({koreaday[selectedDatePick.day]})</Text>
          <Text style={styles.listright}>TODAY</Text>
        </View>


        {TraineeListFromDB.length !== 0 ? (
        <View style={styles.time}>
            <FlatList
              scrollEnabled={false}
              keyExtractor={item => item.time}
              numColumns={2}

              data={ trainerLesson.length === 0 ? [
                {time: '09'},
                {time: '10'},
                {time: '11'},
                {time: '12'},
                {time: '13'},
                {time: '14'},
                {time: '15'},
                {time: '16'},
                {time: '17'},
                {time: '18'},
                {time: '19'},
                {time: '20'},
              ] : trainerLesson}
              renderItem={({item}) => 
              <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={styles.timelist}>{item.time}      {item.name}</Text>
              </View>
              }
            />
          </View>
        )
          :
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Loader />
          </View>
          }
      </View> 

            
        
      <View style={styles.down}>
        <View style={{flexDirection: 'row', width: '95%', justifyContent: 'space-between', marginTop: Spacing.SCALE_8,marginBottom: Spacing.SCALE_8}}>
          <View>
            <Text style={styles.listleft}>고객명단</Text>
          </View>
          <View style={{flexDirection: 'row', width: '18%', marginRight: 5, justifyContent: 'space-between'}}>
            <View style = {{marginTop: Spacing.SCALE_2}}>
              <Icon
                name = "search" 
                color = {Colors.BLACK} 
                size = {Spacing.SCALE_20}
                onPress = {SearchControler}
              />
            </View>
            <Icon 
              name = "add-circle" 
              color = {Colors.BLACK} 
              size = {Spacing.SCALE_24}
              onPress = {AddControler}
            />
          </View>
        </View>
        {TraineeListFromDB.length !== 0 ? <Mem_List DATA = {TraineeListFromDB}/> : 
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Loader />
        </View>
        }
      </View>
    </View>
  </View>
  );
}

  //아래 회원 리스트 구현 함수

  const Item = ({ name }) => (
    <View style = {styles.list}>
      <View style = {styles.circle}/>
      <Text style = {styles.memlist}>{name} 회원님</Text>
    </View>
  );

  const Mem_List = ({DATA}) => {
    const navigation = useNavigation();
    const renderItem = ({ item }) => {

      const onPressOutHandler = async () => {
        await AsyncStorage.setItem('traineeId', item._id)
        await AsyncStorage.setItem('chatRoomId', item.chatRoomId)
        navigation.navigate('Indiv', {screen: 'indiv_profile'})
      }

      return (
        <TouchableOpacity 
          onPress={() => onPressOutHandler()}
        >
          <Item name = {item.name} />
        </TouchableOpacity>
      )
    }

    return (
        <View style = {{flex:1}}>
        <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item._id} />
      
        </View>
    );
}


  const styles = StyleSheet.create({
    container:{
      flex:1,
      height: Dimensions.get('screen').height,
      backgroundColor: Colors.PRIMARY,
      padding: 0,
    },
    main: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    listupleft: {
      marginBottom: Spacing.SCALE_4,
      fontWeight: '900',
      fontSize: Spacing.SCALE_18,
      color: Colors.GRAY_DARK,
    },
    listleft: {
      margin:5,
      fontWeight: 'bold',
      fontSize: Spacing.SCALE_18,
    },
    listright: {
      marginBottom: Spacing.SCALE_4,
      fontWeight: '900',
      fontSize: Spacing.SCALE_18,
    },
    list: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: Dimensions.get('screen').width * 0.80,
      height: Dimensions.get('screen').height * 0.06,
      margin:4,
      backgroundColor: Colors.WHITE,
      borderWidth:2,
      borderRadius: 8,
      borderColor : Colors.PRIMARY,
      paddingLeft: Spacing.SCALE_48,
      paddingRight: Spacing.SCALE_80,

    },
    memlist: {
      textAlign : 'center',
      fontWeight: 'bold',
      fontSize: 20,
    },

    circle: {
      height: Dimensions.get('screen').height * 0.035,
      width : Dimensions.get('screen').height * 0.035,
      borderRadius: 50,
      backgroundColor: Colors.GRAY_MEDIUM,
    },
    time: {
      flexDirection: "row",
      width: "90%",
      alignItems: "center",
      justifyContent: "center",
    },
    timelist: {
      width: Dimensions.get('screen').width * 0.40,
      margin:3,
      backgroundColor: Colors.WHITE,
      paddingTop:Dimensions.get('screen').height * 0.01,
      paddingLeft:10,
      borderWidth:1,
      borderRadius: 8,
      borderColor : Colors.PRIMARY,
      fontWeight: 'bold',
      color: Colors.GRAY,
      fontSize: Spacing.SCALE_18,
      textAlign: 'left',
      height: Dimensions.get('screen').height * 0.043,
    },
    upper: {
      flex: 1,
      width:'97.5%',
      margin:5,
      padding:4,
      backgroundColor: Colors.WHITE,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      
    },
    down: {
      flex: 1,
      width:'97.5%',
      margin:5,
      padding:4,
      marginBottom: 5,
      backgroundColor: Colors.WHITE,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
    },
  })

export default Dash_dash;