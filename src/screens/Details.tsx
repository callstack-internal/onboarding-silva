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
        weather={city.weather}
        temperature={city.temperature}
        iconUrl={city.iconUrl}
        testId="city-item"
      />
      <LineItem
        name={'Humidity'}
        value={`${city.humidity}%`}
        testId="line-item"
      />
      <LineItem
        name={'Pressure'}
        value={`${city.pressure} hPa`}
        testId="line-item"
      />
      <LineItem
        name={'Wind Speed'}
        value={`${city.wind} mph`}
        testId="line-item"
      />
      <LineItem
        name={'Cloud Cover'}
        value={`${city.clouds}%`}
        testId="line-item"
      />
    </SafeAreaView>
  );
}

export default DetailsScreen;
