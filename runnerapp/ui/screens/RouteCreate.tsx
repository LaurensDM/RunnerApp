import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Checkbox, Divider, List, TextInput } from 'react-native-paper';
import Advanced from '../components/Advanced';
import { Accordion } from 'react-native-paper/lib/typescript/components/List/List';

const RouteCreate = ({ route }: any) => {
    const [name, setName] = useState('');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [customDestinations, setCustomDestinations] = useState(false);

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

    const handleSubmit = () => {
        // Handle form submission here
        console.log(' OK');

    };

    return (
        <ScrollView contentContainerStyle={styles.root}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                value={name}
                onChangeText={handleNameChange}
                placeholder="Enter name"
            />
            <Text style={styles.label}>Add custom destionations</Text>
            <Checkbox status={customDestinations ? "checked" : "unchecked"} onPress={() => setCustomDestinations(!customDestinations)} />
            {customDestinations ? (
                <CustomDestinations />
            ) : null}

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

            <List.Accordion
                title="Advanced">
                <Advanced />
            </List.Accordion>





            <Button onPress={handleSubmit} mode='contained'>
                Submit
            </Button>
        </ScrollView>
    );
};

function CustomDestinations() {
    const [destionations, setDestionations] = useState([] as string[]);
    const [end, setEnd] = useState('' as string);
    const [start, setStart] = useState('' as string);



    const handleAddDestination = () => {
        setDestionations([...destionations, '']);
    };

    const handleDestinationChange = (text: string, index: number) => {
        const newDestinations = [...destionations];
        newDestinations[index] = text;
        setDestionations(newDestinations);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Start</Text>
            <TextInput
                style={styles.input}
                value={start}
                onChangeText={setStart}
                placeholder="Enter destination"
            />
            <Text style={styles.label}>End</Text>
            <TextInput
                style={styles.input}
                value={end}
                onChangeText={setEnd}
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