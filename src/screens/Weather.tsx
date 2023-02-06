import React from 'react';
import {FlatList, SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import CityItem from '../components/CityItem';
import {HARDCODED_CITIES} from '../data/cities';
import {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Weather'>;

function WeatherScreen({navigation}: Props): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        data={HARDCODED_CITIES}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CityItem
            name={item.name}
            weather={item.weather.main}
            temperature={item.main.temp}
            onPress={() => navigation.navigate('Details', {city: item})}
          />
        )}
      />
    </SafeAreaView>
  );
}

export default WeatherScreen;
