const d3 = require('d3');
const tubeMap = require('d3-tube-map');

d3.tubeMap = tubeMap.tubeMap;
const map = d3.tubeMap();
const container = d3.select('#map');
const width = container.node().getBoundingClientRect().width;
const height = container.node().getBoundingClientRect().height;

const getBarsAround = (name, data) => {
  console.log(name);
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
    console.dir(bars);
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
      left: 120,
    })
    .on('click', (name) => {
      getBarsAround(name, data);
    });
  container.datum(data).call(map);
};

d3.json('/lisbon-metro').then((data) => {
  initMap(data);
});
