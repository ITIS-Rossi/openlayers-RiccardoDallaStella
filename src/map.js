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

  const iconStyle1 = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      src: "img/marker.png"
    }),
  });
  
  featureRossi.setStyle(iconStyle1);

  const featureRotatoria = new ol.Feature({
    geometry: new ol.geom.Point(pos2),
    name: "Rotatoria del Rossi"
  })

  const iconStyle2 = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      src: "img/marker.png"
    }),
  });
  
  featureRotatoria.setStyle(iconStyle2);

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
    overlay: overlay,
  });
  var layer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [featureRossi, featureRotatoria]
    })
  });
  map.addLayer(layer);

  const popup = new ol.Overlay({
    element: container,
    positioning: "bottom",
    stopEvent: false,
  })
  map.addOverlay(popup);

  let popover;
  function disposePopover(){
    if(popover){
      popover.dispose()
      popover = undefined;
    }
  }

  map.on("click", function(evt){
    const feature = map.forEachFeatureAtPixel(evt.pixel, function(feature){
      if(feature.length > 0){
        return feature[feature.length - 1];
      }
      return feature;
    });
    disposePopover();
    if(!feature){
      popup.setPosition(undefined);
      return;
    }
    popup.setPosition(evt.coordinate);
    popover = new bootstrap.Popover(content, {
      placement: "bottom",
      html: true,
      content: feature.get("name"),
    });
    popover.show();
  })

  map.on("movestart", disposePopover);

  /*map.on("singleclick", function (event) {
    const features = map.getFeaturesAtPixel(event.pixel);
    if(features.length > 0){
      const lastFeature = features[features.length - 1];
      console.log(lastFeature);
      content.innerHTML = lastFeature.get("name");
      overlay.setPosition(lastFeature.getGeometry());
      console.log(content);
    }
  });*/
}