import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import Section from '../components/Section';

export default function Home({navigation}: HomeProps) {


    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
        >
            <Header />
            <View>
                <Section title="Step One">
                    Edit <Text>App.tsx</Text> to change this
                    screen and then come back to see your edits.
                </Section>
            </View>
        </ScrollView>
    );
};

type HomeProps = {
    navigation: any;
};