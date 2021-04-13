import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';

const DATA = [
  {
      _id : "606d5c9af19b2e4064b8f901",
      name: "최이현"
  },
  {
      _id : "606d5c9af19b2e4064b8f902",
      name: "김현재"
  },
  {
      _id : "606d5c9af19b2e4064b8f903",
      name: "김승우"
  },
  {
      _id : "606d5c9af19b2e4064b8f904",
      name: "김문기"
  },
  {
      _id : "606d5c9af19b2e4064b8f905",
      name: "오상훈"
  },
  {
      _id : "606d5c9af19b2e4064b8f906",
      name: "최현수"
  }
];

const Item = ({ name }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
  </View>
);

const TraineeList = ({setSelectedTrainee}) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPressOut={() => {
      console.log("찍히냐?")
      setSelectedTrainee(item.name)
      }}>
      <Item name={item.name}/>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
        <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item._id} />
    </SafeAreaView>
  );
}

export default TraineeList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    borderRadius: 20
  },
  item: {
    padding: 15,
    marginVertical: 1,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D6D6'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
