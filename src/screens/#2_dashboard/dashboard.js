import React, { Component} from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { Colors, Mixins, Spacing, Typography } from '../../styles';
import GrayTextButton from '../../components/GrayTextButton';
import { WHITE } from '../../styles/colors';
//import { Footer_dash } from '../../components/Footer_dash'

class Dash_dash extends Component {
    render() {
        return (
            <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.main}>
        <View style={styles.case1}>
          <View style={styles.listh}>
            <Text>고객명단</Text>
            
          </View>

          <View style={styles.list}>
            <GrayTextButton content="김현재 고객님"></GrayTextButton>
            <GrayTextButton content="김승우 고객님"></GrayTextButton>
            <GrayTextButton content="최현수 고객님"></GrayTextButton>
            <GrayTextButton content="오상훈 고객님"></GrayTextButton>
            <GrayTextButton content="김ㅇㅇ 고객님"></GrayTextButton>
            <GrayTextButton content="박ㅇㅇ 고객님"></GrayTextButton>
            <GrayTextButton content="이ㅇㅇ 고객님"></GrayTextButton>
            <GrayTextButton content="김범수 고객님"></GrayTextButton>
            <GrayTextButton content="나 얼 고객님"></GrayTextButton>
            <GrayTextButton content="뭐하지 고객님"></GrayTextButton>

            <GrayTextButton content="ㅇㅇㅇ 고객님"></GrayTextButton>
          </View>
        </View>
        <View style={styles.case2}>
        <View style={styles.listh}>
            <Text>TODAY</Text>
            
          </View>

          <View style={styles.time}>
          <View style = {{flex:1,backgroundColor: Colors.WHITE}}>
              <Text>9</Text>
          </View>
          <View style = {{flex:5,backgroundColor: Colors.WHITE}}>
              <Text>123</Text>
          </View>
          
          </View>
          
          
        </View>
      </View>
      <View style={styles.row}>
         <Text>MeMo</Text>
         <View style={styles.memo}>

         </View>
      </View>
    </View>
  );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal: 5,
        backgroundColor: '#2BAE56'
      },
      header: {
        flex:1,
      },
      main: {
        flex: 10,
       
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      },
      listh: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      list: {
        flex: 9,
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        borderWidth:1,
        
      },
      time: {
        flex: 9,
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        
      },
      case1: {
        flex: 1,
        margin:4,
        padding:4,
        backgroundColor: WHITE,
        alignItems: "center",
        justifyContent: "center",
      },
      case2: {
        flex: 1,
        margin:4,
        padding:4,
        backgroundColor: WHITE,
        alignItems: "center",
        justifyContent: "center",
      },
      row: {
        flex: 3,
        margin: 10,
        padding : 10,
        backgroundColor: WHITE
      },
      memo: {
        
        width: "100%",
        height:"80%",
        backgroundColor: '#E2E2E2'
      }
})

export default Dash_dash;
