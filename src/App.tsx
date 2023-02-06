import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CityItem from './components/CityItem';
import {HARDCODED_CITIES} from './data/cities';

function App(): JSX.Element {
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
      <Text style={styles.title}>Weather</Text>
      <FlatList
        data={HARDCODED_CITIES}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CityItem
            name={item.name}
            weather={item.weather.main}
            temperature={item.main.temp}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    padding: 15,
  },
});

export default App;
