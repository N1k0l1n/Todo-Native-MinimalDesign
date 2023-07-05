import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const AddTodo = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const [isToday, setIsToday] = useState(false);
  return (
    <View style={styles.container}>
      <Text>AddTodo</Text>
    </View>
  )
}

export default AddTodo

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F7F8FA',
        paddingHorizontal: 30,
    }
})