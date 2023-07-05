import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const TodoList = ({ todosData }) => {
  const [todos, setTodos] = useState(todosData);

  const toggleCheckbox = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <View style={styles.container}>
      {todos.map((todo, index) => (
        <View key={index} style={styles.todoItem}>
          <TouchableOpacity
            onPress={() => toggleCheckbox(index)}
            style={[
              styles.checkbox,
              todo.completed && styles.checkboxChecked,
            ]}
          >
            {todo.completed && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.todoTitle}>{todo.title}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoTitle: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default TodoList;
