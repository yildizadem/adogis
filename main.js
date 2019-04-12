import { loadModules } from 'esri-loader';

let Adogis = function (params) {
    let { version, layers, mapDivId, basemap, center } = params || {};
    this.map = null;
    this.mapDiv = mapDivId ? $(`#${mapDivId}`) : null;
    this.layers = layers || [];
    this.version = version || "3.28";
    this.defaultBasemap = basemap || "osm";
    this.defaultCenter = center || [29, 41];
    this.esriOptions = {
        url: `https://js.arcgis.com/${this.version}/`,
        dojoConfig: {
            async: true,
            packages: [
                {
                    location: location.pathname.replace(/\/[^/]+$/, "") + "/node_modules/adogis/libs",
                    name: 'libs'
                }
            ]
        }
    };
    this.eventList = {
        "map-load": [],
        "layer-added": [],
        "layers-added": [],
        "basemap-change": []
    }
}
Adogis.prototype.setBasemap = function (basemapName) {
    if (this.map && typeof basemapName === "string") {
        this.map.setBasemap(basemapName);
    }
};

Adogis.prototype.reloadMap = function () {
    this.map.destroy();
    this.map = null;
    this.mapDiv = null;
    this.createMap();
};

Adogis.prototype.destroyMap = function () {
    this.map.destroy();
    this.map = null;
    this.mapDiv = null;
};

Adogis.prototype.addMarker = function (params, callback) {
    let self = this;
    let { markerUrl, x, y, markerWidth, markerHeight, spatialReference, attributes, infoWindow } = params || {};
    markerUrl = markerUrl ? markerUrl : location.pathname.replace(/\/[^/]+$/, "") + "/node_modules/adogis/img/locationMarker.png";
    if (!x) throw Error("x parameter is required");
    if (!y) throw Error("y parameter is required");
    this.loadModules([
        "esri/symbols/PictureMarkerSymbol",
        "esri/geometry/Point",
        "esri/SpatialReference",
        "esri/graphic", "esri/InfoTemplate"],
        function ({ PictureMarkerSymbol, Point, Graphic, SpatialReference, InfoTemplate }) {
            let pictureMarkerSymbol = new PictureMarkerSymbol(markerUrl, markerWidth || 25, markerHeight || 25);
            let point = new Point(x, y, spatialReference || new SpatialReference({ wkid: 4326 }));
            let graphic = new Graphic(point, pictureMarkerSymbol);
            attributes && graphic.setAttributes(attributes);
            infoWindow && graphic.setInfoTemplate(new InfoTemplate(infoWindow.title, infoWindow.content));
            self.map.graphics.add(graphic);
            callback && callback(graphic);
        });
};

Adogis.prototype.removeMarker = function (marker) {
    this.map.graphics.remove(marker);
};

Adogis.prototype.addPoint = function (params, callback) {
    let self = this;
    let { x, y, spatialReference, attributes, infoWindow, size, color, outlineColor, outlineWidth } = params || {};
    if (!x) throw Error("x parameter is required");
    if (!y) throw Error("y parameter is required");
    this.loadModules([
        "esri/symbols/SimpleMarkerSymbol",
        "esri/geometry/Point",
        "esri/SpatialReference",
        "esri/graphic", "esri/InfoTemplate"],
        function ({ SimpleMarkerSymbol, Point, Graphic, SpatialReference, InfoTemplate }) {
            let simpleMarkerSymbol = new SimpleMarkerSymbol({
                "color": color ? [color[0], color[1], color[2], color[3] * 255] : [125, 125, 255, 255],
                "size": size || 12,
                "angle": 0,
                "xoffset": 0,
                "yoffset": 0,
                "type": "esriSMS",
                "style": "esriSMSCircle",
                "outline": {
                    "color": outlineColor ? [outlineColor[0], outlineColor[1], outlineColor[2], outlineColor[3] * 255] : [0, 0, 0, 255],
                    "width": outlineWidth || 1,
                    "type": "esriSLS",
                    "style": "esriSLSSolid"
                }
            });
            let point = new Point(x, y, spatialReference || new SpatialReference({ wkid: 4326 }));
            let graphic = new Graphic(point, simpleMarkerSymbol);
            attributes && graphic.setAttributes(attributes);
            infoWindow && graphic.setInfoTemplate(new InfoTemplate(infoWindow.title, infoWindow.content));
            self.map.graphics.add(graphic);
            callback && callback(graphic);
        });
};

Adogis.prototype.removePoint = function (point) {
    this.map.graphics.remove(point);
};

Adogis.prototype.addLine = function (params, callback) {
    let self = this;
    let { coordinates, spatialReference, lineStyle, color, width, attributes, infoWindow } = params || {};
    if (!coordinates) throw Error("coordinates parameter is required. [[x1, y1], [x2, y2], ...]");
    this.loadModules([
        "esri/symbols/SimpleLineSymbol",
        "esri/geometry/Polyline",
        "esri/SpatialReference",
        "esri/Color",
        "esri/graphic", "esri/InfoTemplate"],
        function ({ SimpleLineSymbol, Polyline, Graphic, Color, SpatialReference, InfoTemplate }) {
            let simpleLineSymbol = new SimpleLineSymbol(
                lineStyle ? SimpleLineSymbol[lineStyle] : SimpleLineSymbol.STYLE_SOLID,
                new Color(color || [0, 0, 0, 1]),
                width || 3);
            let polyline = new Polyline(coordinates);
            polyline.setSpatialReference(spatialReference || new SpatialReference({ wkid: 4326 }))
            let graphic = new Graphic(polyline, simpleLineSymbol);
            attributes && graphic.setAttributes(attributes);
            infoWindow && graphic.setInfoTemplate(new InfoTemplate(infoWindow.title, infoWindow.content));
            self.map.graphics.add(graphic);
            callback && callback(graphic);
        });
};

Adogis.prototype.removeLine = function (line) {
    this.map.graphics.remove(line);
};

Adogis.prototype.addPolygon = function (params, callback) {
    let self = this;
    let { coordinates, attributes, infoWindow, polygonStyle, outlineStyle, color, outlineColor, outlineWidth, spatialReference } = params || {};
    if (!coordinates) throw Error("coordinates parameter is required. [[x1, y1], [x2, y2], ...]");
    this.loadModules([
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/geometry/Polygon",
        "esri/SpatialReference",
        "esri/Color",
        "esri/graphic", "esri/InfoTemplate"],
        function ({ SimpleFillSymbol, SimpleLineSymbol, Polygon, Graphic, Color, SpatialReference, InfoTemplate }) {
            let simpleFillSymbol = new SimpleFillSymbol(
                polygonStyle ? SimpleFillSymbol[polygonStyle] : SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(
                    outlineStyle ? SimpleLineSymbol[outlineStyle] : SimpleLineSymbol.STYLE_SOLID,
                    new Color(outlineColor || [0, 0, 0, 1]),
                    outlineWidth || 3
                ),
                new Color(color || [125, 125, 255, 1])
            );
            let polygon = new Polygon(coordinates);
            polygon.setSpatialReference(spatialReference || new SpatialReference({ wkid: 4326 }))
            let graphic = new Graphic(polygon, simpleFillSymbol);
            attributes && graphic.setAttributes(attributes);
            infoWindow && graphic.setInfoTemplate(new InfoTemplate(infoWindow.title, infoWindow.content));
            self.map.graphics.add(graphic);
            callback && callback(graphic);
        });
};

Adogis.prototype.removePolygon = function (polygon) {
    this.map.graphics.remove(polygon);
}

Adogis.prototype.clearAllGeometries = function () {
    this.map.graphics.clear()
};

Adogis.prototype.hideLayer = function (layerId) {
    this.map.getLayer(layerId).hide();
};

Adogis.prototype.showLayer = function (layerId) {
    this.map.getLayer(layerId).show();
};

Adogis.prototype.addLayer = function (layerItem) {
    let self = this;
    this.loadModules(['libs/layers/layerFactory'], function ({ LayerFactory }) {
        let layer = LayerFactory.getLayer(layerItem);
        self.map.addLayer(layer);
    });
};

Adogis.prototype.removeLayer = function (layerId) {
    this.map.removeLayer(this.map.getLayer(layerId));
};

Adogis.prototype.createMap = function () {
    let self = this;
    $('head link[rel="stylesheet"]').first().before(`<link rel="stylesheet" href="https://js.arcgis.com/${this.version}/esri/css/esri.css">`);
    if (!this.mapDiv) {
        this.mapDiv = $(`<div id="mapDiv"></div>`);
        $('body').append(this.mapDiv);
    }
    this.loadModules(['esri/map', 'libs/layers/layerFactory'], function ({ Map, LayerFactory }) {
        self.map = new Map(self.mapDiv[0].id, {
            zoom: 11,
            logo: false,
            slider: true,
            sliderPosition: "bottom-right",
            basemap: self.defaultBasemap,
            center: self.defaultCenter
        });
        let layers = [];
        self.layers.forEach((layerItem) => {
            let layer = LayerFactory.getLayer(layerItem);
            layers.push(layer);
        });
        self.map.on("layers-add-result", function (e) {
            self.eventList["layers-added"].forEach((cb) => {
                cb(e.layers);
            });
        });
        self.map.on("basemap-change", function (e) {
            self.eventList["basemap-change"].forEach((cb) => {
                cb(e);
            });
        });
        layers.length > 0 && self.map.addLayers(layers);
        self.eventList["map-load"].forEach((cb) => {
            cb(self);
        });
    }, function (err) {
        console.error(err);
    });
}
Adogis.prototype.loadModules = function (moduleNames, callback, errorback) {
    let modulesObject = {};
    loadModules(moduleNames, this.esriOptions)
        .then((modules) => {
            moduleNames.forEach((name, index) => {
                let moduleName = name.slice(name.lastIndexOf("/") + 1).charAt(0).toUpperCase() + name.slice(name.lastIndexOf("/") + 1).substr(1);
                modulesObject[moduleName] = modules[index];
            })
            callback(modulesObject);
        }).catch(err => {
            errorback(err);
        })
}
Adogis.prototype.on = function (handler, callback) {
    if (typeof handler === "string" && typeof callback === "function") {
        this.eventList[handler].push(callback);
    } else throw TypeError("Wrong type.")
};

export default Adogis;