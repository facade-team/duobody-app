import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '김oo 회원님',
    submessenger: '안녕하세요 김oo 고객님! 오늘 운동 루틴은 어쩌구저쩌구 이러쿵 저러쿵입니다 오늘 13시 00분에 어디에서 뵐게요~~'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    submessenger: '안녕하세요 이oo 고객님! 오늘 운동 루틴은 어쩌구저쩌구 이러쿵 저러쿵입니다 오늘 13시 00분에 어디에서 뵐게요~~'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    submessenger: '안녕하세요 최oo 고객님! 오늘 운동 루틴은 어쩌구저쩌구 이러쿵 저러쿵입니다 오늘 13시 00분에 어디에서 뵐게요~~'
  }
];

const Item = ({ title, submessenger }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.submessenger}>{submessenger}</Text>
  </View>
);

const Messenger = () => {
  const renderItem = ({ item }) => <Item title={item.title} submessenger={item.submessenger}/>;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
    </SafeAreaView>
  );
}

export default Messenger

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 1,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  submessenger: {
      fontSize: 20,
      
  }
});
