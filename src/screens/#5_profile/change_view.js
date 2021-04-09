import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Dimensions } from 'react-native';
import { Spacing, Typography, Colors } from '../../styles';
import { Circle, G, Rect, Svg, Text as TextSVG } from 'react-native-svg';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit"

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

function Change_view({ navigation, valueFormatter, ...props }) {

  // ---------------------------- 'react-native-chart-kit' test start ----------------------------------



  // ---------------------------- 'react-native-chart-kit' test end ------------------------------------


  // ---------------------------- 'react-native-echarts-wrapper' test start ----------------------------
/*
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
*/
  // ---------------------------- 'react-native-echarts-wrapper' test end ------------------------------

  const data = {
    labels: ["4/1", "4/2", "4/3", "4/4", "4/5", "4/6"],
    datasets: [
      {
        data: [
          30.5,
          32,
          31.6,
          32.4,
          33.5,
          34
        ]
      }
    ]
  }

  const renderDotContentOnGraph = (e) => {
    const { x, y, index } = e;
  }

  const [tempstate, setTempstate] = useState(null);

  const screenWidth = Dimensions.get('window').width;

  const Tooltip = ({ x, y, textX, textY, stroke, pointStroke, position }) => {
      let tipW = 136,
          tipH = 36,
          tipX = 5,
          tipY = -9,
          tipTxtX = 12,
          tipTxtY = 6;
      const posY = y;
      const posX = x;

      if (posX > screenWidth - tipW) {
          tipX = -(tipX + tipW);
          tipTxtX = tipTxtX - tipW - 6;
      }

      const boxPosX = position === 'left' ? posX - tipW - 10 : posX;

      return (
          <G>
              <Circle
                  cx={posX}
                  cy={posY}
                  r={4}
                  stroke={pointStroke}
                  strokeWidth={2}
                  fill={'blue'}
              />
              <G x={boxPosX < 40 ? 40 : boxPosX} y={posY}>
                  <Rect
                      x={tipX + 1}
                      y={tipY - 1}
                      width={tipW - 2}
                      height={tipH - 2}
                      fill={'rgba(255, 255, 255, 0.9)'}
                      rx={2}
                      ry={2}
                  />
                  <Rect
                      x={tipX}
                      y={tipY}
                      width={tipW}
                      height={tipH}
                      rx={2}
                      ry={2}
                      fill={'transparent'}
                      stroke={stroke}
                  />
                  <TextSVG x={tipTxtX} y={tipTxtY} fontSize="10" textAnchor="start">
                      {textX}
                  </TextSVG>

                  <TextSVG
                      x={tipTxtX}
                      y={tipTxtY + 14}
                      fontSize="12"
                      textAnchor="start">
                      {textY}
                  </TextSVG>
              </G>
          </G>
      );
  };

  const tooltipDecorators = (state, data, valueFormatter) => () => {
      if (state === null) {
          return null;
      }

      const { index, value, x, y } = state;
      const textX = data.labels[index];
      console.log(data.labels);
      const position = data.labels.length === index + 1 ? 'left' : 'right';

      return (
          <Tooltip
              textX={String(textX)}
              textY={valueFormatter(value)}
              x={x}
              y={y}
              stroke={'#00ccff'}
              pointStroke={'#00ccff'}
              position={position}
          />
      );
  };



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
          <View>
            <Text>Bezier Line Chart</Text>
            <LineChart
              data={data}
              width={Dimensions.get("window").width*0.8} // from react-native
              height={220}
              yAxisLabel=""
              yAxisSuffix="kg"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: Colors.WHITE,
                backgroundGradientFrom: Colors.WHITE,
                backgroundGradientTo: Colors.WHITE,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 0) => `rgba(255, 0, 0, ${opacity})`,
                labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
              decorator={tooltipDecorators(tempstate, props.data, valueFormatter)}
              onDataPointClick={setTempstate}
            />
          </View>
        </View>
      </View>
    );
  }

  export default Change_view;