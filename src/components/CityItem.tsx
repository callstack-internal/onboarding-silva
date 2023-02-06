import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../styles';

type CityItemProps = {
  name: string;
  weather: string;
  temperature: number;
  onPress: () => void;
};

function CityItem(item: CityItemProps): JSX.Element {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      accessibilityRole={'button'}
      onPress={item.onPress}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.weather}>{item.weather}</Text>
      </View>
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperature}>{item.temperature}ºC</Text>
      </View>
      <Image
        accessibilityIgnoresInvertColors
        source={require('../assets/chevron-right.png')}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    height: 85,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingHorizontal: 20,
  },
  imagePlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.mediumGray,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 2,
  },
  name: {
    color: COLORS.textPrimary,
    fontWeight: '500',
    fontSize: 18,
  },
  weather: {
    color: COLORS.textSecundary,
  },
  temperatureContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.accent,
    borderRadius: 50,
    marginRight: 10,
  },
  temperature: {
    color: COLORS.white,
  },
});

export default CityItem;
