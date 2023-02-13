// Funzione init caricata all'avvio ...

function init() {
  const container = document.getElementById('popup');
  const content = document.getElementById('popup-content');
  const pos = [11.555466748422223, 45.55268745];

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
      center: pos,
      zoom: 18,
    }),
  });
  var layer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(pos)
            })
        ]
    })
  });
  map.addLayer(layer);

  const icon = document.createElement("img");
  icon.src = "img/marker.webp";
  map.addOverlay(new ol.Overlay({
    position: pos,
    positioning: "center-center",
    element: icon,
    stopEvent: false
  }));  

  map.on('singleclick', function (event) {
    /*const trailheads = map.getFeaturesAtPixel(event.pixel, {
      layerFilter: (layer) => layer === trailheadsLayer
    });

    if (trailheads.length > 0) {

      const trailName = trailheads[0].get("TRL_NAME");
      const parkName = trailheads[0].get("PARK_NAME");
      popup.show(event.pos, `<b>${trailName}</b></br>${parkName}`);

    } else {
      popup.hide();
    }*/
  });
}
