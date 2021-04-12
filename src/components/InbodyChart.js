import React, { useState } from 'react';
import { Circle, G, Rect, Svg, Text as TextSVG } from 'react-native-svg';
import { Spacing, Typography, Colors } from '../styles';
import { View, Text, Button, Image, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit"

export default ({data, idx}) => {
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })

  const tempDecorator = () => {
    return (tooltipPos.visible) ? (
      <View>
        <Svg>
            <Rect
              x={tooltipPos.x - 15} 
              y={tooltipPos.y + 10} 
              width="40" 
              height="30" 
              fill="black" 
            />
            <TextSVG
              x={tooltipPos.x + 5}
              y={tooltipPos.y + 30}
              fill="white"
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
            >
              {tooltipPos.value}
            </TextSVG>
        </Svg>
      </View>
    ) : null
  }

  const onDataPointClickHandler = (data) => {
    let isSamePoint = (tooltipPos.x === data.x && tooltipPos.y === data.y)
    isSamePoint ? setTooltipPos((previousState) => {
      return {
        ...previousState,
        value: data.value,
        visible: !previousState.visible
      }
    }) :
    setTooltipPos(
      {
        x : data.x,
        value : data.value,
        y : data.y,
        visible : true
      }
    )
  }

  const chartColors = [
    'rgba(179, 69, 230, 1)',
    'rgba(1, 88, 255, 1)',
    'rgba(5, 235, 255, 1)',
    'rgba(0, 255, 11, 1)'
  ]

  const chartValues = [
    '체지방', 'BMI', '골격근', '몸무게'
  ]


  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{height: 180, width: Spacing.SCALE_48, justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.3, borderColor: Colors.GRAY,}}>
        <Text style={{fontSize: Typography.FONT_SIZE_16,}}>{chartValues[idx]}</Text>
      </View>
      <LineChart
        data={data}
        width={Dimensions.get("window").width*(data.labels.length / 5)} // from react-native
        height={180}
        yAxisLabel=""
        yAxisSuffix="kg"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: Colors.WHITE,
          backgroundGradientFrom: Colors.WHITE,
          backgroundGradientTo: Colors.WHITE,
          fillShadowGradient: Colors.WHITE,
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => chartColors[idx],
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 4
          },
          propsForDots: {
            r: "4",
            strokeWidth: "1",
            stroke: chartColors[idx],
          }
        }}
        style={{
          marginVertical: -5,
          borderRadius: 4
        }}
        decorator={tempDecorator}
        onDataPointClick={onDataPointClickHandler}
        withVerticalLabels={(idx === 3) ? true : false}
        withHorizontalLabels={false}
        withVerticalLines={true}
        withHorizontalLines={false}
        withOuterLines={false}
      />
    </View>
  )
}