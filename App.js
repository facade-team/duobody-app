import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
<<<<<<< HEAD
import { Header } from './src/components/Header';
=======
import Dash_cal from './src/screens/#2_dashboard/calendar';
>>>>>>> 931fda4863820e138e110f7e189b97d4620f7476
import IndividualSession from './src/screens/#4_individual/indiv_session';

const App = () => {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App