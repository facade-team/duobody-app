import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Colors } from '../styles'

const Loader = () => {
  return (
    <View>
      <ActivityIndicator 
        color={Colors.PRIMARY}
      />
    </View>
  )
}

export default Loader