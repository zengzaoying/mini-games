/**
 * Created by Administrator on 2017/9/13.
 */
//全局变量
var playMonster;//玩家怪兽
var arrziDan=[];//存放怪兽
var arrbaoxiang=[];//存放宝箱
var  keyUp=false;
var keyDown=false;
var keyLeft=false;
var keyRight=false;
var index=0;
var blooul;  //玩家血条
var boxcount=0;//宝箱统计
var  divGame=document.getElementById("game");
var gameover=document.getElementById("gameover");
var  second=document.getElementById("second");
var  minute1=document.getElementById("minute1");
var  minute2=document.getElementById("minute2");
var countfenshu=document.getElementById("countfenshu");
var nengliangimg=document.getElementById("nengliangimg");
var arrDiMonster=[];//存放所有敌方怪兽
//三个怪兽
var createMonster11Timer=setInterval(createMonster1,3000);
var createMonster2Timer=setInterval(createMonster2,3200);
var createMonster3Timer=setInterval(createMonster3,3400);
var createMonster4Timer=setInterval(createMonster4,10000);
//三个怪兽的移动
var moveDiplaneTimer=setInterval(moveDiMonster,100);
countfenshu.innerText=0;//初始化积分值
creatplayblooul();  //创建玩家血条
var moveblooulTimer=setInterval(moveblooul,150);  //玩家血量的移动
var movezidanTimer=setInterval(moveziDan,50);    //子弹的移动
var moveplayplaneTimer=setInterval(moveplayMonster,150);
var penzhuangtTimer=setInterval(penzhuang,100);  //碰撞
var playpenzhuangTimer=setInterval(playpenzhuang,100);
var shenjiTimer=setInterval(shenjipanduanscore,1000);
var daojishiTimer=setInterval(Timer,1000);
//计时器的图片
var arrTimerimg=["image/num/0.gif","image/num/1.gif","image/num/2.gif","image/num/3.gif","image/num/4.gif","image/num/5.gif","image/num/6.gif","image/num/7.gif","image/num/8.gif","image/num/9.gif"]
//玩家怪兽图片
var arrdragonstand=["image/small/stand.gif","image/middle/stand.gif","image/big/stand.gif","image/large/stand.gif","image/final/stand.gif"];
var arrdragonmove=["image/small/move.gif","image/middle/move.gif","image/big/stand.gif","image/large/move.gif","image/final/move.gif"];
var arrdragonmagicmissile=["image/small/magicmissile.gif","image/middle/magicmissile.gif","image/big/stand.gif","image/large/magicmissile.gif","image/final/magicmissile.gif"];
var arrattzidan=["image/small/att.gif","image/middle/att.gif","image/big/att.gif","image/large/att.gif","image/final/att.gif"];
var arrhitzidan=["image/small/hit.gif","image/middle/hit.gif","image/big/hit.gif","image/large/hit.gif","image/final/hit.gif"];
var arrlengliang=["image/ui/expFull.gif","image/ui/expMax.gif"];
creatplayMonster();//创建玩家怪兽
var lengliangTimer=setInterval(nengliangchange,1000);  //能量的改变
var hsoushiTimer=setInterval(shoushi,500);    //收尸
// var daZhaoTimer=setInterval(daZhao,500);   //大招
 //玩家怪兽的移动
function moveplayMonster() {
    if(playMonster==undefined){
        return;
    }
    if(keyUp){
        playMonster.moveUp();
    }
    if(keyLeft){
        playMonster.moveLeft();
    }
    if(keyRight){
        playMonster.moveRight();
    }
    if(keyDown){
        playMonster.moveDown();
    }
}
//定义事件，键盘按下事件
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
        playMonster.shot();
        playMonster.imgNode.src=arrdragonmagicmissile[index];
    }
};
//定义事件，键盘松开事件
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
};
//创建玩家打兽
function creatplayMonster() {
    playMonster = new playMonsterPrototype(10, 377,arrdragonstand[index],30);

}
//玩家打兽原型
function playMonsterPrototype(x,y,src,speed) {
    this.x = x;
    this.y = y;
    this.src = src;
    this.speed = speed;
    this.imgNode = document.createElement("img");
    this.bleed=2;
    this.jf;
    this.shot = function(){
        var width=this.imgNode.width;
        var height=this.imgNode.height;
        var top=parseInt(this.imgNode.style.top);
        var left=parseInt(this.imgNode.style.left);
        var x=left+width+10;
        var y=top+height/2-11;
        var zidan=new ziDanProtoType(x,y,arrattzidan[index],10);
        arrziDan.push(zidan);
    }
    this.moveDown = function(){
        var top=parseInt( this.imgNode.style.top);
        if(top<700){
            this.imgNode.style.top=top+this.speed+"px";
        }
    }
    this.moveUp = function(){
        var top=parseInt(this.imgNode.style.top);
        if(top>17) {
            this.imgNode.style.top = top - this.speed + "px"
        }
    }
    this.moveLeft = function(){
        var left=parseInt(this.imgNode.style.left);
        if( left>17){
            this.imgNode.style.left = left-this.speed + "px"
        }
    }
    this.moveRight = function () {
        var left=parseInt(this.imgNode.style.left);
        if(left<1480){
            this.imgNode.style.left = left+this.speed + "px"
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
//创建玩家血条原型
function playMonsterbloodPrototype(x,y,src,speed) {
    this.x=x;
    this.y=y;
    this.src=src;
    this.speed=speed;
    this.imgNode = document.createElement("img");
        this.moveDown = function(){
            var top=parseInt( this.imgNode.style.top);
            if(top<700){
                this.imgNode.style.top=top+this.speed+"px";
            }
        }
        this.moveUp = function(){
            var top=parseInt(this.imgNode.style.top);
            if(top>17) {
                this.imgNode.style.top = top - this.speed + "px"
            }
        }
        this.moveLeft = function(){
            var left=parseInt(this.imgNode.style.left);
            if( left>17){
                this.imgNode.style.left = left-this.speed + "px"
            }
        }
        this.moveRight = function () {
            var left=parseInt(this.imgNode.style.left);
            if(left<1480){
                this.imgNode.style.left = left+this.speed + "px"
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
    //给玩家创建一个显示头部的血条
function creatplayblooul(){
        blooul=new playMonsterbloodPrototype(7,360,"image/ui/HPMAX.png",30);
    }
    //给玩家的血条添加移动的方法
function moveblooul(){
        if(blooul==undefined){
            return;
        }
        if(keyUp){
            blooul.moveUp();
        }
        if(keyLeft){
            blooul.moveLeft();
        }
        if(keyRight){
            blooul.moveRight();
        }
        if(keyDown){
            blooul.moveDown();
        }
    }
//子弹移动
function moveziDan(){
    for(var i=0;i<arrziDan.length;i++){
        var left=parseInt(arrziDan[i].imgNode.style.left);
        if(left == 1500){
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
        var left=(parseInt(this.imgNode.style.left)+this.speed);
        if(left<1500) {
            this.imgNode.style.left = left + "px"
        }
        else{
            this.imgNode.style.left = "1500px"
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
//敌方怪兽移动
function moveDiMonster(){
    for(var i=0;i<arrDiMonster.length;i++){
        var left=parseInt(arrDiMonster[i].imgNode.style.left);
        if(left<=1500){
            arrDiMonster[i].move();//移动怪兽
        }
        else{
            //删除当前怪兽
            divGame.removeChild(arrDiMonster[i].imgNode);//从界面移除，删除节点
            arrDiMonster.splice(i,1);
            i--;
        }
    }
}
//创建怪兽1
function  createMonster1() {
    var x=1500;
    var y=parseInt(Math.random()*710);
    var plane=new DiMonsterPrototype(x,y,"image/move1.gif",5);
    arrDiMonster.push(plane);
}
//创建怪兽2
function  createMonster2() {
    var x=1500;
    var y=parseInt(Math.random()*710);
    var plane=new DiMonsterPrototype(x,y,"image/move2.gif",5);
    arrDiMonster.push(plane);
}
//创建怪兽3
function  createMonster3() {
    var x=1500;
    var y=parseInt(Math.random()*710);
    var plane=new DiMonsterPrototype(x,y,"image/move3.gif",5);
    arrDiMonster.push(plane);
}
//大怪兽4
function  createMonster4() {
    var x=1500;
    var y=parseInt(Math.random()*710);
    var plane=new DiMonsterPrototype(x,y,"image/boss/move.gif",5);
    arrDiMonster.push(plane);
}
//敌方怪兽原型 prototype
function DiMonsterPrototype(x,y,src,speed) {
    this.x = x;
    this.y = y;
    this.src = src;
    this.speed = speed;
    this.bleed=3;
    // this.width=width;
    // this.height=height;
    // this.bloou=bloou;
    this.isdead = false; //敌方怪兽的状态 为false的时候  飞机没有被击中
    this.deadtime = 10; //控制怪兽被击中产生的爆炸效果消失时间
    this.imgNode = document.createElement("img");
    this.shot = function(){

    };
    this.move = function(){
        var left=(parseInt(this.imgNode.style.left)-this.speed);
        this.imgNode.style.left=left+"px";
    };
    this.init = function(){
        this.imgNode.src = this.src;
        this.imgNode.style.top=this.y+"px";
        this.imgNode.style.left=this.x+"px";
        divGame.appendChild(this.imgNode);
    };
    this.init();
}
//收尸
function  shoushi() {
    for(var i=0;i<arrDiMonster.length;i++){
        if(arrDiMonster[i].isdead){
            var j=parseInt(Math.random()*2);
            if(j==i){
                var x=parseInt(arrDiMonster[i].imgNode.style.left);
                var y=parseInt(arrDiMonster[i].imgNode.style.top);
                var box = new creatbaoxiangPrototype(x,y,"image/enemy/thing.gif");
                arrbaoxiang.push(box);
        }
            divGame.removeChild(arrDiMonster[i].imgNode);
            arrDiMonster.splice(i,1);
            i--;
        }
    }
}
//玩家与宝箱碰撞
function playpenzhuang() {
    for (var j = 0;j<arrbaoxiang.length;j++) {//取敌机
        var planeLeft = parseInt(arrbaoxiang[j].imgNode.style.left);
        var planeTop = parseInt(arrbaoxiang[j].imgNode.style.top);
        var planeWidth = arrbaoxiang[j].imgNode.width;
        var planeHeight = arrbaoxiang[j].imgNode.height;
        var selfLeft = parseInt(playMonster.imgNode.style.left);
        var selfTop = parseInt(playMonster.imgNode.style.top);
        var selfWidth = playMonster.imgNode.width;
        var selfHeight = playMonster.imgNode.height;
        //判断：子弹比对飞机的范围
        if ((selfLeft > (planeLeft - selfWidth) && selfLeft < (planeLeft + planeWidth))
            && (selfTop > (planeTop - selfHeight) && selfTop < (planeTop + planeHeight))) {
            //宝箱消失
            divGame.removeChild(arrbaoxiang[j].imgNode);
            arrbaoxiang.splice(j, 1);
            j--;
            boxcount++;
            countfenshu.innerText ++;
            break;//一颗子弹打一架飞机
        }
    }
}
//碰撞
function penzhuang() {
    for(var i=0;i<arrziDan.length;i++){   //遍历数组中的子弹
        var ziDanLeft=parseInt(arrziDan[i].imgNode.style.left);
        var ziDanTop=parseInt(arrziDan[i].imgNode.style.top);
        var ziWidth=arrziDan[i].imgNode.width;
        var ziHeight=arrziDan[i].imgNode.height;
        for(var j=0;j<arrDiMonster.length;j++){//遍历数组中的飞机
            var planeLeft=parseInt(arrDiMonster[j].imgNode.style.left);
            var planeTop=parseInt(arrDiMonster[j].imgNode.style.top);
            var planeWidth=arrDiMonster[j].imgNode.width;
            var planeHeight=arrDiMonster[j].imgNode.height;
            //判断子弹比对飞机的范围
            if((ziDanLeft>(planeLeft-ziWidth)&&ziDanLeft<(planeLeft+planeWidth)) &&
                (ziDanTop>(planeTop-ziHeight)&&ziDanTop<(planeTop+planeHeight))){
                //子弹与当前飞机发生了碰撞
                arrDiMonster[j].bleed--;
                if(arrDiMonster[j].bleed==0){
                    //1、飞机爆炸
                    countfenshu.innerText++;
                    arrDiMonster[j].imgNode.src=arrhitzidan[index];
                    arrDiMonster[j].isdead=true;
                }
                //2、子弹消失
                divGame.removeChild(arrziDan[i].imgNode);
                arrziDan.splice(i,1);
                i--;
                break;
            }
        }
    }
}
//判断分数升级
function shenjipanduanscore(){
    if(countfenshu.innerText>=0 && countfenshu.innerText<10){
        index=0;
    }
    else if(countfenshu.innerText>10 &&countfenshu.innerText<=20){
        index=1;
    }
    else if(countfenshu.innerText>20 &&countfenshu.innerText<=30){
        index=2;
    }
    else if(countfenshu.innerText>30 &&countfenshu.innerText<=40){
        index=3;
    }
    else if(countfenshu.innerText>40 &&countfenshu.innerText<=50){
        index=4;
    }
}
//倒计时
var i=9;
var j=3;
function Timer(){
        minute2.src=arrTimerimg[i];
        minute1.src=arrTimerimg[j-1];
        i--;
    if(i==-1){
            // minute1.src=arrTimerimg[j-1];
            j--;
            i=9;
        }
    if(j==0){
        second.src=arrTimerimg[0];
        minute1.src=arrTimerimg[5];
        minute2.src=arrTimerimg[9];
        j=6;
        i=9;
        }
    // if(   minute1.src==arrTimerimg[0] && j==0 &&  second.src==arrTimerimg[0] &&  minute2.src==arrTimerimg[0]){
    //     gameover.style.display="block";
    //     clearInterval;
    //     }
}
//创建宝箱的原型
function creatbaoxiangPrototype(x,y,src){
        this.x=x;
        this.y=y;
        this.src=src;
        this.isDead=false;
        this.imgNode=document.createElement("img");
        this.init=function () {
            this.imgNode.src=this.src;
            this.imgNode.style.left=x+"px";
            this.imgNode.style.top=y+"px";
            divGame.appendChild(this.imgNode);
        };
        this.init();
}
//能量条的改变
function nengliangchange(){
    if(countfenshu.innerText>0 && countfenshu.innerText<=10) {

        nengliangimg.setAttribute("style","clip: rect("+value+"px"+",31px,161px,0px)");
    }
    if(countfenshu.innerText>10 &&countfenshu.innerText<=20){
        var value=100-(countfenshu.innerText%10)*10;
        nengliangimg.setAttribute("style","clip: rect("+value+"px"+",31px,161px,0px)");
    }
   if(countfenshu.innerText>20 &&countfenshu.innerText<=30){
        var value=100-(countfenshu.innerText%10)*10;
        nengliangimg.setAttribute("style","clip: rect("+value+"px"+",31px,161px,0px)");
    }
    if(countfenshu.innerText>30 &&countfenshu.innerText<=40){
        var value=100-(countfenshu.innerText%10)*10;
        nengliangimg.setAttribute("style","clip: rect("+value+"px"+",31px,161px,0px)");
    }
     if(countfenshu.innerText>40){
        var value=100-(countfenshu.innerText%10)*10;
        nengliangimg.setAttribute("style","clip: rect("+value+"px"+",31px,161px,0px)");
    }
}
// 大招
// function daZhao(arrDiMonster){
//     if(boxcount>=10){
//         divGame.style.backgroundImage= "url('image/skill.gif')";
//     }
//     for(var i=0;i<arrDiMonster.length;i++){
//         divGame.removeChild(arrDiMonster[i].imgNode);
//         arrDiMonster.splice(i,1);
//     }
// }
// if(toEnter){
//     daZhao(arrDiMonster);
// }else{
//     divGame.style.backgroundImage="url('image/bg.jpg')";
// }

