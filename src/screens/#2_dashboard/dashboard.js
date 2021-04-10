import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';


function dash_dash({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="This is dash_dash go to ~"
          onPress={() => navigation.navigate('dash_cal')}
        />
      </View>
    );
  }

  export default dash_dash;
