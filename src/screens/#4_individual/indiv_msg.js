import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';


function indiv_msg({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="This is indiv_msg go to ~"
          onPress={() => navigation.navigate('indiv_etc')}
        />
      </View>
    );
  }

  export default indiv_msg;