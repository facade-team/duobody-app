import React, { Component, useState} from 'react';
import {FlatList, StyleSheet, Text, Image, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Colors, Mixins, Spacing, Typography } from '../../styles';
import {Icon, Input, Item, Button} from 'native-base';

import { WHITE } from '../../styles/colors';

export default () => {
  const [memList, setMemList] = useState([
    {id : 1, name: '김현재'},
    {id : 2,name: '김승우'},
    {id : 3,name: '최현수'},
    {id : 4,name: '오상훈'},
    {id : 5,name: '최이현'},
    {id : 6,name: '아이유'},
    {id : 7,name: '이지은'},
    {id : 8,name: '김ㅇㅇ'},
    {id : 9,name: '이ㅇㅇ'},
    {id : 10,name: '박ㅇㅇ'},
    {id : 11,name: '최ㅇㅇ'},
    {id : 12,name: '황ㅇㅇ'},
    {id : 13,name: '지ㅇㅇ'},
    {id : 14,name: '주ㅇㅇ'},
    {id : 15,name: '구ㅇㅇ'},
    {id : 16,name: '신ㅇㅇ'},
    {id : 17,name: '수ㅇㅇ'},
  ])

  const addMember = (name) => {
    const newMember = {
      id: memList.length,
      name : name,
    }

    setMemList(oldMemlist => [...oldMemlist, newMember])
  }

  const deleteMember = () => {

  }

  const [searchValue, setsearchValue] = useState('')

  const updateSearch = (search) => {
    setsearchValue({search});
  }
/*
  const memSearch = (value) => {
    memList.map
  }
  */
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Item rounded style={{width: Dimensions.get('screen').width * 0.85,height: Dimensions.get('screen').height * 0.06,}}>
          <Icon active name = "search" style={{color:'black', padding:10}}></Icon>
          <Input placeholder='Search' onChangeText={updateSearch}></Input>
        </Item>
          
      </View>
      <View style={{flexDirection: 'row', flex:8}}>
        <View style={{alignItems: "center",flex:1}}>
        <Button transparent>
        <Icon name = "create-outline" style={{fontSize:30,color:'black', padding:10}}></Icon>
        </Button>
        </View>
        <View style={styles.list}>
          <FlatList
            data={memList}
            renderItem={({item}) => <Button style={styles.memlist}><Text style={{fontWeight: 'bold',fontSize: 20,}}>{item.name} 고객님</Text></Button>}
          />
        </View>
        <View style={{alignItems: "center",flex:1}}>
        <Button transparent >
        <Icon name = "trash-outline" style={{fontSize:30,color:'black', padding:10}}></Icon>
        </Button>
        </View>
      </View>
      
    
  </View>
  

);
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal: 5,
        backgroundColor: 'white',
        paddingTop:100,
        padding:10,
        alignItems: "center",
        justifyContent: "center",
      },
      
      
      list: {
          flex:3,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        
      },
      
      memlist: {
        flex:1,
        width: Dimensions.get('screen').width * 0.53,
        margin:3,
        backgroundColor: WHITE,
        alignItems: "center",
        justifyContent: "center",
        borderWidth:1,
        borderRadius: 8,
        borderColor : '#2BAE56',
        
        height: Dimensions.get('screen').height * 0.06,
        
      },
      bar:{
        flex:1
      },
      inputbar:{
          
          borderWidth:1,
        borderRadius: 25,
        height: Dimensions.get('screen').height * 0.05,
        padding:20
      }
      
})
