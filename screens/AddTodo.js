import { StyleSheet, Text, View, Switch, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTodo = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [isToday, setIsToday] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleToggleToday = () => {
    setIsToday(!isToday);
  };

  const handleDonePress = () => {
    // Handle saving the task with the captured details
    // You can access the task name, date, and isToday value here
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Add Task</Text>
      <View style={styles.inputContainer}>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter task name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Hour</Text>
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={handleDateChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Today</Text>
        <Switch value={isToday} onValueChange={handleToggleToday} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleDonePress}>
        <Text style={{ color: 'white' }}>Done</Text>
      </TouchableOpacity>
      <Text style={styles.infoText}>
        If you disable today, the task will be considered as tomorrow.
      </Text> */}
    </View>
  );
}

export default AddTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#3478f6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  infoText: {
    color: '#00000060',
    marginTop: 20,
  },
});
