import React from 'react';
import {City} from '../api/types';
import {fetchWeatherByCityIds} from '../api/weather';
import {convertToCity} from '../utils/convertToCity';

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
