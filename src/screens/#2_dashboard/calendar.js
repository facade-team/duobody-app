import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Calendar from '../../components/Calendar';
import CircleButton from '../../components/CircleButton'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { FontAwesome } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import TraineeList from '../../components/TraineeList';


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        custommer: '김oo 고객님',
        worktime: '10:00 - 11:00'
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        custommer: '이oo 고객님',
        worktime: '13:00 - 14:00'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        custommer: '정oo 고객님',
        worktime: '15:00 - 16:00'
    }
];

const Item = ({ custommer, worktime }) => (
    <View style={styles.content}>
        <Text style={styles.fontCustommer}>{custommer}</Text>
        <Text style={styles.fontWorktime}>{worktime}</Text>
    </View>
);

const Dash_cal = () => {
    const [toggleState, setToggleState] = useState(false)


    const [selectedTrainee, setSelectedTrainee] = useState('')
    const [temp, setTemp] = useState('')

    const setTrainee = () => {
        setTemp(selectedTrainee)
    }

    const [result, setResult] = useState(
        {
            resultStart: "시작시간",
            resultEnd: "종료시간"
        }
    )

    const setTimeData = (flag) => {
        let temp = new Date()

        if (flag === 1) {
            temp = start
        } else {
            temp = end
        }

        const hours = (temp.getHours() < 10 ? '0' : '') + temp.getHours()
        const minutes = (temp.getMinutes() < 10 ? '0' : '') + temp.getMinutes()


        let res = {}
        res = hours + ' : ' + minutes
        console.log("res : " + res)

        console.log("before setResult : " + result.resultStart + result.resultEnd)

        setResult((state) => {
            if (flag === 1) {
                return {
                    resultStart: res,
                    resultEnd: state.resultEnd
                }
            }
            if (flag === 0) {
                return {
                    resultStart: state.resultStart,
                    resultEnd: res
                }
            }
        });

        console.log("after setResult : " + result.resultStart + result.resultEnd)

        res = {}

    }

    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    const startTime = (event, selectedDate) => {
        const currentDate = selectedDate || start;
        setStart(currentDate);
    };


    const endTime = (event, selectedDate) => {
        const currentDate = selectedDate || end;
        setEnd(currentDate);
    };

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
                <DateTimePicker
                    testID="dateTimePicker"
                    value={start}
                    mode='time'
                    display="spinner"
                    minuteInterval={5}
                    onChange={startTime}
                />
            </View>
            <View style={styles.confirm}>
                <TouchableOpacity onPressOut={() => { StartTimeRef.current.snapTo(1) }}>
                    <Text style={styles.textConfirm} >취소</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={() => {
                    StartTimeRef.current.snapTo(1)
                    setTimeData(1)
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
                <DateTimePicker
                    testID="dateTimePicker"
                    value={end}
                    mode='time'
                    display="spinner"
                    minuteInterval={5}
                    onChange={endTime}
                />
            </View>

            <View style={styles.confirm}>
                <TouchableOpacity onPressOut={() => { EndTimeRef.current.snapTo(1) }}>
                    <Text style={styles.textConfirm} >취소</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={() => {
                    EndTimeRef.current.snapTo(1)
                    setTimeData(0)
                }}>
                    <Text style={styles.textConfirm} >확인</Text>
                </TouchableOpacity>
            </View>


        </View>
    );

    const renderItem = ({ item }) => <Item custommer={item.custommer} worktime={item.worktime} />;

    const renderContent = () => (
        <View style={styles.bottomsheetcontainer}>
            <View style={styles.textRow}>
                <TouchableOpacity onPressOut={() => sheetRef.current.snapTo(1)}>
                    <FontAwesome name="times" size={25} color="black" />
                </TouchableOpacity>
                <FontAwesome name="check" size={25} color="black" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.texttitle}> 일정 추가하기 </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textContent}> 4월 10일 토</Text>
            </View>

            <View style={styles.horizontalLine} />

            <View style={{ paddingBottom: 40, paddingTop: 10 }}>
                <View style={styles.textContainer}>
                    <Text style={styles.textSubtitle}> 회원 선택 </Text>
                </View>
                <View style={styles.textContainer}>
                    <TouchableOpacity onPressOut={() => {
                        //setToggleState(true)
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
                <View style={styles.textRow}>
                    <TouchableOpacity onPressOut={() => StartTimeRef.current.snapTo(0)}>
                        <Text style={styles.textContent}>{result.resultStart}</Text>
                    </TouchableOpacity>
                    <Text> - </Text>
                    <TouchableOpacity onPressOut={() => EndTimeRef.current.snapTo(0)}>
                        <Text style={styles.textContent}>{result.resultEnd}</Text>
                    </TouchableOpacity>
                    <View /><View /><View /><View /><View /><View /><View /><View /><View /><View />
                </View>
            </View>
        </View>
    );


    const sheetRef = React.useRef(null);
    const CustomerPicker = React.useRef(null);
    const StartTimeRef = React.useRef(null);
    const EndTimeRef = React.useRef(null);


    return (
        <>
            <SafeAreaView style={styles.wrap}>
                <Calendar />
                <View style={styles.bottomcontainer}>
                    <TouchableOpacity
                        onPressOut={() => sheetRef.current.snapTo(0)}
                        style={styles.button}>
                        <CircleButton content={'+'} />
                    </TouchableOpacity>
                    <View style={styles.container}>
                        <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
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
        margin: 5
    },
    bottomcontainer: {
        flex: 1.3,
        flexDirection: 'column',
        //backgroundColor : 'orange',
        alignItems: 'center',
        margin: 5,
        borderWidth: 0.5
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