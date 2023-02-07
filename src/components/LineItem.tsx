import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../styles';

type LineItemProps = {
  name: string;
  value: string;
};

function LineItem({name, value}: LineItemProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  name: {
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  value: {
    color: COLORS.textSecundary,
  },
});

export default LineItem;
