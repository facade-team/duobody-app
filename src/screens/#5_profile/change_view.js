import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import { Spacing, Typography, Colors } from '../../styles';
import InbodyChart from '../../components/InbodyChart';
import getDateString from '../../utils/getDateString';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height
  },
  title: {
    fontSize: Typography.FONT_SIZE_24,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    alignSelf: 'center',
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
  }
})

function Change_view({ navigation, valueFormatter, ...props }) {

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

  const [startDate, setStartDate] = useState('2021-04-07')
  const [endDate, setEndDate] = useState('2021-04-14')

  const [selectedDates, setSelectedDates] = useState([])

  const [selectedApiData, setSelectedApiData] = useState([])

  const [selectedWeight, setSelectedWeight] = useState([])
  const [selectedBMI, setSelectedBMI] = useState([])
  const [selectedFat, setSelectedFat] = useState([])
  const [selectedSkeletalMuscle, setSelectedSkeletalMuscle] = useState([])


  useEffect(() => {
    const date = getDateString(apiData[0].date)
  })

  const [weightGraph, setWeightGraph] = useState({
      labels: ["4/1", "4/2", "4/3", "4/4", "4/5", "4/6", "4/7", "4/8", "4/9", "4/10", "4/11", "4/12"],
      datasets: [
        {
          data: [
            30.5,
            32,
            31.6,
            32.4,
            33.5,
            34,
            30.5,
            32,
            31.6,
            32.4,
            33.5,
            34,
          ]
        }
      ]
    }
  )

  const [BMIGraph, setBMIGraph] = useState({
    labels: ["4/1", "4/2", "4/3", "4/4", "4/5", "4/6", "4/7", "4/8", "4/9", "4/10", "4/11", "4/12"],
    datasets: [
      {
        data: [
          35.5,
          31,
          32.6,
          37.4,
          43.5,
          44,
          40.5,
          37,
          37.6,
          39.4,
          35.5,
          41,
        ]
      }
    ]
  })
  
  const [fatGraph, setFatGraph] = useState({
      labels: ["4/1", "4/2", "4/3", "4/4", "4/5", "4/6", "4/7", "4/8", "4/9", "4/10", "4/11", "4/12"],
      datasets: [
        {
          data: [
            30.5,
            32,
            31.6,
            32.4,
            33.5,
            34,
            30.5,
            32,
            31.6,
            32.4,
            33.5,
            34,
          ]
        }
      ]
    }
  )

  const [skeletalMuscleGraph, setSkeletalMuscleGraph] = useState({
    labels: ["4/1", "4/2", "4/3", "4/4", "4/5", "4/6", "4/7", "4/8", "4/9", "4/10", "4/11", "4/12"],
    datasets: [
      {
        data: [
          35.5,
          31,
          32.6,
          37.4,
          43.5,
          44,
          40.5,
          37,
          37.6,
          39.4,
          35.5,
          41,
        ]
      }
    ]
  })

  const data1 = {
    labels: ["4/1", "4/2", "4/3", "4/4", "4/5", "4/6", "4/7", "4/8", "4/9", "4/10", "4/11", "4/12"],
    datasets: [
      {
        data: [
          35.5,
          31,
          32.6,
          37.4,
          43.5,
          44,
          40.5,
          37,
          37.6,
          39.4,
          35.5,
          41,
        ]
      }
    ]
  }

  const onDatePickHandler = () => {
    // api data에서 start 와 end 사이의 날짜 뽑기
    let selectedApiDataArr = []
    apiData.map((data) => 
      (String(startDate) <= getDateString(data.date)) && (getDateString(data.date) <= String(endDate)) ? (
        selectedApiDataArr.push(data)
      )
      : 
      ''
    )
    setSelectedApiData(selectedApiDataArr)
    
    let datesArr = []
    selectedApiDataArr.map((data) => datesArr.push(getDateString(data.date)))
    console.log(selectedDates)
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

  useEffect(() => {
    //console.log('Selected sm')
    //console.log(selectedSkeletalMuscle)
  })
  
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <Text style={styles.title}>김승우 고객님 변화보기</Text>
        <View>
          <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>Exbody</Text>
          </View>
          <View style={styles.exbodyContainer}>
            <Image
              style={{height: 100, width: 100, borderColor: Colors.GRAY_DARK, borderWidth: 1,}}
              source={require('../../assets/exbody_temp0.jpeg')}
            />
            <Image
              style={{height: 100, width: 100, borderColor: Colors.GRAY_DARK, borderWidth: 1,}}
              source={require('../../assets/exbody_temp1.jpeg')}
            />
          </View>
        </View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>Graph</Text>
          <TouchableOpacity onPressOut={onDatePickHandler}>
            <Text>Click Me</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.graphContainer}>
          <View>
            <ScrollView
              horizontal={true}
              contentOffset={{x: 0, y: 0}}
              showsHorizontalScrollIndicator={false}
            >
              <View>
                <InbodyChart data={weightGraph} idx={0} />
                <InbodyChart data={BMIGraph} idx={1} />
                <InbodyChart data={fatGraph} idx={2} />
                <InbodyChart data={skeletalMuscleGraph} idx={3} />
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Change_view;
