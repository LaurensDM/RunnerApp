import React from 'react';
import { View, Text } from 'react-native';
import { Switch, TextInput } from 'react-native-gesture-handler';
import { List, RadioButton, SegmentedButtons } from 'react-native-paper';

const Advanced: React.FC = () => {
    const [height, setHeight] = React.useState('');
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const handleUndeground = (e:any) => {
        console.log(e.target);
        
    }

    return (
        <View>
            <List.Item
                title="Elevation"
                left={() => <List.Icon icon="elevation-rise" />}
                right={() => <RadioButton.Group onValueChange={newValue => setHeight(newValue)} value={height}>
                    <View>
                        <Text>Flat</Text>
                        <RadioButton value="flat" />
                    </View>
                    <View>
                        <Text>Medium</Text>
                        <RadioButton value="medium" />
                    </View>
                    <View>
                        <Text>Steep</Text>
                        <RadioButton value="steep" />
                    </View>
                </RadioButton.Group>}
            />
            <List.Item
                title="Prefer natural paths"
                left={() => <List.Icon icon="nature" />}
                right={() => <View>
                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} /></View>}
            />
            <List.Accordion title="Type of underground" id="1" left={() => <List.Icon icon="road" />} style={{backgroundColor: " red"}}>
                <List.Item title="Item 1" onPress={handleUndeground}/>
            </List.Accordion>
        </View>
    );
};

export default Advanced;