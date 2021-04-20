import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet , View, Text, Dimensions, TouchableOpacity } from 'react-native';
import GrayTextButton from '../../components/GrayTextButton';
import GreenButton from '../../components/GreenButton';
import UnderLinedTextInputBig from '../../components/UnderlinedTextInputBig';
import { Spacing, Colors, Typography } from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'
import axios from '../../axios/api';
import { GiftedAvatar } from 'react-native-gifted-chat';



export default ({navigation}) => {
  const [_id, set_id] = useState('')
  const [IsSearched, setIsSearched] = useState(false)
  const [DATAFromDB, setDATAFromDB] = useState([]);

  useFocusEffect(
    useCallback(() => {

      let isActive = true

      const getTraineeId = async () => {
        try {
          const id = await AsyncStorage.getItem('traineeId')
          
          if (isActive && (id !== _id)) {
            set_id(id)
            setIsSearched(false)
            console.log(`this is id for Mem_edit: ${id}`)
          }
        } catch (err) {
          console.log(err)
        }
      }

      getTraineeId()

      return () => {
        isActive = false
      }
    })
  )

  useEffect(()=>{
    if(!IsSearched){
      GetData()
    }
  })

  const GetData = () => {
    axios.get(`/trainee/${_id}`)
    .then(res => {
      console.log('now here!')
      let memData = {};
      memData.name = res.data.data.name
      memData.Hp = res.data.data.phoneNumber
      memData.address = res.data.data.address
      memData.age = res.data.data.age
      memData.height = res.data.data.height

      setDATAFromDB(memData);
      setIsSearched(true)
    })
    .catch(err => console.log(err))
  }


  const [Name, setName] = useState('')
  const [Hp, setHp] = useState('')
  const [Address, setAddress] = useState('')
  const [Age, setAge] = useState('')
  const [Height, setHeight] = useState('')


  return (
  <View style = {styles.container}>
    <View style = {styles.addcontainer}>
      <View style = {styles.headcontainer}>
        <Text style = {styles.header}>
          회원 수정하기
        </Text>
      </View>
      <View style = {styles.maincontent}>
        <View style = {styles.individual}>
          <Text style = {styles.leftname}> 이름: </Text>
          <UnderLinedTextInputBig placeholder={`이름: ${DATAFromDB.name}`}  value={Name} onChangeText={setName} />
        </View>

        <View style = {styles.individual}>
          <Text style = {styles.leftname}> H.P: </Text>
          <UnderLinedTextInputBig placeholder={`H.P: ${DATAFromDB.Hp}`}  value={Hp} onChangeText={setHp} keyboardType={'numeric'}/>
        </View>

        <View style = {styles.individual}>
          <Text style = {styles.leftname}> 주소: </Text>
          <UnderLinedTextInputBig placeholder={'주소: '} value={Address} onChangeText={setAddress}/>
        </View>

        <View style = {styles.individual}>  
          <Text style = {styles.leftname}> 나이: </Text>
          <UnderLinedTextInputBig placeholder={'나이: '} value={Age} onChangeText={setAge} keyboardType={'numeric'}/>
        </View>

        <View style = {styles.individual}>
          <Text style = {styles.leftname}> 키: </Text>
          <UnderLinedTextInputBig placeholder={'키: '} value={Height} onChangeText={setHeight} keyboardType={'numeric'}/>
        </View>
        <TouchableOpacity 
          style = {styles.greenbuttonconatiner}
          onPress = {()=> navigation.goBack()}//정보 보내기 필요
        >
          <View>
            <Text style = {styles.greenbutton}>
              완료하기
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  addcontainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
    width: '98%',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 0,
  },
  headcontainer:{
    alignItems: 'center',
    marginTop: Spacing.SCALE_48,
  },
  header: {
    fontSize: Typography.FONT_SIZE_32,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  maincontent:{
    alignSelf: 'center',
    marginBottom: Spacing.SCALE_80,
  },
  leftname: {
    fontSize: Typography.FONT_SIZE_24,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    alignSelf: 'flex-end',
    marginBottom: Spacing.SCALE_24,
  },
  individual:{
    marginBottom: Spacing.SCALE_20,
    flexDirection: 'row',
  },
  greenbuttonconatiner:{
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
  greenbutton: {
    fontSize: Typography.FONT_SIZE_28,
    color: Colors.WHITE,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
})