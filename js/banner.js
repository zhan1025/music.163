//轮播图
$.get("./json/banner.json?v="+Math.random(),function(res){
     $("#banner").append(`<button id="left"></button><button id="right"></button>
          <div id="wrap" class="container">
               <ul id="img">
                    <li style="z-index: 6"><a href="${res.banners[0].url}" target="_blank"><img src="./images/${res.banners[0].picId}.jpg" alt="" ></a></li>
                    <li style="z-index: 5"><a href="${res.banners[1].url}" target="_blank"><img src="./images/${res.banners[1].picId}.jpg" alt="" ></a></li>
                    <li style="z-index: 4"><a href="${res.banners[2].url}" target="_blank"><img src="./images/${res.banners[2].picId}.jpg" alt="" ></a></li>
                    <li style="z-index: 3"><a href="${res.banners[3].url}" target="_blank"><img src="./images/${res.banners[3].picId}.jpg" alt="" ></a></li>
                    <li style="z-index: 2"><a href="${res.banners[4].url}" target="_blank"><img src="./images/${res.banners[4].picId}.jpg" alt="" ></a></li>
                    <li style="z-index: 1"><a href="${res.banners[5].url}" target="_blank"><img src="./images/${res.banners[5].picId}.jpg" alt="" ></a></li>
               </ul></a>
               <ol id="dot">
                    <li class="selected"></li> <li></li> <li></li> <li></li> <li></li> <li></li>
               </ol>
     
          </div>`);
          //初始背景
          $("#banner").css({"background":`url(./images/${res.banners[0].backendPicId}.jpg) repeat-x`});
          
          //设置初始图，添加定时器
          var index=0,timer,en=1;
          var _timer=window.setInterval(autoPlay,2500);
          //给按钮按下添加图片延时显示
          function delay(){
               window.clearInterval(_timer);
               timer=window.setTimeout(nu,500);
               function nu(){
                    window.clearTimeout(timer);
                    _timer=window.setInterval(autoPlay,2500);
                    autoPlay();
                    $("#left")[0].disabled=false;
                    $("#right")[0].disabled=false;
                    en=1;
               }
          }
          //自动播放函数,添加对应背景
          function autoPlay(){
               index++;
               if(index==-1){
                    index=5;
               }
               $("#img>li").eq(index).fadeIn(500).siblings().fadeOut(500);
               $("#dot>li").eq(index).addClass("selected").siblings().removeClass("selected");
               $("#banner").css({"background":`url(./images/${res.banners[Math.abs(index)].backendPicId}.jpg) repeat-x`,
                              "transition":"all 391ms ease-in"});
               if(index==$("#img>li").length-1){
                    index=-1;
               }
          }
          //给图片添加划过事件
          $("#img>li img").hover(function(){
               window.clearInterval(_timer);
          },
          function(){
               //把定时器加上
               _timer=window.setInterval(autoPlay,2500);
          });
          //给小点添加点击
          $("#dot>li").on("click",function(){
               if(en){
               en=0;
               window.clearInterval(_timer);
               index=$(this).index()-1;
               delay();
               }
               
          });
          
          //左右切换按钮
          $("#left").on("click",function(){
               $("#left")[0].disabled=true;
               index=$("#dot>li[class=selected]").index()-2;
               delay();
               console.log("left"+Math.abs(index));
          });
          $("#right").on("click",function(){
               $("#right")[0].disabled=true;
               delay();
          });
},"json");

