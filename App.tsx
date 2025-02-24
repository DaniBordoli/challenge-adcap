import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import MainPage from './screens/MainPage';
import DetailView from './screens/DetailView';
import Favorites from './screens/Favorites';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          cardStyle: {
            backgroundColor: route.params?.darkMode ? '#333' : '#f0f4f4',
          },
        })}
      >
        <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
        <Stack.Screen name="DetailView" component={DetailView} options={{ headerShown: false }} />
        <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}