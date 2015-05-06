var myCanvas = document.createElement('canvas');
myCanvas.width = 640;
myCanvas.height = 480;
document.getElementsByTagName('body') [0].appendChild(myCanvas);
  
var myCanvasContext = myCanvas.getContext('2d');
  
var logo = new Image();
logo.src = '/static/logo.svg';
logo.width = '100';
logo.height = '100';

logo.onload = function(){
    myCanvasContext.drawImage(logo,0,0);
}
