const d3 = require('d3');
const tubeMap = require('d3-tube-map');
d3.tubeMap = tubeMap.tubeMap;

const container = d3.select('#map');
const width = 400;
const height = 200;
const map = d3.tubeMap()
  .width(width)
  .height(height)
  .margin({
    top: 20,
    right: 120,
    bottom: 40,
    left: 100,
  });
d3.json('/example').then((data) => {
  console.dir(data);
  container.datum(data).call(map);
});

d3.json('/lisbon-metro').then((data) => {
  console.dir(data);
});
