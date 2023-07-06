import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Switch, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoReducer } from '../redux/todoSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

const AddTodo = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [isToday, setIsToday] = useState(false);
  const [withAlert, setWithAlert] = useState(false);
  const [showClock, setShowClock] = useState(false);
  const listTodos = useSelector(state => state.todos.todos);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const addTodo = async () => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000),
      text: name,
      hour: date.toString(),
      isToday: isToday,
      isCompleted: false,
    };

    try {
      await AsyncStorage.setItem("@Todos", JSON.stringify([...listTodos, newTodo]));
      dispatch(addTodoReducer(newTodo));
      console.log("Todos added successfully");

      if (withAlert) {
        scheduleTodoNotification(newTodo);
      }

      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const scheduleTodoNotification = async (todo) => {
    const trigger = new Date(todo.hour);

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Alert! You have a task to do!',
          body: todo.text,
        },
        trigger,
      });
      console.log('Notification scheduled');
    } catch (e) {
      alert('The notification failed to schedule. Make sure the hour is valid.');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowClock(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Add a Task</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Task"
            placeholderTextColor="#00000030"
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Hour</Text>
          <TouchableOpacity style={styles.clockContainer} onPress={() => setShowClock(true)}>
            <Text style={styles.clockText}>{date.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showClock && (
            <DateTimePicker
              value={date}
              mode="time"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <View style={[styles.inputContainer, { paddingBottom: 0, alignItems: 'center' }]}>
          <View>
            <Text style={styles.inputTitle}>Today</Text>
            <Text style={{ color: '#00000040', fontSize: 12, maxWidth: '84%', paddingBottom: 10 }}>
              If you disable today, the task will be considered astomorrow.
            </Text>
          </View>
          <Switch
            value={isToday}
            onValueChange={value => setIsToday(value)}
          />
        </View>
        <View style={[styles.inputContainer, { paddingBottom: 0, alignItems: 'center' }]}>
          <View>
            <Text style={styles.inputTitle}>Alert</Text>
            <Text style={{ color: '#00000040', fontSize: 12, maxWidth: '85%' }}>
              You will receive an alert at the time you set for this reminder
            </Text>
          </View>
          <Switch
            value={withAlert}
            onValueChange={value => setWithAlert(value)}
          />
        </View>
        <TouchableOpacity onPress={addTodo} style={styles.button}>
          <Text style={{ color: 'white' }}>Done</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 35,
    marginTop: 10,
  },
  textInput: {
    borderBottomColor: '#00000030',
    borderBottomWidth: 1,
    width: '80%',
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 30,
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
  },
  inputContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 30,
  },
  button: {
    marginTop: 30,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    height: 46,
    borderRadius: 11,
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
});

export default AddTodo;
