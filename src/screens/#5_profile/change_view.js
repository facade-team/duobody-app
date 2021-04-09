import * as React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { Spacing, Typography, Colors } from '../../styles';
import { ECharts } from "react-native-echarts-wrapper";

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
    flex: 1,
    width: '100%',
  }
})

function Change_view({ navigation }) {

  // ---------------------------- chart test start ----------------------------

  const option = {
    xAxis: {
      type: "category",
      data: ["4/1", "4/2", "4/3", "4/4", "4/5", "4/6", "4/7"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line"
      },
      {
        data: [320, 432, 401, 334, 290, 330, 520],
        type: "line"
      }
    ]
  }

  const additionalCode = `
    chart.on('click', function(param) {
        var obj = {
        type: 'event_clicked',
        data: param.data
        };

        sendData(JSON.stringify(obj));
    });
  `

  const onData = param => {
    const obj = JSON.parse(param);

    if (obj.type === "event_clicked") {
      alert(`you tapped the chart series: ${obj.data}`);
    }
  }

  const onRef = ref => {
    if (ref) {
      this.chart = ref;
    }
  }

  const onButtonClearPressed = () => {
    this.chart.clear();
  };

  // ---------------------------- chart test end ------------------------------

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
        <View style={styles.graphContainer}>``
          <Text>This is graph</Text>
          <Button title='Clear' onPress={onButtonClearPressed} />
          <ECharts
            ref={onRef}
            option={option}
            additionalCode={additionalCode}
            onData={onData}
            onLoadEnd={() => {
              this.chart.setBackgroundColor(Colors.GRAY_LIGHT);
            }}
          />
        </View>
      </View>
    );
  }

  export default Change_view;