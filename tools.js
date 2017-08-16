var lastWidth = 20;
var lastHeight = 20;
var numsCount = 4;
var numsArray;

function getData(){
    var code = '';
    code += readNum(numsArray[0]);
    code += readNum(numsArray[1]);
    code += readNum(numsArray[2]);
    code += readNum(numsArray[3]);
    return code;
}//根据特征码识别
function removeFromArray(fromArray,obj){
    for(var i =0;i <fromArray.length;i++){
        var temp = fromArray[i];
        if(!isNaN(obj)){
            temp=i;
        }
        if(temp == obj){
            for(var j = i;j <fromArray.length;j++){
                fromArray[j]=fromArray[j+1];
            }
            fromArray.length = fromArray.length-1;
        }
    }
    return fromArray;
}//移除数组中元素

function toXY(fromImgData){
    var result = new Array(HEIGHT);
    var fromPixelData = fromImgData.data;
    for(var j=0;j<HEIGHT;j++){
        result[j] = new Array(WIDTH);
        for(var k=0;k<WIDTH;k++){
            var r = fromPixelData[4*(j*WIDTH+k)];
            var g = fromPixelData[4*(j*WIDTH+k)+1];
            var b = fromPixelData[4*(j*WIDTH+k)+2];

            result[j][k] = (r+g+b)>500?0:1;//赋值0、1给内部数组
        }
    }
    return result;
}//图像转数组

function fromXY(fromArray){
    var fromImgData = ctx1.createImageData(WIDTH,HEIGHT);
    var fromPixelData = fromImgData.data;
    for(var j=0;j<fromArray.length;j++){
        for(var k=0;k<fromArray[j].length;k++){
            var innergrey = (fromArray[j][k]==1?0:255);
            fromPixelData[4*(j*WIDTH+k)] = innergrey;
            fromPixelData[4*(j*WIDTH+k)+1] = innergrey;
            fromPixelData[4*(j*WIDTH+k)+2] = innergrey;
            fromPixelData[4*(j*WIDTH+k)+3] = 255;
        }
    }
    return fromImgData;
}//数组转图像

function dealWithSingle(fromPixelArray,num){
    var arrayCopy = new Array(fromPixelArray.length);
    for(var i=0;i<fromPixelArray.length;i++){
        arrayCopy[i] = new Array(fromPixelArray[i].length);
        for(var j=0;j<fromPixelArray[i].length;j++){
            arrayCopy[i][j] = fromPixelArray[i][j]+0;
        }
    }
    arrayCopy = split(arrayCopy,num);//切割
    arrayCopy = trimUpDown(arrayCopy);//去上下空白
    drawArray(ctx3,arrayCopy);//画出单一图像
    arrayCopy = zoomToFit(arrayCopy,15,15);
    arrayCopy = corrode(arrayCopy);//腐蚀
    arrayCopy = expand(arrayCopy);//膨胀
    arrayCopy = trimUpDown(arrayCopy);//去上下空白
    drawArray(ctx3,arrayCopy);//画出缩放图像
    return getCode(arrayCopy);//生成特征码
}

function readNum(str){
    var tempSimilar = 0;
    var tempFeature = '';
    var tempNum = 0;
    str = str.split('');
    for(var i=0;i<numkeys.length;i++){
        var thisFeature = numkeys[i][1];
        var thisNum = numkeys[i][0];
        var thisSimilar = 0;
        thisFeature = thisFeature.split('');
        for(var j=0;j<thisFeature.length;j++){
            if(thisFeature[j]==str[j]){
                thisSimilar++;
            }
        }
        if(thisSimilar>tempSimilar){
            tempFeature = thisFeature;
            tempNum = thisNum;
            tempSimilar = thisSimilar;
        }
    }
    return tempNum;
}