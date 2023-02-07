import {City, OpenWeatherCity} from '../api/types';

export const convertToCity = (data: OpenWeatherCity): City => {
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
