import React from 'react';
import { StyleSheet, View } from 'react-native';
import IndividualSession from './src/screens/#4_individual/indiv_session';
import Dash_cal from './src/screens/#2_dashboard/calendar'

const App = () => {
  return (
    <View style={styles.container}>
      <Dash_cal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App