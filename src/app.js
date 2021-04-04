import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './screens/#1_auth/signUp';
import Footer_dash from './screens/#2_dashboard/Footer_dash';
import Footer_indiv from './screens/#4_individual/Footer_indiv';


const App = () => {
  return (
    <View style={styles.container}>
          <Footer_indiv/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App