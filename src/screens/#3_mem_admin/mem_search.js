import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';


function mem_search({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="This is mem_search go to ~"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    );
  }

  export default mem_search;