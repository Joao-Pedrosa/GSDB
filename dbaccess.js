const { Client } = require('pg');

const getClient = () => new Client(process.env.DATABASE_CONNECTION);

const testConnection = (cb) => {
  const client = getClient();
  const query = [
    "select osm_id, name, operator, railway, public_transport, construction",
    "from planet_osm_point",
    "where public_transport = 'station';",
  ].join(' ');
  client.connect();
  client.query(query, (err, data) => {
    if (err) throw err;
    client.end();
    return cb(null, data.rows);
  });
};

module.exports = {
  testConnection,
};
