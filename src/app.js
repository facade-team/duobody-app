import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Footer_dash from './components/Footer_dash';
import IndividualSession from './screens/#4_individual/indiv_session';



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