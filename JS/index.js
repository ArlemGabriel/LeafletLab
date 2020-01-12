
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

    let result = getPoints();

    result.then(result => putPointsOnMap(result,mymap));
    result.then(result => createWayPoints(result,mymap));

    /*mymap.on('click', function(e) {
        alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
    });*/


}

async function getPoints(){
    let response = await fetch("./RES/points.json");
    let data = await response.json();
    return data;
}
function putPointsOnMap(result,mymap){

    result.forEach(obj => {
        var busIcon = L.icon({
            iconUrl: 'RES/bus2.png',
            //shadowUrl: 'RES/bus.png',
        
            iconSize:     [50, 50], // size of the icon
            //shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [22, 44], // point of the icon which will correspond to marker's location
            //shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -50] // point from which the popup should open relative to the iconAnchor
        });
        var busIconSE = L.icon({
            iconUrl: 'RES/busSE2.png',
            //shadowUrl: 'RES/bus.png',
        
            iconSize:     [50, 50], // size of the icon
            //shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [22, 44], // point of the icon which will correspond to marker's location
            //shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -50] // point from which the popup should open relative to the iconAnchor
        });
        if(obj.id != 0 && obj.id !=result.length+1){
            var marker = L.marker(obj.geometry.coordinates,{icon:busIcon}).addTo(mymap);
            
        }else{
            var marker = L.marker(obj.geometry.coordinates,{icon:busIconSE}).addTo(mymap);
        }
        var name = obj.properties.name
        var description = obj.properties.description
        var amenity = obj.properties.amenity
        var sense = obj.properties.sense
        var stopnumber = obj.properties.stopnumber
        marker.bindPopup(name+"</b>"+"<br><b>"+description+"</b>"+"<br>"+amenity+"<br>"+sense);
        marker.bindTooltip(stopnumber);
    
    })
    
}
function createWayPoints(result,mymap){
    let waypointsa = [];
    result.forEach(obj => {
        waypointsa.push(obj.geometry.coordinates);
    })

    let code = "";
    let head = "L.Routing.control({createMarker: function() { return null; }, waypoints: ["
    let body = "L.latLng("+waypointsa[0]+")"
    let tail = "]}).addTo(mymap);"
    for(var j = 1; j < waypointsa.length; j+=1){
        body = body+ ",L.latLng("+waypointsa[j]+")"
    }
    code = head+body+tail
    //console.log(code);
    eval(code)

    //L.Routing.control({waypoints: [L.latLng(9.957874253375486, -83.9920281382569),L.latLng(9.961505627231706, -83.99489229532189),L.latLng(9.960185117901263, -83.99782107514865)]}).addTo(mymap);
}
