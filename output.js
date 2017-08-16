function drawThis(toCtx,fromImg){
    toCtx.drawImage(fromImg,0,0,fromImg.width,fromImg.height);
}

function drawArray(toCtx,fromArray){
    var fromImageData = fromXY(fromArray);
    toCtx.putImageData(fromImageData,0,0,0,0,WIDTH,HEIGHT);
}

function logXY(fromArray){
    logArea.innerHTML = '';
    for(var k=0;k<fromArray.length;k++){
        for(var j=0;j<fromArray[k].length;j++){
            var str = '';
            if(fromArray[k][j]===0){
                str = '&nbsp;'
            }
            else if(fromArray[k][j]===1){
                str = '.'
            }
            else if(fromArray[k][j]===-1){
                str = ','
            }
            logArea.innerHTML += str;
        }
        logArea.innerHTML += '<br>';
    }
}