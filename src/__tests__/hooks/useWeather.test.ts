import {act, renderHook, waitFor} from '@testing-library/react-native';
import {fetchWeatherByCityIds as mockFetchWeatherByCityIds} from '../../api/weather';
import {useWeather} from '../../hooks/useWeather';
import {MOCK_RESPONSE} from '../mocks';

jest.mock('../../api/weather');

describe('useWeather', () => {
  afterEach(() => {
    (
      mockFetchWeatherByCityIds as jest.MockedFunction<
        typeof mockFetchWeatherByCityIds
      >
    ).mockClear();
  });

  test('Fetches weather information successfuly', async () => {
    (
      mockFetchWeatherByCityIds as jest.MockedFunction<
        typeof mockFetchWeatherByCityIds
      >
    ).mockImplementationOnce(() => Promise.resolve(MOCK_RESPONSE));
    const {result} = renderHook((ids: number[]) => useWeather(ids), {
      initialProps: [1, 2],
    });

    expect(mockFetchWeatherByCityIds).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(null);
    expect(result.current[1]).toBe(true);

    await waitFor(() => expect(result.current[1]).toBe(false));
    expect(result.current[0]).not.toBe(null);
  });

  test('Shows error when weather information could not be fetched', async () => {
    (
      mockFetchWeatherByCityIds as jest.MockedFunction<
        typeof mockFetchWeatherByCityIds
      >
    ).mockImplementationOnce(() => Promise.reject('An error ocurred'));
    const {result} = renderHook((ids: number[]) => useWeather(ids), {
      initialProps: [1, 2],
    });

    expect(mockFetchWeatherByCityIds).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(null);
    expect(result.current[2]).toBe(false);

    await waitFor(() => expect(result.current[1]).toBe(false));
    expect(result.current[0]).toBe(null);
    expect(result.current[1]).toBe(false);
  });

  test('Refetches API request when refetch is called', async () => {
    (
      mockFetchWeatherByCityIds as jest.MockedFunction<
        typeof mockFetchWeatherByCityIds
      >
    ).mockImplementationOnce(() => Promise.reject('An error ocurred'));
    const {result} = renderHook((ids: number[]) => useWeather(ids), {
      initialProps: [1, 2],
    });

    expect(mockFetchWeatherByCityIds).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(null);
    expect(result.current[2]).toBe(false);

    act(() => result.current[3]());

    expect(mockFetchWeatherByCityIds).toHaveBeenCalledTimes(2);
  });
});
