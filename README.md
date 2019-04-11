# ADOGIS

An easy way to use Esri JS API

## Installation

```js
npm install --save adogis
```

## Usage

```js
import {Adogis} from 'adogis';

let adogis = new Adogis({
    version: "3.26", // optional, default = "3.28"
    mapDivId: "mapDiv", // optional, if null create new mapDiv and append body automatically
    basemap: "gray", // optional, default = "osm",
    center: [0, 40], // optional, default = [29, 41]
    layers: [{
        url: "https://www.test.com/arcgis/rest/services/test/MapServer", // required
        type: "ArcGISDynamicMapServiceLayer", // required
        layerOptions: {
            id: "test", // required
            opacity: 0.75 // optional
        }
    }] // optional 
});
adogis.createMap();

// for change basemap
adogis.setBasemap("topo");

// for layer visibility change
adogis.hideLayer("test");
adogis.showLayer("test");

// for add-remove layer after create
adogis.addLayer({
    url: "https://www.test.com/arcgis/rest/services/test/MapServer",
    type: "ArcGISDynamicMapServiceLayer",
    layerOptions: {
        id: "test",
        opacity: 0.75
    }
});
adogis.removeLayer("test");

// for events
adogis.on("map-load", function(e){...});

// for add/remove marker
adogis.addMarker({
    x: 29, // required
    y: 41, // required
    spatialReference: new SpatialReference(...), // optional
    markerUrl: "somefolder/marker.png", // optional
    markerWidth: 50, // optional
    markerHeight: 50, // optional
    attributes: {
        ...
    }, // optional
    infoWindow: {
        title: "", // required
        content: "" // required
    } // optional
}, (marker) => {
    ...
});

adogis.removeMarker(marker);

// for load any modules
adogis.loadModules(["esri/SomeModuleOne", "esri/SomeModuleTwo"], (modules) => {
    let someModuleOne = new modules.SomeModuleOne(...);
    let someModuleTwo = new modules.SomeModuleTwo(...);
});
```
### Events

|Name|Summary|
|----|----|
|map-load|fires when map create process  complete|
|layer-added|fires when layer added complete|
|layers-added|fires when layers added complete|
|basemap-change|fires when basemap change|

### Basemaps
|Name|Summary|
|----|----|
|dark-gray|The Dark Gray Canvas basemap is designed to be used as a soothing background map for overlaying and focus attention on other map layers. https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer.|
|dark-gray-vector|The Dark Gray Canvas [v2] vector tile layer provides a detailed basemap for the world featuring a neutral background style with minimal colors, labels, and features.|
|gray|The Light Gray Canvas basemap is designed to be used as a neutral background map for overlaying and emphasizing other map layers. https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer.|
|gray-vector|The Light Gray Canvas [v2] vector tile layer provides a detailed basemap for the world featuring a neutral background style with minimal colors, labels, and features.|
|hybrid|The World Imagery with Labels map is a detailed imagery map layer and labels that is designed to be used as a basemap for various maps and applications: https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer.|
|national-geographic|The National Geographic basemap is designed to be used as a general reference map for informational and educational purposes: https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer.|
|oceans|The Ocean Basemap is designed to be used as a basemap by marine GIS professionals and as a reference map by anyone interested in ocean data. https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer.|
|osm|The OpenStreetMap is a community map layer that is designed to be used as a basemap for various maps and applications.|
|satellite|The World Imagery map is a detailed imagery map layer that is designed to be used as a basemap for various maps and applications: https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer.|
|streets|The Streets basemap presents a multiscale street map for the world: https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer.|
|streets-navigation-vector|The World Navigation Map [v2] vector tile layer provides a detailed basemap for the world featuring a custom navigation map style.|
|streets-night-vector|The World Street Map (Night) [v2] vector tile layer provides a detailed basemap for the world featuring a custom "night time" street map style.|
|streets-relief-vector|The World Street Map (with Relief) [v2] vector tile layer provides a detailed basemap for the world featuring a classic Esri street map style designed for use with a relief map.|
|streets-vector|The World Street Map [v2] vector tile layer provides a detailed basemap for the world featuring a classic Esri street map style.|
|terrain|The Terrain with Labels basemap is designed to be used to overlay and emphasize other thematic map layers. https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer https://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer.|
|topo|The Topographic map includes boundaries, cities, water features, physiographic features, parks, landmarks, transportation, and buildings: https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer.|
|topo-vector|The World Topographic Map [v2] vector tile layer provides a detailed basemap for the world featuring a classic Esri topographic map style designed for use with a relief map.|

Source: https://developers.arcgis.com/javascript/3/jsapi/esri.basemaps-amd.html 

## Requirements

This repo has dependencies on the following repos.

* [esri-loader](https://github.com/Esri/esri-loader)
* [jquery](https://jquery.com/)

![Demo Image](/img/demo-image.PNG)