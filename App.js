import React from 'react';
import { StyleSheet, View } from 'react-native';
import Auth_Nav from './src/navigation/auth_nav';

import Navigation from './src/navigation/navigation';



const App = () => {
  return (
    <View style={styles.container}>
      <Navigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App