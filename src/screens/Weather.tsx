import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
  useColorScheme,
  StyleSheet,
  Button,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import CityItem from '../components/CityItem';
import Error from '../components/Error';
import {useWeather} from '../hooks/useWeather';
import NativeNotificationInterface from '../modules/NativeNotification';

const CITIES_LIST = [
  2988507, // Paris,
  3117735, // Madrid,
  5368361, // Los Angeles,
  4930956, // Boston
  5128581, // New York City,
  1880252, // Singapore
  3094802, // Cracow,
  3081368, // Wroclaw,
];

type Props = NativeStackScreenProps<RootStackParamList, 'Weather'>;

function WeatherScreen({navigation}: Props): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [cities, isLoading, isError, refetch] = useWeather(CITIES_LIST);

  if (isLoading && !cities) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" testID="loader" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Error refetch={refetch} />
      </View>
    );
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Button
        title="psst, click here"
        onPress={() =>
          NativeNotificationInterface.showNotification(
            'Hello',
            'have you heard of our lord and saviour jebus christ',
          )
        }
      />
      <FlatList
        data={cities ?? []}
        keyExtractor={item => item.id}
        refreshing={isLoading}
        onRefresh={refetch}
        renderItem={({item, index}) => (
          <CityItem
            name={item.name}
            weather={item.weather}
            temperature={item.temperature}
            iconUrl={item.iconUrl}
            withNavigation
            testId={`city-item.${index}`}
            onPress={() => navigation.navigate('Details', {city: item})}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    marginHorizontal: 30,
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default WeatherScreen;
