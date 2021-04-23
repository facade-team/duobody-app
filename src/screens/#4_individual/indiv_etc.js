import { createAndSavePDF } from '../../utils/helpers'
import { View, Button, StyleSheet, Dimensions, SafeAreaView, Text } from 'react-native'
import { AuthContext } from '../../services/AuthContext'
import React, { useContext, useEffect, useState } from 'react'
import { Colors, Spacing, Typography } from '../../styles';
import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../utils/constants';


const onPress = () => {}

function indiv_etc({ navigation }) {
  const { signOut } = useContext(AuthContext)

  const makePortfolio = () => {
    /*여기에서 자유롭게 테스트 해보면 됨*/
    createAndSavePDF('<p>hello world</p>')
    console.log('터미널 보면 버튼 누를때마다 콘솔 찍힘')
  }

  useEffect(() => {
    console.log('마운트 될 때만 사용')

  },[])



  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title}>테스트 회원님</Text>
          <TouchableOpacity>
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
                  <TouchableOpacity>
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
                  <TouchableOpacity>
                    <FontAwesome name="edit" size={25}/>
                  </TouchableOpacity>
                </View>
                <View style={styles.horizontalLine}/>
              </View>
            </View>
            <View style={{flex:1}}>
              <Text style={styles.subtitle}>PDF 내보내기</Text>
              <View>
                  <TouchableOpacity>
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
