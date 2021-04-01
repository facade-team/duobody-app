import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './screens/#1_auth/login';

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen></HomeScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});