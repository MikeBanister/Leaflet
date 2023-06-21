
//MAP
let map = L.map("map",{
    center: [0, 0],
    zoom: 2
});

//URL
let dataURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson" 

//TILE LAYER
let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);


//LEGEND

let legend = L.control({position: "bottomright"});
legend.onAdd = function () {




    let div = L.DomUtil.create('div', 'info legend'),
        bucket = [10, 30, 50, 70, 90, 110];

    div.innerHTML = "<p class = 'legend-title'>DEPTH SCALE</p>"

    for (var i = 0; i < bucket.length; i++) {
        div.innerHTML += '<i style="background:' + getDepthColor(bucket[i] + 1) + '"></i> ' + bucket[i] + (bucket[i + 1] ? '&ndash;' + bucket[i + 1] + '<br>' : '+');
    }

    return div;

};



//EARTHQUAKE DATA
function getData() {
    d3.json(dataURL).then(function(response) {
        response.features.forEach((feature) => {addMarker(feature)});
    });
};


//DEPTH COLOR
function getDepthColor(depth) {
    if (depth >= 0 && depth < 10) {
        return "#ccece6";
    } else if (depth >= 10 && depth < 30) {
        return "#99d8c9";
    } else if (depth >= 30 && depth < 50) {
        return "#66c2a4";
    } else if (depth >= 50 && depth < 70) {
        return "#41ae76";
    } else if (depth >= 70 && depth < 90) {
        return "#238b45";
    } else if (depth >= 90 && depth < 110) {
        return "#006d2c";
    } else {
        return "#00441b";
    }
};

//ADD MARKER
function addMarker(feature) {

    //ADD TO MAP
    L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
        color: "black",
        weight: 0.5,
        fillColor: getDepthColor(feature.geometry.coordinates[2]),
        fillOpacity: 0.75,
        radius: Math.pow(feature.properties.mag, 7),
    }).bindPopup(`
        <p class = "Label"><b>Location:</b> ${feature.properties.place}</p>
        <p class = "Label"><b>Magnitude:</b> ${feature.properties.mag}</p>
        <p class = "Label"><b>Depth:</b> ${feature.geometry.coordinates[2]} meters</p>
    `).addTo(map);
};


legend.addTo(map);

window.onload = getData;