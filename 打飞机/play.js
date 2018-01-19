/**
 * Created by Administrator on 2017/9/12.
 */

var playplane;//玩家飞机
var arrziDan=[];//存放子弹
var  keyUp=false;
var keyDown=false;
var keyLeft=false;
var keyRight=false;
var  divGame=document.getElementById("game");
var movezidanTimer=setInterval(moveziDan,100);
var moveplayplaneTimer=setInterval(moveplayplane,100);
creatplayPlane();//创建玩家飞机
//玩家飞机的移动
function moveplayplane() {
    if(playplane==undefined){
        return;
    }
    if(keyUp){
        playplane.moveUp();
    }
    if(keyLeft){
        playplane.moveLeft();
    }
    if(keyRight){
        playplane.moveRight();
    }
    if(keyDown){
        playplane.moveDown();
    }
}

//定义事件，键盘事件
document.onkeydown=function(){
    var e = window.event || arguments[0];

    if(e.keyCode==38){
        keyUp=true;
    }
    else if(e.keyCode==40){
        keyDown=true;
    }
    else if(e.keyCode==37){
        keyLeft=true;
    }
    else if(e.keyCode==39){
        keyRight=true;
    }
    else if(e.keyCode==32){
        playplane.shot();
    }
}
document.onkeyup=function(){
    var e = window.event || arguments[0];
    if(e.keyCode==38){
        keyUp=false;
    }
    else if(e.keyCode==40){
        keyDown=false;
    }
    else if(e.keyCode==37){
        keyLeft=false;
    }
    else if(e.keyCode==39){
        keyRight=false;
    }
}
//创建玩家飞机
function creatplayPlane() {
    playplane = new playplanePrototype(156, 484, "image/GreenPlane.png", 30);
}
//玩家飞机原型
function playplanePrototype(x,y,src,speed) {
    this.x = x;
    this.y = y;
    this.src = src;
    this.speed = speed;
    this.imgNode = document.createElement("img");
    this.bleed;
    this.jf;
    this.shot = function(){
        var width=this.imgNode.width;
        var top=parseInt(this.imgNode.style.top);
        var left=parseInt(this.imgNode.style.left);
        var x=left+width/2-10;
        var y=top-40-10;
        var zidan=new ziDanProtoType(x,y,"image/bullet_03.png",10);//x轴等于飞机的横坐标加上飞机的一半减去子弹的一半
                                       //y等于飞机的y坐标减去子弹的高度减去飞机与子弹的间隔
        arrziDan.push(zidan);
    }
    this.moveDown = function(){
        var top=(parseInt(this.imgNode.style.top) + this.speed);
        if(top<(662-128)){
            this.imgNode.style.top = top + "px"
        }
    }
    this.moveUp = function(){
        var top=(parseInt(this.imgNode.style.top) - this.speed);
        if(top>=0) {
            this.imgNode.style.top = top + "px"
        }
    }
    this.moveLeft = function(){
        var left=(parseInt(this.imgNode.style.left) -this.speed);
        if(left>0){
            this.imgNode.style.left = left + "px"
        }
    }
    this.moveRight = function () {
        var left=(parseInt(this.imgNode.style.left) + this.speed);
        if(left<(442-128)){
            this.imgNode.style.left = left + "px"
        }
    }
    this.init = function () {
        this.imgNode.src = this.src;
        this.imgNode.style.left = x + "px";
        this.imgNode.style.top = y + "px";
        divGame.appendChild(this.imgNode);
    }
    this.init();
}



//子弹移动
function moveziDan(){
    for(var i=0;i<arrziDan.length;i++){
        var top=parseInt(arrziDan[i].imgNode.style.top);
        if(top==0){
            //删除子弹
            divGame.removeChild(arrziDan[i].imgNode);
            arrziDan.splice(i,1);
            i--;
        }
        else{
            arrziDan[i].move();
        }
    }
}
//玩家飞机的子弹原型
function ziDanProtoType(x,y,src,speed){
    this.x = x;
    this.y = y;
    this.src = src;
    this.speed = speed;
    this.imgNode = document.createElement("img");
    this.move=function(){
        var top=(parseInt(this.imgNode.style.top) - this.speed);
        if(top>=0) {
            this.imgNode.style.top = top + "px"
        }
        else{
            this.imgNode.style.top = "0px"
        }
    }
    this.init=function(){
        this.imgNode.src = this.src;
        this.imgNode.style.left = x + "px";
        this.imgNode.style.top = y + "px";
        divGame.appendChild(this.imgNode);
    }
    this.init();
}