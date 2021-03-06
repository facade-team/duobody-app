import axios from 'axios'
import React, { useState, useCallback, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native'
import GrayTextButton from '../../components/GrayTextButton'
import GreenButton from '../../components/GreenButton'
import UnderLinedTextInputBig from '../../components/UnderlinedTextInputBig'
import { Spacing, Colors, Typography } from '../../styles'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

export default ({ navigation }) => {
  const [Name, setName] = useState('')
  const [Hp, setHp] = useState('')
  const [Address, setAddress] = useState('')
  const [Age, setAge] = useState('')
  const [Height, setHeight] = useState('')
  const [isNewFlag, setisNewFlag] = useState(true)

  useFocusEffect(
    useCallback(() => {
      if (isNewFlag === true) {
        setName('')
        setHp('')
        setAddress('')
        setAge('')
        setHeight('')
      }
      setisNewFlag(false)
    })
  )

  useEffect(() => {})

  /*const handlerforsearch = async () => {
    await AsyncStorage.setItem('newloadflag', true)
  }
*/
  const SaveControler = () => {
    let newMember = {}
    newMember.name = Name
    newMember.phoneNumber = Hp
    newMember.address = Address
    newMember.age = Age
    newMember.height = Height

    axios
      .post('/trainee', newMember)
      .then((res) => {
        axios
          .post('/messenger',{
            traineeId:res.data.data._id
          })
          .then((res)=>{
            //res에 온 채팅방으로 초기 메시지 보내기
            axios
              .post(`/messenger/${res.data.data._id}`,{
                content: '환영합니다!'
              })
              .then((res) => {
                Alert.alert('회원 생성에 성공했습니다')
                setisNewFlag(true)
                navigation.goBack()
              })
              .catch((err) => {
                console.log(err.response.data.msg)
              })
          })
          .catch((err) => {
            Alert.alert(err.response.data.msg)
          })
      })
      .catch((err) => {
        console.log(err.response.data.msg)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.addcontainer}>
        <View style={styles.headcontainer}>
          <Text style={styles.header}>회원 추가하기</Text>
        </View>
        <View style={styles.maincontent}>
          <View style={styles.individual}>
            <UnderLinedTextInputBig
              placeholder={'이름'}
              value={Name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.individual}>
            <UnderLinedTextInputBig
              placeholder={'H.P'}
              value={Hp}
              onChangeText={setHp}
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.individual}>
            <UnderLinedTextInputBig
              placeholder={'주소'}
              value={Address}
              onChangeText={setAddress}
            />
          </View>
          <View style={styles.individual}>
            <UnderLinedTextInputBig
              placeholder={'나이'}
              value={Age}
              onChangeText={setAge}
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.individual}>
            <UnderLinedTextInputBig
              placeholder={'키'}
              value={Height}
              onChangeText={setHeight}
              keyboardType={'numeric'}
            />
          </View>
          <TouchableOpacity
            style={styles.greenbuttonconatiner}
            onPress={SaveControler}
          >
            <View>
              <Text style={styles.greenbutton}>완료하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

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
  headcontainer: {
    alignItems: 'center',
    marginTop: Spacing.SCALE_48,
  },
  header: {
    fontSize: Typography.FONT_SIZE_32,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  maincontent: {
    marginBottom: Spacing.SCALE_80,
  },
  individual: {
    marginBottom: Spacing.SCALE_16,
  },
  greenbuttonconatiner: {
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
