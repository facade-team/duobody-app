import axios from '../../axios/api';
import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../../styles';

const Item = ({ title, submessenger }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title} 회원님</Text>
    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.submessenger}>{submessenger}</Text>
  </View>
);

const Dash_Msg = ( {navigation} ) => {

  const renderItem = ({ item, submessenger }) => (
    <TouchableOpacity onPressOut={() => {
        // 회원별 채팅방으로 이동
        navigation.navigate('Indiv', {screen: 'indiv_msg'})
      }}>
      <Item title={item.traineeId.name} submessenger={item.messages.content}/>
    </TouchableOpacity>
  );

  const [didMount,setDidMount] = useState(false)
  const [chatRoom,setChatroom] = useState([])

  useEffect(()=>{
    if(!didMount){
      //모든 trainee 조회
      axios.get('/trainee').then((res)=>{
        //받은 res에 chatRoomId가 없으면 채팅방 자체가 렌더링이 안됨.
        res.data.data.map(d=>{
          //console.log(d)
          if(d.chatRoomId === undefined){
            // chatroom을 하나 만들어주자.
            axios.post('/messenger',{
              traineeId: d._id
            }).then((res)=>{
              //res에 온 채팅방으로 초기 메시지 보내기
              axios.post(`/messenger/${res.data.data._id}`,{
                content: '환영합니다!'
              })
            }).catch(error=>{
              console.log(error)
            })
          }
        })
      }).catch(error => {
        console.log(error)
      })

      //생성되어 있는 트레이너의 모든 채팅방 조회
      axios.get('/messenger').then((res)=>{
        res.data.data.chatRoomIds.map(d=>{
          console.log(d)
          let newRoom = {
            _id: d._id,
            messages: {
              _id: d.messages[0]._id,
              content: d.messages[0].content
            },
            traineeId: {
              _id: d.traineeId._id,
              name: d.traineeId.name
            }
          }
          setChatroom(prevArray => [...prevArray, newRoom])          
        })
      }).catch((error)=>{
        console.log(error)
      })
      setDidMount(true)
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style = {styles.maincontainer}>
        <FlatList data={chatRoom} renderItem={renderItem} keyExtractor={item => chatRoom._id} />
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
    paddingTop: 20,
    paddingLeft: 20,
    marginVertical: 2,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  submessenger: {
    fontSize: 15,
    color: Colors.GRAY,
    paddingVertical: 5
  }
});
