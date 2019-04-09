# ADOGIS

An easy way to use Esri JS API

## Installation

```
npm install --save adogis
```

## Usage

```
import {adogis} from 'adogis';

let adogis = new Adogis("3.27", [{
    url: "https://www.test.com/arcgis/rest/services/test/MapServer",
    type: "ArcGISDynamicMapServiceLayer",
    layerOptions: {
        id: "test",
        opacity: 0.75
    }
}]);
adogis.createMap();

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

## Requirements

This repo has dependencies on the following repos.

* [esri-loader](https://github.com/Esri/esri-loader)
* [jquery](https://jquery.com/)

![Demo Image](/img/demo-image.PNG)