import React from 'react';
import { StyleSheet, View } from 'react-native';
import Indiv_calendar from './src/screens/#4_individual/indiv_calendar';

const App = () => {
  return (
    <View style={styles.container}>
      <Indiv_calendar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App