import axios, { AxiosError, AxiosResponse } from 'axios';
import { useCallback, useMemo } from 'react';
import { Credentials } from 'react-native-auth0';
import { CreateRoute } from '../../misc/types';
import GetLocation from 'react-native-get-location';

// Define the base URL for your API
const BASE_URL = process.env.API_URL
// Define your API endpoints
const API_ENDPOINTS = {
    getRoute: '/route',
};

const useRoute = () => {

// Define your API functions
const getRoute = useCallback(async (auth0Token: Credentials): Promise<AxiosResponse> => {
    console.log(auth0Token);
    
    console.log(`${BASE_URL}${API_ENDPOINTS.getRoute}`);
    
    try {
        const response = await axios.get(`http://10.0.2.2:5000/api${API_ENDPOINTS.getRoute}`, {
            headers: {
                Authorization: `Bearer ${auth0Token.idToken}`,
            },
        
        });
        console.log(response);
        
        return response;
    } catch (error: any) {
        console.error(error.message);
        
        throw new Error(error);
    }
}, []);

const createRoute = useCallback(async ( route: CreateRoute, auth0Token?: Credentials): Promise<AxiosResponse> => {
    let location = undefined

    if (!route.customDestinations || !route.customDestinations.start) {
        location = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
    } else {
        location = route.customDestinations.start
    }
    
    if (location === undefined) {
        throw new Error("Could not get location");
        
    }
    try {
        const response = await axios.post(`http://10.0.2.2:5000/api${API_ENDPOINTS.getRoute}`, route, {
            // headers: {
            //     Authorization: `Bearer ${auth0Token.idToken}`,
            // },
        });
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
}, []);

const routeApi = useMemo(() => ({
    getRoute,
    createRoute,
}), [getRoute, createRoute]);

return routeApi;

};

export default useRoute;