import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, Text, View, FlatList, TouchableOpacity, Platform, Alert, ScrollView } from 'react-native';
import CalendarView from '../../components/Calendar';
import CircleButton from '../../components/CircleButton'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { FontAwesome } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import TraineeList from '../../components/TraineeList';
import { Colors } from '../../styles';
import axios from '../../axios/api';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../components/Loader';
import getDateString from '../../utils/getDateString';

const Item = ({ name, worktime }) => (
    <View style={styles.content}>
        <Text style={styles.fontCustommer}>{name} 회원님</Text>
        <Text style={styles.fontWorktime}>{worktime}</Text>
    </View>
);

const Dash_cal = ( {navigation} ) => {

    let urlstring = ''
    const [gotDataFlag, setGotDataFlag] = useState(urlstring)

    const [traineeDidMount,setTraineeDidMount] = useState(false)
    const [TraineeListFromDB, setTraineeListFromDB] = useState([])

    const convertTimeStamp = (ttt) => {
        let result = new Date(
            selectedDatePick.year,
            selectedDatePick.month - 1,
            selectedDatePick.date,
            ttt.hour,
            ttt.minute
            )

        return result.getTime()
    }
    const [dotDatesFromDB, setDotDatesFromDB] = useState(null)
    const [dotFlag, setDotFlag] = useState(true)
    const [dotStateFlag, setDotStateFlag] = useState(true)

    useFocusEffect(
      useCallback(() => {
        console.log('focusEffect')
        setDotFlag(true)
        if (true) {
          callGetAllLessonDatesAPI()
        }

      }, [])
    )

    useEffect(() => {
      console.log(dotFlag)
    }, [dotFlag])

    const callGetAllLessonDatesAPI = () => {
      //
      axios.get('/trainer/lesson')
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
          setDotFlag(false)
        })
        .catch((err) => {
          console.log(err.response)
        })
    }

    useEffect(()=>{
        //모든 trainee 불러오기
        if(!traineeDidMount){
            axios.get('/trainee')
            .then((res)=>{
                res.data.data.map(d=>{
                    let newTrainee = {}
                    newTrainee._id = d._id
                    newTrainee.name = d.name

                    setTraineeListFromDB(prevArray => [...prevArray, newTrainee])
                })
                
            })
            .catch((error)=>{
                console.log(error.message)
            })
            setTraineeDidMount(true)
        }

        //해당 날짜 일정 불러오기 - url 형식에 맞게 날짜 string으로 변경
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
        
        //해당하는 날짜에 있는 일정

        if (gotDataFlag !== urlstring) {
            setDATA([])
            axios.get(`/trainer/lesson/date/${urlstring}`)
                .then((res) => {
                    res.data.data.map(d=>{
                        let newData = {}

                        newData._id = d.traineeId
                        newData.name = d.name
                        newData.worktime = d.time
                        //chatroomid 필요
                        axios.get(`/trainee/${d.traineeId}`)
                        .then((res)=>{
                            newData.chatroomId = res.data.data.chatRoomId
                        })
    
                        setDATA(prevArray => [...prevArray, newData])
                    })
                })
                .catch((error) => {
                    console.log(error.message)
                })
            setGotDataFlag(urlstring)
        }
    })
    
    // local storage에 데이터 저장하는 함수
    const saveDataLocalStorage = () => {
      setDotFlag(true)
        //ID
        const _id = selectedTrainee._id
        //NAME
        const newname = temp
        //WORKTIME
        const fullTime = startTime.startTime + ' - ' +  endTime.endTime

        const newData = {
            _id: _id,
            name: newname,
            worktime: fullTime
        }
        
        //DATA에 push   
        setDATA(prevArray => [...prevArray, newData])

        // timestamp 만들기
        const st = convertTimeStamp(startTime)
        const et = convertTimeStamp(endTime)

        //const date = getDateString(start)
        const dateObj = new Date(selectedDatePick.year, selectedDatePick.month - 1, selectedDatePick.date, 9, 0)
        const date = getDateString(dateObj)
        const newObj = {}
        const workout = {key:'workout', color: 'red',selectedDotColor: 'blue'}

        newObj[date] = {dots: [workout]}
        
        const mergeObj = (obj1, obj2) => {
          const newObj = {};
          for (let att in obj1) { 
            newObj[att] = obj1[att]; 
          }
          
          for(let att in obj2)  {
            newObj[att] = obj2[att];
          }
          
          return newObj;
        }

        const prevDotDates = dotDatesFromDB
        const newDotDates = mergeObj(prevDotDates, newObj)
        
        
        //새로 업데이트 된 DATA를 push
        axios.post('/trainee/lesson',{
          traineeId: newData._id,
          start: st,
          end: et,
          session: null,
        })
        .then((res)=> {
              setDotDatesFromDB(newDotDates)
              Alert.alert('레슨을 생성했습니다')
            })
            .catch((error)=>{
                console.log(error.message)
            })
            

    }

    
    useEffect(() => {
      if (dotDatesFromDB) {
        setDotFlag(false)
        setDotStateFlag(false)
      }
    }, [dotDatesFromDB])
    

    const today = new Date()
    const koreaday = ['일','월','화','수','목','금','토']
  
    const [selectedDatePick,setSelectedDatePick] = useState({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
        day: today.getDay()
    })

    const [DATA,setDATA] = useState([])

    const [selectedTrainee, setSelectedTrainee] = useState({
        name: '',
        _id:''
    })
    const [temp, setTemp] = useState('')

    const setTrainee = () => {
        setTemp(selectedTrainee.name)
    }

    //ios datetimepicker
    const [show,setShow] = useState(false);
    const [start, setStart] = useState(new Date(1619103600000));
    const [end, setEnd] = useState(new Date(1619103600000));
    const [temptime, setTempTime] = useState('')

    const [startTime, setStartTime] = useState({
        startTime: "시작시간",
        hour: 0,
        minute: 0
    })
    const [endTime, setEndTime] = useState({
        endTime: "종료시간",
        hour: 0,
        minute: 0
    })
    
    const setStartTimeData = (currentDate) => {
        const temp = currentDate

        const hours = (temp.getHours() < 10 ? '0' : '') + temp.getHours()
        const minutes = (temp.getMinutes() < 10 ? '0' : '') + temp.getMinutes()
    
        let res = {}
        res = hours + ' : ' + minutes
        setStartTime({
          startTime: res,
          hour: temp.getHours(),
          minute: temp.getMinutes()
        })
        res = {}
    }
    const setEndTimeData = (currentDate) => {
        const temp = currentDate

        const hours = (temp.getHours() < 10 ? '0' : '') + temp.getHours()
        const minutes = (temp.getMinutes() < 10 ? '0' : '') + temp.getMinutes()
    
        let res = {}
        res = hours + ' : ' + minutes
        setEndTime({
          endTime: res,
          hour: temp.getHours(),
          minute: temp.getMinutes()
        })
        res = {}
    }
    const onIosStart = (event, selectedDate) => {
        const currentDate = selectedDate || start;
        
        setShow(Platform.OS === 'ios')

        setStart(currentDate);
        setTempTime(currentDate);
    }
    const onIosEnd = (event, selectedDate) => {
        const currentDate = selectedDate || end;
        
        setShow(Platform.OS === 'ios')

        setEnd(currentDate);
        setTempTime(currentDate);
    }
    // android datetimepicker
    const [showFirst, setShowFirst] = useState(false);
    const [showSecond, setShowSecond] = useState(false);

    const showAndroidStartPicker = () => {
        setShowFirst(true)
    }
    const showAndroidEndPicker = () => {
        setShowSecond(true)
    }

    const onAndroidStart = (event, selectedDate) => {
        const currentDate = selectedDate || start;
        
        setShowFirst()

        setStart(currentDate);
        setStartTimeData(currentDate);
    }
    const onAndroidEnd = (event, selectedDate) => {
        const currentDate = selectedDate || end;
        
        setShowSecond()

        setEnd(currentDate);
        setEndTimeData(currentDate);
    }




    const renderCustomer = () => (
        <View style={styles.custommerPickercontainer}>
            <View style={{ paddingBottom: 40, paddingTop: 10 }}>
                <View style={styles.textContainer}>
                    <Text style={styles.textSubtitle}> 회원 선택 </Text>
                </View>
            </View>

            <TraineeList
                setSelectedTrainee={setSelectedTrainee}
                DATA = {TraineeListFromDB}
            />

            <View style={styles.confirm}>
                <TouchableOpacity onPressOut={() => { CustomerPicker.current.snapTo(1) }}>
                    <Text style={styles.textConfirm} >취소</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={() => {
                    CustomerPicker.current.snapTo(1)
                    setTrainee()
                }}>
                    <Text style={styles.textConfirm} >확인</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderStartTime = () => (
        <View style={styles.custommerPickercontainer}>
            <View style={{ paddingBottom: 40, paddingTop: 10 }}>
                <View style={styles.textContainer}>
                    <Text style={styles.textSubtitle}> 시작 시간 선택 </Text>
                </View>
            </View>
            <View>
                {show && (<DateTimePicker
                    testID="dateTimePicker"
                    value={start}
                    mode='time'
                    display="spinner"
                    minuteInterval={5}
                    onChange={onIosStart}
                    is24Hour={true}
                />
                )}
            </View>
            <View style={styles.confirm}>
                <TouchableOpacity onPressOut={() => { StartTimeRef.current.snapTo(1) }}>
                    <Text style={styles.textConfirm} >취소</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={() => {
                    StartTimeRef.current.snapTo(1)
                    setStartTimeData(temptime)
                }}>
                    <Text style={styles.textConfirm} >확인</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderEndTime = () => (
        <View style={styles.custommerPickercontainer}>
            <View style={{ paddingBottom: 40, paddingTop: 10 }}>
                <View style={styles.textContainer}>
                    <Text style={styles.textSubtitle}> 종료 시간 선택 </Text>
                </View>
            </View>
            <View>
                {show && 
                    (<DateTimePicker
                    testID="dateTimePicker"
                    value={end}
                    mode='time'
                    display="spinner"
                    minuteInterval={5}
                    onChange={onIosEnd}
                    />
                )}
            </View>

            <View style={styles.confirm}>
                <TouchableOpacity onPressOut={() => { EndTimeRef.current.snapTo(1) }}>
                    <Text style={styles.textConfirm} >취소</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={() => {
                    EndTimeRef.current.snapTo(1)
                    setEndTimeData(temptime)
                }}>
                    <Text style={styles.textConfirm} >확인</Text>
                </TouchableOpacity>
            </View>


        </View>
    );

    const renderItem = ({ item }) => {
        const onPressOutHandler = async () => {
            await AsyncStorage.setItem('chatRoomId', item.chatroomId)
            await AsyncStorage.setItem('traineeId', item._id)

            //flag 세워?
            //setIsNewFlag(true)
            navigation.navigate('Indiv', {screen: 'indiv_profile'})
            
        }
    
        return(
            <TouchableOpacity onPressOut={()=>{
                //indiv_profile로 이동
                onPressOutHandler()
            }}>
                <Item name={item.name} worktime={item.worktime} />
            </TouchableOpacity>
        )
    }

    const renderContent = () => (
        <View style={styles.bottomsheetcontainer}>
            <View style={styles.textRow}>
                <TouchableOpacity onPressOut={() => sheetRef.current.snapTo(1)}>
                    <FontAwesome name="times" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPressOut={() => {
                            sheetRef.current.snapTo(1)
                            saveDataLocalStorage()
                            //save DAta to db
                        }
                    }>
                    <FontAwesome name="check" size={25} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.texttitle}> 일정 추가하기 </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textContent}> {selectedDatePick.month}월 {selectedDatePick.date}일 {koreaday[selectedDatePick.day]}요일</Text>
            </View>

            <View style={styles.horizontalLine} />

            <View style={{ paddingBottom: 40, paddingTop: 10 }}>
                <View style={styles.textContainer}>
                    <Text style={styles.textSubtitle}> 회원 선택 </Text>
                </View>
                <View style={styles.textContainer}>
                    <TouchableOpacity onPressOut={() => {
                        CustomerPicker.current.snapTo(0)
                    }}>
                        <Text style={styles.textContent}>{temp === '' ? '회원을 선택하세요' : `${temp} 회원님`}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.textSubtitle}> 시간 선택 </Text>
            </View>
            <View style={styles.textContainer}>
                {
                    Platform.OS === 'ios' ?
                    <View style={styles.textRow}>
                        <TouchableOpacity onPressOut={() => {
                                setShow(true)
                                StartTimeRef.current.snapTo(0)}
                            }>
                            <Text style={styles.textContent}>{startTime.startTime}</Text>
                        </TouchableOpacity>
                        <Text> - </Text>
                        <TouchableOpacity onPressOut={() => {
                                setShow(true)
                                EndTimeRef.current.snapTo(0)}
                            }>
                            <Text style={styles.textContent}>{endTime.endTime}</Text>
                        </TouchableOpacity>
                        <View /><View /><View /><View /><View /><View /><View /><View /><View /><View />
                    </View> :
                    <View style={styles.textRow}>
                        <TouchableOpacity onPressOut={() => showAndroidStartPicker()}>
                            <Text style={styles.textContent}>{startTime.startTime}</Text>
                        </TouchableOpacity>
                        <Text> - </Text>
                        <TouchableOpacity onPressOut={() => showAndroidEndPicker()}>
                            <Text style={styles.textContent}>{endTime.endTime}</Text>
                        </TouchableOpacity>
                        <View /><View /><View /><View /><View /><View /><View /><View /><View /><View />
                    </View>
                    
                }
            </View>
            {showFirst && (
                <DateTimePicker
                testID="dateTimePicker"
                value={start}
                mode= "time"
                is24Hour={true}
                onChange={onAndroidStart}
                minuteInterval= {5}
                />
            )}
            {showSecond && (
                <DateTimePicker
                testID="dateTimePicker"
                value={end}
                mode= "time"
                is24Hour={true}
                onChange={onAndroidEnd}
                minuteInterval= {5}
                />
            )}
        </View>
    );


    const sheetRef = React.useRef(null);
    const CustomerPicker = React.useRef(null);
    const StartTimeRef = React.useRef(null);
    const EndTimeRef = React.useRef(null);

    return (
        <SafeAreaView style={{flex:1}}>
            <SafeAreaView style={styles.wrap}>
              <ScrollView>
                <View style = {styles.maincontainer}>
                <View style={{flex:1, marginTop: 12}}>
                  
                  {(dotFlag)&&
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                      <Loader />
                    </View>
                  }
                  {!dotFlag && dotDatesFromDB &&
                    <CalendarView 
                        setSelectedDatePick={setSelectedDatePick}
                        dotDatesFromDB={dotDatesFromDB}
                    />
                  }
                </View>
                </View>
                <View style = {styles.downcontainer}>
                <View style={styles.bottomcontainer}>
                    <TouchableOpacity
                        onPressOut={() => sheetRef.current.snapTo(0)}
                        style={styles.button}>
                        <CircleButton content={'+'} />
                    </TouchableOpacity>
                    <View style={styles.container}>
                        {//data 서버에서 가져오고 해당 날짜에 대한 일정이 있는지 체크
                            DATA.length === 0 ?
                                <View>
                                    <Text style={{color:'#AAAAAA'}}>이날의 일정이 없습니다</Text>
                                </View>
                            :<View>
                                <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item._id} />
                            </View>
                        }
                    </View>
                </View>
                </View>
              </ScrollView>
            </SafeAreaView>

            <BottomSheet
                ref={sheetRef}
                snapPoints={[500, 0, 0]}
                borderRadius={20}
                renderContent={renderContent}
                initialSnap={1}
            />
            <BottomSheet
                ref={CustomerPicker}
                snapPoints={[400, 0, 0]}
                borderRadius={20}
                renderContent={renderCustomer}
                initialSnap={1}
            />
            <BottomSheet
                ref={StartTimeRef}
                snapPoints={[400, 0, 0]}
                borderRadius={20}
                renderContent={renderStartTime}
                initialSnap={1}
            />
            <BottomSheet
                ref={EndTimeRef}
                snapPoints={[400, 0, 0]}
                borderRadius={20}
                renderContent={renderEndTime}
                initialSnap={1}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
    wrap: {
        flex: 15,
        backgroundColor: Colors.PRIMARY,
        margin: 0,
    },
    maincontainer: {
        flex:7,
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        margin: 5,
    },
    downcontainer: {
        flex:6,
        backgroundColor: Colors.WHITE,
        margin: 5,
        borderRadius: 15,

    },
    bottomcontainer: {
        flex: 6,
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 15,
    },
    button: {
        flexDirection: 'row',
        padding: 10,
        alignSelf: 'flex-end'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        //backgroundColor : 'lightgray',
        justifyContent: 'space-around',
        margin: 5,
        padding: 20
    },
    content: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //borderColor:'#eee',
        //borderBottomWidth:0.5,
        padding: 5,
    },
    fontCustommer: {
        fontSize: 20,
        marginBottom: 20,
    },
    fontWorktime: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomsheetcontainer: {
        backgroundColor: 'white',
        padding: 20,
        height: 500,
    },
    custommerPickercontainer: {
        backgroundColor: '#E3E3E3',
        padding: 20,
        height: 400
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    texttitle: {
        fontWeight: 'bold',
        fontSize: 25
    },
    textContent: {
        fontSize: 16,
        paddingLeft: 7,
    },
    textSubtitle: {
        fontSize: 16,
        paddingLeft: 3,
        fontWeight: 'bold'
    },
    textContainer: {
        //position: 'absolute',
        paddingTop: 16
    },
    horizontalLine: {
        paddingTop: 13,
        borderBottomColor: '#E3E3E3',
        borderBottomWidth: 1,
    },
    confirm: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-end',
        width: 150,
        paddingTop: 10,
        paddingBottom: 20,
        paddingRight: 10
    },
    textConfirm: {
        fontSize: 18,
        color: '#177EFB'
    }
})

export default Dash_cal;
