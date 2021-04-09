import * as React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { Spacing, Typography, Colors } from '../../styles';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: Typography.FONT_SIZE_24,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  subTitleContainer: {
    padding: Spacing.SCALE_16,
    paddingTop: Spacing.SCALE_20,
    alignSelf: 'flex-start',
  },
  subTitle: {
    flexDirection: 'row',
    fontSize: Typography.LINE_HEIGHT_20,
    alignSelf: 'flex-start',
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  exbodyContainer: {
    width: '100%',
    paddingLeft: Spacing.SCALE_16,
    paddingRight: Spacing.SCALE_16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  graphContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})

function Change_view({ navigation }) {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>김승우 고객님 변화보기</Text>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>Exbody</Text>
        </View>
        <View style={styles.exbodyContainer}>
          <Image
            style={{height: 100, width: 100, borderColor: Colors.GRAY_DARK, borderWidth: 1,}}
            source={require('../../assets/exbody_temp0.jpeg')}
          />
          <Image
            style={{height: 100, width: 100, borderColor: Colors.GRAY_DARK, borderWidth: 1,}}
            source={require('../../assets/exbody_temp1.jpeg')}
          />
        </View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>Graph</Text>
        </View>
        <View style={styles.graphContainer}>
          <Text>This is graph</Text>
        </View>
      </View>
    );
  }

  export default Change_view;