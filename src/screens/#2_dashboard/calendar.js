import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, FlatList, TouchableOpacity, Platform } from 'react-native';
import CalendarView from '../../components/Calendar';
import CircleButton from '../../components/CircleButton'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { FontAwesome } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import TraineeList from '../../components/TraineeList';
import { Colors } from '../../styles';


const Item = ({ name, worktime }) => (
    <View style={styles.content}>
        <Text style={styles.fontCustommer}>{name} 회원님</Text>
        <Text style={styles.fontWorktime}>{worktime}</Text>
    </View>
);

const Dash_cal = () => {
    
    // local storage에 데이터 저장하는 함수
    const saveDataLocalStorage = () => {
        //ID
        const randomid = Math.random().toString(36).substr(2,11);
        //NAME
        const newname = temp
        //WORKTIME
        const fullTime = startTime.startTime + ' - ' +  endTime.endTime

        const newData = {
            _id: randomid,
            name: newname,
            worktime: fullTime
        }

        //DATA에 push   
        setDATA(prevArray => [...prevArray, newData])

    }

    const today = new Date()
    const koreaday = ['일','월','화','수','목','금','토']
  
    const [selectedDate,setSelectedDate] = useState({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
        day: today.getDay()
    })

    const [DATA,setDATA] = useState([
        {
            _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            name: '김승우',
            worktime: '10 : 00 - 11 : 00'
        },
        {
            _id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            name: '최이현',
            worktime: '13 : 00 - 14 : 00'
        },
        {
            _id: '58694a0f-3da1-471f-bd96-145571e29d72',
            name: '김문기',
            worktime: '15 : 00 - 16 : 00'
        }
    ])

    const [selectedTrainee, setSelectedTrainee] = useState('')
    const [temp, setTemp] = useState('')

    const setTrainee = () => {
        setTemp(selectedTrainee)
    }

    
    //ios datetimepicker
    const [show,setShow] = useState(false);
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [temptime, setTempTime] = useState('')

    const [startTime, setStartTime] = useState({
        startTime: "시작시간"
    })
    const [endTime, setEndTime] = useState({
        endTime: "종료시간"
    })
    
    const setStartTimeData = (currentDate) => {
        const temp = currentDate

        const hours = (temp.getHours() < 10 ? '0' : '') + temp.getHours()
        const minutes = (temp.getMinutes() < 10 ? '0' : '') + temp.getMinutes()
    
        let res = {}
        res = hours + ' : ' + minutes
        setStartTime({
          startTime: res
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
          endTime: res
        })
        res = {}
    }
    const onIosStart = (event, selectedDate) => {
        // console.log("selectedDate : " + selectedDate)
        const currentDate = selectedDate || start;
        
        setShow(Platform.OS === 'ios')

        setStart(currentDate);
        setTempTime(currentDate);
    }
    const onIosEnd = (event, selectedDate) => {
        // console.log("selectedDate : " + selectedDate)
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
        // console.log("selectedDAte : " + selectedDate)
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

    const renderItem = ({ item }) => <Item name={item.name} worktime={item.worktime} />;

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
                        }
                    }>
                    <FontAwesome name="check" size={25} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.texttitle}> 일정 추가하기 </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textContent}> {selectedDate.month}월 {selectedDate.date}일 {koreaday[selectedDate.day]}요일</Text>
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
        <>
            <SafeAreaView style={styles.wrap}>
                <View style={{flex:1}}>
                    <CalendarView 
                        setSelectedDate={setSelectedDate}
                    />
                </View>
                <View style={styles.bottomcontainer}>
                    <TouchableOpacity
                        onPressOut={() => sheetRef.current.snapTo(0)}
                        style={styles.button}>
                        <CircleButton content={'+'} />
                    </TouchableOpacity>
                    <View style={styles.container}>
                        {selectedDate.date !== today.getDate() ? 
                        <View>
                            <Text style={{color:'#AAAAAA'}}>이날의 일정이 없습니다</Text>
                        </View>
                        :<FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item._id} />}
                    </View>
                </View>
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
        </>
    )
}

const styles = StyleSheet.create({
    
    wrap: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        margin: 5,
    },
    bottomcontainer: {
        flex: 1,
        flexDirection: 'column',
        //backgroundColor : 'orange',
        alignItems: 'center',
        borderWidth: 0.5,
        marginTop: 5
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
