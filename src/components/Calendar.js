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
const currentDate = new Date().toISOString().slice(0, 10)
//console.log(currentDate)


const CalendarView = () => {
    let curr = console.log(String(currentDate))
    const [markedDates, setMarkedDates] = useState(
      {
        '2021-04-16': {selected: true, selectedColor: Colors.PRIMARY},
      },
    )
    return (
      <View style={{ margin: 5, paddingTop: 20, flex: 1, borderWidth:0.5}}>
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
            day.selected = true
            day.selectedColor = Colors.PRIMARY

            const selectedDate = day.dateString

            console.log('selected : ' + selectedDate)
            //const prevMarkedDatesState = [...markedDatesState]
            let newMarked = {}
            newMarked[selectedDate] = {selected: true, selectedColor: Colors.PRIMARY},
            setMarkedDates(newMarked)

            //console.log('marked State: ' + markedDatesState)

            //console.log('selected day', day)
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
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={substractMonth => substractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        /** Replace default month and year title with custom one. the function receive a date as parameter. */
        //renderHeader={(date) => {/*Return JSX*/}}
        />
      </View>
    )
}

export default CalendarView
