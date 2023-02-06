import {HARDCODED_CITIES} from '../data/cities';

export type RootStackParamList = {
  Weather: undefined;
  Details: {city: typeof HARDCODED_CITIES[0]}; // @TODO: complete city type
};
