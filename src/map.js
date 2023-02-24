// Funzione init caricata all'avvio ...

function init() {
  const container = document.getElementById("popup");
  const nomePopup = document.getElementById("popup-nome");
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
                geometry: new ol.geom.Point(pos),
                name: "ITIS ROSSI"
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

  map.on("singleclick", function (event) {
    const features = map.getFeaturesAtPixel(event.pixel);
    if(features.length > 0){
      const lastFeature = features[features.length - 1];
      console.log(lastFeature);
      nomePopup.innerHTML = lastFeature.get("name");
      overlay.setPosition(lastFeature.getGeometry().flatCoordinates);
      console.log(nomePopup);
    }
    
  });
}
