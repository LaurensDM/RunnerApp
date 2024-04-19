import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';
import RouteDetails from './RouteDetails';

export default function RouteScreen({ navigation }: any) {

    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Overview" component={RouteTabs} />
            <Stack.Screen name="Details" component={RouteDetails} />
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

function DistanceRoutes({navigation}: any) {
    return (
        <View>
            <ScrollView style={styles.container}>
                {cards.map((card, index) => (
                    <Card key={index} style={styles.card}>
                        <Card.Cover source={{ uri: card.image }} />
                        <Card.Title title={card.title} subtitle={card.subtitle} />
                        <Card.Actions>
                            <Button >Ok</Button>
                            <Button>Cancel</Button>
                        </Card.Actions>
                    </Card>
                )
                )}
            </ScrollView>
            <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate('Details')} />
        </View>
    );
}

function TimeRoutes() {
    return (
        <View>

            <ScrollView style={styles.container}>

                {cards.map((card, index) => (
                    <Card key={index} style={styles.card}>
                        <Card.Cover source={{ uri: card.image }} />
                        <Card.Title title={card.title} subtitle={card.subtitle} />
                        <Card.Actions>
                            <Button>Ok</Button>
                            <Button>Cancel</Button>
                        </Card.Actions>
                    </Card>
                )
                )}

            </ScrollView>
            <FAB icon="plus" style={styles.fab} onPress={() => console.log('Pressed')} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
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


const cards = [
    {
        title: 'First Card',
        subtitle: 'First Card Subtitle',
        image: 'https://picsum.photos/700',
    },
    {
        title: 'Second Card',
        subtitle: 'Second Card Subtitle',
        image: 'https://picsum.photos/700',
    },
    {
        title: 'Third Card',
        subtitle: 'Third Card Subtitle',
        image: 'https://picsum.photos/700',
    },
    {
        title: 'Fourth Card',
        subtitle: 'Fourth Card Subtitle',
        image: 'https://picsum.photos/700',
    },
    {
        title: 'Fifth Card',
        subtitle: 'Fifth Card Subtitle',
        image: 'https://picsum.photos/700',
    },
    {
        title: 'Sixth Card',
        subtitle: 'Sixth Card Subtitle',
        image: 'https://picsum.photos/700',
    },
    {
        title: 'Seventh Card',
        subtitle: 'Seventh Card Subtitle',
        image: 'https://picsum.photos/700',
    },
    {
        title: 'Eighth Card',
        subtitle: 'Eighth Card Subtitle',
        image: 'https://picsum.photos/700',
    },
    {
        title: 'Ninth Card',
        subtitle: 'Ninth Card Subtitle',
        image: 'https://picsum.photos/700',
    },
    {
        title: 'Tenth Card',
        subtitle: 'Tenth Card Subtitle',
        image: 'https://picsum.photos/700',
    },
];