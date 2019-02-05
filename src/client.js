const d3 = require('d3');
const tubeMap = require('d3-tube-map');
const showModal = require('./modal');

d3.tubeMap = tubeMap.tubeMap;
const map = d3.tubeMap();
const container = d3.select('#map');
const width = 1200;
const height = 1000;

const getBarsAround = (name, data) => {
  const lat = data.stations[name].position.lat;
  const lon = data.stations[name].position.lon;
  d3.json([
    'https://lz4.overpass-api.de/api/interpreter?data=[out:json];',
    `node["amenity"="bar"](around:500,${lat},${lon});out;`,
  ].join('')).then(result => {
    const bars = result.elements.filter(bar => bar.tags.name).map(bar => ({
      name: bar.tags.name,
      ...(bar.tags['addr:street']) && { street: bar.tags['addr:street'] },
      ...(bar.tags['addr:housenumber']) && { housenumber: bar.tags['addr:housenumber'] },
      ...(bar.tags.website) && { website: bar.tags.website },
    }));
    showModal(name, bars);
  })
};

const initMap = (data) => {
  map
    .width(width)
    .height(height)
    .margin({
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    })
    .on('click', (name) => {
      getBarsAround(name, data);
    });
  container.datum(data).call(map);
  const svg = container.select('svg');
  const zoomed = () => {
    svg.select('g').attr('transform', d3.event.transform.toString());
  };
  const zoom = d3
    .zoom()
    .scaleExtent([0.2, 2])
    .on('zoom', zoomed);
  const zoomContainer = svg.call(zoom);
  const initialScale = 1.2;
  const initialTranslate = [50, 150];
  zoom.scaleTo(zoomContainer, initialScale);
  zoom.translateTo(zoomContainer, initialTranslate[0], initialTranslate[1]);
};

d3.json('/lisbon-metro').then((data) => {
  initMap(data);
});
