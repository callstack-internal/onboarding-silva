import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../styles';

type ErrorProps = {
  refetch: () => void;
};

function Error({refetch}: ErrorProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>An error ocurred, please try again.</Text>
      <Button title="Try again" onPress={refetch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  message: {
    color: COLORS.textPrimary,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Error;
