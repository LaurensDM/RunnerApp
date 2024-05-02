import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  View,
} from 'react-native';


import Home from './src/ui/screens/Home';
import SettingsScreen from './src/ui/screens/Settings';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RouteScreen from './src/ui/screens/Route';
import AuthProvider from './src/context/AuthProvider';
import { useAuth0 } from 'react-native-auth0';
import { ActivityIndicator, Text } from 'react-native-paper';
import LoginButton from './src/ui/components/auth/LoginButton';
import Error from './src/ui/screens/Error';
import { Header } from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  return (
    <AuthProvider >
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </AuthProvider>
  );
}

function Main(): React.JSX.Element {
  const { user, error, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={isLoading} size={'large'} />
      </View>
    );
  }

  if (error) {
    return (
      <Error message={error.message} />
    );
  }

  const loggedIn = user !== undefined && user !== null;

  const Drawer = createDrawerNavigator()
  return (

      loggedIn ?
        <Drawer.Navigator initialRouteName='Home'>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Route" component={RouteScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
        :
        <MainLoggedOut />
  )
}

function MainLoggedOut(): React.JSX.Element {
  return (
    <View >
      <Header />
      <Text style={{ textAlign: 'center', color: 'black' }}>Please login</Text>
      <LoginButton />
    </View>
  );
}

export default App;
