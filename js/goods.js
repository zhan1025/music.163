//创建推荐商品
$.get("./json/recommend.json?v="+Math.random(),function(res){
    var product=res.data["hotProduct"]; 
    var none,discount,tag,label,minPrice,o_price,p_id;
    for(var i=0;i<res.data["count"];i++){
        p_id=product[i]["productId"];
        tag=product[i]["products"]["tags"];
        label=product[i]["products"]["couponLabelDesc"];
        minPrice=product[i]["products"]["minPrice"];
        o_price=product[i]["products"]["originalCost"];
        //判断特价标签是否显示
        if(label!==null){
            none="inline";
            discount=label;
        }
        if(label==null&&tag==""){
            none="none";
        }
        if(label==null&&tag!==""){
            none="inline";
            discount=tag;
        }
     $("#rec-list").append(`<div class="product">
     <a  class="p-inner link" data="${p_id}"><img src="./images/${product[i]["products"]["coverIdStr"]}.jpg" alt=""></a>
      <h3><span class="tags" style="display:${none}"><em>${discount}</em></span><a  class="p-name link" data="${p_id}">${product[i]["products"]["name"]}</a></h3>
     <p>¥<em>${minPrice}</em></p></div> `);
     if(minPrice!==o_price){
        $($("#rec-list .p-inner")[i]).append(`<span class="discount"><i class="m-p">&yen;${minPrice}</i><i class="dis">&yen;${o_price}</i></span>`);
    }
    }
    //给每一个商品添加点击事件
    $("#rec-list .link").on("click",function(){var id=$(this).attr("data");window.open(`./detail.html?id=${id}`,"_blank");});
},"json");

// 创建热门商品
$.get("./json/hotgoods.json?v="+Math.random(),function(res){
    var product=res.data["allProduct"]; 
    var none,discount,tag,label,minPrice,o_price,v_price,p_id;
    if((res.data["count"]%4)!==0){
         var cou=res.data["count"]+2;
    }
    for(var i=0;i<cou;i++){
         if(i>=res.data["count"]){
              $("#hot-list").append(`<div class="product" style="visibility: hidden;flex: 0 0 23.8%;height: 382px;"></div>`);
         }else{
            p_id=product[i]["id"]
            v_price=product[i]["useVipPrice"];
            minPrice=product[i]["minPrice"];
            o_price=product[i]["originalCost"];
            tag=product[i]["tags"];
            label=product[i]["couponLabelDesc"];
            if(label!==null){
                none="inline";
                discount=label;
            }
            if(label==null&&tag==""){
                none="none";
            }
            if(label==null&&tag!==""){
                none="inline";
                discount=tag;
            }
               $("#hot-list").append(`<div class="product" data="${p_id}">
               <a href="javascript:;" class="p-inner">
               <img src="./images/${product[i]["coverIdStr"]}.jpg" alt="">
               </a>

               <h3>
               <span class="tags" style="display:${none}"><em>${discount}</em></span>
               <a href="javascript:;" class="p-name">${product[i]["name"]}</a>
               </h3>
               <p class="cost">¥<em>${minPrice}</em> <em style="font-size: 15px; color: rgb(254, 103, 46);></em></p>      
               </div> `);
               if(minPrice!==o_price){
                $($("#hot-list .p-inner")[i]).append(`<span class="discount"><i class="m-p">&yen;${minPrice}</i><i class="dis">&yen;${o_price}</i></span>`);
            }
            if(v_price){
                v_price=product[i]["vipMinPrice"];
                $($("#hot-list .cost")[i]).append(`<em style="font-size: 15px; color: rgb(254, 103, 46);">(黑胶VIP &yen;${v_price})</em>`);
            }
         }
    }
       
     
},"json");