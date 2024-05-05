import { SurfaceTypes } from "./poiTypes";

export type PoiTypes = {
    leisure: string[];
    route: string[];
    highway: string[];
    natural: string[];
    tourism: string[];
};

export type AdvancedOptions = {
    height: string;
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

export type CreateRoute = {
    name: string;
    distance: number;
    advancedOptions: AdvancedType;
    customDestinations: DestinationOptions;
};

type Waypoint = {
    lat: number;
    lng: number;
};

export type AdvancedType = {
    poiTypes?: string[];
    surfaceType?: string;
    height: string,
};

export type RouteProps = {
    startPoint: Waypoint;
    endPoint: Waypoint;
    waypoints: Waypoint[];
    distance?: number;
    time?: number;
    advancedOptions: AdvancedType;
};
