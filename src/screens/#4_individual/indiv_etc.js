import { createAndSavePDF, createHTML, createReact } from '../../utils/helpers'
import { View, Button, StyleSheet, Dimensions, SafeAreaView, Text, TextInput } from 'react-native'
import { AuthContext } from '../../services/AuthContext'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Colors, Spacing, Typography } from '../../styles';
import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../../axios/api';
import getDateStringWithNumber from '../../utils/getDateStringWithNumber';
import AsyncStorage from '@react-native-community/async-storage';
import BottomSheet from 'reanimated-bottom-sheet';
import Loader from '../../components/Loader';


//AsyncStorage에서 trainee_id로 axios get
//목표, 특이사항 저장 후 set
//
//edit 버튼 구현 
// 
// logout 함수 호출
//
// pdf 내보내기 구현
// 


const getTraineeId = () => {

}

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
  const [t_result,setT_result] = useState({ note: '', purpose: '' })
  const [t_data,setT_data] = useState({})

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
          if (true) {
            setTraineeId(id)
            setIsSearched(false)
            setFlag(false)
          }
        } catch (err) {
          console.log('usefocuseffect error')
        }
      }
      //console.log('useFocusEffect')
      getTraineeId()
    }, [])
  )

  useEffect(() => {
    if(!isSearched){
      callAPIs()
    }
  }, [flag])


  const callTraineeApi = () => {
    axios.get(`/trainee/${traineeId}`)
    .then((res)=>{
      setT_result({purpose: res.data.data.purpose, note:res.data.data.note})
    })
    .catch((err)=>{
      console.log('callTraineeApi error')
      //console.log(err.response)
    })
  }

  const callAPIs = () => {
    //되겠지
    callTraineeApi()

    axios.get(`/trainee/${traineeId}/inbody/latest`)
      .then((res) => {
        if(res.data.data){
          setLatestInbody(res.data.data)
          //console.log('latest inbody')
          //console.log(res.data.data)
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
        console.log('callAPIs error' + err)
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
          // console.log('exbody가 없어요')
          setNoData(true)
          callGetInbodyByDateRangeAPI()
        } else {
          // console.log(res.data.data)
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
        // console.log('callGetInbodyByDateRangeAPI')
        if (res.data.data) {
          // console.log(res.data.data.inbody)
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

  const { signOut } = useContext(AuthContext)

  const [goal,setGoal] = useState('')
  const [uniqueness,setUniqueness] = useState('')

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

  const setTraineeGoal = () => {
    //result put to the page
    setT_result({...t_result, purpose: goal})
    // console.log(t_result.purpose)
    // console.log(t_result.note)

    //t_data
    axios.put(`/trainee/etc`,{
      traineeId: traineeId,
      note: t_result.note,
      purpose: goal
    })
    .then((res)=>{
      console.log(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
    
    //remove typed string
    setGoal('')
  }
  
  const editGoal = () => {
    setGoal('')
    goalRef.current.snapTo(0)
  }
  const editUniqueness = () => {
    setUniqueness('')
    uniquenessRef.current.snapTo(0)
  }
  const setTraineeUniqueness = () => {
    //result put to the page
    setT_result({...t_result, note: uniqueness})

    //put new purpose(goal) to api
    axios.put(`/trainee/etc`,{
      traineeId: traineeId,
      note: uniqueness,
      purpose: t_result.purpose
    })
    .then((res)=>{
      console.log(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })

    //remove typed string
    setUniqueness('')
  }

  //bottomsheet
  const renderGoal = () => (
    <View style={styles.sheetContainer}>
        <View style={{ paddingBottom: 40, paddingTop: 10 }}>
            <View style={{paddingTop:16}}>
                <Text style={styles.textSubtitle}> 목표 수정 </Text>
            </View>
        </View>

        <View>
          <TextInput
            placeholder='목표를 수정하세요'
            value={goal}
            onChangeText={setGoal}
          />
        </View>

        <View style={styles.position}>
        <View style={styles.confirm}>
            <TouchableOpacity onPressOut={() => { goalRef.current.snapTo(1) }}>
                <Text style={styles.textConfirm} >취소</Text>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={() => {
                goalRef.current.snapTo(1)
                setTraineeGoal()
            }}>
                <Text style={styles.textConfirm} >확인</Text>
            </TouchableOpacity>
        </View>
        </View>
    </View>
  );

  const renderUniqueness = () => (
    <View style={styles.sheetContainer}>
        <View style={{ paddingBottom: 40, paddingTop: 10 }}>
            <View style={{paddingTop:16}}>
                <Text style={styles.textSubtitle}> 특이사항 수정 </Text>
            </View>
        </View>

        <View>
          <TextInput
            placeholder='특이사항을 수정하세요'
            value={uniqueness}
            onChangeText={setUniqueness}
          />
        </View>

        <View style={styles.position}>
          <View style={styles.confirm}>
              <TouchableOpacity onPressOut={() => { uniquenessRef.current.snapTo(1) }}>
                  <Text style={styles.textConfirm} >취소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPressOut={() => {
                  uniquenessRef.current.snapTo(1)
                  setTraineeUniqueness()
              }}>
                  <Text style={styles.textConfirm} >확인</Text>
              </TouchableOpacity>
          </View>
        </View>
    </View>
  );

  //bottomsheet ref
  const goalRef = React.useRef(null);
  const uniquenessRef = React.useRef(null);

  return (
    <SafeAreaView style={styles.wrap}>
      {!isSearched ? 
      <View style={styles.content}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Loader />
        </View>
      </View>
      :
      <View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title}>{traineeName} 회원님</Text>
          <TouchableOpacity onPressOut={()=>logout()}>
            <FontAwesome name="sign-out" size={33} style={{paddingRight:Spacing.SCALE_16,}} />
          </TouchableOpacity>
        </View>

        <View style={{alignItems:'center'}}>
          <View style={styles.defaultcontainer}>
            <View style={{flex:2}}>
              <Text style={styles.subtitle}>목표</Text>
              <View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.text}>{t_result.purpose}</Text>
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
                  <Text style={styles.text}>{t_result.note}</Text>
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
      <BottomSheet
        ref={goalRef}
        snapPoints={[500, 0, 0]}
        borderRadius={20}
        renderContent={renderGoal}
        initialSnap={1}
      />
      <BottomSheet
        ref={uniquenessRef}
        snapPoints={[500, 0, 0]}
        borderRadius={20}
        renderContent={renderUniqueness}
        initialSnap={1}
      />
      </View>
                      }
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
  textSubtitle: {
    fontSize: 16,
    paddingLeft: 3,
    fontWeight: 'bold'
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
  sheetContainer: {
    backgroundColor: '#E3E3E3',
    padding: 20,
    height: 500
  },
  confirm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    width: 150,
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 10,
  },
  textConfirm: {
    fontSize: 18,
    color: '#177EFB'
  },
  position:{
    position:'absolute',
    bottom:Spacing.SCALE_20,
    right:Spacing.SCALE_20
  }
})

export default indiv_etc
