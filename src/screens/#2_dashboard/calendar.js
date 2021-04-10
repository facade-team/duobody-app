import React from 'react';
import {StyleSheet, SafeAreaView, Text, View, FlatList } from 'react-native';
import Calendar from '../../components/Calendar';
import CircleButton from '../../components/CircleButton'

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      custommer: '김oo 고객님',
      worktime: '10:00 - 11:00'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      custommer: '이oo 고객님',
      worktime: '13:00 - 14:00'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      custommer: '정oo 고객님',
      worktime: '15:00 - 16:00'
    }
  ];

  const Item = ({ custommer, worktime }) => (
    <View style={styles.content}>
      <Text style={styles.fontCustommer}>{custommer}</Text>
      <Text style={styles.fontWorktime}>{worktime}</Text>
    </View>
  );


const Dash_cal = () => {
    const renderItem = ({ item }) => <Item custommer={item.custommer} worktime={item.worktime}/>;
    
    return (
        <SafeAreaView style={styles.wrap}>
            <Calendar/>
            <View style={styles.bottomcontainer}>
                <View style={styles.button} ><CircleButton content={'+'} /></View>
                <View style={styles.container}>
                    <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1
    },
    bottomcontainer: {
        flex: 1.3,
        flexDirection: 'column',
        //backgroundColor : 'orange',
        alignItems: 'center',
        margin: 5,
        borderWidth:0.5
    },
    button: {
        flexDirection: 'row',
        padding: 10,
        alignSelf: 'flex-end'
    },
    container: {
        flex:1,
        flexDirection:'row',
        //backgroundColor : 'lightgray',
        justifyContent: 'space-around',
        margin: 5,
        padding: 20
    },
    content: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //borderColor:'#eee',
        //borderBottomWidth:0.5,
        padding: 5,
    },
    fontCustommer: {
        fontSize: 20,
        marginBottom: 20,
    },
    fontWorktime:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    }
})

  export default Dash_cal;
