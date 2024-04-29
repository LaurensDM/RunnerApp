import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Checkbox, Divider, List, TextInput } from 'react-native-paper';
import { Accordion } from 'react-native-paper/lib/typescript/components/List/List';
import { SurfaceTypes } from '../../misc/poiTypes';
import { AdvancedOptions, DestinationOptions } from '../../misc/types';
import Advanced from '../components/Advanced';

const RouteCreate = ({ route }: any) => {
    const [name, setName] = useState('');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [enableCustomDestinations, setEnableCustomDestinations] = useState(false);
    const [customDestinations, setCustomDestinations] = useState<DestinationOptions>({});
    const [advancedOptions, setAdvancedOptions] = useState<AdvancedOptions>({});

    const { typeDistance } = route.params;

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

    const handleSubmit = () => {
        // Handle form submission here
        console.log(enableCustomDestinations ? customDestinations : "No custom destinations");
        console.log(advancedOptions);

    };

    return (
        <ScrollView contentContainerStyle={styles.root}>
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
                <CustomDestinations handleCustomDestinationsChange={handleCustomDestinationsChange} customDestinations={customDestinations}/>
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
                    /></View>
            )
            }
            <Divider />
            <List.Accordion
                title="Advanced">
                <Advanced handleAdvancedChange={handleAdvancedChange} advancedOptions={advancedOptions}/>
            </List.Accordion>
            <Button onPress={handleSubmit} mode='contained'>
                Submit
            </Button>
        </ScrollView>
    );
};

type CustomDestinationsProps = {
    handleCustomDestinationsChange: (options: DestinationOptions) => void;
    customDestinations?: DestinationOptions;
};

function CustomDestinations({ handleCustomDestinationsChange, customDestinations }: CustomDestinationsProps) {
    const [destionations, setDestionations] = useState(customDestinations?.destinations || [] as string[]);
    const [end, setEnd] = useState(customDestinations?.end || '' as string);
    const [start, setStart] = useState(customDestinations?.start || '' as string);

    const onStartChange = (text: string) => {
        setStart(text);
        handleCustomDestinationsChange({ start: text, end, destinations: destionations });
    };

    const onEndChange = (text: string) => {
        setEnd(text);
        handleCustomDestinationsChange({ start, end: text, destinations: destionations });
    };


    const handleAddDestination = () => {
        setDestionations([...destionations, '']);
        handleCustomDestinationsChange({ start, end, destinations: destionations });
    };

    const handleDestinationChange = (text: string, index: number) => {
        const newDestinations = [...destionations];
        newDestinations[index] = text;
        setDestionations(newDestinations);
        handleCustomDestinationsChange({ start, end, destinations: newDestinations });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Start</Text>
            <TextInput
                style={styles.input}
                value={start}
                onChangeText={onStartChange}
                placeholder="Enter destination"
            />
            <Text style={styles.label}>End</Text>
            <TextInput
                style={styles.input}
                value={end}
                onChangeText={onEndChange}
                placeholder="Enter destination"
            />
            {destionations.map((destination, index) => (
                <View key={index}>
                    <Text style={styles.label}>
                        Destination {index + 1}
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={destination}
                        onChangeText={destination => handleDestinationChange(destination, index)}
                        placeholder="Enter destination"
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
};


export default RouteCreate;