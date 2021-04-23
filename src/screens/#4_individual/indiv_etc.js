import { createAndSavePDF } from '../../utils/helpers'
import { View, Button, StyleSheet, Dimensions, SafeAreaView, Text, TextInput } from 'react-native'
import { AuthContext } from '../../services/AuthContext'
import React, { useContext, useEffect, useState } from 'react'
import { Colors, Spacing, Typography } from '../../styles';
import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';


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

  const { signOut } = useContext(AuthContext)

  const [goal,setGoal] = useState('')
  const [uniqueness,setUniqueness] = useState('')

  const makePortfolio = () => {
    /*여기에서 자유롭게 테스트 해보면 됨*/
    console.log('pdf 내보내기')

    createAndSavePDF('<p>hello world</p>')
  }

  const logout = () => {
    console.log('logout')
  }

  const setTraineeGoal = () => {
    console.log('목표 set')
  }
  
  const editGoal = () => {
    goalRef.current.snapTo(0)
    console.log('목표수정')
  }
  const editUniqueness = () => {
    console.log('특이사항 수정')
    uniquenessRef.current.snapTo(0)
  }
  const setTraineeUniqueness = () => {
    console.log('특이사항 set') 
  }

  useEffect(() => {
    console.log('마운트 될 때만 사용')

  },[])

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
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title}>테스트 회원님</Text>
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
