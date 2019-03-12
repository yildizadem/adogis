import { loadModules } from 'esri-loader';

let Adogis = function () {
    this.map = null;
    this.mapDiv = null;
    this.basemaps = [];
    this.esriOptions = {
        url: 'https://js.arcgis.com/3.27/',
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
}
Adogis.prototype.setBasemaps = function (basemaps) {
    this.basemaps = basemaps;
};
Adogis.prototype.reloadMap = function () {
    this.map.destroy();
    this.map = null;
    this.mapDiv = null;
    this.createMap();
}
Adogis.prototype.createMap = function () {
    let self = this;
    this.mapDiv = $(`<div id="mapDiv"></div>`);
    $('body').append(this.mapDiv);
    loadModules(['esri/map', 'libs/layers/layerFactory'], this.esriOptions)
        .then(([Map, layerFactory]) => {
            self.map = new Map(self.mapDiv[0].id, {
                zoom: 11,
                logo: false,
                slider: true,
                sliderPosition: "bottom-right"
            });
            self.basemaps.forEach((basemap)=>{
                let layer = layerFactory(basemap);
                self.map.addLayer(layer);
            });
        })
        .catch(err => {
            // handle any script or module loading errors
            console.error(err);
        });
}

export default Adogis;