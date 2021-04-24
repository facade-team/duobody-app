import { createAndSavePDF, createHTML, createReact } from '../../utils/helpers'
import { View, Button, StyleSheet, Dimensions, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native'
import { AuthContext } from '../../services/AuthContext'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Colors, Spacing, Typography } from '../../styles';
import { FontAwesome } from '@expo/vector-icons'
import { COLORS } from '../../utils/constants';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../../axios/api';
import getDateStringWithNumber from '../../utils/getDateStringWithNumber';
import AsyncStorage from '@react-native-community/async-storage';
import BottomSheet from 'reanimated-bottom-sheet';
import Loader from '../../components/Loader';
import getDateString from '../../utils/getDateString';


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

  useFocusEffect(
    useCallback(() => {
      const getTraineeId = async () => {
        try {
          const id = await AsyncStorage.getItem('traineeId')
          setNoData(true)
          setTraineeId(id)
          setIsSearched(false)
          setFlag(false)
          console.log(id)
        } catch (err) {
          console.log('usefocuseffect error')
        }
      }
      //console.log('useFocusEffect')
      getTraineeId()
    }, [])
  )

  useEffect(() => {
    console.log('isSearched: ' + isSearched)
    console.log('flag: ' + flag)
    if(!isSearched){
      callAPIs()
    }
  }, [flag])


  useEffect(() => {
    console.log('isSearched: ' + isSearched)
    console.log('flag: ' + flag)
  })

  const callTraineeApi = () => {
    axios.get(`/trainee/${traineeId}`)
    .then((res)=>{
      setT_result({purpose: res.data.data.purpose, note:res.data.data.note})
      setTraineeName(res.data.data.name)
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
          setNoData(false)
          setLatestInbody(res.data.data)
          //console.log('latest inbody')
          //console.log(res.data.data)
          const endDateStr = getDateString(res.data.data.date)
          setEndDate(endDateStr)
  
          callGetExbodyAPI()
        }
        else {
          //setNoData(true)
          console.log('데이터없음')
          setEndDate(getDateString(new Date()))
          callGetExbodyAPI()
        }
      })
      .catch((err) => {
        console.log('callAPIs error' + err)
        callGetExbodyAPI()
        //setNoData(true)
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
          setFlag(true)
          setTraineeName(res.data.data.name)
          setApiData(res.data.data.inbody)
          makeDataArr(res.data.data.inbody)
          const startDateStr = getDateString(res.data.data.inbody[0].date)
          setStartDate(startDateStr)
          setExistStart(startDateStr)

          setIsSearched(false)
          setIsDataUpdated(false)
          setIsSearched(true)

          // console.log(res.data.data.inbody)
        } else {
          setFlag(true)
          setIsDataUpdated(false)
          setIsSearched(true)
        }
      })
      .catch((err) => {
        setFlag(true)
        //
        //console.log(err.response)
        setIsSearched(true)
        setIsDataUpdated(false)
      })
  }

  const { signOut } = useContext(AuthContext)

  const [goal,setGoal] = useState('')
  const [uniqueness,setUniqueness] = useState('')

  const [bmiArr, setBmiArr] = useState([])
  const [fatArr, setFatArr] = useState([])
  const [smArr, setSmArr] = useState([])
  const [wArr, setWArr] = useState([])

  const makeDataArr = (DataArr) => {
    const toDateStr = (text) => {
      const date = new Date(text)
      return `${date.getMonth()+1}/${date.getDate()}`
    }
    let B = [['측정날짜', 'BMI']]
    let F = [['측정날짜', '체지방']]
    let S = [['측정날짜', '골격근량']]
    let W = [['측정날짜', '체중']]
    
    DataArr.map((data) => {
      let bA = []
      let fA = []
      let sA = []
      let wA = []

      const dateStr = toDateStr(data.date)
      bA.push(dateStr)
      fA.push(dateStr)
      sA.push(dateStr)
      wA.push(dateStr)

      bA.push(data.bmi)
      fA.push(data.fat)
      sA.push(data.skeletalMuscle)
      wA.push(data.weight)

      B.push(bA)
      F.push(fA)
      S.push(sA)
      W.push(wA)
    })

    setBmiArr(B)
    setFatArr(F)
    setSmArr(S)
    setWArr(W)
  }


  const makePortfolio = () => {
    /*여기에서 자유롭게 테스트 해보면 됨*/
    console.log(noData)
    let htmelObj = {}
    if(!noData){
      let bmiStr = "["
      
      bmiArr.map((d, idx) => {
        if (idx === 0) {
          bmiStr = bmiStr + "['"+d[0]+"','"+d[1]+"'],"
        }
        else {
          bmiStr = bmiStr + "['"+d[0]+"',"+d[1]+"],"
        }
      })
      bmiStr = bmiStr + "]"
  
      let fatStr = "["
      
      fatArr.map((d, idx) => {
        if (idx === 0) {
          fatStr = fatStr + "['"+d[0]+"','"+d[1]+"'],"
        }
        else {
          fatStr = fatStr + "['"+d[0]+"',"+d[1]+"],"
        }
      })
      fatStr = fatStr + "]"
  
      let smStr = "["
      
      smArr.map((d, idx) => {
        if (idx === 0) {
          smStr = smStr + "['"+d[0]+"','"+d[1]+"'],"
        }
        else {
          smStr = smStr + "['"+d[0]+"',"+d[1]+"],"
        }
      })
      smStr = smStr + "]"
  
      let wStr = "["
      
      wArr.map((d, idx) => {
        if (idx === 0) {
          wStr = wStr + "['"+d[0]+"','"+d[1]+"'],"
        }
        else {
          wStr = wStr + "['"+d[0]+"',"+d[1]+"],"
        }
      })
      wStr = wStr + "]"
  
      // console.log(bmiStr)
  
      let htmlObj = {
        head:`
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script type="text/javascript">
          google.charts.load('current', {'packages':['corechart']});
          google.charts.setOnLoadCallback(drawChart);
  
          function drawChart() {
            var bmiData = google.visualization.arrayToDataTable(${bmiStr});
  
            var bmiOptions = {
              title: 'bmi',
              legend: { position: 'bottom' },
              colors:['#0162ff','#004411']
            };
  
            var fatData = google.visualization.arrayToDataTable(${fatStr});
  
            var fatOptions = {
              title: '체지방',
              legend: { position: 'bottom' },
              colors:['#05ebff','#004411']
            };
  
            var smData = google.visualization.arrayToDataTable(${smStr});
  
            var smOptions = {
              title: '골격근량',
              legend: { position: 'bottom' },
              colors:['#00ff01','#004411']
            };
  
            var weightData = google.visualization.arrayToDataTable(${wStr});
  
            var weightOptions = {
              title: '체중',
              legend: { position: 'bottom' },
              colors:['#b345e6','#004411']
            };
  
            var bmiChart = new google.visualization.LineChart(document.getElementById('bmi_chart'));
            var fatChart = new google.visualization.LineChart(document.getElementById('fat_chart'));
            var smChart = new google.visualization.LineChart(document.getElementById('sm_chart'));
            var weightChart = new google.visualization.LineChart(document.getElementById('weight_chart'));
  
            bmiChart.draw(bmiData, bmiOptions);
            fatChart.draw(fatData, fatOptions);
            smChart.draw(smData, smOptions);
            weightChart.draw(weightData, weightOptions);
          }
        </script>
        `
        ,
        content:`
        <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
          <h1 style="text-align: center;">
            <strong>${traineeName} 회원님 포트폴리오</strong>
          </h1>
          <p style="text-align: center; font-size: 12px;">
            ${traineeName} 회원님의 BMI, 체지방, 골격근량, 체중 변화와 exbody는 다음과 같습니다.
          </p>
          <h3 style="text-align: center;">
            <strong>Exbody</strong>
          <h3/>
      
          <p style="align-self: center;">
            <img src=${exbody.exbodyBefore} width="100" height="100">
            <img src=${exbody.exbodyAfter} width="100" height="100">
          <p/>
          <h3 style="text-align: center;">
            <strong>그래프</strong>
          <h3/>
  
          <div style="display: flex; justify-content: center;">
            <div id="bmi_chart" style="width: 300px; height: 200px"></div>
            <div id="fat_chart" style="width: 300px; height: 200px"></div>
          </div>
          <div style="display: flex; justify-content: center;">
            <div id="sm_chart" style="width: 300px; height: 200px"></div>
            <div id="weight_chart" style="width: 300px; height: 200px"></div>
          </div>
          <p>
            DUOBDOY
          </p>
        </div>
        
        
        `
      }
      createAndSavePDF(createHTML(htmlObj))
    }
    else{
      let htmlObj = {
        content:`
        <h1 style="text-align: center;">
          <strong>${traineeName} 회원님 포트폴리오</strong>
        </h1>
        <p style="align-self: center;">
          데이터가 없어요!
        </p>
        `
      }
      createAndSavePDF(createHTML(htmlObj))
    }
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
