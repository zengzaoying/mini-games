/**
 * Created by Administrator on 2017/9/12.
 */
var arrziDan=[];//存放子弹
//玩家飞机的子弹原型
var movezidanTimer=setInterval(moveziDan,100);
//子弹移动
function moveziDan(){
    for(var i=0;i<arrziDan.length;i++){
        var top=parseInt(arrziDan[i].style.top);
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