import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';


function mem_add({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="This is mem_add go to ~"
          onPress={() => navigation.navigate('mem_edit')}
        />
      </View>
    );
  }

  export default mem_add;