import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
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

    const items = await screen.findAllByRole('button');
    expect(items.length).toEqual(2);
  });

  test('Shows an error message and retry button if requests failed', async () => {
    (
      mockFetchWeatherByCityIds as jest.MockedFunction<
        typeof mockFetchWeatherByCityIds
      >
    ).mockImplementationOnce(() => Promise.reject('An error ocurred'));
    render(<App />);

    expect(mockFetchWeatherByCityIds).toHaveBeenCalledTimes(1);

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

    fireEvent.press(await screen.findByText('Paris'));
    expect(screen.getByText('Humidity')).toBeTruthy();
    expect(screen.getByText('Pressure')).toBeTruthy();
    expect(screen.getByText('Wind Speed')).toBeTruthy();
    expect(screen.getByText('Cloud Cover')).toBeTruthy();
  });
});
