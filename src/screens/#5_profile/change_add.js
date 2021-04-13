import * as React from 'react';
import { View, Text, Button, Image, Alert } from 'react-native';


function change_add({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> 이건 change_add</Text>
        <Button
          title="무야호"
          onPress={() => Alert.alert('그만큼 신나시는거지~')}
        />
      </View>
    );
  }

  export default change_add;