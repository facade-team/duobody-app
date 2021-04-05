import React from 'react';
import { StyleSheet, View } from 'react-native';
import Indiv_msg from './screens/#4_individual/indiv_msg'
import Messenger from './screens/#2_dashboard/messenger'

const App = () => {
  return (
    <View style={styles.container}>
      <Messenger/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App