import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../styles';

type CityItemProps = {
  name: string;
  weather: string;
  temperature: number;
  iconUrl: string;
  withNavigation?: boolean;
  testId?: string;
  onPress?: () => void;
};

const CityItem = React.memo(
  ({
    name,
    weather,
    temperature,
    iconUrl,
    withNavigation,
    testId,
    onPress,
  }: CityItemProps) => {
    const content = () => (
      <>
        <Image
          accessibilityLabel={`Icon of ${weather} weather`}
          accessibilityIgnoresInvertColors
          style={styles.image}
          source={{uri: iconUrl}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.weather}>{weather}</Text>
        </View>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>{`${temperature}ºC`}</Text>
        </View>
        {!!withNavigation && (
          <Image
            accessibilityIgnoresInvertColors
            source={require('../assets/chevron-right.png')}
          />
        )}
      </>
    );

    return withNavigation ? (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.6}
        accessibilityRole={'button'}
        testID={testId}
        onPress={onPress}>
        {content()}
      </TouchableOpacity>
    ) : (
      <View testID={testId} style={styles.container}>
        {content()}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 85,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingHorizontal: 15,
  },
  image: {
    width: 40,
    height: 40,
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
    fontWeight: '500',
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
