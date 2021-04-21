import axios from 'axios';
import React, { Component, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, Image, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Colors, Mixins, Spacing, Typography } from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';




const mem_search= ({navigation}) => {

  const [traineeDidMount, settraineeDidMount] = useState(false);
  const [TraineeListFromDB, setTraineeListFromDB] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [SearchText, setSearchText] = useState('');

  useEffect(()=>{
    if(!traineeDidMount){
      axios.get('/trainee')
      .then(res => {
        res.data.data.map(tmp=>{
          let newTrainee = {}
          newTrainee._id = tmp._id
          newTrainee.name = tmp.name

          setTraineeListFromDB(prevArray => [...prevArray, newTrainee])
        })
      }).catch(err=>console.log(err[0]))
      settraineeDidMount(true)
      setIsLoading(false)
    };
  
  })

  const DeleteMem = (id) => {
    //axios.del...
  }
  

  return (
  <View style={styles.container}>
      <View style = {{flex: 1, marginTop: Spacing.SCALE_16}}>
        <View style={styles.bar}>
          <TextInput 
            style ={styles.inputbar}
            placeholder={'search'}
            onChangeText={setSearchText}>
          </TextInput>
        </View>
    </View>
    <View style = {{flex: 9}}>
      <Mem_List DATA = {TraineeListFromDB}/>
    </View>
  
</View>
      
    
  );
}

export default mem_search;

const Item = ({ name }) => (
  <View style = {styles.list}>
      <Icon 
        name = 'trash'
        color = {Colors.BLACK}
        size = {Spacing.SCALE_24}
        //onPress = {DeleteMem(item._id)}
      />
    
      <Text style = {styles.memlist}> {name} 회원님</Text>
  </View>
);

const Mem_List = ({DATA}) => {
  const renderItem = ({item}) => {
    const onPressOutHandler = async () => {
      await AsyncStorage.setItem('traineeId', item._id)
      navigation.navigate('Indiv', {screen: 'indiv_profile'})
    }

    return (
      <TouchableOpacity
        onPress={() => onPressOutHandler()}
        >
          <Item name = {item.name}/>
        </TouchableOpacity>
    )
  }

  return (
    <View style = {{flex:1}}>
      <View></View>
      <FlatList data = {DATA} renderItem={renderItem} keyExtractor = {item => item._id} />
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal: 5,
        backgroundColor: 'white',
        padding:10,
        alignItems: "center",
        justifyContent: "center",
      },
      
      
      list: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: Dimensions.get('screen').width * 0.80,
        height: Dimensions.get('screen').height * 0.06,
        margin:4,
        backgroundColor: Colors.WHITE,
        borderWidth:2,
        borderRadius: 8,
        borderColor : Colors.PRIMARY,
        paddingLeft: Spacing.SCALE_48,
        paddingRight: Spacing.SCALE_80,

        
      },
      
      memlist: {
        textAlign : 'center',
        fontWeight: 'bold',
        fontSize: 20,
        
      },
      bar:{
        flex:1
      },
      inputbar:{
          width: Dimensions.get('screen').width * 0.85,
          borderWidth:1,
        borderRadius: 25,
        height: Dimensions.get('screen').height * 0.05,
        paddingHorizontal: Spacing.SCALE_16,
      }
      
})
