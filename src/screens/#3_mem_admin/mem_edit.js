import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';


function mem_edit({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="This is mem_edit go to ~"
          onPress={() => navigation.navigate('mem_search')}
        />
      </View>
    );
  }

  export default mem_edit;