import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './src/components/Header';
import Dash_cal from './src/screens/#2_dashboard/calendar';
import IndividualSession from './src/screens/#4_individual/indiv_session';
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