import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';
import RouteCreate from './RouteCreate';
import useRoute from '../../data/api/route';
import { useAuth0 } from 'react-native-auth0';
import RouteMap from './RouteMap';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mapImg from '../../assets/map.png';
import { CreateRoute, PoiType } from '../../misc/types';

export default function RouteScreen({ navigation }: any) {

    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Overview" component={RouteTabs} />
            <Stack.Screen name="Details" component={RouteCreate} />
            <Stack.Screen name="Map" component={RouteMap} />
        </Stack.Navigator>
    );
};

function RouteTabs() {
    const Tab = createMaterialTopTabNavigator()
    return (
        <Tab.Navigator initialRouteName='Distance'>
            <Tab.Screen name="Distance" component={DistanceRoutes} />
            <Tab.Screen name="Time" component={TimeRoutes} />
        </Tab.Navigator>
    );
}

function DistanceRoutes({ navigation }: any) {
    const [routes, setRoutes] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            const distanceRoutes = await AsyncStorage.getItem('distanceRoutes');
            if (distanceRoutes) {
                console.log('distanceRoutes', distanceRoutes);

                setRoutes(JSON.parse(distanceRoutes));
            }
        }
        fetchData();
    }, []);

    const handleClick = async (index: number) => {
        navigation.navigate('Details', {
            typeDistance: true,
            offlineRoute: routes[index],
        });
    }

    return (
        <View style={styles.page}>
            <ScrollView style={styles.container}>
                {routes.map((route: CreateRoute, index: number) => (
                    <Card key={index} style={styles.card}>
                        <Card.Cover source={mapImg} />
                        <Card.Title titleVariant='headlineMedium' subtitleVariant='headlineSmall' title={`Name: ${route.name}`} subtitle={`Distance: ${route.distance} km`} />
                        <Card.Content style={{ gap: 5, marginTop: 8 }}>
                            <Text>Elevation: {route.advancedOptions.height}</Text>
                            <Text>{route.customDestinations.start ?
                                `Start: ${route.customDestinations.start.lat} ${route.customDestinations.start.lng}` : ''
                            }</Text>
                            <Text>{route.customDestinations.end ?
                                `End: ${route.customDestinations.end.lat} ${route.customDestinations.end.lng}` : ''
                            }</Text>
                            <Text>{route.advancedOptions.surfaceType ?
                                `Surface type: ${route.advancedOptions.surfaceType}` : ''
                            }</Text>
                            <Text>{route.advancedOptions.poiTypeList ?
                                `POI types: ${route.advancedOptions.poiTypeList.map(
                                    (el) => `${el.category}=${el.type}`
                                ).join(', ')}` : ''
                            }</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => handleClick(index)}>Select</Button>
                        </Card.Actions>
                    </Card>
                )
                )}
                {routes.length === 0 && <Text>No routes</Text>}
            </ScrollView>
            <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate('Details', {
                typeDistance: true
            })} />
        </View>
    );
}

function TimeRoutes({ navigation }: any) {
    const [routes, setRoutes] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            const timeRoutes = await AsyncStorage.getItem('timeRoutes');
            if (timeRoutes) {
                setRoutes(JSON.parse(timeRoutes));
            }
        }
        fetchData();
    }, []);

    const handleClick = async (index: number) => {
        navigation.navigate('Details', {
            typeDistance: true,
            offlineRoute: routes[index],
        });
    }
    return (
        <View style={styles.page}>
            <ScrollView style={styles.container}>
                {routes.map((route: any, index: number) => (
                    <Card key={index} style={styles.card}>
                        <Card.Cover source={mapImg} />
                        <Card.Title titleVariant='headlineMedium' subtitleVariant='headlineSmall' title={`Name: ${route.name}`} subtitle={`Time: ${route.time} min`} />
                        <Card.Content style={{ gap: 5, marginTop: 8 }}>
                            <Text>Elevation: {route.advancedOptions.height}</Text>
                            <Text>{route.customDestinations.start ?
                                `Start: ${route.customDestinations.start.lat} ${route.customDestinations.start.lng}` : ''
                            }</Text>
                            <Text>{route.customDestinations.end ?
                                `End: ${route.customDestinations.end.lat} ${route.customDestinations.end.lng}` : ''
                            }</Text>
                            <Text>{route.advancedOptions.surfaceType ?
                                `Surface type: ${route.advancedOptions.surfaceType}` : ''
                            }</Text>
                            <Text>{route.advancedOptions.poiTypeList ?
                                `POI types: ${route.advancedOptions.poiTypeList.map(
                                    (el: PoiType) => `${el.category}=${el.type}`
                                ).join(', ')}` : ''
                            }</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => handleClick(index)}>Select</Button>
                        </Card.Actions>
                    </Card>
                ))}
                {routes.length === 0 && <Text>No routes</Text>}
            </ScrollView>
            <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate('Details', {
                typeDistance: false,
            })} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 16,

    },
    page: {
        flex: 1,
    },
    card: {
        marginBottom: 10,
    },
    fab: {
        bottom: 16,
        right: 16,
        position: 'absolute',
    },
});