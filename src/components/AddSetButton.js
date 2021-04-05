import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Spacing, Colors, Typography } from '../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
      marginRight: Spacing.SCALE_8,
      marginTop: Spacing.SCALE_4,
      marginBottom: Spacing.SCALE_4,
  },
  input: {
      backgroundColor: Colors.WHITE,
      paddingLeft: Spacing.SCALE_8,
      paddingRight: Spacing.SCALE_8,
      height: Spacing.SCALE_32,
      alignItems: "center",
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'flex-end',
  },
  textStyle: {
      fontSize: Typography.FONT_SIZE_12,
      color: Colors.BLACK,
      marginRight: Spacing.SCALE_4,
  },
  addBtn: {
      color: Colors.PRIMARY,
  }
});

export default () => {

  return (
    <View style={styles.container}>
        <View style={styles.input}> 
            <Text style={styles.textStyle}>세트 추가하기</Text>
            <TouchableOpacity >
                <MaterialCommunityIcons style={styles.addBtn} size={24} name='plus' />
            </TouchableOpacity>
        </View>
    </View>
  )
}