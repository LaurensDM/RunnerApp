/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Home from './ui/screens/Home';
import SettingsScreen from './ui/screens/Settings';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RouteScreen from './ui/screens/Route';




function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const Drawer = createDrawerNavigator()

  return (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home'>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Route" component={RouteScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}



export default App;
