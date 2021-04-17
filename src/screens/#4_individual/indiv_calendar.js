import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Colors } from '../../styles';
import CalendarView from '../../components/Calendar';

function Indiv_calendar({ navigation }) {

  const today = new Date()
  
  const [selectedDate,setSelectedDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate()
  })

  return (
    <SafeAreaView style={styles.wrap}>
      <View style = {styles.upcontainer}>
      <View style={{flex:1}}>
        <CalendarView
          setSelectedDate={setSelectedDate}
        />
      </View>
      </View>
      <View style={{flex: 1, marginHorizontal: 5, borderWidth: 0.5,backgroundColor: Colors.WHITE}}>
        <View style={styles.container}>
          <Text>{selectedDate.year}년 {selectedDate.month}월 {selectedDate.day}일</Text>
          <Text>09:00~11:00</Text>
        </View>
        <View style={{flex:6, borderTopWidth:0.5, marginBottom: 5,}}>
          
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
