import React, { Component} from 'react';
import {FlatList, StyleSheet, Text, Image, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Colors, Mixins, Spacing, Typography } from '../../styles';

const mem_search= () => {
        return (
        <View style={styles.container}>
          <View style={styles.bar}>
            <TextInput style ={styles.inputbar}
            placeholder={'search'}
            onChangeText={text => onChangeText(text)}></TextInput>
            
          </View>

          <View style={styles.list}>
            <FlatList
              data={[
                {key: '김현재 고객님'},
                {key: '김승우 고객님'},
                {key: '최현수 고객님'},
                {key: '오상훈 고객님'},
                {key: '최이현 고객님'},
                {key: '김ㅇㅇ 고객님'},
                {key: '이ㅇㅇ 고객님'},
                {key: '박ㅇㅇ 고객님'},
                {key: '최ㅇㅇ 고객님'},
                {key: '황ㅇㅇ 고객님'},
                {key: '지ㅇㅇ 고객님'},
                {key: '주ㅇㅇ 고객님'},
                {key: '구ㅇㅇ 고객님'},
                {key: '신ㅇㅇ 고객님'},
                {key: '수ㅇㅇ 고객님'},
              ]}
              renderItem={({item}) => <Text style={styles.memlist}>{item.key}</Text>}
            />
          </View>
        
      </View>
      
    
  );
}

export default mem_search;


const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal: 5,
        backgroundColor: 'white',
        padding:10,
        alignItems: "center",
        justifyContent: "center",
      },
      
      
      list: {
          flex:9,
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        
      },
      
      memlist: {
        flex:1,
        width: Dimensions.get('screen').width * 0.70,
        margin:3,
        backgroundColor: Colors.WHITE,
        paddingTop:10,
        paddingLeft:Dimensions.get('screen').width * 0.23,
        borderWidth:1,
        borderRadius: 15,
        borderColor : '#2BAE56',
        fontWeight: 'bold',
        fontSize: 20,
        height: Dimensions.get('screen').height * 0.06,
        
      },
      bar:{
        flex:1
      },
      inputbar:{
          width: Dimensions.get('screen').width * 0.85,
          borderWidth:1,
        borderRadius: 25,
        height: Dimensions.get('screen').height * 0.05,
        padding:20
      }
      
})
