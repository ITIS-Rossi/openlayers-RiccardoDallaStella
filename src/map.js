// Funzione init caricata all'avvio ...

function init() {
  const container = document.getElementById("popup");
  const content = document.getElementById("popup-content");
  const pos1 = [11.555466748422223, 45.55268745];
  const pos2 = [11.553702, 45.552662];

  ol.proj.useGeographic();
  
  const overlay = new ol.Overlay({
    element: container,
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });
  
  const featureRossi = new ol.Feature({
    geometry: new ol.geom.Point(pos1),
    name: "ITIS Rossi"
  })

  const featureRotatoria = new ol.Feature({
    geometry: new ol.geom.Point(pos2),
    name: "Rotatoria del Rossi"
  })

  const map = new ol.Map({
    target: "mappa",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
      ],
      view: new ol.View({
      center: pos1,
      zoom: 17,
    }),
  });
  var layer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [featureRossi, featureRotatoria]
    })
  });
  map.addLayer(layer);

  const icon1 = document.createElement("img");
  icon1.src = "img/marker.png";
  map.addOverlay(new ol.Overlay({
    position: pos1,
    positioning: "center-center",
    element: icon1,
    stopEvent: false
  }));
  
  const icon2 = document.createElement("img");
  icon2.src = "img/marker.png";
  map.addOverlay(new ol.Overlay({
    position: pos2,
    positioning: "center-center",
    element: icon2,
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
      alert(lastFeature.get("name"));
    }
  });
}
