const d3 = require('d3');
const tubeMap = require('d3-tube-map');
d3.tubeMap = tubeMap.tubeMap;

const container = d3.select('#map');
const width = container.node().getBoundingClientRect().width;
const height = container.node().getBoundingClientRect().height;
const map = d3.tubeMap()
  .width(width)
  .height(height)
  .margin({
    top: 20,
    right: 20,
    bottom: 20,
    left: 120,
  });
d3.json('/lisbon-metro').then((data) => {
  container.datum(data).call(map);
});
