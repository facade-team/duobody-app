import React, { Component} from 'react';
import { ScrollView, FlatList, StyleSheet, Text, Image, View, TouchableOpacity, Dimensions } from 'react-native';
import { Colors, Mixins, Spacing, Typography } from '../../styles';
import GrayTextButton from '../../components/GrayTextButton';
import { WHITE } from '../../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigation from '../../navigation/navigation';
import { SafeAreaView } from 'react-navigation';
import { color } from 'react-native-reanimated';
import { SCALE_4 } from '../../styles/spacing';

const Dash_dash = ({navigation}) => {
        return (
            <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.main}>
        
        
        <View style={styles.upper}>
          <View style={{flexDirection: "row", width: '90%', justifyContent: 'space-between'}}>
            <Text style={styles.listupleft}>3월 20일 (토)</Text>
            <Text style={styles.listright}>TODAY</Text>
          </View>

          
          <View style={styles.time}>
            <View>
            <FlatList
              scrollEnabled={false}
              data={[
                {key: '09'},
                {key: '10'},
                {key: '11'},
                {key: '12'},
                {key: '13'},
                {key: '14'},
              ]}
              renderItem={({item}) => <Text style={styles.timelist}>{item.key}</Text>}
            />
            </View>
            <View style={{}}>
            <FlatList
              scrollEnabled={false}
              data={[

                {key: '15'},
                {key: '16'},
                {key: '17'},
                {key: '18'},
                {key: '19'},
                {key: '20'},
                
              ]}
              renderItem={({item}) => <Text style={styles.timelist}>{item.key}</Text>}
            />
            </View>
          
          </View>
          
        </View>
           
        
        <View style={styles.down}>
          <View style={{flexDirection: 'row', width: '95%', justifyContent: 'space-between', marginTop: Spacing.SCALE_4,marginBottom: Spacing.SCALE_4}}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.listleft}>고객명단</Text>
            </View>
            <View style={{flexDirection: 'row', alignSelf:'flex-end', width: '18%', marginRight: 5, justifyContent: 'space-between'}}>
              <Icon
                name = "search" 
                color = {Colors.BLACK} 
                size = {Spacing.SCALE_20}
                onPress = {() => navigation.navigate('Mem_Search')}
              />
              <Icon 
                name = "add-circle" 
                color = {Colors.Black} 
                size = {Spacing.SCALE_24}
                onPress = {() => navigation.navigate('Mem_Add')}
                
                />
            </View>
          </View>

          <View style={styles.list}>
            
              <FlatList
                data={[
                  {key: '김현재 고객님'},
                  {key: '김승우 고객님'},
                  {key: '최현수 고객님'},
                  {key: '오상훈 고객님'},
                  {key: '최이현 고객님'},
                  {key: '김문기 고객님'},
                ]}
                renderItem={({item}) => <Text style={styles.memlist}>{item.key}</Text>}
              />

          </View>
        
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal: 0,
        backgroundColor: Colors.PRIMARY,
        padding: 10,
      },
      main: {
        flex: 10,
        alignItems: "center",
        justifyContent: "center",
      },
      listupleft: {
        margin:5,
        fontWeight: '900',
        fontSize: Spacing.SCALE_18,
        color: Colors.GRAY,
      },
      listleft: {
        margin:5,
        fontWeight: 'bold',
        fontSize: Spacing.SCALE_18,
      },
      listright: {
        margin:5,
        fontWeight: '900',
        fontSize: Spacing.SCALE_18,
      },
      list: {
        flex:1,
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        
      },
      time: {
        flex: 9,
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        
      },
      timelist: {
        flex:1,
        width: Dimensions.get('screen').width * 0.40,
        margin:3,
        backgroundColor: WHITE,
        paddingTop:Dimensions.get('screen').height * 0.01,
        paddingLeft:10,
        borderWidth:1,
        borderRadius: 8,
        borderColor : Colors.PRIMARY,
        fontWeight: 'bold',
        color: Colors.GRAY,
        fontSize: Spacing.SCALE_18,
        height:20,
        height: Dimensions.get('screen').height * 0.048,
      },
      upper: {
        flex: 1,
        width:'98%',
        margin:4,
        padding:4,
        backgroundColor: Colors.WHITE,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        
      },
      down: {
        flex: 1,
        width:'98%',
        margin:4,
        padding:4,
        marginBottom: 0,
        backgroundColor: Colors.WHITE,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
      },
      
      memlist: {
        flex:1,
        width: Dimensions.get('screen').width * 0.80,
        margin:3,
        backgroundColor: Colors.WHITE,
        paddingTop:10,
        paddingLeft:120,
        borderWidth:1,
        borderRadius: 8,
        borderColor : Colors.PRIMARY,
        fontWeight: 'bold',
        fontSize: 20,
        height: Dimensions.get('screen').height * 0.06,
      }
      
})

  export default Dash_dash;


  const DATA = [
    {
        key: '09',
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: '김ㅇㅇ 회원님',
    },
    {
        key: '10',
        id: [],
        title: [],
    },
    {
        key: '11',
        id: [],
        title: [],
    },
    {
        key: '12',
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: '이ㅇㅇ 회원님',
    },
    {
        key: '13',
        id: [],
        title: [],
    },
    {
        key: '14',
        id: [],
        title: [],
    },
    {
        key: '15',
        id: [],
        title: [],
    },
    {
        key: '16',
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: '최ㅇㅇ 회원님',
    },
    {
        key: '17',
        id: [],
        title: [],
    },
    {
        key: '18',
        id: [],
        title: [],
    },
    {
        key: '19',
        id: [],
        title: [],
    },
    {
        key: '20',
        id: [],
        title: [],
    },

]