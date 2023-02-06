import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type CityItemProps = {
  name: string;
  weather: string;
  temperature: number;
};

function CityItem(item: CityItemProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.weather}>{item.weather}</Text>
      </View>
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperature}>{item.temperature}ºC</Text>
      </View>
      {/* TODO: change for SVG */}
      <Text>{'>'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    height: 85,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingHorizontal: 20,
  },
  imagePlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: 'grey',
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 2,
  },
  name: {
    color: '#727679',
    fontWeight: '500',
    fontSize: 18,
  },
  weather: {
    color: '#9ea7af',
  },
  temperatureContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#b5d7e4',
    borderRadius: 50,
    marginRight: 10,
  },
  temperature: {
    color: '#ffffff',
  },
});

export default CityItem;
