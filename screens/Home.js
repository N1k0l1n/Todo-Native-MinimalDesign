import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { todosData } from '../data/todos';
import TodoList from '../components/TodoList';

const Home = () => {
  const [localData, setLocalData] = useState(
    todosData.sort((a, b) => {
      return a.isCompleted - b.isCompleted;
    })
  );

  const [isHidden, setIsHidden] = useState(false);
  const navigation = useNavigation();

  const handleHidePress = () => {
    if (isHidden) {
      setIsHidden(false);
      setLocalData(
        todosData.sort((a, b) => {
          return a.isCompleted - b.isCompleted;
        })
      );
      return;
    }
    setIsHidden(!isHidden);
    setLocalData(localData.filter((todo) => !todo.isCompleted));
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
      <TodoList todosData={localData.filter(todo => todo.isToday)} />

      <Text style={styles.title}>Tomorrow</Text>
      <TodoList todosData={localData.filter(todo => !todo.isToday)} />

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
