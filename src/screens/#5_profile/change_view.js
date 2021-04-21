import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, Button, Alert, Platform} from 'react-native';
import { Spacing, Typography, Colors } from '../../styles';
import InbodyChart from '../../components/InbodyChart';
import getDateString from '../../utils/getDateString';


import DateTimePicker from '@react-native-community/datetimepicker';
import axios from '../../axios/api'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import getDateStringWithNumber from '../../utils/getDateStringWithNumber'
import Loader from '../../components/Loader';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    backgroundColor: Colors.PRIMARY,
  },
  title: {
    fontSize: Typography.FONT_SIZE_24,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    alignSelf: 'center',
    paddingTop: Spacing.SCALE_20,
  },
  subTitleContainer: {
    padding: Spacing.SCALE_16,
    paddingTop: Spacing.SCALE_20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subTitle: {
    flexDirection: 'row',
    fontSize: Typography.FONT_SIZE_20,
    alignSelf: 'flex-start',
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  exbodyContainer: {
    width: '100%',
    paddingLeft: Spacing.SCALE_16,
    paddingRight: Spacing.SCALE_16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  graphContainer: {
    width: '100%',
  },
  whiteBox: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    borderColor: Colors.WHITE,
    paddingLeft: Spacing.SCALE_12,
    paddingRight: Spacing.SCALE_12,
    margin: Spacing.SCALE_4,
    borderWidth: 1,
    flex:1,
  }
})

function Change_view() {

  const [existStart, setExistStart] = useState('')
  const [existEnd, setExistEnd] = useState('')

  const [traineeId, setTraineeId] = useState('')
  const [isSearched, setIsSearched] = useState(false)
  const [isDataUpdated, setIsDataUpdated] = useState(true)
  const [traineeName, setTraineeName] = useState('')

  const callGetLatestInbodyAPI = async () => {
    //
    await axios.get(`/trainee/${traineeId}/inbody/latest`)
      .then( async (res) => {
        if (res.data.data) {
          const endDateStr = getDateString(res.data.data.date)
          const endDateObj = new Date(endDateStr)
          setEndDate(endDateStr)
          setCalEndDate(endDateObj)
          setExistEnd(endDateStr)
        }
        else {
          //Alert.alert('조회 가능한 데이터가 없습니다')
        }        
      })
      .catch((error) => {
        //console.log(error.response)
        //Alert.alert('조회 가능한 데이터가 없습니다')
      })
  }

  const callGetExbodyAPI = async () => {
    await axios.get(`/trainee/exbody/${traineeId}`)
      .then((res) => {
        //
        if (!res.data.data) {
          console.log('exbody가 없어요')
        }
        else {
          setExbody(res.data.data)
        }
      })
      .catch((err) => {
        //
        //console.log(err.response)
      })
  }

  const callGetInbodyByDateRangeAPI = async () => {
    //
    const endDateObj = new Date(endDate)
    const endDateStrWithNumber = getDateStringWithNumber(endDateObj)

    await axios.get(`/trainee/${traineeId}/inbody/date/20210101/${endDateStrWithNumber}`)
      .then((res) => {
        //
        if (res.data.data) {
          setTraineeName(res.data.data.name)
          setApiData(res.data.data.inbody)
          const startDateStr = getDateString(res.data.data.inbody[0].date)
          const startDateObj = new Date(startDateStr)
          setStartDate(startDateStr)
          setCalStartDate(startDateObj)
          setExistStart(startDateStr)
          setIsSearched(true)
          setIsDataUpdated(false)
          setNoData(false)
        }
        else {
          setIsSearched(true)
          setIsDataUpdated(false)
        }
      })
      .catch((err) => {
        //
        //console.log(err.response)
        setIsSearched(true)
        setIsDataUpdated(false)
      })
  }

  const [apiData, setApiData] = useState([])
  const [noData, setNoData] = useState(true)

  const [startDate, setStartDate] = useState('2021-01-01')
  const [endDate, setEndDate] = useState('2021-12-31')

  const [selectedDates, setSelectedDates] = useState([])

  const [selectedApiData, setSelectedApiData] = useState([])

  const [selectedWeight, setSelectedWeight] = useState([])
  const [selectedBMI, setSelectedBMI] = useState([])
  const [selectedFat, setSelectedFat] = useState([])
  const [selectedSkeletalMuscle, setSelectedSkeletalMuscle] = useState([])



  const [weightGraph, setWeightGraph] = useState(null)

  const [BMIGraph, setBMIGraph] = useState(null)
  
  const [fatGraph, setFatGraph] = useState(null)

  const [skeletalMuscleGraph, setSkeletalMuscleGraph] = useState(null)

  const [exbody, setExbody] = useState({
    exbodyBefore: '',
    exbodyAfter: '',
  })

  const onDatePickHandler = (sDate, eDate) => {
    setIsSearched(true)
    let sD = startDate
    let eD = endDate
    if (sDate === null) {
      eD = getDateString(eDate)
      setEndDate(eD)
    }
    else {
      sD = getDateString(sDate)
      setStartDate(sD)
    }
    // api data에서 start 와 end 사이의 날짜 뽑기
    let selectedApiDataArr = []
    apiData.map((data) => 
      (String(sD) <= getDateString(data.date)) && (getDateString(data.date) <= String(eD)) ? (
        selectedApiDataArr.push(data)
      )
      : 
      ''
    )
    setSelectedApiData(selectedApiDataArr)
    
    let datesArr = []
    selectedApiDataArr.map((data) => datesArr.push(getDateString(data.date)))
    setSelectedDates(datesArr)

    
    let weightArr = []
    let bmiArr = []
    let fatArr = []
    let skeletalMuscleArr = []

    selectedApiDataArr.map((data) => {
      weightArr.push(data.weight)
      bmiArr.push(data.bmi)
      fatArr.push(data.fat)
      skeletalMuscleArr.push(data.skeletalMuscle)
    })

    setSelectedWeight(weightArr)
    setSelectedBMI(bmiArr)
    setSelectedFat(fatArr)
    setSelectedSkeletalMuscle(skeletalMuscleArr)

    let prevWeight = weightGraph
    let prevBMI = BMIGraph
    let prevFat = fatGraph
    let prevSkeletalMuscle = skeletalMuscleGraph
    
    prevWeight.labels = datesArr
    prevBMI.labels = datesArr
    prevFat.labels = datesArr
    prevSkeletalMuscle.labels = datesArr

    prevWeight.datasets[0].data = weightArr
    prevBMI.datasets[0].data = bmiArr
    prevFat.datasets[0].data = fatArr
    prevSkeletalMuscle.datasets[0].data = skeletalMuscleArr

    setWeightGraph(prevWeight)
    setBMIGraph(prevBMI)
    setFatGraph(prevFat)
    setSkeletalMuscleGraph(prevSkeletalMuscle)
  }

  const [calStartDate, setCalStartDate] = useState(new Date('2021-01-01'))
  const [calEndDate, setCalEndDate] = useState(new Date('2021-12-31'))

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate
    if(getDateString(currentDate) <= endDate) {
      setShow(false)
      setCalStartDate(currentDate)
      setStartDate(getDateString(currentDate))
      onDatePickHandler(currentDate, null)
    }
    else {
      Alert.alert('잘못된 날짜 범위 입니다')
      let prevDate = startDate
      let prevCalDate = calStartDate
      setShow(false)
      setCalStartDate(prevCalDate)
      setStartDate(prevDate)
    }
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate
    if(startDate <= getDateString(currentDate)) {
      setShow(false)
      setCalEndDate(currentDate)
      setEndDate(getDateStringWithNumber(currentDate))
      onDatePickHandler(null, currentDate)
    }
    else {
      Alert.alert('잘못된 날짜 범위 입니다')
      let prevDate = endDate
      let prevCalDate = calEndDate
      setShow(false)
      setCalEndDate(prevCalDate)
      setEndDate(prevDate)
    }
  };

  const updateData = () => {
    let datesArr = []
    apiData.map((data) => datesArr.push(getDateString(data.date)))
    setSelectedDates(datesArr)

    let weightArr = []
    let bmiArr = []
    let fatArr = []
    let skeletalMuscleArr = []
    apiData.map((data) => {
      weightArr.push(data.weight)
      bmiArr.push(data.bmi)
      fatArr.push(data.fat)
      skeletalMuscleArr.push(data.skeletalMuscle)
    })

    setSelectedWeight(weightArr)
    setSelectedBMI(bmiArr)
    setSelectedFat(fatArr)
    setSelectedSkeletalMuscle(skeletalMuscleArr)

    let newWeightObj = {}
    let newBMIObj = {}
    let newFatObj = {}
    let newSkeletalMuscleObj = {}

    newWeightObj.labels = datesArr
    newWeightObj.datasets = [{data: weightArr}]

    newBMIObj.labels = datesArr
    newBMIObj.datasets = [{data: bmiArr}]

    newFatObj.labels = datesArr
    newFatObj.datasets = [{data: fatArr}]

    newSkeletalMuscleObj.labels = datesArr
    newSkeletalMuscleObj.datasets = [{data: skeletalMuscleArr}]

    setWeightGraph(newWeightObj)
    setBMIGraph(newBMIObj)
    setFatGraph(newFatObj)
    setSkeletalMuscleGraph(newSkeletalMuscleObj)

    setIsDataUpdated(true)
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      const getTraineeId = async () => {
        try {
          const id = await AsyncStorage.getItem('traineeId')
          if (isActive && (id !== traineeId)) {
            setTraineeId(id)
            setIsSearched(false)
            //setIsFocused(true)
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

  useEffect(() => {    
      if (!isSearched) {
        if (traineeId !== '') {
          callGetLatestInbodyAPI()
          callGetExbodyAPI()
          callGetInbodyByDateRangeAPI()
        }
      }
      if(!isDataUpdated) {
        updateData()
      }
  },)

  const RenderDate = (dateStr) => {
    const styles = StyleSheet.create ({
      renderTimeContainer: {
        paddingRight: Spacing.SCALE_8,
        paddingLeft: Spacing.SCALE_8,
        flexDirection:'row', 
        alignItems:'center', 
        marginTop: Spacing.SCALE_4, 
        backgroundColor:Colors.GRAY_LIGHT,
        justifyContent: 'center',
        borderRadius: 10,
      }
    })
    return (
      <View style={styles.renderTimeContainer}>
        <Text style={{fontSize: Typography.FONT_SIZE_16, justifyContent: 'center', alignSelf:'center', color: Colors.PRIMARY}}>
          {dateStr.dateStr}
        </Text>
      </View>
    )
  }

  const [show, setShow] = useState(false)
  const [isStart, setIsStart] = useState(true)


  const handelSetShow = (type) => {
    setIsStart(type)
    if (!show){
      setShow(true)
    }
  }

  return (
    !isSearched ? 
    <View style={{flex:1 ,justifyContent:'center', alignItems: 'center'}}>
      <Loader />
    </View>
    :
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.whiteBox} >
        <ScrollView>
          <Text style={styles.title}>{traineeName} 회원님 변화보기</Text>
          <View>
            <View style={styles.subTitleContainer}>
              <Text style={styles.subTitle}>Exbody</Text>
            </View>
            <View style={styles.exbodyContainer}>
              <Image
                style={{height: 100, width: 100, borderColor: Colors.GRAY_DARK, borderWidth: 1,}}
                source={exbody.exbodyBefore !== '' ? {uri: `${exbody.exbodyBefore}`} : ''}
              />
              <Image
                style={{height: 100, width: 100, borderColor: Colors.GRAY_DARK, borderWidth: 1,}}
                source={exbody.exbodyAfter !== '' ? {uri: `${exbody.exbodyAfter}`}  : ''}
              />
            </View>
          </View>
          <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>Graph</Text>
            {
              (Platform.OS !== 'ios') && (
                  <View style={{flexDirection: 'row', justifyContent:'flex-end', alignItems:'center'}}>
                      <TouchableOpacity onPressOut={() => handelSetShow(true)}>
                        <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'flex-end', marginRight: Spacing.SCALE_8}}>
                          <RenderDate dateStr={startDate} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPressOut={() => handelSetShow(false)}>
                        <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'flex-end', marginRight: Spacing.SCALE_8}}>
                          <RenderDate dateStr={endDate} />
                        </View>
                      </TouchableOpacity>
                  </View>
              )
            }
            {
              (Platform.OS !== 'ios') && show && (
                  <View>
                    {
                      isStart ? (
                        <DateTimePicker
                          style={{width: Spacing.SCALE_100,}}
                          testID="dateTimePicker"
                          value={calStartDate}
                          mode={'date'}
                          display="default"
                          onChange={(event, selectedDate) => onChangeStartDate(event, selectedDate)}
                        />
                      ) : (
                        <DateTimePicker
                          style={{width: Spacing.SCALE_100,}}
                          testID="dateTimePicker1"
                          value={calEndDate}
                          mode={'date'}
                          display="default"
                          onChange={(event, selectedDate) => onChangeEndDate(event, selectedDate)}
                        />
                      )
                    }
                  </View>
                )
            }
            {
              Platform.OS === 'ios' && (
                <View>
                  <DateTimePicker
                    style={{width: Spacing.SCALE_100,}}
                    testID="dateTimePicker"
                    value={calStartDate}
                    mode={'date'}
                    display="default"
                    onChange={onChangeStartDate}
                  />
                  <DateTimePicker
                    style={{width: Spacing.SCALE_100,}}
                    testID="dateTimePicker1"
                    value={calEndDate}
                    mode={'date'}
                    display="default"
                    onChange={onChangeEndDate}
                  />
                </View>
              )
            }
          </View>
          <View style={styles.graphContainer}>
            <View>
              <ScrollView
                horizontal={true}
                contentOffset={{x: 0, y: 0}}
                showsHorizontalScrollIndicator={false}
              >
                  {!noData && weightGraph && weightGraph.labels.length !== 0 && (
                    <View>
                      {(weightGraph === null) ? null : <View style={{width: Dimensions.get("window").width*(weightGraph.labels.length / 3.5), height:0.5, backgroundColor:Colors.GRAY}}></View>}
                      {(weightGraph === null) ? null : <InbodyChart data={weightGraph} idx={0} />}
                      {(BMIGraph === null) ? null : <InbodyChart data={BMIGraph} idx={1} />}
                      {(fatGraph === null) ? null : <InbodyChart data={fatGraph} idx={2} />}
                      {(skeletalMuscleGraph === null) ? null : <InbodyChart data={skeletalMuscleGraph} idx={3} />}
                    </View>
                  )
                  }
              </ScrollView>
            </View>
            {
              !noData && weightGraph && weightGraph.labels.length === 0 && (
              <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                <Text>조건에 맞는 데이터가 없어요!</Text>
                <View>
                  <Text>첫 날짜 : {existStart} / 최근 날짜 : {existEnd}</Text>
                </View>
              </View>
              )
            }
            {
              noData && weightGraph && weightGraph.labels.length === 0 && (
              <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                <Text>데이터가 없어요!</Text>
              </View>
              )
            }
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Change_view;

/*
  const [apiData, setApiData] = useState([
    {
      _id: "606d62456c64917180220613",
      trainerId: "606d58daf19b2e4064b8f900",
      traineeId: "606d5c9af19b2e4064b8f901",
      weight: 70 + Number((Math.random()*6).toFixed(1)),
      bmi: 18 + Number((Math.random()*6).toFixed(1)),
      fat: 10+ Number((Math.random()*6).toFixed(1)),
      skeletalMuscle: 33+ Number((Math.random()*6).toFixed(1)),
      date: "2021-04-07T07:39:43.638Z",
      __v: 0,
    },
    {
      _id: "606d62456c64917180220614",
      trainerId: "606d58daf19b2e4064b8f900",
      traineeId: "606d5c9af19b2e4064b8f901",
      weight: 70 + Number((Math.random()*6).toFixed(1)),
      bmi: 18 + Number((Math.random()*6).toFixed(1)),
      fat: 10+ Number((Math.random()*6).toFixed(1)),
      skeletalMuscle: 33+ Number((Math.random()*6).toFixed(1)),
      date: "2021-04-08T07:39:43.638Z",
      __v: 0,
    },
    {
      _id: "606d62456c64917180220615",
      trainerId: "606d58daf19b2e4064b8f900",
      traineeId: "606d5c9af19b2e4064b8f901",
      weight: 70 + Number((Math.random()*6).toFixed(1)),
      bmi: 18 + Number((Math.random()*6).toFixed(1)),
      fat: 10+ Number((Math.random()*6).toFixed(1)),
      skeletalMuscle: 33+ Number((Math.random()*6).toFixed(1)),
      date: "2021-04-09T07:39:43.638Z",
      __v: 0,
    },
    {
      _id: "606d62456c64917180220616",
      trainerId: "606d58daf19b2e4064b8f900",
      traineeId: "606d5c9af19b2e4064b8f901",
      weight: 70 + Number((Math.random()*6).toFixed(1)),
      bmi: 18 + Number((Math.random()*6).toFixed(1)),
      fat: 10+ Number((Math.random()*6).toFixed(1)),
      skeletalMuscle: 33+ Number((Math.random()*6).toFixed(1)),
      date: "2021-04-10T07:39:43.638Z",
      __v: 0,
    },
    {
      _id: "606d62456c64917180220617",
      trainerId: "606d58daf19b2e4064b8f900",
      traineeId: "606d5c9af19b2e4064b8f901",
      weight: 70 + Number((Math.random()*6).toFixed(1)),
      bmi: 18 + Number((Math.random()*6).toFixed(1)),
      fat: 10+ Number((Math.random()*6).toFixed(1)),
      skeletalMuscle: 33+ Number((Math.random()*6).toFixed(1)),
      date: "2021-04-11T07:39:43.638Z",
      __v: 0,
    },
    {
      _id: "606d62456c64917180220618",
      trainerId: "606d58daf19b2e4064b8f900",
      traineeId: "606d5c9af19b2e4064b8f901",
      weight: 70 + Number((Math.random()*6).toFixed(1)),
      bmi: 18 + Number((Math.random()*6).toFixed(1)),
      fat: 10+ Number((Math.random()*6).toFixed(1)),
      skeletalMuscle: 33+ Number((Math.random()*6).toFixed(1)),
      date: "2021-04-12T07:39:43.638Z",
      __v: 0,
    },
    {
      _id: "606d62456c64917180220619",
      trainerId: "606d58daf19b2e4064b8f900",
      traineeId: "606d5c9af19b2e4064b8f901",
      weight: 70 + Number((Math.random()*6).toFixed(1)),
      bmi: 18 + Number((Math.random()*6).toFixed(1)),
      fat: 10+ Number((Math.random()*6).toFixed(1)),
      skeletalMuscle: 33+ Number((Math.random()*6).toFixed(1)),
      date: "2021-04-13T07:39:43.638Z",
      __v: 0,
    },
    {
      _id: "606d62456c64917180220620",
      trainerId: "606d58daf19b2e4064b8f900",
      traineeId: "606d5c9af19b2e4064b8f901",
      weight: 70 + Number((Math.random()*6).toFixed(1)),
      bmi: 18 + Number((Math.random()*6).toFixed(1)),
      fat: 10+ Number((Math.random()*6).toFixed(1)),
      skeletalMuscle: 33+ Number((Math.random()*6).toFixed(1)),
      date: "2021-04-14T07:39:43.638Z",
      __v: 0,
    },
    {
      _id: "606d62456c64917180220621",
      trainerId: "606d58daf19b2e4064b8f900",
      traineeId: "606d5c9af19b2e4064b8f901",
      weight: 70 + Number((Math.random()*6).toFixed(1)),
      bmi: 18 + Number((Math.random()*6).toFixed(1)),
      fat: 10+ Number((Math.random()*6).toFixed(1)),
      skeletalMuscle: 33+ Number((Math.random()*6).toFixed(1)),
      date: "2021-04-15T07:39:43.638Z",
      __v: 0,
    },
    {
      _id: "606d62456c64917180220622",
      trainerId: "606d58daf19b2e4064b8f900",
      traineeId: "606d5c9af19b2e4064b8f901",
      weight: 70 + Number((Math.random()*6).toFixed(1)),
      bmi: 18 + Number((Math.random()*6).toFixed(1)),
      fat: 10+ Number((Math.random()*6).toFixed(1)),
      skeletalMuscle: 33+ Number((Math.random()*6).toFixed(1)),
      date: "2021-04-16T07:39:43.638Z",
      __v: 0,
    },
  ]
)
*/