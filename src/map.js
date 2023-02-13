// Funzione init caricata all'avvio ...

function init() {
  const container = document.getElementById('popup');
  const content = document.getElementById('popup-content');
  const closer = document.getElementById('popup-closer');

  const overlay = new ol.Overlay({
    element: container,
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });
  
  ol.proj.useGeographic();
  let map = new ol.Map({
    target: "mappa",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    view: new ol.View({
      center: [11.555601582952226, 45.552535373028576],
      zoom: 17,
    }),
  });
  var layer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point([11.555601582952226, 45.552535373028576])
            })
        ]
    })
  });
  map.addLayer(layer);
}
