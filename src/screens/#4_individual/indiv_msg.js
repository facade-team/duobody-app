import React, {useState, useCallback, useEffect} from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import {StyleSheet, Text, View} from 'react-native';
import axios from '../../axios/api';
import { Colors } from '../../styles';

const indiv_msg = () => {

    //chatroomId는 넘어오는걸 받아서 set해줄것
    //일단 김문기 trainee로 가정
    const [chatroomId, setChatroomId] = useState('607c4c49ef20a0c44af9db51')
    const [trainee, setTrainee] = useState({})
    const [trainer, setTrainer] = useState({})
    const [isMounted, setIsMounted] = useState(false)

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // 처음 랜더링 될 때와, ChatroomId가 바뀌었을 경우(다른 채팅방일 경우) 채팅방 정보 받아와서 state에 저장
        if(!isMounted){
            axios.get(`/messenger/${chatroomId}`)
            .then((res)=>{
                console.log(res.data.data.messages)

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

            }).catch(error=>{
                console.log(error)
            })
            setIsMounted(true)
        }
    }, [])

    const onSend = useCallback((messages = []) => {
        // console.log(messages[0])
        // 서버로 전송하는 로직
        axios.post(`/messenger/${chatroomId}`,{
            content: messages[0].text
        })
        .then((res)=> {
            // console.log(res.data)
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
        onSend={messages => onSend(messages)}
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
