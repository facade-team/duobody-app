import React, { useContext }from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../services/AuthContext';
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import AsyncStorage from '@react-native-async-storage/async-storage';

function indiv_etc({ navigation }) {
  const { signOut } = useContext(AuthContext)

  const makePortfolio = () => {
    /*여기에서 자유롭게 테스트 해보면 됨*/
    console.log('터미널 보면 버튼 누를때마다 콘솔 찍힘')
  }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="포트폴리오 내보내기"
          onPress={() => makePortfolio()}
        />
        <TouchableOpacity onPressOut={signOut}>
        <Text>Log out</Text>
      </TouchableOpacity>
      </View>
    );
  }

  export default indiv_etc;