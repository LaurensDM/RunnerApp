import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Button, Divider, TextInput } from 'react-native-paper';

export default function SettingsScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
    const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
    const [speed, setSpeed] = useState('10');

    const handleNotificationsToggle = () => {
        setNotificationsEnabled(!notificationsEnabled);
    };

    const handleDarkModeToggle = () => {
        setDarkModeEnabled(!darkModeEnabled);
    };

    const handleChange = (text: string) => {
        setSpeed(text);
    }

    const handleSave = async () => {
        await AsyncStorage.setItem('speed', speed);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            <View style={styles.setting}>
                <Text style={styles.settingText}>Enable Notifications</Text>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={handleNotificationsToggle}
                />
            </View>

            <View style={styles.setting}>
                <Text style={styles.settingText}>Dark Mode</Text>
                <Switch
                    value={darkModeEnabled}
                    onValueChange={handleDarkModeToggle}
                />
            </View>
            <Divider />
            <View style={styles.setting}>
                <Text style={styles.settingText}>Speed</Text>
                <TextInput 
                placeholder="Enter your speed" 
                onChangeText={handleChange} 
                value={speed}
                keyboardType='numeric'
                right={<TextInput.Affix text="km/h" />}
                />
                <Button onPress={handleSave} >Save</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    setting: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    settingText: {
        fontSize: 16,
    },
});
