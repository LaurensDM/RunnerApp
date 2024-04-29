import { SurfaceTypes } from "./poiTypes";

export type PoiTypes = {
    leisure: string[];
    route: string[];
    highway: string[];
    natural: string[];
    tourism: string[];
};

export type AdvancedOptions = {
    height?: string;
    surfaceType?: SurfaceTypes;
    // isSwitchOn?: boolean;
    poiTypeList?: PoiType[];
    poiDisabled?: boolean;
};

export type DestinationOptions = {
    start?: string;
    end?: string;
    destinations?: string[];
};


export type PoiType = {
    category: string;
    type: string;
}