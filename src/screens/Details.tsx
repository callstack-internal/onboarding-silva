import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import CityItem from '../components/CityItem';
import LineItem from '../components/LineItem';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

function DetailsScreen({route}: Props): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {city} = route.params;

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <CityItem
        name={city.name}
        weather={city.weather.main}
        temperature={city.main.temp}
      />
      <LineItem name={'Humidity'} value={`${city.main.humidity}%`} />
      <LineItem name={'Pressure'} value={`${city.main.pressure} hPa`} />
      <LineItem name={'Wind Speed'} value={`${city.wind.speed} mph`} />
      <LineItem name={'Cloud Cover'} value={`${city.clouds.all}%`} />
    </SafeAreaView>
  );
}

export default DetailsScreen;
