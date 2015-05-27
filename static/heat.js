var map, pointarray, heatmap;
console.log("IN HEAT");

var apis = {"Subway Entrances":"https://data.cityofnewyork.us/api/views/he7q-3hwy/rows.json?accessType=DOWNLOAD",
		"NYPD Motor Vehicle Collisions":"https://data.cityofnewyork.us/api/views/h9gi-nx95/rows.json?accessType=DOWNLOAD",
		"Directory of Eateries":"https://data.cityofnewyork.us/api/views/xx67-kt59/rows.json?accessType=DOWNLOAD",
		"Manhattan Street Trees":"https://data.cityofnewyork.us/api/views/4eh7-xcm8/rows.json?accessType=DOWNLOAD",
		"Wifi Hotspots":"https://data.cityofnewyork.us/api/views/jd4g-ks2z/rows.json?accessType=DOWNLOAD",
//		"Pay Phones":"",
//		"Museums and Galleries":"",
		"Theaters":"https://data.cityofnewyork.us/api/views/2hzz-95k8/rows.json?accessType=DOWNLOAD",
//		"Fields":"",
//		"Swimming Pools":"",
//		"Beaches":"",
		"Libraries":"https://data.cityofnewyork.us/api/views/feuq-due4/rows.json?accessType=DOWNLOAD"
        };
//Subway-->addresses
//wifi hotspots -->latlng (14,15)
//motor vehicle --> latlng (12,13)
//libraries --> addresses
//theaters --> addresses

var types = ["food","recreation","communication","transportation"];

var makeltlng=function(exa){
    var cds=[];
    console.log(exa);
    for (i=0;i<exa.length;i++){
	cds.push(new google.maps.LatLng(exa[i][0],exa[i][1]));
    }
    console.log(cds);
    return cds;
}
	
var convertTo=function(result){
    var geocoder=new google.maps.Geocoder();
    coords=[];
    console.log(result[0]);
    for (i=0;i<result.length;i++){
	geocoder.geocode( { 'address': result[i]}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
		var pos=results[0].geometry.location;
		console.log(results[0].geometry.location);
		coords.push(pos);
	    }
	    else {
		i=i+1;
		console.log("not ok");
	    }
	});
    }
    return coords;
}

var getWifi=function(){
    var coords=[]
    var request=new XMLHttpRequest();
    request.open('GET','https://data.cityofnewyork.us/api/views/jd4g-ks2z/rows.json?accessType=DOWNLOAD' , true);
    request.onload = function() {
	if (request.status >= 200 && request.status < 400) {
	    var data = JSON.parse(request.responseText);
	    var dats=data['data']
	    for (i=0;i<dats.length;i++){
		var latlng=[dats[i][14],dats[i][15]];
		coords.push(latlng);
	    }
	    var pointArray = new google.maps.MVCArray(makeltlng(coords));
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
	else{
	    console.log('uhoh');
	}
    }
    request.send();
}
function initialize() {
    var mapOptions = {
	zoom: 10,
	center: new google.maps.LatLng(40.788109,-73.7799506),
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
			      mapOptions);
    getWifi();
 
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
