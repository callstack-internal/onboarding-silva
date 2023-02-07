import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react-native';
import {fetchWeatherByCityIds as mockFetchWeatherByCityIds} from '../api/weather';
import App from '../App';
import {MOCK_RESPONSE} from './mocks';

jest.mock('../api/weather');

describe('App', () => {
  afterEach(() => {
    (
      mockFetchWeatherByCityIds as jest.MockedFunction<
        typeof mockFetchWeatherByCityIds
      >
    ).mockClear();
  });

  test('Shows the weather of several countries', async () => {
    (
      mockFetchWeatherByCityIds as jest.MockedFunction<
        typeof mockFetchWeatherByCityIds
      >
    ).mockImplementationOnce(() => Promise.resolve(MOCK_RESPONSE));
    render(<App />);

    expect(mockFetchWeatherByCityIds).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('loader')).toBeTruthy();

    const items = await screen.findAllByRole('button');
    expect(items.length).toEqual(2);

    const firstItem = within(items[0]);
    expect(firstItem.getByText(MOCK_RESPONSE[0].name)).toBeTruthy();
    expect(firstItem.getByText(MOCK_RESPONSE[0].weather[0].main)).toBeTruthy();
    expect(firstItem.getByText(`${MOCK_RESPONSE[0].main.temp}ºC`)).toBeTruthy();
    expect(
      firstItem.getByLabelText(
        `Icon of ${MOCK_RESPONSE[0].weather[0].main} weather`,
      ),
    ).toBeTruthy();

    const secondItem = within(items[1]);
    expect(secondItem.getByText(MOCK_RESPONSE[1].name)).toBeTruthy();
    expect(secondItem.getByText(MOCK_RESPONSE[1].weather[0].main)).toBeTruthy();
    expect(
      secondItem.getByText(`${MOCK_RESPONSE[1].main.temp}ºC`),
    ).toBeTruthy();
    expect(
      secondItem.getByLabelText(
        `Icon of ${MOCK_RESPONSE[1].weather[0].main} weather`,
      ),
    ).toBeTruthy();
  });

  test('Shows an error message and retry button if requests failed', async () => {
    (
      mockFetchWeatherByCityIds as jest.MockedFunction<
        typeof mockFetchWeatherByCityIds
      >
    ).mockImplementationOnce(() => Promise.reject('An error ocurred'));
    render(<App />);

    expect(mockFetchWeatherByCityIds).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('loader')).toBeTruthy();

    await waitFor(() =>
      expect(
        screen.getByText('An error ocurred, please try again.'),
      ).toBeTruthy(),
    );
    fireEvent.press(screen.getByRole('button'));

    expect(mockFetchWeatherByCityIds).toHaveBeenCalledTimes(2);
  });

  test('Navigates to a detail screen when a list item is tapped', async () => {
    (
      mockFetchWeatherByCityIds as jest.MockedFunction<
        typeof mockFetchWeatherByCityIds
      >
    ).mockImplementationOnce(() => Promise.resolve(MOCK_RESPONSE));
    render(<App />);

    fireEvent.press(await screen.findByText(MOCK_RESPONSE[0].name));

    const weatherInfo = within(screen.getByTestId('city-item'));
    expect(weatherInfo.getByText(MOCK_RESPONSE[0].name)).toBeTruthy();
    expect(
      weatherInfo.getByText(MOCK_RESPONSE[0].weather[0].main),
    ).toBeTruthy();
    expect(
      weatherInfo.getByText(`${MOCK_RESPONSE[0].main.temp}ºC`),
    ).toBeTruthy();
    expect(
      weatherInfo.getByLabelText(
        `Icon of ${MOCK_RESPONSE[0].weather[0].main} weather`,
      ),
    ).toBeTruthy();

    const lineItems = await screen.findAllByTestId('line-item');

    const firstItem = within(lineItems[0]);
    expect(firstItem.getByText('Humidity')).toBeTruthy();
    expect(
      firstItem.getByText(`${MOCK_RESPONSE[0].main.humidity.toString()}%`),
    ).toBeTruthy();

    const secondItem = within(lineItems[1]);
    expect(secondItem.getByText('Pressure')).toBeTruthy();
    expect(
      secondItem.getByText(`${MOCK_RESPONSE[0].main.pressure.toString()} hPa`),
    ).toBeTruthy();

    const thirdItem = within(lineItems[2]);
    expect(thirdItem.getByText('Wind Speed')).toBeTruthy();
    expect(
      thirdItem.getByText(`${MOCK_RESPONSE[0].wind.speed.toString()} mph`),
    ).toBeTruthy();

    const fourthItem = within(lineItems[3]);
    expect(fourthItem.getByText('Cloud Cover')).toBeTruthy();
    expect(
      fourthItem.getByText(`${MOCK_RESPONSE[0].clouds.all.toString()}%`),
    ).toBeTruthy();
  });
});
