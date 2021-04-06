import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';


function indiv_calendar({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="This is indiv_calendar go to ~"
          onPress={() => navigation.navigate('indiv_msg')}
        />
      </View>
    );
  }

  export default indiv_calendar;