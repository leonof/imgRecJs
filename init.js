var img;
var WIDTH;
var HEIGHT;

var logArea = document.getElementById("logArea");

var canvas1 = document.createElement("canvas");
canvas1.style.display = "none";
canvas1.style.backgroundColor = "cornsilk";
var ctx1 = canvas1.getContext("2d");

var canvas2 = document.createElement("canvas");
canvas2.style.display = "none";
canvas2.style.backgroundColor = "cornsilk";
var ctx2 = canvas2.getContext("2d");

var canvas3 = document.createElement("canvas");
canvas3.style.display = "none";
canvas3.style.backgroundColor = "cornsilk";
var ctx3 = canvas3.getContext("2d");

document.getElementsByTagName("body")[0].appendChild(canvas1);
document.getElementsByTagName("body")[0].appendChild(canvas2);
document.getElementsByTagName("body")[0].appendChild(canvas3);

function initAll(){
    img = document.getElementById("img");
    if(!img){
        img = document.getElementsByTagName("img")[0];
    }
    WIDTH = img.clientWidth;
    HEIGHT = img.clientHeight;
    canvas1.width = WIDTH;
    canvas1.height = HEIGHT;
    canvas2.width = WIDTH;
    canvas2.height = HEIGHT;
    canvas3.width = WIDTH;
    canvas3.height = HEIGHT;
}//初始化尺寸