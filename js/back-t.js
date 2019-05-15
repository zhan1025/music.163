$("body").append(`<div id="b-top">
<ul>
     <li class="license"><a href="#">查看<br>营业执照</a></li>
     <li class="un">100%<br>正品</li>
     <li class="un">七天无理由退货</li>
     <li class="shop-car cart"><i class="c-bg"> <span id="num">0</span></i></li>
     <li class="kefu"><i class="k-bg"> </i><span>客服</span></li>
</ul>
</div>`);
var x=0;
document.onscroll=function top(){
var s_top=document.documentElement.scrollTop||document.body.scrollTop;
if(s_top>200&&x==0){
  $("#b-top>ul").append(`<div class="b-t"></div>`);
  x=1;
}
if(s_top<200&&x==1){$("#b-top .b-t").remove();x=0;}
if(s_top>300&&x==1){
$("#b-top").attr("style",`position:fixed;top:50%;transform:translate(0,-50%);`);
}
else{   
$("#b-top").removeAttr("style");
}
$("#b-top>ul .b-t").on("click",function(){
if(s_top>200&&x==1){
     var _timer=window.setInterval(function(){
          document.documentElement.scrollTop-=5;
          if(document.documentElement.scrollTop<=0){
               window.clearInterval(_timer);
          }
     },5);
}
});
}  