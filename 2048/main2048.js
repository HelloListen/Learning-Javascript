var board=new Array();
var score=0;
var hasConflicted=new Array();
var startx=0;
var starty=0;
var endx=0;
var endy=0;
$(document).ready(function(){
    newgame();
})

function newgame(){
    //初始化棋盘格
    prepareForMobile();
    init();
    //随机两格生成数字
    generateOneNumber();
    generateOneNumber();
}

function prepareForMobile(){
    if(documentWidth>500){
        gridContainerWidth=500;
        cellSpace=20;
        cellSideLength=100;
    }else{
        $("div.info").css({"display":"none"});
    }
    $("#grid-container").css({"width":gridContainerWidth-2*cellSpace});
    $("#grid-container").css({"height":gridContainerWidth-2*cellSpace});
    $("#grid-container").css({"padding":cellSpace});
    $("#grid-container").css({"border-radius":0.02*gridContainerWidth});

    $(".grid-cell").css({"width":cellSideLength,"height":cellSideLength,"border-radius":0.02*cellSideLength});
}
function init(){
    for(var i=0;i<4;i++)
    for(var j=0;j<4;j++){
        var gridCell=$("#grid-cell-"+i+"-"+j);
        gridCell.css("left",getPosLeft(i,j))
        gridCell.css("top",getPosTop(i,j))
    }

    for(var i=0;i<4;i++){
        board[i]=new Array();
        hasConflicted[i]=new Array();
        for(var j=0;j<4;j++)
            board[i][j]=0;
            hasConflicted[i][j]=false;
    }
    updateBoardView();
    score=0;
    $("#score").text(score);
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
            var theNumberCell=$("#number-cell-"+i+"-"+j);
            if(board[i][j]==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
                theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
            }else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j]=false;
        }
    }
    $('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',0.6*cellSideLength+'px');
}

function generateOneNumber(){
    if(nospace(board)){
        return false;

    }else{
        //随机一个位置
        var randx=parseInt(Math.floor(Math.random()*4));
        var randy=parseInt(Math.floor(Math.random()*4));

        /*var times=0;
        while(times<50){
            if(board[randx][randy]==0){
                break;
            }else{
                randx=parseInt(Math.floor(Math.random()*4));
                randy=parseInt(Math.floor(Math.random()*4));
            }
            times++;
        }
        if(times==50){
            for(var i=0;i<4;i++){
                for(var j=0;j<4;j++){
                    if(board[i][j]==0){
                        randx=i;
                        randy=j;
                    }
                }
            }
        }*/
        //随机一个位置优化
        var count=0;
        var position=[];
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]==0){
                    position[count]=i*4+j;
                    count++;
                }
            }
        }
        //console.log(count);
        var pos=parseInt(Math.floor(Math.random()*count));
        randx=Math.floor(position[pos]/4);
        randy=Math.floor(position[pos]%4);
        //随机一个数字2或者4
        var randNumber=Math.random()<0.5?2:4;
        board[randx][randy]=randNumber;
        showNumberWithAnimation(randx,randy,randNumber);
        return true;
    }
}

$(document).keydown(function(evt){

    switch(evt.keyCode){
        case 37://left
            evt.preventDefault();
           if(moveLeft()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isGameover()",300);
           }
            break;
        case 38://up
            evt.preventDefault();
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameover()",300);
            }
            break;
        case 39://right
            evt.preventDefault();
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameover()",300);
            }
            break;
        case 40://down
            evt.preventDefault();
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameover()",300);
            }
            break;
        default://default
            break;
    }
});

document.addEventListener("touchstart",function(evt){
    startx=evt.touches[0].pageX;
    starty=evt.touches[0].pageY;
});

document.addEventListener("touchmove",function(evt){
    evt.preventDefault();
})

document.addEventListener("touchend",function(evt){
    endx=evt.changedTouches[0].pageX;
    endy=evt.changedTouches[0].pageY;

    var deltax=endx-startx;
    var deltay=endy-starty;
    if(Math.abs(deltax)<0.3*documentWidth&&Math.abs(deltay)<0.3*documentWidth){
        return false;
    }
    //x
    if(Math.abs(deltax)>=Math.abs(deltay)){
        if(deltax>0){
            //moveright
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameover()",300);
            }
        }else{
            //moveleft
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameover()",300);
            }
        }
    }
    //y
    else{

        if(deltay>0){
            //y往下增长
            //movedown
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameover()",300);
            }
        }else{
            //moveup
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameover()",300);
            }
        }

    }
})

function isGameover(){
    if(nospace(board)&&nomove(board)){
        gameover();
    }
}

function gameover(){
    alert("Game Over");
}

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    //moveLeft
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
                for(var k=0;k<j;k++){
                    if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        var result=board[i][k]+=board[i][j];
                        board[i][j]=0;
                        //add score
                        score+=board[i][k];
                        updateScore(score);
                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k]){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore(score);
                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0&&noBlockVertical( j , k , i , board )){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[k][j]==board[i][j]&&noBlockVertical( j , k , i , board )&&!hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[k][j];
                        updateScore(score);
                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board))return false;
    for(var i=2;i>=0;i--){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(board[k][j]==0&&noBlockVertical(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)&&!hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[k][j];
                        updateScore(score);
                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}