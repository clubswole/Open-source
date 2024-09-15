var map = L.map('map').setView([18.234495538526822, 75.68806044166344], 8); // Default coordinates

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

function getDirections() {
    var destinationInput = document.getElementById("destinationInput").value;

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var userLat = position.coords.latitude;
            var userLon = position.coords.longitude;
            
            // Use a geocoding service to convert the entered location into coordinates
            var geocodingUrl = "https://nominatim.openstreetmap.org/search?format=json&q=" + encodeURI(destinationInput);

            fetch(geocodingUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    var selectedCoords = [data[0].lat, data[0].lon];
                    var url = "https://www.openstreetmap.org/directions?engine=osrm_car&route=" + userLat + "%2C" + userLon + "%3B" + selectedCoords[0] + "%2C" + selectedCoords[1];
                    window.location.href = url;
                } else {
                    alert("Destination not found");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error getting destination coordinates");
            });
        });
    } else {
        alert("Geolocation is not supported by your browser");
    }
}