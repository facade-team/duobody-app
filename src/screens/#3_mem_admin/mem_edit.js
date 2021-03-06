import React, { useState, useEffect, useCallback } from 'react'
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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import axios from '../../axios/api'
import { GiftedAvatar } from 'react-native-gifted-chat'
import Loader from '../../components/Loader'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default ({ navigation }) => {
  const [_id, set_id] = useState('')
  const [IsSearched, setIsSearched] = useState(true)
  const [DATAFromDB, setDATAFromDB] = useState([])
  const [isNewFlag, setisNewFlag] = useState(true)

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      const getTraineeId = async () => {
        try {
          const id = await AsyncStorage.getItem('traineeId')

          if (isActive && id !== _id) {
            set_id(id)
            setIsSearched(false)
          }
        } catch (err) {
          console.log(err)
        }
      }

      getTraineeId()
      if (isNewFlag === true) {
        GetData()
        setName('')
        setHp('')
        setAddress('')
        setAge('')
        setHeight('')
      }
      setisNewFlag(false)

      return () => {
        isActive = false
      }
    })
  )

  useEffect(() => {
    if (!IsSearched) {
      GetData()
    }
  })

  const GetData = () => {
    axios
      .get(`/trainee/${_id}`)
      .then((res) => {
        let memData = {}
        memData.name = res.data.data.name
        memData.Hp = res.data.data.phoneNumber
        memData.address = res.data.data.address
        memData.age = res.data.data.age
        memData.height = res.data.data.height
        setDATAFromDB(memData)
        setIsSearched(true)
      })
      .catch((err) => console.log(err))
  }

  const [Name, setName] = useState('')
  const [Hp, setHp] = useState('')
  const [Address, setAddress] = useState('')
  const [Age, setAge] = useState('')
  const [Height, setHeight] = useState('')

  const SubmitControler = () => {
    let MemFixedData = {}
    if (Name === '') {
      MemFixedData.name = DATAFromDB.name
    } else {
      MemFixedData.name = Name
    }
    if (Hp === '') {
      MemFixedData.phoneNumber = DATAFromDB.Hp
    } else {
      MemFixedData.phoneNumber = Hp
    }
    if (Address === '') {
      MemFixedData.address = DATAFromDB.address
    } else {
      MemFixedData.address = Address
    }
    if (Age === '') {
      MemFixedData.age = DATAFromDB.age
    } else {
      MemFixedData.age = Age
    }
    if (Height === '') {
      MemFixedData.height = DATAFromDB.height
    } else {
      MemFixedData.height = Height
    }
    MemFixedData.traineeId = _id

    axios
      .put('trainee', MemFixedData)
      .then((res) => {
        Alert.alert(res.data.msg)
        navigation.navigate('Indiv')
        setisNewFlag(true)
      })
      .catch((err) => {
        Alert.alert(err.response.data.msg)
      })
  }

  return IsSearched !== true ? (
      <View stye={{flex:1, backgroundColor: Colors.WHITE, justifyContent: 'center', alignItems: 'center'}}>
          <Loader />
      </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.addcontainer}>
      <KeyboardAwareScrollView style = {{flex: 1}}>
        <View style={styles.headcontainer}>
          <Text style={styles.header}>?????? ????????????</Text>
        </View>

        <View style={styles.maincontent}>
          
          <View style={styles.individual}>
            <Text style={styles.leftname}> ??????: </Text>
            <UnderLinedTextInputBig
              placeholder={DATAFromDB.name}
              value={Name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.individual}>
            <Text style={styles.leftname}> H.P: </Text>
            <UnderLinedTextInputBig
              placeholder={DATAFromDB.Hp}
              value={Hp}
              onChangeText={setHp}
              keyboardType={'numeric'}
            />
          </View>

          <View style={styles.individual}>
            <Text style={styles.leftname}> ??????: </Text>
            <UnderLinedTextInputBig
              placeholder={DATAFromDB.address}
              value={Address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.individual}>
            <Text style={styles.leftname}> ??????: </Text>
            <UnderLinedTextInputBig
              placeholder={'' + DATAFromDB.age}
              value={Age}
              onChangeText={setAge}
              keyboardType={'numeric'}
            />
          </View>

          <View style={styles.individual}>
            <Text style={styles.leftname}>  ???:   </Text>
            <UnderLinedTextInputBig
              placeholder={'' + DATAFromDB.height}
              value={Height}
              onChangeText={setHeight}
              keyboardType={'numeric'}
            />
          </View>
          <TouchableOpacity
            style={styles.greenbuttonconatiner}
            onPress={SubmitControler} //?????? ????????? ??????
          >
            <View>
              <Text style={styles.greenbutton}>????????????</Text>
            </View>
          </TouchableOpacity>

        </View>
        </KeyboardAwareScrollView>
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
    justifyContent: 'space-evenly',
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
    fontSize: Typography.FONT_SIZE_24,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  maincontent: {
    alignSelf: 'center',
    marginTop: Spacing.SCALE_24,
  },
  leftname: {
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    marginBottom: Spacing.SCALE_12
  },
  individual: {
    marginTop: Spacing.SCALE_20,
    marginBottom: Spacing.SCALE_20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenbuttonconatiner: {
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    borderRadius: 15,
    width: Dimensions.get('window').width * 0.65,
    justifyContent: 'center',
    marginTop: Spacing.SCALE_12,
    marginBottom: Spacing.SCALE_24,
    alignSelf: 'center',
  },
  greenbutton: {
    fontSize: Typography.FONT_SIZE_20,
    paddingBottom: Spacing.SCALE_4,
    paddingTop: Spacing.SCALE_4,
    color: Colors.WHITE,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
})
