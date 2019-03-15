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