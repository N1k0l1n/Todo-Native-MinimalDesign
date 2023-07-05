import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TodoList = ({ todosData }) => {
  return (
    <View style={styles.container}>
      {todosData.map((todo, index) => (
        <View key={index} style={styles.todoItem}>
          <Text style={styles.todoTitle}>{todo.title}</Text>
          <Text style={styles.todoHour}>{todo.hour}</Text>
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  todoTitle: {
    fontSize: 16,
    marginRight: 10,
  },
  todoHour: {
    fontSize: 14,
    color: "gray",
  },
});

export default TodoList;
