import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './screens/#1_auth/signUp';
import Footer_dash from './screens/#2_dashboard/Footer_dash';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
  return (
    <View style={styles.container}>
          <Footer_dash/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App