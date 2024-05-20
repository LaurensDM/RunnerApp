import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Button, Checkbox, Divider, List, TextInput } from 'react-native-paper';
import { Accordion } from 'react-native-paper/lib/typescript/components/List/List';
import { SurfaceTypes } from '../../misc/poiTypes';
import { AdvancedOptions, CreateRoute, DestinationOptions, Waypoint } from '../../misc/types';
import Advanced from '../components/Advanced';
import useRoute from '../../data/api/route';
import { GooglePlacesAutocomplete, Point } from 'react-native-google-places-autocomplete';
import { MAPS_API_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RouteCreate = ({ route, navigation }: any) => {
    const { typeDistance, offlineRoute } = route.params;
    const [name, setName] = useState(offlineRoute?.name || '');
    const [distance, setDistance] = useState<string>(String(offlineRoute?.distance) || '0');
    const [duration, setDuration] = useState<string>(String(offlineRoute?.duration )|| '0');
    const [enableCustomDestinations, setEnableCustomDestinations] = useState(false);
    const [customDestinations, setCustomDestinations] = useState<DestinationOptions>({});
    const [advancedOptions, setAdvancedOptions] = useState<AdvancedOptions>(offlineRoute.advancedOptions || {} as AdvancedOptions);
    const [isLoading, setIsLoading] = useState(false);
    const { createRoute } = useRoute();

    

    const handleNameChange = (text: string) => {
        setName(text);
    };

    const handleDistanceChange = (text: string) => {
        setDistance(text);
    };

    const handleDurationChange = (text: string) => {
        setDuration(text);
    };

    const handleCustomDestinationsChange = (options: DestinationOptions) => {
        setCustomDestinations(options);
    }

    const handleAdvancedChange = (options: AdvancedOptions) => {
        setAdvancedOptions(options);
    }

    const handleSubmit = async () => {
        const speed = Number(await AsyncStorage.getItem('speed')) ?? 10;
        setIsLoading(true);
        const submitDistance = typeDistance ? Number(distance) : (Number(duration) / 60 * speed);
        const route: CreateRoute = {
            name,
            distance: submitDistance,
            advancedOptions: advancedOptions,
            customDestinations,
        };

        const response = await createRoute(route);
        setIsLoading(false);
        navigation.navigate('Map', { createdRoute: response, typeDistance, originalRoute: route, time: typeDistance ? undefined : duration, offline: false });
    };

    const handleRunAgain = async () => {
        const speed = Number(await AsyncStorage.getItem('speed')) ?? 10;
        const submitDistance = typeDistance ? Number(distance) : (Number(duration) / 60 * speed);
        const route: CreateRoute = {
            name,
            distance: submitDistance,
            advancedOptions: advancedOptions,
            customDestinations,
        };
        console.log(offlineRoute.createdRoute);
        navigation.navigate('Map', { createdRoute: offlineRoute.routing, typeDistance, originalRoute: route, time: typeDistance ? undefined : duration, offline: true });
    }

    return (
        isLoading
            ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            )
            :
            (<ScrollView contentContainerStyle={styles.root}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    value={name}
                    onChangeText={handleNameChange}
                    placeholder="Enter name"
                />
                <Divider />
                <Text style={styles.label}>Add custom destinations</Text>
                <Checkbox status={enableCustomDestinations ? "checked" : "unchecked"} onPress={() => setEnableCustomDestinations(!enableCustomDestinations)} />
                {enableCustomDestinations ? (
                    <CustomDestinations handleCustomDestinationsChange={handleCustomDestinationsChange} customDestinations={customDestinations} />
                ) : null}
                <Divider />
                {typeDistance ? (
                    <View>
                        <Text style={styles.label}>Distance:</Text>
                        <TextInput
                            value={distance}
                            onChangeText={handleDistanceChange}
                            placeholder="Enter distance"
                            keyboardType="numeric"
                            right={<TextInput.Affix text="km" />}
                        />
                    </View>) : (
                    <View>
                        <Text>Duration:</Text>
                        <TextInput
                            value={duration}
                            onChangeText={handleDurationChange}
                            placeholder="Enter duration"
                            keyboardType="numeric"
                            right={<TextInput.Affix text="min" />}
                        /></View>
                )
                }
                <Divider />
                <List.Accordion
                    title="Advanced">
                    <Advanced handleAdvancedChange={handleAdvancedChange} advancedOptions={advancedOptions} />
                </List.Accordion>
                <Button onPress={handleSubmit} mode='contained'>
                    Submit
                </Button>
                <Divider />
                {offlineRoute &&
                <Button onPress={handleRunAgain} mode='contained-tonal'>
                    Run again
                </Button>
                }
                
            </ScrollView>)

    );
};

type CustomDestinationsProps = {
    handleCustomDestinationsChange: (options: DestinationOptions) => void;
    customDestinations?: DestinationOptions;
};

function CustomDestinations({ handleCustomDestinationsChange, customDestinations }: CustomDestinationsProps) {
    const [destionations, setDestionations] = useState<Waypoint[] | undefined>(customDestinations?.destinations);
    const [end, setEnd] = useState<Waypoint | undefined>(customDestinations?.end);
    const [start, setStart] = useState<Waypoint | undefined>(customDestinations?.start);

    const onStartChange = (point: Point) => {
        setStart(point);
        handleCustomDestinationsChange({ start: point, end, destinations: destionations });
    };

    const onEndChange = (point: Point) => {
        setEnd(point);
        handleCustomDestinationsChange({ start, end: point, destinations: destionations });
    };


    const handleAddDestination = () => {
        if (destionations?.length === 25) {
            return;
        } else {
            const newDestionations = [...(destionations || []), undefined as unknown as Waypoint];
            setDestionations(newDestionations);
            console.log(newDestionations);
            handleCustomDestinationsChange({ start, end, destinations: destionations });
        }

    };

    const handleDestinationChange = (point: Point, index: number) => {
        const newDestinations = [...(destionations || [])];
        newDestinations[index] = point;
        setDestionations(newDestinations);
        handleCustomDestinationsChange({ start, end, destinations: newDestinations });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Start</Text>
            <GooglePlacesAutocomplete
                placeholder='Enter Start'
                disableScroll={true}
                minLength={3}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    console.log('DATA');
                    console.log(data);
                    console.log('DETAILS');
                    console.log(details?.geometry.location);
                    onStartChange(details!.geometry.location);
                }}
                query={{
                    key: MAPS_API_KEY,
                    language: 'en',
                }}
            />
            {/* <TextInput
                style={styles.input}
                value={start}
                onChangeText={onStartChange}
                placeholder="Enter destination"
            /> */}
            <Text style={styles.label}>End</Text>
            <GooglePlacesAutocomplete
                placeholder='Enter Destination'
                disableScroll={true}
                minLength={3}
                fetchDetails={true}
                onPress={(data, details) => {
                    console.log('DATA');
                    console.log(data);
                    console.log('DETAILS');

                    console.log(details);

                    onEndChange(details!.geometry.location);
                }}
                query={{
                    key: MAPS_API_KEY,
                    language: 'en',
                }}
            />
            {destionations?.map((destination, index) => (
                <View key={index}>
                    <Text style={styles.label}>
                        Waypoint {index + 1}
                    </Text>
                    <GooglePlacesAutocomplete
                        placeholder='Enter Waypoint'
                        disableScroll={true}
                        minLength={3}
                        fetchDetails={true}
                        onPress={(data, details) => {
                            console.log('DATA');
                            console.log(data);
                            console.log('DETAILS');

                            console.log(details);

                            handleDestinationChange(details!.geometry.location, index);
                        }}
                        query={{
                            key: MAPS_API_KEY,
                            language: 'en',
                        }}
                    />
                </View>
            ))}
            <Button onPress={handleAddDestination} mode='contained'>
                Add
            </Button>
        </View>
    );
}


const styles = {
    root: {
        padding: 16,
        gap: 16,
    },
    container: {
        padding: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        marginBottom: 16,
    },
    loaderContainer: {
        flex: 1,
    },
};


export default RouteCreate;