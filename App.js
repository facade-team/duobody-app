import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import IndividualSession from './src/screens/#4_individual/indiv_session';



const App = () => {
  return (
    <View style={styles.container}>
      <IndividualSession />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App