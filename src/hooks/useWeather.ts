import React from 'react';
import {City, OpenWeatherCity} from '../api/types';
import {fetchWeatherByCityIds} from '../api/weather';

const convertToCity = (data: OpenWeatherCity): City => {
  return {
    id: data.id.toString(),
    name: data.name,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    weather: data.weather[0].main,
    wind: data.wind.speed,
    clouds: data.clouds.all,
    iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
};

export const useWeather = (
  cityIds: number[],
): [City[] | null, boolean, boolean, () => void] => {
  const [isError, setIsError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<City[] | null>(null);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchWeatherByCityIds(cityIds);
      const cityData = data.map(d => convertToCity(d));
      setData(cityData);
      setIsError(false);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setIsError(true);
      setLoading(false);
    }
  }, [cityIds]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [data, loading, isError, fetchData];
};
