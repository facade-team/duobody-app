import axios from '../../axios/api';
import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../../styles';

const Item = ({ title, submessenger }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title} 회원님</Text>
    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.submessenger}>'안녕하세요 고객님! 오늘 운동 루틴은 어쩌구저쩌구 이러쿵 저러쿵입니다 오늘 13시 00분에 어디에서 뵐게요~~'</Text>
  </View>
);

const Dash_Msg = ( {navigation} ) => {

  const renderItem = ({ item }) => (
    <TouchableOpacity onPressOut={() => {
        // 회원 채팅방 누를 때 채팅방 생성
        // 채팅방 생성 api - body에 trainee id 넣고 post
        //console.log(item)
        axios.post('/messenger',{
          traineeId: item._id
        })
        .then((res)=>{
          //console.log(res.data)
          //해당 채팅방 id가 res로 날아오는데 이걸 저장해서 넘겨줘야 함
        })
        .catch(error => {
          console.log(error)
        })

        // 회원별 채팅방으로 이동
        navigation.navigate('Indiv', {screen: 'indiv_msg'})
      }}>
      <Item title={item.name} submessenger={item.submessenger}/>
    </TouchableOpacity>
  );

  const [trainee,setTrainee] = useState([])
  const [didMount,setDidMount] = useState(false)

  useEffect(()=>{
    //trainee 불러오기
    if(!didMount){
      axios.get('/trainee').then((res)=>{
        res.data.data.map(d=>{
          let newTrainee = {}
          newTrainee._id = d._id
          newTrainee.name = d.name

          setTrainee(prevArray => [...prevArray, newTrainee])
        })
      }).catch(error => {
        console.log(error)
      })
      setDidMount(true)
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style = {styles.maincontainer}>
        <FlatList data={trainee} renderItem={renderItem} keyExtractor={item => trainee._id} />
      </View>
    </SafeAreaView>
  );
}

export default Dash_Msg

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    marginTop: StatusBar.currentHeight || 0,
  },
  maincontainer:{
    backgroundColor: Colors.WHITE,
    margin: 5,
    height: '98.5%',
    borderRadius: 20,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 1,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  submessenger: {
      fontSize: 15,
      
  }
});
