
function main(){
    var mymap = L.map('mapid').setView([9.948539942335483, -444.04008294120575], 15);
    var busIcon = L.icon({
        iconUrl: 'RES/bus.png',
        //shadowUrl: 'RES/bus.png',
    
        iconSize:     [50, 60], // size of the icon
        //shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 44], // point of the icon which will correspond to marker's location
        //shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -50] // point from which the popup should open relative to the iconAnchor
    });
    const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const maxzoom = 19;
    L.tileLayer(url,{attribution,maxzoom}).addTo(mymap);
    getPoints();
    mymap.on('click', function(e) {
        alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
    });

    let result = getPoints();
    //result.then(result => console.log(result));

    result.then(result => result.forEach(obj => {
        var marker = L.marker(obj.geometry.coordinates,{icon:busIcon}).addTo(mymap);
        var name = obj.properties.name
        var description = obj.properties.description
        var amenity = obj.properties.amenity
        var sense = obj.properties.sense
        var stopnumber = obj.properties.stopnumber
        marker.bindPopup(name+"</b>"+"<br><b>"+description+"</b>"+"<br>"+amenity+"<br>"+sense).openPopup();
        marker.bindTooltip(stopnumber).openTooltip();
        
        //console.log(obj.geometry.coordinates[0]);
    }))

    


}

async function getPoints(){
    let response = await fetch("./RES/points.json");
    let data = await response.json();
    return data;
}
