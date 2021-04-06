import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';
import Messenger from './messenger';


function dash_cal({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="This is dash_cal go to ~"
          onPress={() => navigation.navigate('mem_add')}
        />
      </View>
    );
  }

  export default dash_cal;