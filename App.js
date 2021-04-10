import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './src/components/Header';
import Dash_cal from './src/screens/#2_dashboard/calendar';
import Footer_dash from './src/screens/#2_dashboard/Footer_dash';
import IndividualSession from './src/screens/#4_individual/indiv_session';
import Footer_indiv from './src/screens/#4_individual/Footer_indiv';

const App = () => {
  return (
    <View style={styles.container}>
      <Footer_indiv />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App