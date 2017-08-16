function toHex(fromImgData){//二值化图像
    var fromPixelData = fromImgData.data;
    var greyAve = 0;
    for(var j=0;j<WIDTH*HEIGHT;j++){
        var r = fromPixelData[4*j];
        var g = fromPixelData[4*j+1];
        var b = fromPixelData[4*j+2];

        greyAve += r*0.3 + g*0.59 + b*0.11;
    }
    greyAve /= WIDTH*HEIGHT;//计算平均灰度值。
    for(j=0;j<WIDTH*HEIGHT;j++){
        r = fromPixelData[4*j];
        g = fromPixelData[4*j+1];
        b = fromPixelData[4*j+2];
        var grey = r*0.333 + g*0.333 + b*0.333;//取平均值。
        if(grey > greyAve)
            grey = 255;
        else
            grey = 0;

        fromPixelData[4*j] = grey;
        fromPixelData[4*j+1] = grey;
        fromPixelData[4*j+2] = grey;
    }
    return fromImgData;
}//二值化图像

function corrode(fromArray){
    for(var j=1;j<fromArray.length-1;j++){
        for(var k=1;k<fromArray[j].length-1;k++){
            if(fromArray[j][k]==1&&fromArray[j-1][k]+fromArray[j+1][k]+fromArray[j][k-1]+fromArray[j][k+1]==0){
                fromArray[j][k] = 0;
            }
        }
    }
    return fromArray;
}//腐蚀（简单）

function expand(fromArray){
    for(var j=1;j<fromArray.length-1;j++){
        for(var k=1;k<fromArray[j].length-1;k++){
            if(fromArray[j][k]==0&&fromArray[j-1][k]+fromArray[j+1][k]+fromArray[j][k-1]+fromArray[j][k+1]==4){
                fromArray[j][k] = 1;
            }
        }
    }
    return fromArray;
}//膨胀（简单）

function split(fromArray,count){
    var numNow = 0;
    var status = false;

    var w = fromArray[0].length;
    for(var k=0;k<w;k++) {//遍历图像
        var sumUp = 0;
        for (var j=0;j<fromArray.length;j++) {//检测整列是否有图像
            sumUp += fromArray[j][k];
        }
        if(sumUp == 0){//切割
            for (j=0;j<fromArray.length-1;j++) {
                fromArray[j] = removeFromArray(fromArray[j],k);
            }
            w --;
            k --;
            status = false;
            continue;
        }
        else{//切换状态
            if(!status){
                numNow ++;
            }
            status = true;
        }
        if(numNow!=count){//不是想要的数字
            for (j=0;j<fromArray.length-1;j++) {
                fromArray[j] = removeFromArray(fromArray[j],k);
            }
            w --;
            k --;
        }
    }
    return fromArray;
}//切割，获取特定数字

function trimUpDown(fromArray){
    var h = fromArray.length;
    for(var j=0;j<h;j++) {
        var sumUp = 0;
        for (var k=0;k<fromArray[j].length-1;k++) {
            sumUp += fromArray[j][k];
        }
        if(sumUp===0){//清除
            fromArray = removeFromArray(fromArray,j);
            h --;
            j --;
        }
    }
    return fromArray;
}//清除上下的空白

function zoomToFit(fromArray){
    var imgD = fromXY(fromArray);
    var w = lastWidth;
    var h = lastHeight;
    var tempc1 = document.createElement("canvas");
    var tempc2 = document.createElement("canvas");
    if(!fromArray[0]){
        window.location.reload();
    }
    tempc1.width = fromArray[0].length;
    tempc1.height = fromArray.length;
    tempc2.width = w;
    tempc2.height = h;
    var tempt1 = tempc1.getContext("2d");
    var tempt2 = tempc2.getContext("2d");
    tempt1.putImageData(imgD,0,0,0,0,tempc1.width,tempc1.height);
    tempt2.drawImage(tempc1,0,0,w,h);
    var returnImageD = tempt2.getImageData(0,0,WIDTH,HEIGHT);
    fromArray = toXY(returnImageD);
    fromArray.length = h;
    for(var i=0;i<h;i++){
        fromArray[i].length = w;
    }
    return fromArray;
}//尺寸归一化

function getCode(fromArray){
    var result = '';
    for(var j=0;j<fromArray.length;j++){
        for(var k=0;k<fromArray[j].length;k++){
            result += (""+fromArray[j][k]);
        }
        result += ";";
    }
    return result;
}//生成特征码