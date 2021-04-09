import  * as React from 'react';
import {useState} from 'react';
import {StyleSheet, SafeAreaView, Button, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Calendar from '../../components/Calendar';
import CircleButton from '../../components/CircleButton'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {FontAwesome} from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';

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

    const renderItem = ({ item }) => <Item custommer={item.custommer} worktime={item.worktime}/>;
    
    const renderContent = () => (
        <View style={styles.bottomsheetcontainer}>
          <View style={styles.textRow}>
            <TouchableOpacity onPress={()=> sheetRef.current.snapTo(1)}>
              <FontAwesome name="times" size={25} color="black"/>
            </TouchableOpacity>
            <FontAwesome name="check" size={25} color="black"/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.texttitle}> 일정 추가하기 </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textContent}> 4월 9일 금</Text>
          </View>
    
          <View style={styles.horizontalLine}/>
    
          <View style={{paddingBottom:40, paddingTop:10}}>
            <View style={styles.textContainer}>
              <Text style={styles.textSubtitle}> 회원 선택 </Text>
            </View>
            <View style={styles.textContainer}>
              <TouchableOpacity onPress={()=> CustomerPicker.current.snapTo(0)}>
                <Text style={styles.textContent}>김현재 고객님</Text>
              </TouchableOpacity>
            </View>
          </View>
    
          <View style={styles.textContainer}>
            <Text style={styles.textSubtitle}> 시간 선택 </Text>
          </View>
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={()=> TimeRef.current.snapTo(0)}>
              <Text style={styles.textContent}>00:00 - 00:00</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    
    const renderCustomer = () => (
    <View style={styles.custommerPickercontainer}>
        <View style={{paddingBottom:40, paddingTop:10}}>
        <View style={styles.textContainer}>
            <Text style={styles.textSubtitle}> 회원 선택 </Text>
        </View>
        </View>
        <View style={styles.confirm}>
            <Button style={styles.textContent} onPress={()=> CustomerPicker.current.snapTo(1)} title="취소"/>
            <Button style={styles.textContent} onPress={()=> CustomerPicker.current.snapTo(1)} title="확인"/>
        </View>
    </View>
    );

    const renderTime = () => (
    <View style={styles.custommerPickercontainer}>
        <View style={{paddingBottom:40, paddingTop:10}}>
        <View style={styles.textContainer}>
            <Text style={styles.textSubtitle}> 시간 선택 </Text>
        </View>
        </View>
        <View>
            <DateTimePicker
                testID="dateTimePicker"
                value={start}
                mode='time'
                is24Hour={true}
                display="default"
                onChange={startTime}
            />
            <DateTimePicker
                testID="dateTimePicker"
                value={end}
                mode='time'
                is24Hour={true}
                display="default"
                onChange={endTime}
            />
        </View>
        <View style={styles.confirm}>
            <Button style={styles.textContent} onPress={()=> TimeRef.current.snapTo(1)} title="취소"/>
            <Button style={styles.textContent} onPress={()=> TimeRef.current.snapTo(1)} title="확인"/>
        </View>
    </View>
    );

    const sheetRef = React.useRef(null);
    const CustomerPicker = React.useRef(null);
    const TimeRef = React.useRef(null);

    return (
        <>
        <SafeAreaView style={styles.wrap}>
            <Calendar/>
            <View style={styles.bottomcontainer}>
                <TouchableOpacity
                    onPress={() => sheetRef.current.snapTo(0)}
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
        />
        <BottomSheet
            ref={CustomerPicker}
            snapPoints={[400, 0, 0]}
            borderRadius={20}
            renderContent={renderCustomer}
        />
        <BottomSheet
            ref={TimeRef}
            snapPoints={[400, 0, 0]}
            borderRadius={20}
            renderContent={renderTime}
        />
        </>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1
    },
    bottomcontainer: {
        flex: 1.3,
        flexDirection: 'column',
        //backgroundColor : 'orange',
        alignItems: 'center',
        margin: 5,
        borderWidth:0.5
    },
    button: {
        flexDirection: 'row',
        padding: 10,
        alignSelf: 'flex-end'
    },
    container: {
        flex:1,
        flexDirection:'row',
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
    fontWorktime:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomsheetcontainer: {
        backgroundColor: 'white',
        padding: 20,
        height: 500, 
      },
      custommerPickercontainer:{
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
        paddingLeft: 3,
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
      }
})

  export default Dash_cal;