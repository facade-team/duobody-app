import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Spacing, Colors, Typography } from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';

export default ({navigation}) => {
  const [loginText, setLoginText] = useState('');
  const [singupText, setSignupText] = useState('');
  return (

  <SafeAreaView style = {styles.container}>
    <ScrollView>
    <View style = {styles.profilecontainer}>
      <View style = {styles.nameandediticon}>
        <Text style = {styles.name}>
          김승우 회원님
        </Text>
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
          H.P: 010-1234-5678
        </Text>
        <Text style = {styles.infotext}>
          주소: 경기도 ㅇㅇ시 ㅇㅇ구 123번지
        </Text>
        <Text style = {styles.infotext}>
          나이: 24세
        </Text>
        <Text style = {styles.infotext}>
          키: 175cm
        </Text>
      </View>
    </View>


    <View style = {styles.inbodycontainer}>
      <View style = {styles.exbodycontainer}>
        <Text style = {styles.exbodytext}>
          EXBODY
        </Text>
        <Image 
          style = {styles.exbodyimage}
          source={require('../../assets/exbody_temp0.jpeg')}
        />
      </View>
      <View style = {styles.wbmfcontainer}>
        <View style = {{alignSelf: 'flex-end'}}>
          <Icon 
            name = 'add-circle'
            color = {Colors.Black}
            size = {Spacing.SCALE_32}
            onPress = {()=>navigation.navigate('Change_Add')}
          />
        </View>
        <View style = {styles.linecontainer}>
          <View style = {styles.wbmfinfo}>
            <Text style = {styles.wbmftext}>몸무게</Text>
            <Text style = {styles.wbmftext}>??kg</Text>
          </View>
          <View style = {styles.wbmfinfo}>
            <Text style = {styles.wbmftext}>BMI</Text>
            <Text style = {styles.wbmftext}>??kg/m²</Text>
          </View>
        </View>

        <View style = {styles.linecontainer}>
          <View style = {styles.wbmfinfo}>
            <Text style = {styles.wbmftext}>골격근</Text>
            <Text style = {styles.wbmftext}>??kg</Text>
          </View>
          <View style = {styles.wbmfinfo}>
            <Text style = {styles.wbmftext}>체지방</Text>
            <Text style = {styles.wbmftext}>??kg</Text>
            </View>
        </View>
      </View>
        <TouchableOpacity 
          style = {styles.greenbuttoncontainer}
          onPress = {()=> navigation.navigate('Change_View')}>
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
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.98,
    paddingVertical: Spacing.SCALE_12,
  },
  inbodycontainer: {
    backgroundColor: Colors.WHITE,
    flex: 5,
    alignItems: 'center',
    borderRadius: 5,
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