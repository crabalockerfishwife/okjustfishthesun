//console.log("hello");

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

var types = ["food","recreation","communication","transportation"];

var coordinates = ["hi"];

var getcoords = function(url) {
    $.getJSON( url , function( json ) {
        coordinates = _.map(json.data,function(item){
          //console.log(item[13]);
          return item[13];
        });
	      console.log( coordinates );
    });
    console.log(coordinates);
}

getcoords("https://data.cityofnewyork.us/api/views/jd4g-ks2z/rows.json?accessType=DOWNLOAD");
console.log(coordinates[0]);
