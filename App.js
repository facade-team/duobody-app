import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Dash_cal from './src/screens/#2_dashboard/calendar';
import Dash_dash from './src/screens/#2_dashboard/dashboard';
import IndividualSession from './src/screens/#4_individual/indiv_session';
import Search from './src/screens/#3_mem_admin/mem_search';
import Add from './src/screens/#3_mem_admin/mem_add';
import Edit from './src/screens/#3_mem_admin/mem_edit';

const App = () => {
  return (
    <View style={styles.container}>
      <Edit></Edit>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App