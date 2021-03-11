import React, { useEffect } from 'react';

import Login from './src/screens/Login';
import Inicio from './src/screens/Inicio';
import Registro from './src/screens/Registro';
import { NavigationContainer } from '@react-navigation/native';

//2.-
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/private/Home';
import { LogBox } from 'react-native';

//2.1.-
const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs([
      'Animated: `useNativeDriver`',
      'Setting a timer for a long period of time',
    ]);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Inicio' headerMode='float'>
        <Stack.Screen name='Login' component={Login} />

        <Stack.Screen name='Inicio' component={Inicio} />

        <Stack.Screen name='Registro' component={Registro} />

        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
