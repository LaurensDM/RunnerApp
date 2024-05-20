import { StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "react-native-paper";

export default function WeatherComponent({ data, hideModal }: any): React.JSX.Element {
    console.log('DATA');

    console.log(data.weather[0].description);

    return (
        <View style={styles.modalView}>
            <Text style={styles.weatherTitle}>Weather Information</Text>
            <View style={styles.weatherRow}>
                <Icon source={getWeatherIcon(data.weather[0].icon)} size={64} color="#000" />
                <Text style={styles.weatherText}>{data.weather[0].description}</Text>
            </View>
            {data.rain ? <Text style={styles.weatherText}>Rain: {data.rain['1h']} mm</Text> : null}
            {data.snow ? <Text style={styles.weatherText}>Snow: {data.snow['1h']} mm</Text> : null}
            <Text style={styles.weatherText}>Temperature: {data.main.temp}°C</Text>
            <Text style={styles.weatherText}>Feels like: {data.main.feels_like}°C</Text>
            <Text style={styles.weatherText}>Humidity: {data.main.humidity}%</Text>
            <Text style={styles.weatherText}>Wind Speed: {data.wind.speed} m/s</Text>
            <Text style={styles.weatherText}>Wind Direction: {data.wind.deg}°</Text>
            <Text style={styles.weatherText}>Visibility: {data.visibility} m</Text>
            <Text style={styles.weatherText}>Cloudiness: {data.clouds.all}%</Text>
            <Text style={styles.weatherText}>Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</Text>
            <Text style={styles.weatherText}>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}</Text>
            <Button onPress={hideModal} >Close</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    weatherTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    weatherRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 20,
    },
    weatherText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        marginBottom: 10,
        textAlign: 'center'
    },
});

const getWeatherIcon = (icon: string): any => {
    // Map OpenWeatherMap weather codes to icon names
    const iconMap: any = {
        '01d': 'weather-sunny',
        '01n': 'weather-night',
        '02d': 'weather-partly-cloudy',
        '02n': 'weather-night-partly-cloudy',
        '03d': 'weather-cloudy',
        '03n': 'weather-cloudy',
        '04d': 'weather-cloudy',
        '04n': 'weather-cloudy',
        '09d': 'weather-pouring',
        '09n': 'weather-pouring',
        '10d': 'weather-rainy',
        '10n': 'weather-rainy',
        '11d': 'weather-lightning',
        '11n': 'weather-lightning',
        '13d': 'weather-snowy',
        '13n': 'weather-snowy',
        '50d': 'weather-fog',
        '50n': 'weather-fog',
    };

    return iconMap[icon];
};