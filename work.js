function dudeImHere() {
    initAll();//初始化
    drawThis(ctx1, img);//画出原图
    var imgData = ctx1.getImageData(0, 0, WIDTH, HEIGHT);//读取图像数据
    imgData = toHex(imgData);//二值化图像数据
    ctx2.putImageData(imgData, 0, 0, 0, 0, WIDTH, HEIGHT);//画出二值化图
    var pixelArray = toXY(imgData);//将图片数据转化为数组
    pixelArray = corrode(pixelArray);//腐蚀
    pixelArray = expand(pixelArray);//膨胀
    numsArray = new Array(numsCount);//分割、处理并保存
    for (var c = 0; c < numsCount; c++) {
        numsArray[c] = dealWithSingle(pixelArray, c + 1);
    }
    try {
        alert(getData());
    }
    catch (e) {
        //window.location.reload();
        alert(e);
    }
}