import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {FontAwesome} from '@expo/vector-icons'

export default function App() {
  const renderContent = () => (
    <View style={styles.bottomsheetcontainer}>
      <View style={styles.textRow}>
        <TouchableOpacity onPress={()=> sheetRef.current.snapTo(1)}>
          <FontAwesome name="times" size={25} color="black"/>
        </TouchableOpacity>
        <FontAwesome name="check" size={25} color="black"/>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.texttitle}> 일정 추가하기 </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textContent}> 4월 9일 금</Text>
      </View>

      <View style={styles.horizontalLine}/>

      <View style={{paddingBottom:40, paddingTop:10}}>
        <View style={styles.textContainer}>
          <Text style={styles.textSubtitle}> 회원 선택 </Text>
        </View>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={()=> CustomerPicker.current.snapTo(0)}>
            <Text style={styles.textContent}>김현재 고객님</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.textSubtitle}> 시간 선택 </Text>
      </View>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={()=> TimeRef.current.snapTo(0)}>
          <Text style={styles.textContent}>00:00 - 00:00</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCustomer = () => (
    <View style={styles.custommerPickercontainer}>
      <View style={{paddingBottom:40, paddingTop:10}}>
        <View style={styles.textContainer}>
          <Text style={styles.textSubtitle}> 회원 선택 </Text>
        </View>
      </View>
      <View style={styles.confirm}>
          <Button style={styles.textContent} onPress={()=> CustomerPicker.current.snapTo(1)} title="취소"/>
          <Button style={styles.textContent} onPress={()=> CustomerPicker.current.snapTo(1)} title="확인"/>
      </View>
    </View>
  );

  const renderTime = () => (
    <View style={styles.custommerPickercontainer}>
      <View style={{paddingBottom:40, paddingTop:10}}>
        <View style={styles.textContainer}>
          <Text style={styles.textSubtitle}> 시간 선택 </Text>
        </View>
      </View>
      <View style={styles.confirm}>
          <Button style={styles.textContent} onPress={()=> TimeRef.current.snapTo(1)} title="취소"/>
          <Button style={styles.textContent} onPress={()=> TimeRef.current.snapTo(1)} title="확인"/>
      </View>
    </View>
  );

  const sheetRef = React.useRef(null);
  const CustomerPicker = React.useRef(null);
  const TimeRef = React.useRef(null);

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[500, 0, 0]}
        borderRadius={20}
        renderContent={renderContent}
      />
      <BottomSheet
        ref={CustomerPicker}
        snapPoints={[400, 0, 0]}
        borderRadius={20}
        renderContent={renderCustomer}
      />
      <BottomSheet
        ref={TimeRef}
        snapPoints={[400, 0, 0]}
        borderRadius={20}
        renderContent={renderTime}
      />
    </>
  );
}

const styles = StyleSheet.create({
  bottomsheetcontainer: {
    backgroundColor: 'white',
    padding: 20,
    height: 500, 
  },
  custommerPickercontainer:{
    backgroundColor: '#E3E3E3',
    padding: 20,
    height: 400
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  texttitle: {
    fontWeight: 'bold',
    fontSize: 25
  },
  textContent: {
    fontSize: 16,
    paddingLeft: 3,
  },
  textSubtitle: {
    fontSize: 16,
    paddingLeft: 3,
    fontWeight: 'bold'
  },
  textContainer: {
    //position: 'absolute',
    paddingTop: 16
  },
  horizontalLine: {
    paddingTop: 13,
    borderBottomColor: '#E3E3E3',
    borderBottomWidth: 1,
  },
  confirm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    width: 150,
  }
})