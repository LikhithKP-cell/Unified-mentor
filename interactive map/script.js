
const map = L.map('map').setView([40.7128, -74.0060], 13); 


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


const locations = [
    { name: "Central Park", coords: [40.785091, -73.968285], description: "A large public park in NYC." },
    { name: "Statue of Liberty", coords: [40.689247, -74.044502], description: "Iconic statue on Liberty Island." },
    { name: "Times Square", coords: [40.758896, -73.985130], description: "Popular tourist destination." },
    { name: "Brooklyn Bridge", coords: [40.706086, -73.996864], description: "Historic suspension bridge." },
    { name: "Empire State Building", coords: [40.748817, -73.985428], description: "102-story skyscraper in NYC." }
];


locations.forEach(location => {
    const marker = L.marker(location.coords).addTo(map);
    marker.bindPopup(`<b>${location.name}</b><br>${location.description}`);
});


const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const match = locations.find(location => location.name.toLowerCase().includes(query));
    if (match) {
        map.setView(match.coords, 14);
        const marker = L.marker(match.coords).addTo(map);
        marker.bindPopup(`<b>${match.name}</b><br>${match.description}`).openPopup();
    }
});
