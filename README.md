# ADOGIS

An easy way to use Esri JS API. You can easily create map and add marker, point, line or polygon onto created map. Also if you want to give some information to client about geometries, you can use infoWindow parameter. And also you can change basemap, colors, styles if you do not want to default values. If you create map in runtime or another time you can use events. 

## Installation

```js
npm install --save adogis
```

## Usage

```js
import Adogis from 'adogis';

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
    spatialReference: new SpatialReference(...), // optional, default EPSG:4326
    markerUrl: "somefolder/marker.png", // optional, default red marker
    markerWidth: 50, // optional, default = 25
    markerHeight: 50, // optional, default = 25
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

// for add/remove point

adogis.addPoint({
    x: 29, // required
    y: 41, // required
    spatialReference: new SpatialReference(...), // optional
    size: 20, // optional, default = 12
    color: [0, 255, 0, 0.5], // optional, default = [125, 125, 255, 1]
    outlineColor: [0, 0, 0, 1], // optional, default = [0, 0, 0, 1]
    outlineWidth: 2, // optional, default = 1
    attributes: {
        ...
    }, // optional
    infoWindow: {
        title: "", // required
        content: "" // required
    } // optional
}, (point) => {
    ...
});

adogis.removePoint(point);

// for add/remove line or multiline

adogis.addLine({
    coordinates: [
        [x1, y1],
        [x2, y2],
        ...
    ], // required, for multiline [[[x1, y1], [x2,y2], ...], [[x1, y1], [x2,y2], ...]]
    spatialReference: new SpatialReference(...), // optional, default EPSG:4326
    lineStyle: "STYLE_DASHDOTDOT", // optional, default = "STYLE_SOLID"
    color: [100, 100, 100, 1], // optional, default = [0, 0, 0, 1]
    width: 1, // optional, default = 3
    attributes: {
        ...
    }, // optional
    infoWindow: {
        title: "", // required
        content: "" // required
    } // optional
}, (line) => {
    ...
});

adogis.removeLine(line);

// for add/remove polygon or multipolygon

adogis.addPolygon({
    coordinates: [
        [x1, y1],
        [x2, y2],
        ...,
        [x1, y1]
    ], // required, for multipolygon [[[x1, y1], [x2,y2], ..., [x1, y1]], [[x1, y1], [x2,y2], ..., [x1, y1]]]
    spatialReference: new SpatialReference(...), // optional, default EPSG:4326
    polygonStyle: "STYLE_CROSS", // optional, default = "STYLE_SOLID"
    outlineStyle: "STYLE_DASHDOTDOT", // optional, default = "STYLE_SOLID"
    color: [0, 0, 255, 1], // optional, default = [125, 125, 255, 1]
    outlineColor: [0, 0, 0, 1], // optional, default = [0, 0, 0, 1]
    outlineWidth: 1, // optional, default = 3
    attributes: {
        ...
    }, // optional
    infoWindow: {
        title: "", // required
        content: "" // required
    } // optional
}, (polygon) => {
    ...
});

adogis.removePolygon(polygon);

// for clear all geometries

adogis.clearAllGeometries();

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

### Line Styles

|Name|Summary|
|----|----|
|STYLE_DASH|The line is made of dashes.|
|STYLE_DASHDOT|The line is made of a dash-dot pattern.|
|STYLE_DASHDOTDOT|The line is made of a dash-dot-dot pattern.|
|STYLE_DOT|The line is made of dots.|
|STYLE_LONGDASH|Line is constructed of a series of dashes.|
|STYLE_LONGDASHDOT|Line is constructed of a series of short dashes.|
|STYLE_NULL|The line has no symbol.|
|STYLE_SHORTDASH|Line is constructed of a series of short dashes.|
|STYLE_SHORTDASHDOT|Line is constructed of a dash followed by a dot.|
|STYLE_SHORTDASHDOTDOT|Line is constructed of a series of a dash and two dots.|
|STYLE_SHORTDOT|Line is constructed of a series of short dots.|
|STYLE_SOLID|The line is solid.|

Source: https://developers.arcgis.com/javascript/3/jsapi/simplelinesymbol-amd.html#simplelinesymbol3

### Polygon Styles

|Name|Summary|
|----|----|
|STYLE_BACKWARD_DIAGONAL|The fill is backward diagonal lines.|
|STYLE_CROSS|The fill is a cross.|
|STYLE_DIAGONAL_CROSS|The fill is a diagonal cross.|
|STYLE_FORWARD_DIAGONAL|The fill is forward diagonal lines.|
|STYLE_HORIZONTAL|The fill is horizontal lines.|
|STYLE_NULL|The polygon has no fill.|
|STYLE_SOLID|The fill is solid.|
|STYLE_VERTICAL|The fill is vertical lines.|

Source: https://developers.arcgis.com/javascript/3/jsapi/simplefillsymbol-amd.html#simplefillsymbol2

## Requirements

This repo has dependencies on the following repos.

* [esri-loader](https://github.com/Esri/esri-loader)
* [jquery](https://jquery.com/)

![Marker Demo Image](/img/marker-demo-image.PNG)
![Point Demo Image](/img/point-demo-image.PNG)
![Line Demo Image](/img/line-demo-image.PNG)
![Polygon Demo Image](/img/polygon-demo-image.PNG)