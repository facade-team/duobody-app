import { createAndSavePDF } from '../../utils/helpers'
import { View, Button, Text } from 'react-native'
import { AuthContext } from '../../services/AuthContext'
import React, { useContext } from 'react'

const onPress = () => {}

function indiv_etc({ navigation }) {
  const { signOut } = useContext(AuthContext)

  const makePortfolio = () => {
    /*여기에서 자유롭게 테스트 해보면 됨*/

    console.log('터미널 보면 버튼 누를때마다 콘솔 찍힘')
  }

  return (
    <View
      key={1}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Button
        title="변화 보기"
        onPress={createAndSavePDF('<p>hello world</p>')}
      />
    </View>
  )
}

export default indiv_etc
