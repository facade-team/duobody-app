import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Spacing, Colors, Typography } from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from '../../axios/api';


const indiv_profile = ({navigation}) => {

  const [isLoading, setIsLoading] = useState('');
  const [gotData, setGotData] = useState(false);
  const [DATAFromDB, setDATAFromDB] = useState([]);
  const [InbodyDATAFromDB, setInbodyDATAFromDB] = useState([]);

  //const _id = '607991633f0da34aa063c3a9'; // moong
  //const _id = '607991803f0da34aa063c3aa'; // nowkim
  const _id = '606d59072a64c40bc62c91d5'; // jimin

  const [FormerID, setFormerID] = useState(_id);

  const getApiTest = () => {
    axios.get(`/trainee/${_id}/inbody/latest`)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => console.log('this is error for inbody ' +err))
  };


  useEffect(() => {
    
    if (!gotData || FormerID !== _id) {
      axios.get(`/trainee/${_id}`)
      .then(res => {
        //console.log(res.data.data)
        let memData = {};
        
          memData._id = res.data.data._id
          memData.address = res.data.data.address
          memData.age = res.data.data.age
          memData.exbodyAfter = res.data.data.exbodyAfter
          memData.height = res.data.data.height
          memData.name = res.data.data.name
          memData.phoneNumber = res.data.data.phoneNumber

          setDATAFromDB(memData)
      })
      .catch(err => console.log(err))
      
      axios.get(`/trainee/${_id}/inbody/latest`)
      .then(res => {
        //console.log(res.data.data)
        let meminbodyData = {};
        meminbodyData.weight = res.data.data.weight
        meminbodyData.bmi = res.data.data.bmi
        meminbodyData.skeletalMuscle = res.data.data.skeletalMuscle
        meminbodyData.fat = res.data.data.fat
        meminbodyData.data = res.data.data

        setInbodyDATAFromDB(meminbodyData)
      })
      .catch(err => console.log('this is error for inbody ' +err))
    };
    setGotData(true)
    setIsLoading(false)
    setFormerID(_id)
  });

  return ( isLoading ? <Text>Loading...</Text> :
  <SafeAreaView style = {styles.container}>
    <ScrollView>
    <View style = {styles.profilecontainer}>
      <View style = {styles.nameandediticon}>
        <Text style = {styles.name}>

          
          {DATAFromDB.name} 회원님
        </Text>

        <TouchableOpacity
          onPressOut={getApiTest}>
        <Text>API Test</Text>
      </TouchableOpacity>

        <Icon name='create' size={30} color={Colors.BLACK}
              onPress={() => navigation.navigate('Mem_Edit')} />
      </View>
      <View style = {styles.goalbox}>
        <Text style = {styles.goaltext}>
            목표: 없음
        </Text>
        <Text style = {styles.goaltext}>
            특이사항: 없음
        </Text>
      </View>
      <View style = {styles.infobox}>
        <Text style = {styles.infotext}>
          H.P: {DATAFromDB.phoneNumber}
        </Text>
        <Text style = {styles.infotext}>
          주소: {DATAFromDB.address}
        </Text>
        <Text style = {styles.infotext}>
          나이: {DATAFromDB.age}세
        </Text>
        <Text style = {styles.infotext}>
          키: {DATAFromDB.height}cm
        </Text>
      </View>
    </View>


    <View style = {styles.inbodycontainer}>
      <View style = {styles.exbodycontainer}>
        <Text style = {styles.exbodytext}>
          EXBODY
        </Text>
          {DATAFromDB.exbodyAfter === undefined ? 
            <Image //null이면
              style = {styles.exbodyimage} 
              source = {require('../../assets/exbody_temp0.jpeg')}
            />
            :<Image //null이 아니면
              style = {styles.exbodyimage}
              source={{uri:`${DATAFromDB.exbodyAfter}`}}/>
          }
          
        
      </View>
      <View style = {styles.wbmfcontainer}>
        <View style = {{alignSelf: 'flex-end'}}>
          <Icon 
            name = 'add-circle'
            color = {Colors.Black}
            size = {Spacing.SCALE_32}
            onPress = {()=>navigation.navigate('Change_Add', {_id: _id})}
          />
        </View>
        <View style = {styles.linecontainer}>
          <View style = {styles.wbmfinfo}>
            <Text style = {styles.wbmftext}>몸무게</Text>
            {InbodyDATAFromDB.data === undefined ? 
            <Text style = {styles.wbmftext}>??kg</Text> :
            <Text style = {styles.wbmftext}>{InbodyDATAFromDB.weight}kg</Text>
            }
          </View>
          <View style = {styles.wbmfinfo}>
            <Text style = {styles.wbmftext}>BMI</Text>
            {InbodyDATAFromDB.data === undefined ? 
            <Text style = {styles.wbmftext}>??kg/m²</Text> :
            <Text style = {styles.wbmftext}>{InbodyDATAFromDB.bmi}kg/m²</Text>
            }
          </View>
        </View>

        <View style = {styles.linecontainer}>
          <View style = {styles.wbmfinfo}>
            <Text style = {styles.wbmftext}>골격근</Text>
            {InbodyDATAFromDB.data === undefined ? 
            <Text style = {styles.wbmftext}>??kg</Text> :
            <Text style = {styles.wbmftext}>{InbodyDATAFromDB.skeletalMuscle}kg</Text>
            }
          </View>
          <View style = {styles.wbmfinfo}>
            <Text style = {styles.wbmftext}>체지방</Text>
            {InbodyDATAFromDB.data === undefined ? 
            <Text style = {styles.wbmftext}>??kg</Text> :
            <Text style = {styles.wbmftext}>{InbodyDATAFromDB.fat}kg</Text>
            }
            </View>
        </View>
      </View>
        <TouchableOpacity 
          style = {styles.greenbuttoncontainer}
          onPress = {()=> navigation.navigate('Change_View') }>
        <View>
          <Text style = {styles.greenbutton}>
            변화보기
          </Text>
        </View>
        </TouchableOpacity>
    </View>
    </ScrollView>
  </SafeAreaView>
)}

export default indiv_profile;

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
  name : {
    fontSize: Typography.FONT_SIZE_24,
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
    fontSize: Typography.FONT_SIZE_20,
    fontWeight: Typography.FONT_WEIGHT_THIN,
  },
  infobox: {
    marginLeft: Spacing.SCALE_16,
  },
  infotext: {
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    fontSize: Typography.FONT_SIZE_24,
    marginBottom: Spacing.SCALE_8,
  },
  exbodycontainer:{
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '98%',
    marginBottom: Spacing.SCALE_16,
  },
  exbodytext:{
    fontSize: Typography.FONT_SIZE_32,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    marginLeft: Spacing.SCALE_28,
  },
  exbodyimage:{
    height: 120,
    width: 120,
    marginRight: Spacing.SCALE_28,
    borderColor: Colors.GRAY,
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
    fontSize: Typography.FONT_SIZE_24,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    marginBottom : Spacing.SCALE_24,
  },
  greenbuttoncontainer: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    borderRadius: 25,
    width: Dimensions.get('window').width * 0.65,
    height: Dimensions.get('window').height * 0.08,
    justifyContent: 'center',
    marginTop: Spacing.SCALE_12,
    marginBottom: Spacing.SCALE_24,
  },
  greenbutton: {
    fontSize: Typography.FONT_SIZE_36,
    color: Colors.WHITE,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    },
})