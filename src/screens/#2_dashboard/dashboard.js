import React, { Component} from 'react';
import {FlatList, StyleSheet, Text, Image, View, TouchableOpacity, Dimensions } from 'react-native';
import { Colors, Mixins, Spacing, Typography } from '../../styles';
import GrayTextButton from '../../components/GrayTextButton';
import { WHITE } from '../../styles/colors';
import { CenterFocusStrong } from '@material-ui/icons';
import Icon from 'react-native-ionicons'
//import { Ionicons } from '@expo/vector-icons';
//import { Footer_dash } from '../../components/Footer_dash'

class Dash_dash extends Component {
    render() {
        return (
            <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.main}>
        <View style={styles.upper}>
          <View >
            <Text style={styles.listh}>TODAY</Text>
            
          </View>
          <View style={styles.time}>
            <View style={{}}>
            <FlatList
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
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.listh}>고객명단</Text>
            </View>
            <View style={{alignItems:'flex-end'}}>
              
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
              ]}
              renderItem={({item}) => <Text style={styles.memlist}>{item.key}</Text>}
            />
          </View>
        
      </View>
      </View>
    </View>
  );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal: 5,
        backgroundColor: '#2BAE56',
        padding:10
      },
      header: {
        flex:1,
      },
      main: {
        flex: 10,
       
        alignItems: "center",
        justifyContent: "center",
      },
      listh: {
        margin:10,
        fontWeight: 'bold',
        fontSize: 20,
      },
      list: {
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
        width: Dimensions.get('screen').width * 0.35,
        margin:3,
        backgroundColor: WHITE,
        paddingTop:Dimensions.get('screen').height * 0.01,
        paddingLeft:5,
        borderWidth:1,
        borderRadius: 5,
        borderColor : '#2BAE56',
        fontWeight: 'bold',
        
        fontSize: 15,
        height:20,
        height: Dimensions.get('screen').height * 0.05,
      },
      upper: {
        flex: 1,
        width:'90%',
        margin:4,
        padding:4,
        backgroundColor: WHITE,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        
      },
      down: {
        flex: 1,
        width:'90%',
        margin:4,
        padding:4,
        backgroundColor: WHITE,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
      },
      
      memlist: {
        flex:1,
        width: Dimensions.get('screen').width * 0.70,
        margin:3,
        backgroundColor: WHITE,
        paddingTop:10,
        paddingLeft:100,
        borderWidth:1,
        borderRadius: 5,
        borderColor : '#2BAE56',
        fontWeight: 'bold',
        fontSize: 20,
        height: Dimensions.get('screen').height * 0.06,
        
      }
      
})

export default Dash_dash;
