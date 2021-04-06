import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';


function indiv_session({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="This is indiv_session go to ~"
          onPress={() => navigation.navigate('indiv_calendar')}
        />
      </View>
    );
  }

  export default indiv_session;