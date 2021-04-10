import React, { Component, useState} from 'react';
import {FlatList, StyleSheet, Text, Image, View, TouchableOpacity, Dimensions } from 'react-native';
import { Colors, Mixins, Spacing, Typography } from '../../styles';
import GrayTextButton from '../../components/GrayTextButton';
import { WHITE } from '../../styles/colors';
import {Icon, Left, Body, Right, Header, Button} from 'native-base';

export default Dash_dash = () => {
  const [times1, setTimes1] = useState([
    {
      id : 1,
      key : '09',
      name : '김승우 회원님'
    },
    {
      id : 2,
      key : '10',
      name : ''
    },
    {
      id : 3,
      key : '11',
      name : '김현재 회원님'
    },
    {
      id : 4,
      key : '12',
      name : '최이현 회원님'
    },
    {
      id : 5,
      key : '13',
      name : ''
    },
    {
      id : 6,
      key : '14',
      name : ''
    },


  ])

  const [times2, setTimes2] = useState([
    
    {
      id : 7,
      key : '15',
      name : ''
    },
    {
      id : 8,
      key : '16',
      name : '최현수 회원님'
    },
    {
      id : 9,
      key : '17',
      name : '김문기 회원님'
    },
    {
      id : 10,
      key : '18',
      name : ''
    },
    {
      id : 11,
      key : '19',
      name : ''
    },
    {
      id : 12,
      key : '20',
      name : '아이유 회원님'
    },

  ])

  const [members, setmembers] = useState([
    {id : 1, name: '김현재 고객님'},
    {id : 2,name: '김승우 고객님'},
    {id : 3,name: '최현수 고객님'},
    {id : 4,name: '오상훈 고객님'},
    {id : 5,name: '최이현 고객님'},
    {id : 6,name: '아이유 고객님'},
    {id : 7,name: '이지은 고객님'},
  ])

  return (
  <View style={styles.container}>
    <View style={styles.header}></View>
    <View style={styles.main}>
      <View style={styles.upper}>
      <View>
        
        <Text style={styles.listh}>TODAY</Text>
    
      </View>
      
      <View style={styles.time}>
      <View style={{}}>
        <FlatList
          data={times1}
          renderItem={({item}) => 
          <View style={styles.timelist}>
            <View style={{flex:2, alignItems: "center",}}>
            <Text style={{fontWeight: 'bold',fontSize: 17, color:'gray'}}>{item.key}</Text>
            </View>
            <View style={{flex:5, alignItems:'center'}}>
            <Text style={{fontWeight: 'bold',fontSize: 17,}}>{item.name}</Text>
            </View>
            </View>}
        />
      </View>
      <View style={{}}>
        <FlatList
          data={times2}
          renderItem={({item}) => 
          <View style={styles.timelist}>
            <View style={{flex:2, alignItems: "center",}}>
            <Text style={{fontWeight: 'bold',fontSize: 17, color:'gray'}}>{item.key}</Text>
            </View>
            <View style={{flex:5, alignItems:'center'}}>
            <Text style={{fontWeight: 'bold',fontSize: 17,}}>{item.name}</Text>
            </View>
            </View>}
        />
      </View>
  
    </View>
    </View>

    <View style={styles.down}>
      <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          
          <Text style={styles.listh}>고객명단</Text>
          
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button transparent >
          <Icon name = "search" style={{color:'black'}}></Icon></Button>
          <Button transparent>
          <Icon name = "add-circle-outline" style={{color:'black'}}></Icon></Button>
        </View>
      </View>
      <View style = {{flex:5,alignItems: "center",
        justifyContent: "center",}}>
      <View style={styles.list}>
        <FlatList
          data={members}
          renderItem={({item}) => <Button style={styles.memlist}><Text style={{fontWeight: 'bold',fontSize: 20,}}>{item.name}</Text></Button>}
        />
      </View>
      </View>
    </View>
  </View>
  </View>
)
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal: 5,
        backgroundColor: Colors.PRIMARY,
        padding:10
      },
      header: {
        flex:1,
      },
      main: {
        flex: 10,
       
        alignItems: "center",
        justifyContent: "center",
      },
      listh: {
        margin:10,
        fontWeight: 'bold',
        fontSize: 20,
      },
      list: {
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
      },
      time: {
        flex: 9,
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        
      },
      timelist: {
        flex:1,
        width: Dimensions.get('screen').width * 0.4,
        margin:3,
        
        backgroundColor: WHITE,
        borderWidth:1,
        borderRadius: 8,
        borderColor : '#2BAE56',
        fontWeight: 'bold',
        alignItems: "center",
        justifyContent: "center",
       
        height: Dimensions.get('screen').height * 0.05,
        flexDirection: 'row', justifyContent: 'space-between'
      },
      upper: {
        flex: 1,
        width:'95%',
        margin:4,
        padding:4,
        backgroundColor: WHITE,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        
      },
      down: {
        flex: 1,
        width:'95%',
        margin:4,
        padding:4,
        backgroundColor: WHITE,
        
        borderRadius: 8,
      },
      
      memlist: {
        flex:1,
        width: Dimensions.get('screen').width * 0.75,
        margin:3,
        backgroundColor: WHITE,
        alignItems: "center",
        justifyContent: "center",
        borderWidth:1,
        borderRadius: 8,
        borderColor : '#2BAE56',
        
        height: Dimensions.get('screen').height * 0.06,
        
      }
      
})
