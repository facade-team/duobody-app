import React, {Component, useState} from 'react';
import {View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { Colors } from '../styles';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일', '월','화','수','목','금','토'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

// 날짜를 눌렀을 때 이벤트 추가해야 됨
//const DateObject = new Date().toISOString().slice(0, 10)

const CalendarView = ({setSelectedDate}) => {
    // let curr = console.log(String(currentDate))
    const [markedDates, setMarkedDates] = useState({})

    return (
      <View style={{ flex: 1, paddingTop: 5,}}>
        <Calendar
        //선택날짜 마킹
        markedDates={markedDates}

        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2021-01-01'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2021-12-31'}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={
          (day) => {
            //console.log(day)
            const temp = day.dateString
            
            let newMarked = {}
            newMarked[temp] = {selected: true, selectedColor: Colors.PRIMARY}
            setMarkedDates(newMarked)

            const tempo = new Date(day.dateString).getDay()
            //console.log(tempo)
            //day object 넘겨주기
            setSelectedDate({
              year: day.year,
              month: day.month,
              date: day.day,
              day: new Date(day.dateString).getDay()
            })
          }
        }

        // Handler which gets executed on day long press. Default = undefined
        // onDayLongPress={(day) => {console.log('selected day', day)}}
        
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {console.log('month changed', month)}}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={0}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={substractMonth => substractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        
        /** Replace default month and year title with custom one. the function receive a date as parameter. */
        //renderHeader={(date) => {/*Return JSX*/}}
        />
      </View>
    )
}

export default CalendarView
