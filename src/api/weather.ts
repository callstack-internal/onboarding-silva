import {OpenWeatherResponse} from './types';

/**
 * This API endpoint was removed from the API docs but it is available in the API.
 * @see https://stackoverflow.com/a/39053448
 **/
const BASE_URL = 'https://api.openweathermap.org/data/2.5/group';

const API_KEY = '01aa684972d50d45acfed00be948f352';

export const fetchWeatherByCityIds = async (cityIds: number[]) => {
  const idsString = cityIds.join(',');

  const response = await fetch(
    `${BASE_URL}?id=${idsString}&appid=${API_KEY}&units=metric`,
  );
  if (response.ok) {
    const data: OpenWeatherResponse = await response.json();
    return data.list;
  } else {
    const err = await response.json();
    throw Error(err.message);
  }
};
