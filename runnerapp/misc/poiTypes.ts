import { PoiTypes } from "./types";

export enum SurfaceTypes {
    paved = "paved",
    unpaved = "unpaved",
    asphalt = "asphalt",
    concrete = "concrete",
    paving_stones = "paving_stones",
    sett = "sett",
    cobblestone = "cobblestone",
    metal = "metal",
    wood = "wood",
    compacted = "compacted",
    fine_gravel = "fine_gravel",
    gravel = "gravel",
    pebblestone = "pebblestone",
    plastic = "plastic",
    grass_paver = "grass_paver",
    grass = "grass",
    dirt = "dirt",
    earth = "earth",
    mud = "mud",
    sand = "sand",
    ground = "ground",
}

const poiTypes: PoiTypes = {
    leisure: ["park", "garden", "nature_reserve"],
    route: ["running", "hiking"],
    highway: ["path", "footway"],
    natural: ["wood", "grassland", "tree", "tree_row"],
    tourism: ["viewpoint"],
};


export default poiTypes;