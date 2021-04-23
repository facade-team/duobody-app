<<<<<<< HEAD
import axios from 'axios';
import React, { Component, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, Image, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Colors, Mixins, Spacing, Typography } from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
=======
import axios from '../../axios/api';
import React, { Component, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, Image, View, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native';
import { Colors, Mixins, Spacing, Typography } from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import Loader from '../../components/Loader';
>>>>>>> b6262a8d554e0560e87cda8062c1f50c2f11c370




const mem_search= ({navigation}) => {

  const [traineeDidMount, settraineeDidMount] = useState(false);
  const [TraineeListFromDB, setTraineeListFromDB] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [SearchText, setSearchText] = useState('');
<<<<<<< HEAD

  useEffect(()=>{
    if(!traineeDidMount){
      axios.get('/trainee')
      .then(res => {
=======
  const [IsNewFlag, setIsNewFlag] = useState(true)
  
  

  useFocusEffect(
    useCallback(async()=>{
      const NewLoadFlag = await AsyncStorage.getItem('newloadflag')

      if(NewLoadFlag === 'hello'){
        getTrainee()

      }
      
      // if(IsNewFlag){
      //   getTrainee()
      // }
      // setIsNewFlag(false)
    })
  )

  const getTrainee = () => {
    setTraineeListFromDB([])
    setIsNewFlag(false)
    axios.get('/trainee')
      .then(async(res) => {
        let traineeArr = []
>>>>>>> b6262a8d554e0560e87cda8062c1f50c2f11c370
        res.data.data.map(tmp=>{
          let newTrainee = {}
          newTrainee._id = tmp._id
          newTrainee.name = tmp.name
          newTrainee.display = true

<<<<<<< HEAD
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

  const filteredList = TraineeListFromDB.filter((data) => {
    return data.name.toUpperCase().includes(SearchText.toUpperCase())
  })

  return (
  <View style={styles.container}>
      <View style = {{flex: 1, marginTop: Spacing.SCALE_16}}>
        <View style={styles.bar}>
          <TextInput 
            style ={styles.inputbar}
            placeholder={'search'}
            value={SearchText}
            onChangeText={setSearchText}>
          </TextInput>
        </View>
    </View>
    <View style = {{flex: 9}}>
      <Mem_List DATA = {filteredList} SearchText={SearchText} navigation={navigation} />
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

const Mem_List = ({DATA, SearchText, navigation}) => {

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
      <FlatList data = {DATA} renderItem={renderItem} keyExtractor = {item => item._id} extraData={SearchText} />
    </View>
  )
}

=======
          traineeArr.push(newTrainee)
        })
        await AsyncStorage.setItem('newloadflag', 'bye')
        setTraineeListFromDB(traineeArr)
      }).catch(err=>console.log(err[0]))
      settraineeDidMount(true)
      setIsLoading(false)
  }

  useEffect(()=>{
    if(!traineeDidMount){
      getTrainee()
    };

    if(IsNewFlag){
      getTrainee()
    }
}
  )
  let filteredList = []
  if (TraineeListFromDB.length !== 0) {
    filteredList = TraineeListFromDB.filter((data) => {
      return data.name.toUpperCase().includes(SearchText.toUpperCase())
    })
  }
  else {
    filteredList = []
  }


  const Item = ({ name }) => (
    <View style = {styles.list}>
        <Text style = {styles.memlist}> {name} 회원님</Text>
    </View>
  );
  
  const Mem_List = ({DATA, SearchText, navigation}) => {
  
    const renderItem = ({item}) => {
      const onPressOutHandler = async () => {
        await AsyncStorage.setItem('traineeId', item._id)
        navigation.navigate('Indiv', {screen: 'indiv_profile'})
      }
      
      const DelCheckHandler = () => {
        Alert.alert(
          `${item.name} 회원님을 지우시겠습니까?`,
          '이 작업은 취소할 수 없습니다.',
          [
            {
              text: '삭제하기',
              onPress: () => {onPressDelHandler()},
              style: 'destructive',
            },
            {
              text: '아니요',
              style : 'cancel'
            },
          ]
        )
      }
  
      const onPressDelHandler = async () => {
        
        let delMem = {}
        delMem.traineeId = item._id
        
        await axios.delete('/trainee', {
          data: delMem
        })
        .then(res => {
          Alert.alert(res.data.msg)
          console.log(res.data)
          setIsNewFlag(true)
        })
        .catch((err) => {
          console.log(err.response)
          Alert.alert(err.response.data.msg)
        })
      }
  
      return (
        <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => onPressOutHandler()}>
            <Item name = {item.name}/>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress = {() => DelCheckHandler()}>
              <View>
            <Icon.Button
              name = 'trash'
              color = {Colors.BLACK}
              size = {Spacing.SCALE_24}
              backgroundColor = {Colors.GRAY}
              paddingTop = {Spacing.SCALE_12}
              paddingLeft = {Spacing.SCALE_16}
              paddingBottom = {Spacing.SCALE_16}
              onPress = {() => DelCheckHandler()}
            />
            </View>
            </TouchableOpacity>
        </View>
      )
    }
  
    return (
      <View style = {{flex:1}}>
        <FlatList data = {DATA} renderItem={renderItem} keyExtractor = {item => item._id} extraData={SearchText} />
      </View>
    )
  }
  

  return (
  <View style={styles.container}>
      <View style = {{flex: 1, marginTop: Spacing.SCALE_16}}>
        <View style={styles.bar}>
          <TextInput 
            style ={styles.inputbar}
            placeholder={'search'}
            value={SearchText}
            onChangeText={setSearchText}>
          </TextInput>
        </View>
    </View>
    <View style = {{flex: 9}}>
      {!IsNewFlag && TraineeListFromDB.length !== 0 ? 
      <Mem_List DATA = {filteredList} SearchText={SearchText} navigation={navigation} />
      :
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Loader />
      </View>
}
    </View>
  
</View>
  );
}

export default mem_search;


>>>>>>> b6262a8d554e0560e87cda8062c1f50c2f11c370

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal: 5,
        backgroundColor: 'white',
        padding:10,
        alignItems: "center",
        justifyContent: "space-between",
      },
      
      
      list: {
        alignItems: 'center',
<<<<<<< HEAD
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: Dimensions.get('screen').width * 0.80,
=======
        justifyContent: 'center',
        flexDirection: 'row',
        width: Dimensions.get('screen').width * 0.60,
>>>>>>> b6262a8d554e0560e87cda8062c1f50c2f11c370
        height: Dimensions.get('screen').height * 0.06,
        margin:4,
        backgroundColor: Colors.WHITE,
        borderWidth:2,
        borderRadius: 8,
<<<<<<< HEAD
        borderColor : Colors.PRIMARY,
        paddingLeft: Spacing.SCALE_48,
        paddingRight: Spacing.SCALE_80,

        
=======
        borderColor : Colors.PRIMARY,        
>>>>>>> b6262a8d554e0560e87cda8062c1f50c2f11c370
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
        fontSize: 17
<<<<<<< HEAD
      }
=======
      },

>>>>>>> b6262a8d554e0560e87cda8062c1f50c2f11c370
      
})
