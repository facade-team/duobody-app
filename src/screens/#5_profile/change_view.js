import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';


function change_view({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="This is change_view go to ~"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    );
  }

  export default change_view;