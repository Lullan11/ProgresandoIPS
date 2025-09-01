// 📌 Lista de ciudades con coordenadas (todas las que me diste)
const ciudades = {
    "Cali": [3.4516, -76.5320],
    "Medellín": [6.2442, -75.5812],
    "Barranquilla": [10.9685, -74.7813],
    "Bogotá": [4.7110, -74.0721],
    "Bucaramanga": [7.1193, -73.1227],
    "Funza": [4.7169, -74.2111],
    "Mosquera": [4.7059, -74.2302],
    "Madrid": [4.7325, -74.2642],
    "Cajicá": [4.9181, -74.0270],
    "Aguachica": [8.3088, -73.6154],
    "Arauca": [7.0845, -70.7591],
    "Armenia": [4.5339, -75.6811],
    "Barrancabermeja": [7.0653, -73.8540],
    "Cartagena": [10.3910, -75.4794],
    "Dorada Caldas": [5.4545, -74.6644],
    "Florencia": [1.6144, -75.6062],
    "Ibagué": [4.4389, -75.2322],
    "Manizales": [5.0703, -75.5138],
    "Montería": [8.7479, -75.8814],
    "Neiva": [2.9386, -75.2819],
    "Palmira": [3.5394, -76.3036],
    "Pasto": [1.2136, -77.2811],
    "Pereira": [4.8143, -75.6946],
    "Popayán": [2.4448, -76.6147],
    "Riohacha": [11.5449, -72.9070],
    "Sabana de Torres": [7.3900, -73.5000],
    "San Alberto": [7.7572, -73.3926],
    "San Gil": [6.5557, -73.1331],
    "Santa Marta": [11.2408, -74.1990],
    "Sincelejo": [9.3047, -75.3978],
    "Socorro": [6.4686, -73.2602],
    "Sogamoso": [5.7159, -72.9339],
    "Tunja": [5.5353, -73.3678],
    "Valledupar": [10.4631, -73.2532],
    "Villavicencio": [4.1420, -73.6266],
    "Yopal": [5.3378, -72.3959]
};

let map = L.map('map').setView([4.5709, -74.2973], 6); // centro Colombia

// Fondo de mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

let markers = {};
const listaCiudades = document.getElementById("lista-ciudades");

// 🔹 Definir un ícono con imagen
const customIcon = L.icon({
    iconUrl: "img/marker-icon-green.png", // ruta a la imagen del ícono
    iconSize: [60, 33],  // ancho, alto
    iconAnchor: [15, 40], // punto donde se "clava" el pin
    popupAnchor: [0, -35] // posición del popup
});

// 📍 Crear lista y marcadores
Object.entries(ciudades).forEach(([ciudad, coords]) => {
    // Crear marcador con ícono verde
    const marker = L.marker(coords, { icon: customIcon })
        .addTo(map)
        .bindPopup(`<b>${ciudad}</b>`);

    markers[ciudad] = marker;

    // Evento en marcador → resaltar lista
    marker.on("click", () => activarCiudad(ciudad));

    // Crear item en lista
    const item = document.createElement("div");
    item.className = "ciudad-item";
    item.textContent = ciudad;
    listaCiudades.appendChild(item);

    // Evento en lista → centrar mapa
    item.addEventListener("click", () => {
        map.setView(coords, 10);
        marker.openPopup();
        activarCiudad(ciudad);
    });
});

// 🔹 Resalta ciudad activa
function activarCiudad(ciudad) {
    document.querySelectorAll(".ciudad-item").forEach(el => el.classList.remove("activa"));
    [...document.querySelectorAll(".ciudad-item")].find(el => el.textContent === ciudad)?.classList.add("activa");
}
