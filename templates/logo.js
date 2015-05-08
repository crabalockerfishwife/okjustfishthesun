window.onload = function(){
    var logo = document.getElementById("logo");
    var svgDoc = logo.contentDocument;
    var svg = svgDoc.getElementById("svg2");
    svg.setAttribute("height","50mm");
    console.log("hi");
};

console.log("hello");
