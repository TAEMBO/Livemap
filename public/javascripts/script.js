

function isUrl(needle) {
    return window.location.href.indexOf(needle) > -1 ? true : false;
}

function queryAllSet(card, listgroup, listgroupitem) {
    const cardQuery = document.querySelectorAll(card);
    const listgroupQuery = document.querySelectorAll(listgroup);
    const listgroupitemQuery = document.querySelectorAll(listgroupitem);
    
    for (const x of cardQuery) x.style.setProperty('background-color', '#090909');
    for (const x of listgroupitemQuery) x.style.setProperty('color', '#06860a');
    for (const x of listgroupQuery) {
        x.style.setProperty("--bs-list-group-color", "#fff");
        x.style.setProperty("--bs-list-group-bg", "#171717");
        x.style.setProperty("--bs-list-group-border-color", "rgba(255, 255, 255, 0.13)");
    }
}

function queryAllRemove(card, listgroup, listgroupitem) {
    const cardQuery = document.querySelectorAll(card);
    const listgroupQuery = document.querySelectorAll(listgroup);
    const listgroupitemQuery = document.querySelectorAll(listgroupitem);

    for (const x of cardQuery) x.style.removeProperty('background-color');
    for (const x of listgroupitemQuery) x.style.setProperty('color', '#000');
    for (const x of listgroupQuery) {
        x.style.removeProperty("--bs-list-group-color");
        x.style.removeProperty("--bs-list-group-bg");
        x.style.removeProperty("--bs-list-group-border-color");
    }
}


function toggleDarkMode() {
    if (!localStorage.getItem('isDark')) {
        document.body.classList.toggle('dark-mode');
        queryAllSet('.card', '.list-group', '.list-group-item > a');
        localStorage.setItem('isDark', true);
    } else {
        document.body.classList.toggle('dark-mode');
        queryAllRemove('.card', '.list-group', '.list-group-item > a');
        localStorage.removeItem('isDark');
    }
}

$(document).ready(() => {
    if (localStorage.getItem('isDark')) {
        document.body.classList.toggle('dark-mode');
        queryAllSet('.card', '.list-group', '.list-group-item > a');
    } else {
        document.querySelectorAll('.list-group-item > a').forEach(x => x.style.setProperty('color', '#000'));
    }

    if (window.location.pathname === "/") return;

    const map = L.map('map', { crs: L.CRS.Simple, maxZoom: 5 });
    const bounds = [[-750, -750], [750, 750]];

    L.imageOverlay(`/api/${window.location.pathname.slice(1)}/map.jpg`, bounds).addTo(map);
    map.fitBounds([[-750, -750], [750, 750]]);
    map.setMaxBounds([[-750, -750], [750, 750]]);

    map.on('drag', () => map.panInsideBounds([[-749, -749], [749, 749]], { animate: false }));

    $.ajax({
        type: "GET",
        url: "/api/geo.json",
        dataType: "json",
        success: (geojson) => {
            new L.GeoJSON(geojson, { onEachFeature: (feature, layer) => {
                if (!(layer instanceof L.Marker)) return;
            
                layer.bindPopup(layer.feature.properties.popup);
            
                layer.setIcon(L.icon({
                    iconUrl: '/images/icons/' + layer.feature.properties.icon.icon,
                    iconSize: [layer.feature.properties.icon.dimension, layer.feature.properties.icon.dimension],
                    iconAnchor: [(layer.feature.properties.icon.dimension / 2), (layer.feature.properties.icon.dimension/2)],
                    popupAnchor: [0, -10]
                }));
            } }).addTo(map);
        }
    });
});