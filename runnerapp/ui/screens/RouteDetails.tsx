import React from 'react';
import { View, Text } from 'react-native';

const RouteDetails = ({ route }: any) => {
    return (
        <View>
            <Text>Route Details</Text>
            <Text>Route Name: {route.name}</Text>
            <Text>Route Distance: {route.distance} km</Text>
            {/* Add more details here */}
        </View>
    );
};

export default RouteDetails;