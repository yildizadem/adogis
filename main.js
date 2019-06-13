import {
    loadModules
} from 'esri-loader';
import LayerFactory from "./modules/LayerFactory";

export default class Adogis {
    constructor(params) {
        let {
            version,
            layers,
            mapDivId,
            basemap,
            center
        } = params || {};
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
                packages: [{
                    location: location.pathname.replace(/\/[^/]+$/, "") + "/node_modules/adogis/libs",
                    name: 'libs'
                }]
            }
        };
        this.layerFactory = new LayerFactory(this.esriOptions);
        this.eventList = {
            "map-load": [],
            "layer-added": [],
            "layers-added": [],
            "basemap-change": []
        }
    }
    setBasemap(basemapName) {
        if (this.map && typeof basemapName === "string") {
            this.map.setBasemap(basemapName);
        }
    }
    reloadMap() {
        this.map.destroy();
        this.map = null;
        this.mapDiv = null;
        this.createMap();
    }
    destroyMap() {
        this.map.destroy();
        this.map = null;
        this.mapDiv = null;
    }
    addMarker(params, callback) {
        let _self = this;
        let {
            markerUrl,
            x,
            y,
            markerWidth,
            markerHeight,
            spatialReference,
            attributes,
            infoWindow
        } = params || {};
        markerUrl = markerUrl ? markerUrl : location.pathname.replace(/\/[^/]+$/, "") + "/node_modules/adogis/img/locationMarker.png";
        if (!x) throw Error("x parameter is required");
        if (!y) throw Error("y parameter is required");
        this.loadModules([
                "esri/symbols/PictureMarkerSymbol",
                "esri/geometry/Point",
                "esri/SpatialReference",
                "esri/graphic", "esri/InfoTemplate"
            ],
            function ({
                PictureMarkerSymbol,
                Point,
                Graphic,
                SpatialReference,
                InfoTemplate
            }) {
                let pictureMarkerSymbol = new PictureMarkerSymbol(markerUrl, markerWidth || 25, markerHeight || 25);
                let point = new Point(x, y, spatialReference || new SpatialReference({
                    wkid: 4326
                }));
                let graphic = new Graphic(point, pictureMarkerSymbol);
                attributes && graphic.setAttributes(attributes);
                infoWindow && graphic.setInfoTemplate(new InfoTemplate(infoWindow.title, infoWindow.content));
                _self.map.graphics.add(graphic);
                callback && callback(graphic);
            });
    };
    removeMarker(marker) {
        this.map.graphics.remove(marker);
    }
    addPoint(params, callback) {
        let _self = this;
        let {
            x,
            y,
            spatialReference,
            attributes,
            infoWindow,
            size,
            color,
            outlineColor,
            outlineWidth
        } = params || {};
        if (!x) throw Error("x parameter is required");
        if (!y) throw Error("y parameter is required");
        this.loadModules([
                "esri/symbols/SimpleMarkerSymbol",
                "esri/geometry/Point",
                "esri/SpatialReference",
                "esri/graphic", "esri/InfoTemplate"
            ],
            function ({
                SimpleMarkerSymbol,
                Point,
                Graphic,
                SpatialReference,
                InfoTemplate
            }) {
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
                let point = new Point(x, y, spatialReference || new SpatialReference({
                    wkid: 4326
                }));
                let graphic = new Graphic(point, simpleMarkerSymbol);
                attributes && graphic.setAttributes(attributes);
                infoWindow && graphic.setInfoTemplate(new InfoTemplate(infoWindow.title, infoWindow.content));
                _self.map.graphics.add(graphic);
                callback && callback(graphic);
            });
    }
    removePoint(point) {
        this.map.graphics.remove(point);
    }
    addLine(params, callback) {
        let _self = this;
        let {
            coordinates,
            spatialReference,
            lineStyle,
            color,
            width,
            attributes,
            infoWindow
        } = params || {};
        if (!coordinates) throw Error("coordinates parameter is required. [[x1, y1], [x2, y2], ...]");
        this.loadModules([
                "esri/symbols/SimpleLineSymbol",
                "esri/geometry/Polyline",
                "esri/SpatialReference",
                "esri/Color",
                "esri/graphic", "esri/InfoTemplate"
            ],
            function ({
                SimpleLineSymbol,
                Polyline,
                Graphic,
                Color,
                SpatialReference,
                InfoTemplate
            }) {
                let simpleLineSymbol = new SimpleLineSymbol(
                    lineStyle ? SimpleLineSymbol[lineStyle] : SimpleLineSymbol.STYLE_SOLID,
                    new Color(color || [0, 0, 0, 1]),
                    width || 3);
                let polyline = new Polyline(coordinates);
                polyline.setSpatialReference(spatialReference || new SpatialReference({
                    wkid: 4326
                }))
                let graphic = new Graphic(polyline, simpleLineSymbol);
                attributes && graphic.setAttributes(attributes);
                infoWindow && graphic.setInfoTemplate(new InfoTemplate(infoWindow.title, infoWindow.content));
                _self.map.graphics.add(graphic);
                callback && callback(graphic);
            });
    }
    removeLine(line) {
        this.map.graphics.remove(line);
    }
    addPolygon(params, callback) {
        let _self = this;
        let {
            coordinates,
            attributes,
            infoWindow,
            polygonStyle,
            outlineStyle,
            color,
            outlineColor,
            outlineWidth,
            spatialReference
        } = params || {};
        if (!coordinates) throw Error("coordinates parameter is required. [[x1, y1], [x2, y2], ...]");
        this.loadModules([
                "esri/symbols/SimpleLineSymbol",
                "esri/symbols/SimpleFillSymbol",
                "esri/geometry/Polygon",
                "esri/SpatialReference",
                "esri/Color",
                "esri/graphic", "esri/InfoTemplate"
            ],
            function ({
                SimpleFillSymbol,
                SimpleLineSymbol,
                Polygon,
                Graphic,
                Color,
                SpatialReference,
                InfoTemplate
            }) {
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
                polygon.setSpatialReference(spatialReference || new SpatialReference({
                    wkid: 4326
                }))
                let graphic = new Graphic(polygon, simpleFillSymbol);
                attributes && graphic.setAttributes(attributes);
                infoWindow && graphic.setInfoTemplate(new InfoTemplate(infoWindow.title, infoWindow.content));
                _self.map.graphics.add(graphic);
                callback && callback(graphic);
            });
    }
    removePolygon(polygon) {
        this.map.graphics.remove(polygon);
    }
    clearAllGeometries() {
        this.map.graphics.clear()
    }
    hideLayer(layerId) {
        this.map.getLayer(layerId).hide();
    }
    showLayer(layerId) {
        this.map.getLayer(layerId).show();
    }
    addLayer(layerItem) {
        this.layerFactory.getLayer(layerItem).then((layer) => {
            this.map.addLayer(layer);
        });
    }
    removeLayer(layerId) {
        this.map.removeLayer(this.map.getLayer(layerId));
    }
    createMap() {
        let _self = this;
        $('head').append(`<link rel="stylesheet" href="https://js.arcgis.com/${this.version}/esri/css/esri.css">`);
        if (!this.mapDiv) {
            this.mapDiv = $(`<div id="mapDiv"></div>`);
            $('body').append(this.mapDiv);
        }
        this.loadModules(['esri/map'], function ({
            Map,
        }) {
            _self.map = new Map(_self.mapDiv[0].id, {
                zoom: 11,
                logo: false,
                slider: true,
                sliderPosition: "bottom-right",
                basemap: _self.defaultBasemap,
                center: _self.defaultCenter
            });
            let layers = [];
            _self.layers.forEach((layerItem) => {
                layers.push(_self.layerFactory.getLayer(layerItem));
            });
            _self.map.on("layers-add-result", function (e) {
                _self.eventList["layers-added"].forEach((cb) => {
                    cb(e.layers);
                });
            });
            _self.map.on("basemap-change", function (e) {
                _self.eventList["basemap-change"].forEach((cb) => {
                    cb(e);
                });
            });
            layers.length > 0 && Promise.all(layers).then((layers) => {
                _self.map.addLayers(layers);
            });
            _self.eventList["map-load"].forEach((cb) => {
                cb(_self);
            });
        }, function (err) {
            console.error(err);
        });
    }
    loadModules(moduleNames, callback, errorback) {
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
    on(handler, callback) {
        if (typeof handler === "string" && typeof callback === "function") {
            this.eventList[handler].push(callback);
        } else throw TypeError("Wrong type.")
    }
}