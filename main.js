import { loadModules } from 'esri-loader';

let Adogis = function (version, layers) {
    this.map = null;
    this.mapDiv = null;
    this.layers = layers || [];
    this.version = version || "3.27";
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
}

Adogis.prototype.createMap = function () {
    let self = this;
    $('head link[rel="stylesheet"]').first().before(`<link rel="stylesheet" href="https://js.arcgis.com/${this.version}/esri/css/esri.css">`);
    this.mapDiv = $(`<div id="mapDiv"></div>`);
    $('body').append(this.mapDiv);
    this.loadModules(['esri/map', 'libs/layers/layerFactory'], function ({ Map, LayerFactory }) {
        self.map = new Map(self.mapDiv[0].id, {
            zoom: 11,
            logo: false,
            slider: true,
            sliderPosition: "bottom-right"
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