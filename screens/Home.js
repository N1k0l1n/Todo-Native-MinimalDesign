import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { hideCompletedReducer } from '../redux/todoSlice'
import TodoList from '../components/TodoList';

const Home = () => {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState(false);
  const navigation = useNavigation();

  const handleHidePress = () => {
    setIsHidden(!isHidden);
    dispatch(hideCompletedReducer());
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/17402544/pexels-photo-17402544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
        style={styles.pic}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Today</Text>
        <TouchableOpacity onPress={handleHidePress}>
          <Text style={styles.hideText}>
            {isHidden ? "Show Completed" : "Hide Completed"}
          </Text>
        </TouchableOpacity>
      </View>
      <TodoList todosData={todos.filter(todo => todo.isToday && (!isHidden || !todo.isCompleted))} />

      <Text style={styles.title}>Tomorrow</Text>
      <TodoList todosData={todos.filter(todo => !todo.isToday && (!isHidden || !todo.isCompleted))} />

      <TouchableOpacity
        onPress={() => navigation.navigate("Add")}
        style={styles.button}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 15,
  },
  pic: {
    marginTop: 30,
    width: 42,
    height: 42,
    borderRadius: 21,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  hideText: {
    color: '#3478f6',
    marginTop: 20,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#000',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    fontSize: 28,
    color: '#fff',
  },
});
