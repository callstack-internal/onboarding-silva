import {convertToCity} from '../../utils/convertToCity';
import {MOCK_RESPONSE} from '../mocks';

describe('convertToCity', () => {
  test('Converts OpenWeather response item into a City type item', () => {
    const response = convertToCity(MOCK_RESPONSE[0]);
    expect(response).toStrictEqual({
      id: '2988507',
      name: 'Paris',
      temperature: 3.48,
      humidity: 70,
      pressure: 1036,
      weather: 'Clear',
      wind: 6.17,
      clouds: 0,
      iconUrl: 'https://openweathermap.org/img/wn/01d@2x.png',
    });
  });
});
