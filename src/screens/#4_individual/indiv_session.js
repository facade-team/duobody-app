import React, { useState } from 'react'
import { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated, TextInput, TouchableOpacity } from 'react-native';
import { Spacing, Typography, Colors } from '../../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: Typography.FONT_SIZE_20,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    margin: Spacing.SCALE_12,
  },
  whiteBox: {
    borderColor: Colors.BLACK,
    padding: Spacing.SCALE_12,
    margin: Spacing.SCALE_8,
    borderWidth: 1,
  }
})

const inputStyles = StyleSheet.create({
  container: {
      marginLeft: Spacing.SCALE_4,
      marginRight: Spacing.SCALE_4,
  },
  input: {
      borderRadius: 10,
      backgroundColor: Colors.WHITE,
      paddingLeft: Spacing.SCALE_8,
      paddingRight: Spacing.SCALE_8,
      height: Spacing.SCALE_32,
      alignItems: "center",
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomColor: Colors.GRAY,
      borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputText: {
      flex: 1,
  },
  addBtn: {
      color: Colors.PRIMARY,
  }
});

const InputTemp = ({fieldValue, setFieldValue, addField}) => {

  const addNewFields = () => {
    addField(fieldValue)
  }

  return (
    <View style={inputStyles.container}>
        <View style={inputStyles.input}> 
            <TextInput 
                style={inputStyles.inputText}
                placeholder='운동을 선택하세요'
                autoCorrect={ false }
                value={fieldValue}
                onChangeText={(text) => setFieldValue(text)}
            />
            <TouchableOpacity onPressOut={addNewFields}>
                <MaterialCommunityIcons style={inputStyles.addBtn} size={30} name='plus-circle' />
            </TouchableOpacity>
        </View>
    </View>
  )
}

const Set = ({setNumber, weight, reps}) => {
  const setsStyles = StyleSheet.create({
    container: {
      marginLeft: Spacing.SCALE_8,
      marginRight: Spacing.SCALE_8,
      flexDirection: 'row',
    },
    setBox: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomColor: Colors.GRAY,
      borderBottomWidth: 1,
      padding: Spacing.SCALE_4,
      margin: Spacing.SCALE_4,
    },
    textInputBox: {
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      width: 60,
      borderRadius: Spacing.SCALE_12,
      borderColor: Colors.GRAY_MEDIUM,
      borderWidth: 1,
    }
  })

  const WeightInput = ({weightValue}) => {
    return (
      <View style={setsStyles.textInputBox}>
        <TextInput value={weightValue} />
        <Text>kg</Text>
      </View>
    )
  }

  const RepsInput = ({repsValue}) => {
    return (
      <View style={setsStyles.textInputBox}>
        <TextInput value={repsValue} />
        <Text>회</Text>
      </View>
    )
  }

  return (
    <View style={setsStyles.container}>
      <View style={setsStyles.setBox}>
        <Text>{setNumber}세트</Text>
        <WeightInput weightValue={weight} />
        <RepsInput repsValue={reps} />
      </View>
    </View>
  )
}

export default IndividualSession = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todolist, setTodolist] = useState([])

  // new field
  const [fieldValue, setFieldValue] = useState('');
  const [fields, setFields] = useState([]);

  const addField = (field) => {
    const newField = {
      id: 3,
      field,
      sets: [],
    }
    setFields(oldFields => [...oldFields, newField])
  }
  // new set
  const [sets, setSets] = useState([]);

  const addSet = (weight, rep) => {
    const newSet = {
      id: 1,
      setNumber: 2,
      weight,
      rep,
    }

    setSets(sets => [...sets, newSet])
  }

  // useEffect(console.log(todolist))

  const addTodo = (todo) => {
    const newTodoOne = {
      id: Date.now(),
      text: todo,
      completed: false,
    }

    setTodolist(todos => [...todos, newTodoOne])
  }

  const [sessions, setSessions] = useState([
    {
      id: 0,
      part: '등',
      fields: [
        {
          id: 0,
          field: '렛풀다운',
          sets: [
            {
              id: 0,
              setNumber: 1,
              weight: '40',
              rep: '9'
            },
            {
              id: 1,
              setNumber: 2,
              weight: '30',
              rep: '8'
            },
          ]
        },
        {
          id: 1,
          field: '데드리프트',
          sets: [
            {
              id: 0,
              setNumber: 1,
              weight: '80',
              rep: '8'
            },
            {
              id: 1,
              setNumber: 2,
              weight: '90',
              rep: '5'
            },
          ]
        },
      ]
    }
  ])

  useEffect(() => {
    // console.log(todolist)
  })

  return (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Session</Text>
      <Text style={styles.title}>2021년 3월 17일</Text>
    </View>
    <View style={styles.whiteBox}>
      <ScrollView>
        {
          sessions.map(data => (
            <View key={data.id}>
              <Text key={data.id} style={{fontSize: Typography.FONT_SIZE_20}}>-{data.part}</Text>
              {
                data.fields.map(data => (
                  <View key={data.id} style={{margin:Spacing.SCALE_4}}>
                    <Text key={data.id} style={{fontSize: Typography.FONT_SIZE_16}}>{data.field}</Text>
                    {
                      data.sets.map(data => (
                        <Set key={data.id} setNumber={data.setNumber} weight={data.weight} reps={data.rep} />
                      ))
                    }
                  </View>
                ))
              }
            </View>
          ))
        }
        <InputTemp fieldValue={fieldValue} setFieldValue={setFieldValue} addField={addField} />
      </ScrollView>
    </View>
  </View>
)}


/*

{
          sessions.map(data => (
            <View>
              <Text>{data.part}</Text>
              {
                data.fields.map(d => (
                  <View>
                    <Text>{d.field}</Text>
                  </View>
                ))
              }
            </View>
          ))
        }

*/

/*

const [sessions, setSessions] = useState([
    {
      id: 0,
      part: '등',
      fields: [
        {
          id: 0,
          field: '렛풀다운',
          sets: [
            {
              id: 0,
              setNumber: 1,
              weight: '40',
              rep: '9'
            },
            {
              id: 1,
              setNumber: 2,
              weight: '30',
              rep: '8'
            },
          ]
        },
        {
          id: 1,
          field: '데드리프트',
          sets: [
            {
              id: 0,
              setNumber: 1,
              weight: '80',
              rep: '8'
            },
            {
              id: 1,
              setNumber: 2,
              weight: '90',
              rep: '5'
            },
          ]
        },
      ]
    }
  ])

  */