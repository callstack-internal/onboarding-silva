import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { fetchWeatherByCityIds as mockFetchWeatherByCityIds } from '../api/weather';
import App from '../App';
import { MOCK_RESPONSE } from './mocks';

jest.mock('../api/weather');

describe('App', () => {
    test('Shows the weather of several countries', async () => {
        (mockFetchWeatherByCityIds as jest.MockedFunction<typeof mockFetchWeatherByCityIds>).mockImplementationOnce(() =>
            Promise.resolve(MOCK_RESPONSE),
        );
        render(<App /> );

        expect(mockFetchWeatherByCityIds).toHaveBeenCalledTimes(1);

        const items = await screen.findAllByRole('button');
        expect(items.length).toEqual(2);
    });

    test('Navigates to a detail screen when a list item is tapped', async () => {
        (mockFetchWeatherByCityIds as jest.MockedFunction<typeof mockFetchWeatherByCityIds>).mockImplementationOnce(() =>
            Promise.resolve(MOCK_RESPONSE),
        );
        render(<App /> );

        fireEvent.press(await screen.findByText('Paris'));
        expect(screen.getByText('Humidity')).toBeTruthy();
        expect(screen.getByText('Pressure')).toBeTruthy();
        expect(screen.getByText('Wind Speed')).toBeTruthy();
        expect(screen.getByText('Cloud Cover')).toBeTruthy();
    });
});
