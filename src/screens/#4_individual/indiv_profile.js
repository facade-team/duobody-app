import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native'
import { Spacing, Colors, Typography } from '../../styles'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from '../../axios/api'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../components/Loader'

const indiv_profile = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState('')
  const [gotData, setGotData] = useState(false)
  const [DATAFromDB, setDATAFromDB] = useState([])
  const [InbodyDATAFromDB, setInbodyDATAFromDB] = useState([])
  const [_id, set_id] = useState('')
  const [NoInbodyData, setNoInbodyData] = useState(true)
  const [IsSearched, setIsSearched] = useState(true)
  const [FormerID, setFormerID] = useState('')
  const [isNewFlag, setisNewFlag] = useState(true)

  const [dflag, setDflag] = useState(false)

  useFocusEffect(
    useCallback(() => {
      const getTraineeId = async () => {
        try {
          const id = await AsyncStorage.getItem('traineeId')
          if (true) {
            set_id(id)
            setIsSearched(false)
            setDflag(true)
          }
        } catch (err) {
          console.log(err)
        }
      }

      getTraineeId()
    }, [])
  )

  useEffect(() => {
    if(!IsSearched){
      getMemData()
      getMemInbodyData()
    }
  }, [dflag])

  const getMemData = () => {
    {
      axios
        .get(`/trainee/${_id}`)
        .then((res) => {
          let memData = {}
          memData._id = res.data.data._id
          memData.address = res.data.data.address
          memData.age = res.data.data.age
          memData.exbodyAfter = res.data.data.exbodyAfter
          memData.exbodyBefore = res.data.data.exbodyBefore
          memData.height = res.data.data.height
          memData.name = res.data.data.name
          memData.phoneNumber = res.data.data.phoneNumber
          memData.note = res.data.data.note
          memData.purpose = res.data.data.purpose

          setDATAFromDB(memData)
        })
        .catch((err) => console.log(err))
    }
  }

  const getMemInbodyData = () => {
    axios
      .get(`/trainee/${_id}/inbody/latest`)
      .then((res) => {
        let meminbodyData = {}
        meminbodyData.weight = res.data.data.weight
        meminbodyData.bmi = res.data.data.bmi
        meminbodyData.skeletalMuscle = res.data.data.skeletalMuscle
        meminbodyData.fat = res.data.data.fat
        meminbodyData.data = res.data.data

        setInbodyDATAFromDB(meminbodyData)
        setNoInbodyData(false)
        setIsSearched(true)
        setDflag(false)
      })
      .catch((err) => {
        setNoInbodyData(true)
        setIsSearched(true)
        setDflag(false)
      })
  }

  const MemEditControler = () => {
    setisNewFlag(true)
    navigation.navigate('Mem_Edit')
  }

  const ChangeAddControler = () => {
    setisNewFlag(true)
    navigation.navigate('Change_Add')
  }

  return !IsSearched ? (
    <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
      <Loader />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profilecontainer}>
          <View style={styles.nameandediticon}>
            <Text style={styles.name}>{DATAFromDB.name} ?????????</Text>
            <Icon
              name="create"
              size={30}
              color={Colors.BLACK}
              onPress={() => MemEditControler()}
            />
          </View>
          <View style={styles.goalbox}>
            {DATAFromDB.purpose ?
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.goaltext}>??????: {DATAFromDB.purpose}</Text>
            :<Text style={styles.goaltext}>??????: ??????</Text>
            }
            {DATAFromDB.note ?
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.goaltext}>????????????: {DATAFromDB.note}</Text>
            :<Text style={styles.goaltext}>????????????: ??????</Text>
            }
          </View>
          <View style={styles.infobox}>
            <Text style={styles.infotext}>H.P: {DATAFromDB.phoneNumber}</Text>
            <Text style={styles.infotext}>??????: {DATAFromDB.address}</Text>
            <Text style={styles.infotext}>??????: {DATAFromDB.age}???</Text>
            <Text style={styles.infotext}>???: {DATAFromDB.height}cm</Text>
          </View>
        </View>

        <View style={styles.inbodycontainer}>
          <View style={styles.exbodycontainer}>
            <Text style={styles.exbodytext}>EXBODY</Text>
            {DATAFromDB.exbodyBefore === undefined ? (
              <Image //null??????
                style={styles.exbodyimage}
                source={''}
              />
            ) : (
              <Image //null??? ?????????
                style={styles.exbodyimage}
                source={
                  DATAFromDB.exbodyAfter
                    ? { uri: `${DATAFromDB.exbodyAfter}` }
                    : { uri: `${DATAFromDB.exbodyBefore}` }
                }
              />
            )}
          </View>
          <View style={styles.wbmfcontainer}>
            <View style={{ alignSelf: 'flex-end' }}>
              <Icon
                name="add-circle"
                color={Colors.Black}
                size={Spacing.SCALE_32}
                onPress={ChangeAddControler}
              />
            </View>
            <View style={styles.linecontainer}>
              <View style={styles.wbmfinfo}>
                <Text style={styles.wbmftext}>?????????</Text>
                {NoInbodyData === true ? (
                  <Text style={styles.wbmftext}>??kg</Text>
                ) : (
                  <Text style={styles.wbmftext}>
                    {InbodyDATAFromDB.weight}kg
                  </Text>
                )}
              </View>
              <View style={styles.wbmfinfo}>
                <Text style={styles.wbmftext}>BMI</Text>
                {NoInbodyData === true ? (
                  <Text style={styles.wbmftext}>??kg/m??</Text>
                ) : (
                  <Text style={styles.wbmftext}>
                    {InbodyDATAFromDB.bmi}kg/m??
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.linecontainer}>
              <View style={styles.wbmfinfo}>
                <Text style={styles.wbmftext}>?????????</Text>
                {NoInbodyData === true ? (
                  <Text style={styles.wbmftext}>??kg</Text>
                ) : (
                  <Text style={styles.wbmftext}>
                    {InbodyDATAFromDB.skeletalMuscle}kg
                  </Text>
                )}
              </View>
              <View style={styles.wbmfinfo}>
                <Text style={styles.wbmftext}>?????????</Text>
                {NoInbodyData === true ? (
                  <Text style={styles.wbmftext}>??kg</Text>
                ) : (
                  <Text style={styles.wbmftext}>{InbodyDATAFromDB.fat}kg</Text>
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.greenbuttoncontainer}
            onPress={() => navigation.navigate('Change_View')}
          >
            <View>
              <Text style={styles.greenbutton}>????????????</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default indiv_profile

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  profilecontainer: {
    backgroundColor: Colors.WHITE,
    flex: 4,
    marginBottom: Spacing.SCALE_12,
    borderRadius: 20,
    width: Dimensions.get('window').width * 0.98,
    paddingVertical: Spacing.SCALE_12,
  },
  inbodycontainer: {
    backgroundColor: Colors.WHITE,
    flex: 5,
    alignItems: 'center',
    borderRadius: 20,
    width: Dimensions.get('window').width * 0.98,
    paddingVertical: Spacing.SCALE_12,
  },
  nameandediticon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.SCALE_4,
    marginRight: Spacing.SCALE_24,
    marginLeft: Spacing.SCALE_16,
    marginBottom: Spacing.SCALE_12,
  },
  name: {
    fontSize: Typography.FONT_SIZE_20,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  goalbox: {
    backgroundColor: Colors.GRAY_LIGHT,
    borderRadius: 15,
    marginLeft: Spacing.SCALE_16,
    marginRight: Spacing.SCALE_16,
    padding: Spacing.SCALE_8,
    paddingLeft: Spacing.SCALE_16,
    marginBottom: Spacing.SCALE_16,
  },
  goaltext: {
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_THIN,
    marginVertical: Spacing.SCALE_2,
  },
  infobox: {
    marginLeft: Spacing.SCALE_16,
  },
  infotext: {
    fontWeight: Typography.FONT_WEIGHT_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    marginBottom: Spacing.SCALE_8,
  },
  exbodycontainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '98%',
    marginBottom: Spacing.SCALE_16,
  },
  exbodytext: {
    fontSize: Typography.FONT_SIZE_24,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    marginLeft: Spacing.SCALE_28,
  },
  exbodyimage: {
    height: 120,
    width: 120,
    marginRight: Spacing.SCALE_28,
    borderColor: Colors.GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'stretch',
    borderWidth: 1,
  },
  wbmfcontainer: {
    flex: 2,
    width: Dimensions.get('window').width * 0.98,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.SCALE_12,
    marginBottom: Spacing.SCALE_12,
  },
  linecontainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  wbmfinfo: {
    alignItems: 'center',
  },
  wbmftext: {
    fontSize: Typography.FONT_SIZE_20,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    marginBottom: Spacing.SCALE_24,
  },
  greenbuttoncontainer: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    borderRadius: 25,
    width: Dimensions.get('window').width * 0.65,
    justifyContent: 'center',
    marginTop: Spacing.SCALE_12,
    marginBottom: Spacing.SCALE_24,
  },
  greenbutton: {
    fontSize: Typography.FONT_SIZE_20,
    paddingBottom: Spacing.SCALE_4,
    paddingTop: Spacing.SCALE_4,
    color: Colors.WHITE,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
})
