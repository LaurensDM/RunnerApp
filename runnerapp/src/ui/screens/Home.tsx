import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import Section from '../components/Section';

export default function Home({navigation}: HomeProps) {


    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
        >
            <View>
                <Section title="Welcome">
                    Go to the Routes tab to see your routes. 
                    You can create a new route by clicking the + button.
                </Section>
            </View>
        </ScrollView>
    );
};

type HomeProps = {
    navigation: any;
};