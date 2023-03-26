// Funzione init caricata all'avvio ...

function init() {
  const popup = document.getElementById("popup");
  const posRossi = [11.555466, 45.552687];
  const posRotatoria = [11.553702, 45.552662];

  ol.proj.useGeographic();
  
  const overlay = new ol.Overlay({ //Creazione dell'overlay tramite la libreria openlayers che permetterà l'apparizione del popup
    element: popup,
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });
  
  const featureRossi = new ol.Feature({ //Creazione della feature che si troverà sul Rossi, dandole le coordinate e il nome di essa
    geometry: new ol.geom.Point(posRossi),
    name: "ITIS Alessandro Rossi"
  })

  const featureRotatoria = new ol.Feature({ //Creazione della feature che si troverà sulla Rotatoria del Rossi, dandole le coordinate e il nome di essa
    geometry: new ol.geom.Point(posRotatoria),
    name: "Rotatoria del Rossi"
  })

  const iconStyle = new ol.style.Style({ //Creazione dello stile, sempre utilizzando la libreria di openlayers, che avrà il marker
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      src: "img/marker.png"
    }),
  });

  const layer = new ol.layer.Vector({ //Creazione del layer sul quale verrano posizionate le due feature precedentemente create e dandogli lo stile creato sopra
    source: new ol.source.Vector({
      features: [featureRossi, featureRotatoria]
    }),
    style: iconStyle,
  });

  const map = new ol.Map({ //Creazione della mappa creando il layer principale e quello con i marker
    target: "mappa", //Impostando il centro sul Rossi e ad uno zoom buono e impostando come overlay quello dei popup
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

  map.on("click", function(evt) { //Creazione della funzione che, al click di un marker appare il popup con il nome della feature precedentemente impostato;
    const features = map.getFeaturesAtPixel(evt.pixel); //Tramite getFeaturesAtPixel otteniamo la posizione delle feature
    if (features.length > 0) { //Successivamente controlliamo se l'array delle features cliccate è > 0, se si allora bisogna far apparire il popup, altrimenti no
      const feature = features[features.length - 1];
      popup.innerHTML = feature.get("name");
      overlay.setPosition(feature.getGeometry().flatCoordinates);
    }
    else {
      overlay.setPosition(undefined);
    }
  });
}