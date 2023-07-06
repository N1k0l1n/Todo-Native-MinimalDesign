import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Checkbox from "./Checkbox";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoReducer } from '../redux/todoSlice';

export default function Todo({
  id,
  text,
  isCompleted,
  isToday,
  hour,
}) {
  const [localHour, setLocalHour] = React.useState(new Date(hour));
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();
  const [thisTodoIsToday, setThisTodoIsToday] = React.useState(hour ? new Date(hour).toDateString() === new Date().toDateString() : false);

  const handleDeleteTodo = async () => {
    dispatch(deleteTodoReducer(id));
    try {
      await AsyncStorage.setItem('Todos', JSON.stringify(
        todos.filter(todo => todo.id !== id)
      ));
      console.log('Todo deleted correctly');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox id={id} text={text} hour={hour} isCompleted={isCompleted} isToday={thisTodoIsToday} />
        <View style={{ flex: 1 }}>
          <Text
            selectable
            style={
              isCompleted
                ? [styles.text, { textDecorationLine: 'line-through', color: '#73737330' }]
                : styles.text}
          >{text}</Text>
          <Text style={
            isCompleted
              ? [styles.time, { textDecorationLine: 'line-through', color: '#73737330' }]
              : styles.time}
          >{localHour.toLocaleTimeString()}</Text>
        </View>
        <TouchableOpacity onPress={handleDeleteTodo}>
          <MaterialIcons name="delete-outline" size={24} color="#73737340" style={styles.delete} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: '#737373',
  },
  time: {
    fontSize: 13,
    color: '#a3a3a3',
    fontWeight: '500',
  },
  delete: {
    marginLeft: 10,
  }
});
