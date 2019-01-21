const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={token}', {
  attribution: [
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,',
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,',
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  ].join(' '),
  maxZoom: 18,
  id: 'mapbox.streets',
  token: 'pk.eyJ1IjoiaHVza3ktZyIsImEiOiJjanI0ejUxeXcwcWl2NDN0ZzFhZ3Zha3lsIn0.V--h7EUXKg0OXMIHetCU-g',
}).addTo(map);
