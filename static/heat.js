var map, pointarray, heatmap;
//console.log("IN HEAT");
var apis = {"Hopitals":"https://data.cityofnewyork.us/api/views/ymhw-9cz9/rows.json?accessType=DOWNLOAD",
		"Queens Libraries":"https://data.cityofnewyork.us/api/views/kh3d-xhq7/rows.json?accessType=DOWNLOAD",
		"Volunteer Opportunities":"https://data.cityofnewyork.us/api/views/bquu-z2ht/rows.json?accessType=DOWNLOAD",
		"NYPD Motor Vehicle Collisions":"https://data.cityofnewyork.us/api/views/h9gi-nx95/rows.json?accessType=DOWNLOAD",
		"Wifi Hotspots":"https://data.cityofnewyork.us/api/views/jd4g-ks2z/rows.json?accessType=DOWNLOAD"
        };

var makeltlng=function(exa){
    var cds=[];
    //console.log(exa);
    for (i=0;i<exa.length;i++){
	cds.push(new google.maps.LatLng(exa[i][0],exa[i][1]));
    }
   // console.log(cds);
    return cds;
}
	
var convertTo=function(addresses){
    var geocoder=new google.maps.Geocoder();
    var coords=[];
   // console.log(addresses);
    for (i=0;i<addresses.length;i++){
	geocoder.geocode( { 'address': addresses[i]}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
		//console.log(results);
		var pos=results[0].geometry.location;
		//console.log(addresses[i]);
		//console.log(pos);
		coords.push(pos);
	    }
	    else {
		//console.log(addresses[i]);
		//console.log('no');
	    }
	});

    }
    //console.log(coords);
    return coords;
}

var getHospitals=function(){
    var coords=[]
    var request=new XMLHttpRequest();
    request.open('GET','https://data.cityofnewyork.us/api/views/ymhw-9cz9/rows.json?accessType=DOWNLOAD', true);
    request.onload = function() {
	if (request.status >= 200 && request.status < 400) {
	    var data = JSON.parse(request.responseText);
	    var dats=data['data']
	    for (i=0;i<dats.length;i++){
		var latlng=[dats[i][13][1],dats[i][13][2]];
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
	    //console.log('uhoh');
	}
    }
    request.send();
}
var getQLibraries=function(){
    var coords=[]
    var request=new XMLHttpRequest();
    request.open('GET','https://data.cityofnewyork.us/api/views/kh3d-xhq7/rows.json?accessType=DOWNLOAD', true);
    request.onload = function() {
	if (request.status >= 200 && request.status < 400) {
	    var data = JSON.parse(request.responseText);
	    var dats=data['data']
	    for (i=0;i<dats.length;i++){
		var latlng=[dats[i][18][1],dats[i][18][2]];
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
	    //console.log('uhoh');
	}
    }
    request.send();
}
var getVolunteer=function(){
    var coords=[]
    var request=new XMLHttpRequest();
    request.open('GET','https://data.cityofnewyork.us/api/views/bquu-z2ht/rows.json?accessType=DOWNLOAD', true);
    request.onload = function() {
	if (request.status >= 200 && request.status < 400) {
	    var data = JSON.parse(request.responseText);
	    var dats=data['data']
	    for (i=0;i<dats.length;i++){
		var latlng=[dats[i][23][1],dats[i][23][2]];
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
	    //console.log('uhoh');
	}
    }
    request.send();
}

var getMVA=function(){
    var adds=[];
    var request=new XMLHttpRequest();
    request.open('GET','https://data.cityofnewyork.us/api/views/h9gi-nx95/rows.json?accessType=DOWNLOAD' , true);
    request.onload = function() {
	if (request.status >= 200 && request.status < 400) {
	    var data = JSON.parse(request.responseText);
	    var dats=data['data']
	    for (i=0;i<dats.length;i++){
		var latlng=[dats[i][12],dats[i][13]];
		adds.push(latlng);
	    }
	    var pointArray = new google.maps.MVCArray(makeltlng(adds));
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
	    //console.log('uhoh');
	}
    }
    request.send();
}

var getWifi=function(){
    var coords=[]
    var request=new XMLHttpRequest();
    request.open('GET','https://data.cityofnewyork.us/api/views/jd4g-ks2z/rows.json?accessType=DOWNLOAD', true);
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
	    //console.log('uhoh');
	}
    }
    request.send();
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