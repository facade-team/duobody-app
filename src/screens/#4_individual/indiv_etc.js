import React, { useContext }from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../services/AuthContext';

function indiv_etc({ navigation }) {
  const { signOut } = useContext(AuthContext)

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="This is indiv_etc go to ~"
          onPress={() => navigation.navigate('indiv_session')}
        />
        <TouchableOpacity onPressOut={signOut}>
        <Text>Log out</Text>
      </TouchableOpacity>
      </View>
    );
  }

  export default indiv_etc;