import { createAndSavePDF, createHTML, createReact } from '../../utils/helpers'
import { View, Button, StyleSheet, Dimensions, SafeAreaView, Text } from 'react-native'
import { AuthContext } from '../../services/AuthContext'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Colors, Spacing, Typography } from '../../styles';
import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../utils/constants';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../../axios/api';
import getDateStringWithNumber from '../../utils/getDateStringWithNumber';
import AsyncStorage from '@react-native-community/async-storage';

const onPress = () => {}

function indiv_etc({ navigation }) {

  const [startDate, setStartDate] = useState('2021-01-01')
  const [endDate, setEndDate] = useState('2021-12-31')

  const [apiData, setApiData] = useState([])
  const [noData, setNoData] = useState(true)

  const [existStart, setExistStart] = useState('')
  const [existEnd, setExistEnd] = useState('')
  const [traineeId, setTraineeId] = useState('')
  const [isSearched, setIsSearched] = useState(true)
  const [flag, setFlag] = useState(true)
  const [latestInbody, setLatestInbody] = useState(null)
  const [traineeName, setTraineeName] = useState('')

  const [exbody, setExbody] = useState({
    exbodyBefore: '',
    exbodyAfter: '',
  })

  const [weightGraph, setWeightGraph] = useState(null)

  const [BMIGraph, setBMIGraph] = useState(null)

  const [fatGraph, setFatGraph] = useState(null)

  const [skeletalMuscleGraph, setSkeletalMuscleGraph] = useState(null)

  useFocusEffect(
    useCallback(() => {
      const getTraineeId = async () => {
        try {
          const id = await AsyncStorage.getItem('traineeId')
          console.log(id)
          if (true) {
            setTraineeId(id)
            setIsSearched(false)
            setFlag(false)
            console.log(id)
          }
        } catch (err) {
          console.log(err)
        }
      }
      console.log('useFocusEffect')
      getTraineeId()
    }, [])
  )

  useEffect(() => {
    if(!isSearched){
      callAPIs()
    }
  }, [flag])

  const callAPIs = () => {
    axios.get(`/trainee/${traineeId}/inbody/latest`)
      .then((res) => {
        if(res.data.data){
          setLatestInbody(res.data.data)
          console.log('latest inbody')
          console.log(res.data.data)
          const endDateStr = getDateString(res.data.data.date)
          setEndDate(endDateStr)
  
          callGetExbodyAPI()
        }
        else {
          setEndDate(getDateString(new Date()))
          setNoData(true)
          setTraineeName('')

          callGetExbodyAPI()
        }
      })
      .catch((err) => {
        console.log(err.response)
        callGetExbodyAPI()
        setNoData(true)
        setTraineeName('')
        setIsSearched(true)
        setFlag(true)
      })
  }

  const callGetExbodyAPI = () => {
    axios
      .get(`/trainee/exbody/${traineeId}`)
      .then((res) => {
        //
        if (!res.data.data) {
          console.log('exbody가 없어요')
          setNoData(true)
          callGetInbodyByDateRangeAPI()
        } else {
          console.log(res.data.data)
          setExbody(res.data.data)
          callGetInbodyByDateRangeAPI()
        }
      })
      .catch((err) => {
        //
        callGetInbodyByDateRangeAPI()
        setNoData(true)
        setIsSearched(true)
        setFlag(true)
        //console.log(err.response)
      })
  }

  const callGetInbodyByDateRangeAPI = () => {
    //
    getDateStringWithNumber
    const endDateObj = new Date(endDate)
    const endDateStrWithNumber = getDateStringWithNumber(endDateObj)

    axios
      .get(`/trainee/${traineeId}/inbody/date/20210101/${endDateStrWithNumber}`)
      .then((res) => {
        //
        console.log('callGetInbodyByDateRangeAPI')
        if (res.data.data) {
          console.log(res.data.data.inbody)
          setTraineeName(res.data.data.name)
          setApiData(res.data.data.inbody)
          const startDateStr = getDateString(res.data.data.inbody[0].date)
          setStartDate(startDateStr)
          setExistStart(startDateStr)

          setIsSearched(false)
          setIsDataUpdated(false)
          setNoData(false)
          setIsSearched(true)
          setFlag(true)

          // console.log(res.data.data.inbody)
        } else {
          setIsDataUpdated(false)
          setIsSearched(true)
          setFlag(true)
        }
      })
      .catch((err) => {
        //
        //console.log(err.response)
        setIsSearched(true)
        setIsDataUpdated(false)
        setFlag(true)
      })
  }

  useEffect(() => {
    console.log(latestInbody)
    console.log(traineeName)
  })

  const { signOut } = useContext(AuthContext)

  const makePortfolio = () => {
    /*여기에서 자유롭게 테스트 해보면 됨*/
    
    createAndSavePDF(createHTML({
      content:`
      <h1 style="text-align: center;">
        <strong>DUOBODY 포트폴리오</strong>
      </h1>
      <p style="text-align: center;">
        ${traineeName} 회원님의 최근 BMI, 체지방, 골격근량, 체중은 다음과 같습니다.
      </p>

      <p style="text-align: center;">
        BMI: ${latestInbody.bmi}kg/m\xB2 / 체지방: ${latestInbody.fat}kg / 골격근량: ${latestInbody.skeletalMuscle}kg / 체중: ${latestInbody.weight}kg
      </p>

      <p style="text-align: center;">
        <strong>Exbody</strong>
      <p/>
      <p style="text-align: center;">
        <text>날짜 | 2021-04-20</text>
      </p>
      `
    }))
    //createAndSavePDF(createHTML({content: 'hello world!!!!!!!!!!!!!!!!'}))
    //console.log(createHTML({content: 'hello world!!!!!!!!!!!!!!!!'}))
  }

  const logout = () => {
    signOut()
  }
  
  const editGoal = () => {
    console.log('목표수정')
  }
  const editUniqueness = () => {
    console.log('특이사항 수정') 
  }


  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title}>테스트 회원님</Text>
          <TouchableOpacity onPressOut={()=>logout()}>
            <FontAwesome name="sign-out" size={33} style={{paddingRight:Spacing.SCALE_16}} />
          </TouchableOpacity>
        </View>

        <View style={{alignItems:'center'}}>
          <View style={styles.defaultcontainer}>
            <View style={{flex:2}}>
              <Text style={styles.subtitle}>목표</Text>
              <View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.text}>이러쿵저러쿵</Text>
                  <TouchableOpacity
                    onPressOut={()=>{
                      editGoal()
                    }}
                  >
                    <FontAwesome name="edit" size={25}/>
                  </TouchableOpacity>
                </View>
                <View style={styles.horizontalLine}/>
              </View>
            </View>
            <View style={{flex:2}}>
              <Text style={styles.subtitle}>특이사항</Text>
              <View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.text}>이러쿵저러쿵</Text>
                  <TouchableOpacity
                    onPressOut={()=>{
                      editUniqueness()
                    }}
                  >
                    <FontAwesome name="edit" size={25}/>
                  </TouchableOpacity>
                </View>
                <View style={styles.horizontalLine}/>
              </View>
            </View>
            <View style={{flex:1}}>
              <Text style={styles.subtitle}>PDF 내보내기</Text>
              <View>
                  <TouchableOpacity
                    onPressOut={()=>{
                      makePortfolio()
                    }}
                  >
                    <Text style={{
                      textDecorationLine: 'underline',
                      fontSize: Typography.FONT_SIZE_16,
                      fontWeight: Typography.FONT_WEIGHT_REGULAR,
                       }}>내보내기</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrap:{
    flex:1,
    backgroundColor: Colors.PRIMARY,
    padding: 2,
    alignItems: 'center'
  },
  content: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    borderRadius: 20,
    width: Dimensions.get('window').width * 0.98,
  },
  subtitle:{
    fontSize: Typography.FONT_SIZE_20,
    fontWeight: Typography.FONT_WEIGHT_BLACK,
    paddingBottom: Spacing.SCALE_20,

  },
  text:{
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_REGULAR,
  },
  list: {
    justifyContent:'center',
    alignItems:'center',
    flexDirection: 'row',
    width: Dimensions.get('screen').width * 0.9,
    height: Dimensions.get('screen').height * 0.06,
    margin:4,
    backgroundColor: Colors.WHITE,
    borderWidth:2,
    borderRadius: 8,
    borderColor : Colors.PRIMARY,
  },
  defaultcontainer: {
    borderRadius: 20,
    width: Dimensions.get('window').width * 0.98,
    height:Dimensions.get('window').width * 1.3,
    padding: Spacing.SCALE_20,
    marginTop: Spacing.SCALE_20,
  },
  row:{
    flexDirection:'row',
    paddingTop: Spacing.SCALE_20,
    alignItems:'center',
    justifyContent:'space-between'
  },
  title:{
    fontSize: Typography.FONT_SIZE_24,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    paddingLeft: Spacing.SCALE_16
  },
  horizontalLine: {
    borderBottomColor: Colors.PRIMARY,
    borderBottomWidth: 1,
},
})

export default indiv_etc
