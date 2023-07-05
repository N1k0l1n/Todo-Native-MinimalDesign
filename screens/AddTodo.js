import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoReducer } from '../redux/todoSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AddTodo = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [isToday, setIsToday] = useState(true);
  const listTodos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);

  const addTodo = async () => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000),
      text: name,
      hour: date.toString(),
      isToday: isToday,
      isCompleted: false,
    }
    try {
      await AsyncStorage.setItem("@Todos", JSON.stringify([...listTodos, newTodo]));
      dispatch(addTodoReducer(newTodo));
      console.log("Todos added successfully");
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowClock(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Task</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter task name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Hour</Text>
        <TouchableOpacity style={styles.clockContainer} onPress={() => setSelectedDate(date)}>
          <Text style={styles.clockText}>{date.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {selectedDate && (
          <DateTimePicker
            value={selectedDate}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Today</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>No</Text>
          <Switch
            style={styles.switch}
            value={isToday}
            onValueChange={value => setIsToday(value)}
            trackColor={{ false: "#CCCCCC", true: "#CCCCCC" }}
            thumbColor={isToday ? "#000000" : "#FFFFFF"}
          />
          <Text style={styles.switchLabel}>Yes</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
      <Text style={styles.infoText}>
        If you disable today, the task will be considered as tomorrow.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    padding: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderColor: '#CCCCCC',
  },
  clockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  clockText: {
    fontSize: 16,
    marginRight: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    marginRight: 10,
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  infoText: {
    color: '#00000060',
    marginTop: 20,
  },
});

export default AddTodo;
