var map = require('./test');

L.Icon.Default.imagePath = '/static/images';

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.505, -0.09]).addTo(map).bindPopup('A pretty CSS3 popup. <br> Easily customizable.').openPopup();
