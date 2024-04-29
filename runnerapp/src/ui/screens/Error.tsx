import React from 'react';
import { View, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

interface ErrorProps {
    message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Card>
                <Card.Content>
                    <Title>Error</Title>
                    <Paragraph>{message}</Paragraph>
                </Card.Content>
            </Card>
        </View>
    );
};

export default Error;
