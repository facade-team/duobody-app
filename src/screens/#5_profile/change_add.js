import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography } from '../../styles';
import MyDatePicker from '../../components/DatePicker';
import UnderLinedTextInputBig from '../../components/UnderlinedTextInputBig';


const change_add = ({navigation}) => {
  const [weightText, setWeightText] = useState('');
  const [BMIText, setBMIText] = useState('');
  const [muscleText, setMuscleText] = useState('');
  const [fatText, setFatText] = useState('');
return (
  <View style = {styles.container}>
    <View style = {styles.maincontainer}>
      <View style = {styles.name}>
        <Text style = {styles.nametext}>
          ㅇㅇㅇ 회원님
        </Text>
      </View>
      
      <View style = {styles.dayselect}>
        <MyDatePicker/>
      </View>

      <View style = {styles.wbmfcontainer}>
        <View style = {styles.infoinput}>
          <View style = {styles.individual}>
            <UnderLinedTextInputBig placeholder={'몸무게'} value = {weightText} onChangeText={setWeightText}/>
          </View>
          <View style = {styles.individual}>
            <UnderLinedTextInputBig placeholder={'BMI'} value = {BMIText} onChangeText={setBMIText}/>
          </View>
          <View style = {styles.individual}>
            <UnderLinedTextInputBig placeholder={'골격근'} value = {muscleText} onChangeText={setMuscleText}/>
          </View>
          <View style = {styles.individual}>
            <UnderLinedTextInputBig placeholder={'체지방'} value = {fatText} onChangeText={setFatText}/>
          </View>
        </View>
      </View>

      <TouchableOpacity 
          style = {styles.addexbody}
          onPress = {()=> navigation.navigate('Change_View')}>
        <View>
          <Text style = {styles.greenbutton}>
            Ex-Body 추가
          </Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style = {styles.addexbody_2}
          onPress = {()=> navigation.goBack()}>
        <View>
          <Text style = {styles.greenbutton}>
            확인
          </Text>
        </View>
        </TouchableOpacity>
    </View>
  </View>
)}


export default change_add;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
  },
  maincontainer: {
    flex: 2,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    width: '98%',
  },
  name: {
    paddingVertical: Spacing.SCALE_36,
    alignItems: 'center',
  },
  nametext: {
    fontSize: Typography.FONT_SIZE_28,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  dayselect: {
    alignItems: 'center',
    paddingBottom: Spacing.SCALE_48,
  },
  wbmfcontainer:{
    alignItems: 'center',
  },
  individual:{
    paddingBottom: Spacing.SCALE_24,
  },
  addexbody:{
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    borderRadius: 15,
    width: Spacing.SCALE_200,
    height: Dimensions.get('window').height * 0.06,
    justifyContent: 'center',
    marginTop: Spacing.SCALE_12,
    marginBottom: Spacing.SCALE_24,
    alignSelf: 'center',
  },
  addexbody_2:{
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    borderRadius: 15,
    width: Spacing.SCALE_200,
    height: Dimensions.get('window').height * 0.06,
    justifyContent: 'center',
    marginTop: Spacing.SCALE_32,
    marginBottom: Spacing.SCALE_24,
    alignSelf: 'center',
  },
  greenbutton: {
    fontSize: Typography.FONT_SIZE_28,
    color: Colors.WHITE,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  }
})