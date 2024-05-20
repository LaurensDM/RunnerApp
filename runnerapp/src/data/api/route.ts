import axios, { AxiosError, AxiosResponse } from 'axios';
import { useCallback, useMemo } from 'react';
import { Credentials } from 'react-native-auth0';
import { AdvancedType, CreateRoute, RouteProps } from '../../misc/types';
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

    const createRoute = useCallback(async (route: CreateRoute, auth0Token?: Credentials): Promise<AxiosResponse> => {
        let start
        let end
        if (route.customDestinations && route.customDestinations.start && route.customDestinations.end) {
            start = route.customDestinations.start
            end = route.customDestinations.end
        } else {
            const location = await GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 60000,
            });

            start = { lat: location.latitude, lng: location.longitude }
            end = {
                lat: location.latitude, lng: location.longitude
            }

            if (location === undefined) {
                throw new Error("Could not get location");

            }
        }

        const advanced: AdvancedType = {
            height: route.advancedOptions.height,
            surfaceType: `surface=${route.advancedOptions.surfaceType}`,
            poiTypes: route.advancedOptions.poiTypeList?.map((el) => `${el.category}=${el.type}`),
        }

        const body: RouteProps = {
            startPoint: start!,
            endPoint: end!,
            waypoints: route.customDestinations.destinations ? route.customDestinations.destinations : [],
            distance: route.distance,
            advancedOptions: {
                height: route.advancedOptions.height,
                surfaceType: route.advancedOptions.surfaceType,
                poiTypes: advanced.poiTypes,

            },
        }

        console.log(body);


        try {
            const response = await axios.post(`http://10.0.2.2:5000/api${API_ENDPOINTS.getRoute}`, body, {
                // headers: {
                //     Authorization: `Bearer ${auth0Token.idToken}`,
                // },
            });
            console.log(response);

            return response.data.route[0];
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