import React from 'react';
import { View, Text } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { Checkbox, Divider, List, RadioButton, SegmentedButtons } from 'react-native-paper';
import poiTypes, { SurfaceTypes } from '../../misc/poiTypes';
import { AdvancedOptions, PoiType } from '../../misc/types';

type AdvancedProps = {
    handleAdvancedChange: (options: AdvancedOptions) => void;
    advancedOptions: AdvancedOptions;
};


const Advanced = ({handleAdvancedChange, advancedOptions}: AdvancedProps) => {
    const [height, setHeight] = React.useState(advancedOptions.height ? advancedOptions.height : "");
    const [surfaceType, setSurfaceType] = React.useState<SurfaceTypes | undefined>(advancedOptions.surfaceType ? advancedOptions.surfaceType : undefined);
    const [poiTypeList, setPoiTypeList] = React.useState<PoiType[]>(advancedOptions.poiTypeList ? advancedOptions.poiTypeList : []);
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [expandPoi, setExpandPoi] = React.useState<boolean>(!advancedOptions.poiDisabled);
    
    const surfaceTypes = Object.values(SurfaceTypes);

    const handleHeight = (newValue: string) => {
        setHeight(newValue);
        handleAdvancedChange({height: newValue, surfaceType, poiTypeList, poiDisabled: !expandPoi});
    }

    const handleUndeground = (surface: SurfaceTypes) => {
        setSurfaceType(surface)
        setIsExpanded(false);
        handleAdvancedChange({height, surfaceType: surface, poiTypeList, poiDisabled: !expandPoi});
    }

    const handlePoiSwitch = () => {
        console.log(expandPoi);
        
        setExpandPoi(!expandPoi);
        handleAdvancedChange({height, surfaceType, poiTypeList, poiDisabled: expandPoi});
    }

    const handlePoi = (category: string, type: string,) => {
        const newPoiTypeList = [...poiTypeList];
        const index = newPoiTypeList.findIndex((el) => el.type === type);
        if (index > -1) {
            newPoiTypeList.splice(index, 1);
        } else {
            newPoiTypeList.push({category, type});
        }
        setPoiTypeList(newPoiTypeList);
        handleAdvancedChange({height, surfaceType, poiTypeList: newPoiTypeList, poiDisabled: !expandPoi});
    }



    return (
        <View style={{paddingLeft:16, backgroundColor: 'white'}} >
            <List.Item
                title="Elevation"
                left={() => <List.Icon icon="elevation-rise" />}
                right={() => <RadioButton.Group onValueChange={newValue => handleHeight(newValue)} value={height}>
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
            <Divider />
            <List.Accordion title={surfaceType ? surfaceType : "Type of underground"} id="1" left={() => <List.Icon icon="road" />} style={{ backgroundColor: " red" }} expanded={isExpanded} onPress={() => setIsExpanded(!isExpanded)}>
                {surfaceTypes.map((surfaceType, index) => (
                    <List.Item
                        key={index}
                        title={surfaceType}
                        onPress={() => handleUndeground(surfaceType)}
                    />
                ))}
            </List.Accordion>
            <Divider />
            <View>
                <List.Item
                    title="Points of interest"
                    left={() => <List.Icon icon="map-marker" />}
                    right={() => <View>
                        <Switch value={expandPoi} onValueChange={handlePoiSwitch} /></View>}
                />
                <View style={{paddingLeft: 24}}>
                    {expandPoi ? Object.entries(poiTypes).map(([category, types]) => (
                        types.map((type, index) => (
                            <Checkbox.Item key={index} label={type} status={poiTypeList.find((el) => el.type===type) ? "checked" : "unchecked"} onPress={() => handlePoi(category,type)}/>
                        ))
                    )) : null}
                    </View>
            </View>
        </View>
    );
};

export default Advanced;