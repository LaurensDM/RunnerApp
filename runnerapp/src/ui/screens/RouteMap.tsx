import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

const RouteMap = ({navigation}: any) => {
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Polyline coordinates={[
                    { latitude: 37.8025259, longitude: -122.4351431 },
                    { latitude: 37.7896386, longitude: -122.421646 },
                    { latitude: 37.7665248, longitude: -122.4161628 },
                    { latitude: 37.7734153, longitude: -122.4577787 },
                    { latitude: 37.7948605, longitude: -122.4596065 },
                    { latitude: 37.8025259, longitude: -122.4351431 },
                ]} 
                
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default RouteMap;