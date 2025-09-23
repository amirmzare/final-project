const map = L.map("map-container").setView([36.5755139, 53.0566417], 15);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

L.marker([36.5755139, 53.0566417]).addTo(map);
