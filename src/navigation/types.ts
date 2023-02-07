import {City} from '../api/types';

export type RootStackParamList = {
  Weather: undefined;
  Details: {city: City};
};
