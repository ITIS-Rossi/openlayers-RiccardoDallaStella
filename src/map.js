// Funzione init caricata all'avvio ...

function init() {
  const popup = document.getElementById("popup");
  const posRossi = [11.555466, 45.552687];
  const posRotatoria = [11.553702, 45.552662];

  ol.proj.useGeographic();
  
  const overlay = new ol.Overlay({
    element: popup,
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });
  
  const featureRossi = new ol.Feature({
    geometry: new ol.geom.Point(posRossi),
    name: "ITIS Rossi"
  })

  const featureRotatoria = new ol.Feature({
    geometry: new ol.geom.Point(posRotatoria),
    name: "Rotatoria del Rossi"
  })

  const iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      src: "img/marker.png"
    }),
  });

  const layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [featureRossi, featureRotatoria]
    }),
    style: iconStyle,
  });

  const map = new ol.Map({
    target: "mappa",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
      layer
    ],
    view: new ol.View({
      center: posRossi,
      zoom: 17,
    }),
    overlays: [overlay],
  });

  map.on("click", function(evt) {
    const features = map.getFeaturesAtPixel(evt.pixel);
    if (features.length > 0) {
      const feature = features[features.length - 1];
      popup.innerHTML = feature.get("name");
      overlay.setPosition(feature.getGeometry().flatCoordinates);
    }
    else {
      overlay.setPosition(undefined);
    }
  });
}