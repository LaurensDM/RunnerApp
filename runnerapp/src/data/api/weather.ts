import axios, {  } from 'axios';
import { useCallback, useMemo } from 'react';
import { Waypoint } from '../../misc/types';

// Define the base URL for your API
const BASE_URL = process.env.API_URL
// Define your API endpoints
const API_ENDPOINTS = {
    getWeather: '/weather',
};

const useWeather = () => {

    // Define your API functions
    const getWeather = useCallback(async (point: Waypoint): Promise<any> => {

        const body = {
            point: point,
        };

        try {
            const response = await axios.post(`http://10.0.2.2:5000/api${API_ENDPOINTS.getWeather}`, body);

            return response.data;
        } catch (error: any) {
            console.error(error.message);

            throw new Error(error);
        }
    }, []);

    const weatherApi = useMemo(() => ({
        getWeather,

    }), [getWeather]);

    return weatherApi;

};

export default useWeather;