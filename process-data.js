const fs = require('fs');
const lisbonMetro = require('./data/lisbon-metro-original.json');

const formatData = (data) => {
  const stations = data.elements.filter(item => item.tags && item.tags.station === 'subway');
  const lines = data.elements.filter(item => item.tags && item.tags.route === 'subway');
  const result = { stations: {}, lines: [] };
  stations.forEach(station => {
    result.stations[station.tags.name] = {
      id: station.id,
      name: station.tags.name,
      label: station.tags.name,
      position: {
        lat: station.lat,
        lon: station.lon,
      },
    };
  });
  lines.forEach(line => {
    if (result.lines.find(({ name }) => name === line.tags.ref)) {
      return;
    }
    result.lines.push({
      name: line.tags.ref,
      color: line.tags.colour,
      shiftCoords: [0, 0],
      nodes: line.members.filter(({ role }) => role === 'stop').map(({ ref }) => ({
        coords: [],
        labelPos: 'N',
        name: result.stations[Object.keys(result.stations)
          .find(key => result.stations[key].id === ref)].name,
      })),
    });
  });
  return result;
};

const init = function() {
  const data = formatData(lisbonMetro);
  const filename = 'lisbon-metro-formatted.json';
  fs.writeFile(`./data/${filename}`, JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    console.log(`Data written to file ${filename}`);
  });
}();
