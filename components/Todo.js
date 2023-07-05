import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import moment from 'moment'

const Todo = ({id, text, isCompleted, isToday, hour}) => {
  return (
    <View style={styles.container}>
      <Checkbox
      id={id}
      text={text}
      isCompleted={isCompleted}
      isToday={isToday}
      hour={hour}
      />
    </View>
  )
}

export default Todo

const styles = StyleSheet.create({})