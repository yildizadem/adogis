define(
    [
        "dojo/_base/declare",
        "dojo/_base/lang",
        "esri/layers/VectorTileLayer",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/FeatureLayer",

        "dojo/ready"
    ],
    function (
        declare,
        lang,
        VectorTileLayer,
        ArcGISDynamicMapServiceLayer,
        ArcGISTiledMapServiceLayer,
        FeatureLayer
    ) {
        return {
            getLayer: function (layerItem) {
                var layer;
                switch (layerItem.type) {
                    case "ArcGISDynamicMapServiceLayer":
                        layer = new ArcGISDynamicMapServiceLayer(layerItem.url, layerItem.layerOptions);
                        return layer;
                    case "ArcGISTiledMapServiceLayer":
                        layer = new ArcGISTiledMapServiceLayer(layerItem.url, layerItem.layerOptions);
                        return layer;
                    case "FeatureLayer":
                        layer = new FeatureLayer(layerItem.url, layerItem.layerOptions);
                        return layer;
                    case "VectorTileLayer":
                        layer = new VectorTileLayer(layerItem.url, layerItem.layerOptions);
                        return layer;
                    default:
                        return null;

                }


            }
        };

    });