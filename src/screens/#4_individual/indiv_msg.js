import React, {useState, useCallback, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import {StyleSheet, Text, View} from 'react-native';
import axios from '../../axios/api';
import { Colors } from '../../styles';

const indiv_msg = () => {

    // storage에서 chatroomId 가져오기
    const [chatroomId, setChatroomId] = useState('')

    const [trainee, setTrainee] = useState({})
    const [trainer, setTrainer] = useState({})
    const [isMounted, setIsMounted] = useState(true)

    const [messages, setMessages] = useState([]);

    useFocusEffect(
        useCallback(() => {
          let isActive = true
    
          const getChatRoomId = async () => {
            try {
              const id = await AsyncStorage.getItem('chatRoomId')
              if (isActive && (id !== chatroomId)) {
                    setChatroomId(id)
                    setIsMounted(false)
                    setMessages([])
                    
                axios.get(`/messenger/${id}`)
                .then((res)=>{
                    // trainee 정보 state에 저장
                    let newData = {}
                    newData._id = res.data.data.traineeId._id
                    newData.name = res.data.data.traineeId.name
                    setTrainee(newData)

                    // trainer 정보 state에 저장
                    let tData = {}
                    tData._id = res.data.data.trainerId._id
                    tData.name = res.data.data.trainerId.name
                    setTrainer(tData)

                    // 메시지 기록 state에 세팅
                    res.data.data.messages.map(d=>{
                        let msgData = {
                            createdAt: d.createdAt,
                            _id: d._id,
                            text: d.content,
                            user:{
                                _id: tData._id,
                                name: tData.name
                            }
                        }
                        setMessages(prevArray => GiftedChat.prepend(prevArray, msgData))
                    })
                    setIsMounted(true)

                }).catch(error=>{
                    console.log(error)
                })
              }
            } catch (err) {
              console.log(err)
            }
          }
    
          getChatRoomId()
    
          return () => {
            isActive = false
          }
        })
    )

    useEffect(() => {
        console.log('useeffect : ' + chatroomId)
    })

    const onSend = useCallback( async (messages = [], id) => {
        console.log(messages[0].text)
        console.log(`id onsend :${id}`)

        // 서버로 전송하는 로직
        await axios.post(`/messenger/${id}`,{
            content: messages[0].text
        })
        .then((res)=> {
            console.log(res.data)
        })
        .catch(error=>{
            console.log(error)
        })

        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const renderBubble = (props) =>{
        return(
        <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: '#A8D374'
                },
                left: {
                    backgroundColor: '#54A445'
                }
            }}
            textStyle={{
                left: {
                    color: 'white'
                }
            }}
        />);
    }

    return(
        <>
        <View style={styles.topbar}>
            <Text style={styles.title}>{trainee.name} 회원님</Text>
        </View>
        <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages, chatroomId)}
        user={{
            _id: trainer._id,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        />
        </>
    )
}

export default indiv_msg;

const styles = StyleSheet.create({
    topbar: {
        backgroundColor: Colors.WHITE,
        height: 50,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
      },
})
