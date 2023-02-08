import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import CityItem from '../components/CityItem';
import LineItem from '../components/LineItem';
import {RootStackParamList} from '../navigation/types';
import NativeNotificationInterface from '../modules/NativeNotification';
import NativeButton from '../modules/NativeButton';

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
      <View style={styles.container}>
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
        <NativeButton
          style={styles.button}
          enabled={true}
          text="Notification time"
          onPress={() => {
            NativeNotificationInterface.showNotification(
              `Weather in ${city.name}`,
              `Temperature ${city.temperature}ºC`,
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  button: {
    marginTop: 10,
    height: 70,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default DetailsScreen;
