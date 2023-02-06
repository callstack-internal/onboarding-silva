import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './navigation/types';
import WeatherScreen from './screens/Weather';
import DetailsScreen from './screens/Details';
import {COLORS} from './styles';

const Stack = createNativeStackNavigator<RootStackParamList>();

const headerOptions = {
  headerStyle: {
    backgroundColor: COLORS.lightGray,
    textAlign: 'center',
  },
};

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Weather"
        screenOptions={{...headerOptions}}>
        <Stack.Screen name="Weather" component={WeatherScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
