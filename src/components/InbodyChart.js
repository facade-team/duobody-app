import React, { useState } from 'react';
import { Circle, ForeignObject, G, Rect, Svg, Text as TextSVG } from 'react-native-svg';
import { Spacing, Typography, Colors } from '../styles';
import { View, Text, Button, Image, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { LineChart } from "react-native-chart-kit"

export default ({data, idx}) => {
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0, date: ''})

  const tempDecorator = () => {
    const units = ['kg', 'kg/m\xB2', 'kg', 'kg']
    return (tooltipPos.visible) ? (
      <View>
        <Svg>
            <Rect
              x={tooltipPos.x - 35} 
              y={(tooltipPos.y > 50) ? tooltipPos.y - 45 : tooltipPos.y + 5} 
              width="80" 
              height="40" 
              fill="white"
              stroke={Colors.GRAY}
            />
            <TextSVG
              x={tooltipPos.x + 5}
              y={(tooltipPos.y > 50) ? tooltipPos.y - 30 : tooltipPos.y + 20}
              fill="black"
              fontSize={Typography.FONT_SIZE_12}
              fontWeight="bold"
              textAnchor="middle"
            >
              {tooltipPos.date}
            </TextSVG>
            <TextSVG
              x={tooltipPos.x + 5}
              y={(tooltipPos.y > 50) ? tooltipPos.y - 15 : tooltipPos.y + 35}
              fill="black"
              fontSize={Typography.FONT_SIZE_12}
              fontWeight="bold"
              textAnchor="middle"
            >
              {(idx === 1) ? `${tooltipPos.value}kg/m\xB2`: `${tooltipPos.value}kg`}
            </TextSVG>
        </Svg>
      </View>
    ) : null
  }

  const onDataPointClickHandler = (clickedData) => {
    let isSamePoint = (tooltipPos.x === clickedData.x && tooltipPos.y === clickedData.y)
    isSamePoint ? setTooltipPos((previousState) => {
      return {
        ...previousState,
        value: clickedData.value,
        visible: !previousState.visible,
        date: data.labels[clickedData.index],
      }
    }) :
    setTooltipPos(
      {
        x : clickedData.x,
        value : clickedData.value,
        y : clickedData.y,
        visible : true,
        date: data.labels[clickedData.index],
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
    '몸무게', 'BMI', '체지방', '골격근'
  ]


  return (
    <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: (idx === 3) ? Spacing.SCALE_20 : 0}}>
      <View style={{height: 180, width: Spacing.SCALE_48, justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.5, borderColor: Colors.GRAY, }}>
        <Text style={{fontSize: Typography.FONT_SIZE_16,}}>{chartValues[idx]}</Text>
      </View>
      <LineChart
        data={data}
        width={Dimensions.get("window").width*(data.labels.length / 3.5)} // from react-native
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