/**
 * Created by Administrator on 2017/9/11.
 */

//全局变量
var  divGame=document.getElementById("game");
var arrDiplane=[];//存放敌机
var creatDiplanePrototype1Timer=setInterval(createDiplane1,900);
var creatDiplanePrototype2Timer=setInterval(createDiplane2,900);
var creatDiplanePrototype3Timer=setInterval(createDiplane3,4000);//敌人子弹机
var moveDiplaneTimer=setInterval(moveDiplane,100);
var penzhuangtTimer=setInterval(penzhuang,100);
var hsoushiTimer=setInterval(shoushi,500);

//敌机移动
function moveDiplane(){
    for(var i=0;i<arrDiplane.length;i++){
        var top=parseInt(arrDiplane[i].imgNode.style.top);
        if(top<=662){
            arrDiplane[i].move();//移动飞机
        }
        else{
            //删除当前飞机
            divGame.removeChild(arrDiplane[i].imgNode);//从界面移除，删除节点
            arrDiplane.splice(i,1);
            i--;
        }
    }
}

//敌机1
function  createDiplane1() {
    var x=parseInt(Math.random()*397);
    var y=0;
    var plane=new DiplanePrototype(x,y,"image/BluePlane1.png",10);
    plane.init();
    arrDiplane.push(plane);
}
//敌机2
function  createDiplane2() {
    var x=parseInt(Math.random()*397);
    var y=0;
    var plane=new DiplanePrototype(x,y,"image/BluePlane3.png",10);
    plane.init();
    arrDiplane.push(plane);
}
//敌机发子弹
function  createDiplane3() {
    var x=parseInt(Math.random()*397);
    var y=0;
    var plane=new DiplanePrototype(x,y,"image/JitPlane.png",10);
     plane.init();
    arrDiplane.push(plane);
    setInterval(function(){
        plane.shot();
    },100)
}
//敌机原型 prototype
function DiplanePrototype(x,y,src,speed) {
    this.x = x;
    this.y = y;
    this.src = src;
    this.speed = speed;
    this.bleed=2;
    this.isdead = false; //敌方飞机的状态 为false的时候  飞机没有被击中
    this.deadtime = 10; //控制小飞机被击中产生的爆炸效果消失时间
    this.imgNode = document.createElement("img");
    this.shot = function () {

    }
    this.move = function () {
        var top=(parseInt(this.imgNode.style.top) + this.speed);
        this.imgNode.style.top = top + "px"
    }
    this.init = function () {
        this.imgNode.src = this.src;
        this.imgNode.style.left = x + "px";
        this.imgNode.style.top = y + "px";
        divGame.appendChild(this.imgNode);
    }
}
function  shoushi() {
    for(var i=0;i<arrDiplane.length;i++){
        if(arrDiplane[i].isdead){
            divGame.removeChild(arrDiplane[i].imgNode);
            arrDiplane.splice(i,1);
            i--;
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
        for(var j=0;j<arrDiplane.length;j++){//遍历数组中的飞机
            var planeLeft=parseInt(arrDiplane[j].imgNode.style.left);
            var planeTop=parseInt(arrDiplane[j].imgNode.style.top);
            var planeWidth=arrDiplane[j].imgNode.width;
            var planeHeight=arrDiplane[j].imgNode.height;
            //判断子弹比对飞机的范围
            if((ziDanLeft>(planeLeft-ziWidth)&&ziDanLeft<(planeLeft+planeWidth)) &&
                (ziDanTop>(planeTop-ziHeight)&&ziDanTop<(planeTop+planeHeight))){
                //子弹与当前飞机发生了碰撞
                arrDiplane[j].bleed--;
                if(arrDiplane[j].bleed==0){
                    //1、飞机爆炸
                    arrDiplane[j].imgNode.src="image/BeiJi_02.png";
                   arrDiplane[j].isdead=true;
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

