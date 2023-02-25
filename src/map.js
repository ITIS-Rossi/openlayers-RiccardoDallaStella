// Funzione init caricata all'avvio ...

function init() {
  const container = document.getElementById("popup");
  const content = document.getElementById("popup-content");
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
      zoom: 16,
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
  icon.src = "img/marker.png";
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
      content.innerHTML = lastFeature.get("name");
      overlay.setPosition(lastFeature.getGeometry().flatCoordinates);
      console.log(content);
    }
    
  });
}
