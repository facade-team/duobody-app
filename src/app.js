import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './screens/#1_auth/signUp';
import Dashboard from './screens/#2_dashboard/dashboard';

const App = () => {
  return (
    <View style={styles.container}>
      <Dashboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App