import React from 'react';
import { StyleSheet, View } from 'react-native';
import Dash_cal from './screens/#2_dashboard/calendar';


const App = () => {
  return (
    <View style={styles.container}>
      <Dash_cal/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App