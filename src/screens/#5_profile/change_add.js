import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';


function change_add({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="This is change_add go to ~"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    );
  }

  export default change_add;