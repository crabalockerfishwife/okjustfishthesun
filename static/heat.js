var map, pointarray, heatmap;

ExData =[[40.781504, -122.405813,6],[37.761344, -122.406215,5],[37.760556, -122.406495,4],[37.759732, -122.406484,3],[37.758910, -122.406228,7],[37.758182, -122.405695,5],[37.757676, -122.405118,4],[37.757039, -122.404346, 6],[37.756335, -122.403719,8],[37.755503, -122.403406,1],[37.754665, -122.403242,2],[37.753837, -122.403172,3],[37.752986, -122.403112,4],[37.751266, -122.403355,5]];
//results should be an array of data points given by justin strauss
var createMap = function (results){
    console.log(results);
    var heatMapData = [];
    for (i=0; i< results.length; i ++){
	heatMapData.push({location: new google.maps.LatLng(results[i][0],results[i][1]), weight: results[i][2]})};
    console.log(heatMapData);
    return heatMapData;
}
    
function initialize() {
  var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(37.774546, -122.433523),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

    var pointArray = new google.maps.MVCArray(createMap(ExData));

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray
  });
    //gradient changes the color of the heat map from green/red to blue/red
    //I think the default gradient is green/red so remove the bottom part if you want that but leave heatmap.setMap(map)
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
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
