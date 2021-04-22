import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Colors, Spacing, Typography } from '../../styles';
import UnderLinedTextInputBig from '../../components/UnderlinedTextInputBig';
import axios from '../../axios/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getDateStringWithNumber from '../../utils/getDateStringWithNumber';
import getDateString from '../../utils/getDateString';
import { useFocusEffect } from '@react-navigation/native'

import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';


const change_add = ({navigation}) => {
  const [weightText, setWeightText] = useState('');
  const [BMIText, setBMIText] = useState('');
  const [muscleText, setMuscleText] = useState('');
  const [fatText, setFatText] = useState('');
  const [DATAFromDB, setDATAFromDB] = useState([]);
  const [set, setset] = useState(false);
  const [pickedDate, setPickedDate] = useState('2021-04-10');
  const [CalDate, setCalDate] = useState(new Date(pickedDate))
  const [InbodyFromDB, setInbodyFromDB] = useState([]);
  const [NoDataFlag, setNoDataFlag] = useState(true);
  const [_id, set_id] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [isNewLoad, setisNewLoad] = useState(true);
  

  // 승우가 짠 부분 start
  const [image, setImage] = useState(null);
  const [exbody, setExbody] = useState({
    exbodyAfter: null,
    exbodyBefore: null,
  })
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  const callGetExbodyAPI = async (id) => {
    const isEmpty = (param) => {
      return Object.keys(param).length === 0;
    }
    
    await axios.get(`/trainee/exbody/${id}`)
    .then((res) => {
      if (!isEmpty(res.data.data)) {
          let newExbody = {}
          if (res.data.data.exbodyAfter) {
            newExbody.exbodyAfter = res.data.data.exbodyAfter
          }
          else {
            newExbody.exbodyAfter = null
          }
          if (res.data.data.exbodyBefore) {
            newExbody.exbodyBefore = res.data.data.exbodyBefore
          }
          else {
            newExbody.exbodyBefore = null
          }
          setExbody(newExbody)
        }
        else {
          newExbody.exbodyAfter = null
          newExbody.exbodyBefore = null
          setExbody({
            exbodyAfter: null,
            exbodyBefore: null,
          })
        }
        console.log('newExbody below')
      })
      .catch((err) => {
        console.log(err.response)
      })
      console.log(newExbody)
  }


  // 승우가 짠 부분 end

  const onChangePickedDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setCalDate(currentDate);
    setPickedDate(currentDate);
    setWeightText('')
    setBMIText('')
    setMuscleText('')
    setFatText('')
  };

  const datestr = getDateStringWithNumber(new Date(pickedDate));
  
  const [FormerID, setFormerID] = useState(_id);
  const [FormerDate, setFormerDate] = useState('20210410');

  const getApiTest = async (id) => {
    await axios.get(`/trainee/${id}`)
    .then(res => {
      console.log(res.data.data)
    })
    .catch(err => console.log('this is errr from '+err))
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      const getTraineeId = async () => {
        try {
          const id = await AsyncStorage.getItem('traineeId')
          if (isActive && (id !== _id)) {
            setImage(null)
            set_id(id)
            setIsSearched(false)
            console.log(`this is id for change_add: ${id}`)
            callGetExbodyAPI(id)
          }
        } catch (err) {
          console.log(err)
        }
      }
      
      getTraineeId()
      if(isNewLoad === true){
        setWeightText('')
        setBMIText('')
        setMuscleText('')
        setFatText('')
        setisNewLoad(false)
      }

      return () => {
        isActive = false
      }


    })
  )


  useEffect(()=>{
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log(status)
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    //트레이니 아이디로 이름 가져오기
    if(!set || FormerID !== _id){
      axios.get(`/trainee/${_id}`)
      .then(res =>{
        let memData = {};
        memData._id = res.data.data._id
        memData.name = res.data.data.name
        setDATAFromDB(memData)
        console.log('찍히나 : '+memData.name)
      })
      .catch(err => {
        console.log(err)
      })
    }
    setset(true);
    setFormerID(_id);

    //날짜를 지정하여 inbody 조회
    if(FormerDate !== datestr){
      console.log('!!!!+'+datestr+'!!!!')
      axios.get(`trainee/${_id}/inbody/date/${datestr}`)
      .then(res => {
        console.log('asdf'+datestr)
          let newinbody = {};

          newinbody.bmi = res.data.data.bmi
          newinbody.fat = res.data.data.fat
          newinbody.skeletalMuscle = res.data.data.skeletalMuscle
          newinbody.weight = res.data.data.weight
          newinbody.inbodyId = res.data.data._id
          newinbody.date = res.data.data.date
          newinbody.name = res.data.data.name

          setInbodyFromDB(newinbody)
          setNoDataFlag(false)

        
      }).catch(err => {
        console.log('no date'+datestr)
        console.log(err)
        setNoDataFlag(true)

      })
      setFormerDate(datestr)
    }

    
  });


const SaveControler = () => {
  if(NoDataFlag===false){///data있는날 => 수정!
    let todayInbody = {}
    todayInbody.inbodyId = InbodyFromDB.inbodyId
    todayInbody.bmi = BMIText
    todayInbody.date = new Date(InbodyFromDB.date)
    todayInbody.fat = fatText
    todayInbody.skeletalMuscle = muscleText
    todayInbody.weight = weightText

    axios.put('trainee/inbody',todayInbody)
    .then(res => {
      Alert.alert(res.data.msg)
      setisNewLoad(true)
      navigation.goBack()
    })
    .catch(err => {
      Alert.alert(err.response.data.msg)
      console.log(err.response)
  })} else {
    let todayInbody = {}
    todayInbody.traineeId = _id
    todayInbody.bmi = BMIText
    todayInbody.fat = fatText
    todayInbody.skeletalMuscle = muscleText
    todayInbody.weight = weightText
    todayInbody.date = new Date(getDateString(pickedDate))

    axios.post('trainee/inbody', todayInbody)
    .then(res => {
      Alert.alert(res.data.msg)
      setisNewLoad(true)
      navigation.goBack()

    })
    .catch(err => {
      Alert.alert(err.response.data.msg)
      console.log(err.response)
  })}
}

const exbodyAddControler = () => {
  let exbodyaddress = ''
}

const onSaveExbodyHandler = () => {
  let form = new FormData()
  form.append('exbodyImage', image)
  console.log('exbody below!')
  console.log(exbody)
  axios.post(`/trainee/exbody/${_id}/before`, form)
    .then((res) => {
      console.log(res.data.data)
    })
    .catch((err) => {
      console.log(err.response)
    })
  /*
  if (exbody.exbodyAfter === null && exbody.exbodyBefore === null) {
    axios.post(`/trainee/exbody/${_id}/before`, form)
      .then((res) => {
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  else if (exbody.exbodyAfter === null && exbody.exbodyBefore !== null) {
    axios.post(`/trainee/exbody/${_id}/after`, form)
      .then((res) => {
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  else if (exbody.exbodyAfter !== null && exbody.exbodyBefore !== null) {
    axios.post(`/trainee/exbody/${_id}/before`, form)
      .then((res) => {
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  */
  Alert.alert('Exbody가 저장되었습니다')
}

return (
  <SafeAreaView style={styles.container}>
    <View style = {styles.maincontainer}>
        <ScrollView style = {{flex:1}}>
          <View style = {styles.name}>
            <Text style = {styles.nametext}>
              {DATAFromDB.name} 회원님
            </Text>
          </View>
          
          <View style = {styles.dayselect}>
            <DateTimePicker
              style = {{width: Spacing.SCALE_100, justifyContent:'center', alignSelf:'center'}}
              testID="dateTimePicker"
              value={CalDate}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={onChangePickedDate}
            />

            </View>

          <View style = {styles.wbmfcontainer}>
            <View style = {styles.infoinput}>
              <View style = {styles.individual}>
              {
                NoDataFlag === true ? 
                <UnderLinedTextInputBig placeholder={'몸무게: ??kg'} value = {weightText} onChangeText={setWeightText}/> :
                <UnderLinedTextInputBig placeholder={'몸무게: '+InbodyFromDB.weight+'kg'} value = {weightText} onChangeText={setWeightText}/>
              }
              </View>
              <View style = {styles.individual}>
              {
                NoDataFlag === true ? 
                <UnderLinedTextInputBig placeholder={'BMI: ??kg'} value = {BMIText} onChangeText={setBMIText}/> :
                <UnderLinedTextInputBig placeholder={'BMI: '+InbodyFromDB.bmi+'kg'} value = {BMIText} onChangeText={setBMIText}/>
              }
              </View>
              <View style = {styles.individual}>
              {
                NoDataFlag === true ? 
                <UnderLinedTextInputBig placeholder={'골격근: ??kg'} value = {muscleText} onChangeText={setMuscleText}/> :
                <UnderLinedTextInputBig placeholder={'골격근: '+InbodyFromDB.skeletalMuscle+'kg'} value = {muscleText} onChangeText={setMuscleText}/>
              }
              </View>
              <View style = {styles.individual}>
              {
                NoDataFlag === true ? 
                <UnderLinedTextInputBig placeholder={'체지방: ??kg'} value = {fatText} onChangeText={setFatText}/> :
                <UnderLinedTextInputBig placeholder={'체지방: '+InbodyFromDB.fat+'kg'} value = {fatText} onChangeText={setFatText}/>
              }
              </View>
            </View>
          </View>

            {image && (
              <View style={{alignSelf: 'center'}}>
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
              </View>
              )
            }
            <View>
              {
                image && (
                <TouchableOpacity 
                  style = {styles.saveexbody}
                  onPressOut = {onSaveExbodyHandler}>
                  <View>
                    <Text style = {styles.greenbutton}>
                      Exbody 저장하기
                    </Text>
                  </View>
                </TouchableOpacity>
                )
              }
              <TouchableOpacity 
                style = {styles.addexbody}
                onPressOut = {()=> pickImage()}>
                <View>
                  <Text style = {styles.greenbutton}>
                    Exbody 선택하기
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

          <TouchableOpacity 
            style = {styles.confirmbutton}
            onPress = {
              //navigation.goBack()
              SaveControler
              }>
            <View>
              <Text style = {styles.greenbutton}>
                확인
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
    </View>
  </SafeAreaView>
)}


export default change_add;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'flex-start',
    flex:1,
  },
  maincontainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    flex: 1,
    margin: Spacing.SCALE_4,
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
    paddingBottom: Spacing.SCALE_12,
  },
  addexbody:{
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    borderRadius: 15,
    width: Spacing.SCALE_150,
    justifyContent: 'center',
    marginTop: Spacing.SCALE_12,
    marginBottom: Spacing.SCALE_24,
    padding: Spacing.SCALE_8,
    alignSelf: 'center',
  },
  saveexbody : {
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    borderRadius: 15,
    width: Spacing.SCALE_150,
    justifyContent: 'center',
    marginTop: Spacing.SCALE_8,
    marginBottom: Spacing.SCALE_2,
    padding: Spacing.SCALE_8,
    alignSelf: 'center',
  },
  confirmbutton:{
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    borderRadius: 15,
    width: Spacing.SCALE_150,
    justifyContent: 'center',
    marginTop: Spacing.SCALE_32,
    marginBottom: Spacing.SCALE_24,
    padding: Spacing.SCALE_8,
    alignSelf: 'center',
  },
  greenbutton: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.WHITE,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  }
})