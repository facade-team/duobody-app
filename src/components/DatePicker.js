import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import { Spacing, Typography, Colors } from '../styles'

export default class MyDatePicker extends Component {
  constructor(props){
    super(props)
    this.state = {date:"2021-04-14"}
  }

  render(){
    return (
      <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY / MM / DD"
        minDate="2021-01-01"
        maxDate="2021-12-31"
        confirmBtnText="확인"
        cancelBtnText="취소"
        iconSource={require('../assets/calendar.png')}
        customStyles={{
          dateIcon: {
            position: 'relative',
            left: Spacing.SCALE_12,
            marginLeft: 0,
            marginRight: Spacing.SCALE_12,
          },
          dateInput: {
            marginLeft: 0,
          },
          dateText: {
            fontSize: Typography.FONT_SIZE_20,
            fontWeight: Typography.FONT_WEIGHT_BLACK,
          },
          btnTextConfirm: {
            color: Colors.PRIMARY,
            fontWeight: Typography.FONT_WEIGHT_BOLD,
          },
          btnTextCancel: {
            color: Colors.BLACK,
            fontWeight: Typography.FONT_WEIGHT_BOLD,
          }
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
    )
  }
}