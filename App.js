import Home from './screens/Home';
import AddTodo from './screens/AddTodo'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {store} from './redux/store';
import {Provider} from 'react-redux';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
        />
          <Stack.Screen
        name="Add"
        component={AddTodo}
        options={{presentation: "modal"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

