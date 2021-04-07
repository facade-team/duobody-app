import React, {useState, useCallback, useEffect} from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import {StyleSheet} from 'react-native';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
        {
            _id: 1,
            text: '화면 상단에 넘어온 prop으로 대화상대 띄워야됨',
            createdAt: new Date(),
            user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
            },
        },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
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
        <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
            _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        />
    )
}

export default ChatScreen;
