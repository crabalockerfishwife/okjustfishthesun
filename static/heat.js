var map, pointarray, heatmap;
console.log("IN HEAT");

var apis = {"Subway Entrances":"https://data.cityofnewyork.us/api/views/he7q-3hwy/rows.json?accessType=DOWNLOAD",
		"NYPD Motor Vehicle Collisions":"https://data.cityofnewyork.us/api/views/h9gi-nx95/rows.json?accessType=DOWNLOAD",
		"Directory of Eateries":"https://data.cityofnewyork.us/api/views/xx67-kt59/rows.json?accessType=DOWNLOAD",
		"Manhattan Street Trees":"https://data.cityofnewyork.us/api/views/4eh7-xcm8/rows.json?accessType=DOWNLOAD",
		"Wifi Hotspots":"https://data.cityofnewyork.us/api/views/jd4g-ks2z/rows.json?accessType=DOWNLOAD"};
//		"Pay Phones":"",
//		"Museums and Galleries":"",
//		"Theaters":"",
//		"Fields":"",
//		"Swimming Pools":"",
//		"Beaches":"",
//		"Libraries":""];

var types = ["food","recreation","communication","transportation"];

var coordinates = [];

var getcoords = function(url) {
    $.getJSON( url , function( json ) {
        coordinates = _.map(json.data,function(item){
          //console.log(item[13]);
          return item[13];
        });
	      console.log( coordinates );
    });
}
var convertTo=function(result){
    var geocoder=new google.maps.Geocoder();
    coords=[];
    for (i=0;i<result.length;i++){
	geocoder.geocode( { 'address': result[i]}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
		var pos=results[0].geometry.location;
		console.log(results[0].geometry.location);
		coords.push(pos);
	    }
	    else {
		i=i+1;
	    }
	});
    }
    return coords;
}


var createMap = function (results){
    console.log(results);
    var heatMapData = [];
    for (i=0; i< results.length; i ++){
	heatMapData.push({location: new google.maps.LatLng(results[i][0],results[i][1]), weight: results[i][2]})};
    console.log(heatMapData);
    return heatMapData;
}
//limit zoom 
function initialize() {
    console.log("INITIALIZED");
    var mapOptions = {
	zoom: 13,
	center: new google.maps.LatLng(40.77,73.98),
	minZoom: 12,
	maxZoom: 17
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
			      mapOptions);
    var pointArray = new google.maps.MVCArray(convertTo(items));
    var pointArray = new google.maps.MVCArray(taxiData);
    heatmap = new google.maps.visualization.HeatmapLayer({
	data: pointArray
    });
    var gradient = [
	'rgba(0,255,255,0)',
	'rgba(0,255,255,1)',
	'rgba(0,255,0,1)',
	'rgba(255,255,0,1)',
	'rgba(255,165,0,1)',
	'rgba(255,69,0,1)',
	'rgba(255,0,0,1)'
    ]
    heatmap.setMap(map);
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}


function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

google.maps.event.addDomListener(window, 'load', initialize);
