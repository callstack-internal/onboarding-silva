export type OpenWeatherResponse = {
  list: OpenWeatherCity[];
};

export type OpenWeatherCity = {
  id: number;
  name: string;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
};

export type City = {
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  pressure: number;
  weather: string;
  wind: number;
  clouds: number;
  iconUrl: string;
};
