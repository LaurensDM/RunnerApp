import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { Button, FAB, Portal, Text } from 'react-native-paper';

import polyline from '@mapbox/polyline';
import useWeather from '../../data/api/weather';
import WeatherComponent from '../components/WeatherComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Deltas {
    latitudeDelta: number;
    longitudeDelta: number;
}

const calculateDeltas = (distanceMeters: number): Deltas => {
    // Convert the total distance to degrees (approximately)
    // Assume a constant conversion factor of 1 degree = 111 kilometers
    // So, 1 meter = 1 / 111000 degrees
    const degreesPerMeter: number = 1 / 30000;

    // Calculate the deltas based on the total distance
    // Adding a buffer of 0.1 to ensure visibility
    const latitudeDelta: number = (distanceMeters * degreesPerMeter) + 0.02;
    const longitudeDelta: number = (distanceMeters * degreesPerMeter) + 0.02;

    return { latitudeDelta, longitudeDelta };
};

const RouteMap = ({ route, navigation }: any) => {
    const [visible, setVisible] = useState(false);
    const [weatherData, setWeatherData] = useState<any>(undefined);
    const { getWeather } = useWeather();
    const { createdRoute, typeDistance, originalRoute, time, offline } = route.params;

    async function handleWeatherRequest() {
        const point = {
            lat: startLocation.latitude,
            lng: startLocation.longitude,
        };

        const data = await getWeather(point);

        console.log('Weather data');
        console.log(data.weather);

        setWeatherData(data.weather);

        showModal();
    }

    async function handleSaveRoute() {
        const routeToSave = {
            ...originalRoute,
            time: time,
            routing: createdRoute,
        }
        if (typeDistance) {
            const currentRoutes = await AsyncStorage.getItem('distanceRoutes');
            const routes = currentRoutes ? JSON.parse(currentRoutes) : [];
            routes.push(routeToSave);
            await AsyncStorage.setItem('distanceRoutes', JSON.stringify(routes));
        } else {
            const currentRoutes = await AsyncStorage.getItem('timeRoutes');
            const routes = currentRoutes ? JSON.parse(currentRoutes) : [];
            routes.push(routeToSave);
            await AsyncStorage.setItem('timeRoutes', JSON.stringify(routes));
        }
        navigation.replace('Overview');
    }

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);



    const startLocation = createdRoute.legs[0].startLocation.latLng;

    const lastLeg = createdRoute.legs[createdRoute.legs.length - 1];
    const endLocation = lastLeg.endLocation.latLng;

    const distance = createdRoute.distanceMeters;

    console.log(distance);

    console.log(endLocation);



    const deltas = calculateDeltas(distance / 10);

    const points = polyline.decode(createdRoute.polyline.encodedPolyline).map(point => ({
        latitude: point[0],
        longitude: point[1],
    }));


    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: startLocation.latitude,
                    longitude: startLocation.longitude,
                    latitudeDelta: deltas.latitudeDelta,
                    longitudeDelta: deltas.longitudeDelta,
                }}
            >
                <Marker coordinate={startLocation} title='Start' />
                <Marker coordinate={endLocation} title='End' />
                <Polyline coordinates={points}
                    strokeWidth={4}
                    strokeColor='blue'

                />
            </MapView>
            <Modal animationType='fade' visible={visible} transparent={true} onDismiss={hideModal} onRequestClose={hideModal}>
                <WeatherComponent data={weatherData} hideModal={hideModal} />
            </Modal>
            <Text style={{ textAlign: 'center' }}>Distance: {(distance / 1000).toFixed(2)} km</Text>
            <Button mode='contained' style={styles.button} onPress={handleWeatherRequest}>Get weather</Button>
            {offline ?
                (<Button mode='text' style={styles.save} onPress={() => navigation.replace('Overview')}>
                    Back
                </Button>
                )
                : <Button mode='text' style={styles.save} onPress={handleSaveRoute}>
                    Save
                </Button>
            }


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        paddingBottom: 16,
    },
    map: {
        flex: 1,
    },
    button: {
        padding: 4,
        marginHorizontal: 16,
    },
    save: {
        width: 128,
        padding: 0,
        alignSelf: 'center',
    },
    fab: {
        bottom: 16,
        right: 16,
        position: 'absolute',
    },
});

export default RouteMap;