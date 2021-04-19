import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, Image, View, TouchableOpacity, Dimensions } from 'react-native';
import { Colors, Spacing } from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';
import { useNavigation } from '@react-navigation/native'
import axios from '../../axios/api';
import AsyncStorage from '@react-native-community/async-storage';


const Dash_dash = () => {
  
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState('');
  const [traineeDidMount, settraineeDidMount] = useState(false);
  const [TraineeListFromDB, setTraineeListFromDB] = useState([]);

  const getApiTest = () => {
    axios.get(`/trainee`)
    .then(res => {
      console.log('-----------------')
      console.log(res.data.data[0])
    })
    .catch(err => console.log('this is error for inbody ' +err))
  };
  
  
  useEffect(()=>{


  //아래 고객명단 함수
    if(!traineeDidMount) {
      axios.get('/trainee')
      .then(res => {
        res.data.data.map(tmp=>{
          let newTrainee = {}
          newTrainee._id = tmp._id
          newTrainee.name = tmp.name
          
          setTraineeListFromDB(prevArray => [...prevArray, newTrainee])
        })
      }).catch(err => console.log(err[0]))
      settraineeDidMount(true)
      setIsLoading(false) 
    };
      
  });
  //--------------------------
  const fakedate = '20210415';
  let todaystr = '';
  const today = new Date()
  const koreaday = ['일','월','화','수','목','금','토']
  
  const [selectedDatePick,setSelectedDatePick] = useState({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      date: today.getDate(),
      day: today.getDay()
  })
  
  let strmonth = selectedDatePick.month
  let strdate = selectedDatePick.date
  
  if(strmonth < 10){
    strmonth = '0'+ strmonth.toString()
  } else {
    strmonth = strmonth.toString()
  }
  if(strdate < 10){
    strdate = '0'+ strdate.toString()
  } else {
    strdate = strdate.toString()
  }
  
  todaystr = selectedDatePick.year.toString() + strmonth + strdate
  //--------------------









return ( isLoading ? <Text>Loading...</Text> : 
<View style={styles.container}>
  <View style={styles.main}>    
      
    <View style={styles.upper}>
      <View style={{flexDirection: "row", width: '90%', justifyContent: 'space-between'}}>
        <Text style={styles.listupleft}>{selectedDatePick.month}월 {selectedDatePick.date}일 ({koreaday[selectedDatePick.day]})</Text>
        <TouchableOpacity
          onPressOut={getApiTest}>
        <Text>API Test</Text>
      </TouchableOpacity>
        <Text style={styles.listright}>TODAY</Text>
      </View>

      <View style={styles.time}>
        <View>
          <FlatList
            scrollEnabled={false}
            data={[
              {time: '09'},
              {time: '10'},
              {time: '11'},
              {time: '12'},
              {time: '13'},
              {time: '14'},
            ]}
            renderItem={({item}) => <Text style={styles.timelist}>{item.time}</Text>}
          />
        </View>
        <View>
          <FlatList
            scrollEnabled={false}
            data={[
              {time: '15'},
              {time: '16'},
              {time: '17'},
              {time: '18'},
              {time: '19'},
              {time: '20'},
            ]}
            renderItem={({item}) => <Text style={styles.timelist}>{item.time}</Text>}
          />
        </View>          
      </View>
    </View> 

          
      
    <View style={styles.down}>
      <View style={{flexDirection: 'row', width: '95%', justifyContent: 'space-between', marginTop: Spacing.SCALE_8,marginBottom: Spacing.SCALE_8}}>
        <View>
          <Text style={styles.listleft}>고객명단</Text>
        </View>
        <View style={{flexDirection: 'row', width: '18%', marginRight: 5, justifyContent: 'space-between'}}>
          <View style = {{marginTop: Spacing.SCALE_2}}>
            <Icon
              name = "search" 
              color = {Colors.BLACK} 
              size = {Spacing.SCALE_20}
              onPress = {() => navigation.navigate('Mem_Search')}
            />
          </View>
          <Icon 
            name = "add-circle" 
            color = {Colors.BLACK} 
            size = {Spacing.SCALE_24}
            onPress = {() => navigation.navigate('Mem_Add')}
          />
        </View>
      </View>
      <Mem_List DATA = {TraineeListFromDB}/>
    </View>
  </View>
</View>
);
}

//아래 회원 리스트 구현 함수

const Item = ({ name }) => (
  <View style = {styles.list}>
    <View style = {styles.circle}/>
    <Text style = {styles.memlist}>{name} 회원님</Text>
  </View>
);

const Mem_List = ({DATA}) => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => {

    const onPressOutHandler = async () => {
      await AsyncStorage.setItem('traineeId', item._id)
      navigation.navigate('Indiv', {screen: 'indiv_profile'})
    }

    return (
      <TouchableOpacity 
        onPress={() => onPressOutHandler()}
      >
        <Item name = {item.name} />
      </TouchableOpacity>
    )
  }

  return (
      <View style = {{flex:1}}>
      <View>{console.log(DATA)}</View>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
    
      </View>
  );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Colors.PRIMARY,
        padding: 0,
      },
      main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      listupleft: {
        marginBottom: Spacing.SCALE_4,
        fontWeight: '900',
        fontSize: Spacing.SCALE_18,
        color: Colors.GRAY_DARK,
      },
      listleft: {
        margin:5,
        fontWeight: 'bold',
        fontSize: Spacing.SCALE_18,
      },
      listright: {
        marginBottom: Spacing.SCALE_4,
        fontWeight: '900',
        fontSize: Spacing.SCALE_18,
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

      circle: {
        height: Dimensions.get('screen').height * 0.035,
        width : Dimensions.get('screen').height * 0.035,
        borderRadius: 50,
        backgroundColor: Colors.GRAY_MEDIUM,
      },

      time: {
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
      },
      timelist: {
        width: Dimensions.get('screen').width * 0.40,
        margin:3,
        backgroundColor: Colors.WHITE,
        paddingTop:Dimensions.get('screen').height * 0.01,
        paddingLeft:10,
        borderWidth:1,
        borderRadius: 8,
        borderColor : Colors.PRIMARY,
        fontWeight: 'bold',
        color: Colors.GRAY,
        fontSize: Spacing.SCALE_18,
        textAlign: 'left',
        height: Dimensions.get('screen').height * 0.048,
      },
      upper: {
        flex: 1,
        width:'97.5%',
        margin:5,
        padding:4,
        backgroundColor: Colors.WHITE,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        
      },
      down: {
        flex: 1,
        width:'97.5%',
        margin:5,
        padding:4,
        marginBottom: 5,
        backgroundColor: Colors.WHITE,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
      },
      
      
      
})

export default Dash_dash;


const DATA = [
  {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: '김ㅇㅇ 회원님',
  },
  {
      id: 'efoacbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: '박ㅇㅇ 회원님',
  },
  {
      id: 'obnacbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: '주ㅇㅇ 회원님',
  },
  {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: '이ㅇㅇ 회원님',
  },
  {
      id: '120ncbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: '황ㅇㅇ 회원님',
  },
  {
      id: '1pviebea-c1b1-46c2-aed5-3ad53abb28ba',
      name: '엄ㅇㅇ 회원님',
  },
  {
      id: 'nxaacbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: '최ㅇㅇ 회원님',
  },
  {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: '최ㅇㅇ 회원님',
  },
  {
      id: 'qp7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: '신ㅇㅇ 회원님',
  },
  {
      id: '00eacbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: '수ㅇㅇ 회원님',
  },
  {
      id: '30racbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: '지ㅇㅇ 회원님',
  },
  {
      id: '22kacbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: '구ㅇㅇ 회원님',
  },
];
