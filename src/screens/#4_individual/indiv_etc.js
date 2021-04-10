import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';


function indiv_etc({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="This is indiv_etc go to ~"
          onPress={() => navigation.navigate('indiv_session')}
        />
      </View>
    );
  }

  export default indiv_etc;