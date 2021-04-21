import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Colors, Spacing, Typography } from '../../styles';
import UnderLinedTextInputBig from '../../components/UnderlinedTextInputBig';
import axios from '../../axios/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import getDateStringWithNumber from '../../utils/getDateStringWithNumber';

import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';


const change_add = ({navigation}) => {
  const [weightText, setWeightText] = useState('');
  const [BMIText, setBMIText] = useState('');
  const [muscleText, setMuscleText] = useState('');
  const [fatText, setFatText] = useState('');
  const [DATAFromDB, setDATAFromDB] = useState([]);
  const [gotData, setGotData] = useState(false);
  const [pickedDate, setPickedDate] = useState('2021-04-10');
  const [CalDate, setCalDate] = useState(new Date(pickedDate))
  const [InbodyFromDB, setInbodyFromDB] = useState([]);

  // 승우가 짠 부분 start
  const [image, setImage] = useState(null);
  
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


  // 승우가 짠 부분 end

  const onChangePickedDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setCalDate(currentDate);
    setPickedDate(currentDate);
  };

  const datestr = getDateStringWithNumber(new Date(pickedDate));
  
  //const _id = '607991633f0da34aa063c3a9'; // moong
  const _id = '607991803f0da34aa063c3aa'; // nowkim
  //const _id = '606d59072a64c40bc62c91d5'; // jimin

  const [FormerID, setFormerID] = useState(_id);
  const [FormerDate, setFormerDate] = useState('20210410');

  const getApiTest = () => {
    axios.get(`/trainee/${_id}/inbody/date/${datestr}`)
    .then(res => {
      console.log(res.data.data)
    })
    .catch(err => console.log('this is error from inbody ' +err))
  };

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

    if(!gotData || FormerID !== _id){
      axios.get(`/trainee/${_id}`)
      .then(res =>{
        let memData = {};
        memData._id = res.data.data._id
        memData.name = res.data.data.name
        setDATAFromDB(memData)
      })
      .catch(err => console.log(err))
    }
    setGotData(true);
    setFormerID(_id);

    if(FormerDate !== datestr){
      axios.get(`trainee/${_id}/inbody/date/${datestr}`)
      .then(res => {
        res.data.data.map(tmp=>{
          let newinbody = {};
          newinbody.bmi = tmp.bmi
          newinbody.fat = tmp.fat
          newinbody.skeletalMuscle = tmp.skeletalMuscle
          newinbody.weight = tmp.weight

          setInbodyFromDB(prevArray => [...prevArray, newinbody])
        })
      }).catch(err => console.log(err))
    }
  });


return (
  <ScrollView>
    <View style = {styles.container}>
      <View style = {styles.maincontainer}>
        <View style = {styles.name}>
          <Text style = {styles.nametext}>
            {DATAFromDB.name} 회원님
          </Text>
          <TouchableOpacity
            onPressOut={getApiTest}>
          <Text>API Test</Text>
        </TouchableOpacity>
        </View>
        
        <View style = {styles.dayselect}>
          <DateTimePicker
            style = {{width: Spacing.SCALE_80}}
            testID="dateTimePicker"
            value={CalDate}
            mode={'date'}
            display="default"
            onChange={onChangePickedDate}
          />

        </View>

        <View style = {styles.wbmfcontainer}>
          <View style = {styles.infoinput}>
            <View style = {styles.individual}>
              <UnderLinedTextInputBig placeholder={'몸무게: ??kg'} value = {weightText} onChangeText={setWeightText}/>
            </View>
            <View style = {styles.individual}>
              <UnderLinedTextInputBig placeholder={'BMI: ??kg/m²'} value = {BMIText} onChangeText={setBMIText}/>
            </View>
            <View style = {styles.individual}>
              <UnderLinedTextInputBig placeholder={'골격근: ??kg'} value = {muscleText} onChangeText={setMuscleText}/>
            </View>
            <View style = {styles.individual}>
              <UnderLinedTextInputBig placeholder={'체지방: ??kg'} value = {fatText} onChangeText={setFatText}/>
            </View>
            <Text>{InbodyFromDB.bmi}</Text>
          </View>
        </View>

        {image && (
          <View style={{alignSelf: 'center'}}>
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          </View>
        )}
        <TouchableOpacity 
          style = {styles.addexbody}
          onPressOut = {()=> pickImage()}>
          <View>
            <Text style = {styles.greenbutton}>
              Ex-Body 추가
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style = {styles.addexbody_2}
          onPress = {()=> navigation.goBack()}>
          <View>
            <Text style = {styles.greenbutton}>
              확인
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
)}


export default change_add;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center'
  },
  maincontainer: {
    flex: 2,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    width: '98%',
    justifyContent: 'center',
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
    paddingBottom: Spacing.SCALE_24,
  },
  addexbody:{
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
  addexbody_2:{
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    borderRadius: 15,
    width: Spacing.SCALE_200,
    height: Dimensions.get('window').height * 0.06,
    justifyContent: 'center',
    marginTop: Spacing.SCALE_32,
    marginBottom: Spacing.SCALE_24,
    alignSelf: 'center',
  },
  greenbutton: {
    fontSize: Typography.FONT_SIZE_28,
    color: Colors.WHITE,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  }
})