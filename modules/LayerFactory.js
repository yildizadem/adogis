import {
    loadModules
} from 'esri-loader';

export default class LayerFactory {
    constructor(esriOptions) {
        this.esriOptions = esriOptions;
    }
    getLayer(layerItem) {
        return new Promise((resolve, reject) => {
            loadModules([
                    "esri/layers/VectorTileLayer",
                    "esri/layers/ArcGISDynamicMapServiceLayer",
                    "esri/layers/ArcGISTiledMapServiceLayer",
                    "esri/layers/FeatureLayer"
                ], this.esriOptions)
                .then(([
                    VectorTileLayer,
                    ArcGISDynamicMapServiceLayer,
                    ArcGISTiledMapServiceLayer,
                    FeatureLayer
                ]) => {
                    var layer;
                    switch (layerItem.type) {
                        case "ArcGISDynamicMapServiceLayer":
                            layer = new ArcGISDynamicMapServiceLayer(layerItem.url, layerItem.layerOptions);
                            resolve(layer);
                        case "ArcGISTiledMapServiceLayer":
                            layer = new ArcGISTiledMapServiceLayer(layerItem.url, layerItem.layerOptions);
                            resolve(layer);
                        case "FeatureLayer":
                            layer = new FeatureLayer(layerItem.url, layerItem.layerOptions);
                            resolve(layer);
                        case "VectorTileLayer":
                            layer = new VectorTileLayer(layerItem.url, layerItem.layerOptions);
                            resolve(layer);
                        default:
                            resolve(null);
                    }
                }).catch(err => reject(err));
        });
    }
}