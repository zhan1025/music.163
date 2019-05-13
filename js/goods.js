//推荐商品
$.get("./json/recommend.json?v="+Math.random(),function(res){
    var product=res.data["hotProduct"]; 
    var none,discount,tag,label,minPrice,o_price;
    for(var i=0;i<res.data["count"];i++){
        tag=product[i]["products"]["tags"];
        label=product[i]["products"]["couponLabelDesc"];
        minPrice=product[i]["products"]["minPrice"];
        o_price=product[i]["products"]["originalCost"];
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
     <a href="javascript:;" class="p-inner"><img src="./images/${product[i]["products"]["coverIdStr"]}.jpg" alt=""></a>
      <h3><span class="tags" style="display:${none}"><em>${discount}</em></span><a href="javascript:;" class="p-name">${product[i]["products"]["name"]}</a></h3>
     <p>¥<em>${minPrice}</em></p></div> `);
     if(minPrice!==o_price){
        $($("#rec-list .p-inner")[i]).append(`<span class="discount"><i class="m-p">&yen;${minPrice}</i><i class="dis">&yen;${o_price}</i></span>`);
    }
    // else{ $($("#rec-list .discount")[i]).attr("style","display:none");}attr("style","display:block")
    }
    
},"json");

// 热门商品
$.get("./json/hotgoods.json?v="+Math.random(),function(res){
    var product=res.data["allProduct"]; 
    var none,discount,tag,label,minPrice,o_price;
    if((res.data["count"]%4)!==0){
         var cou=res.data["count"]+2;
    }
    for(var i=0;i<cou;i++){
         if(i>=res.data["count"]){
              $("#hot-list").append(`<div class="product" style="visibility: hidden;flex: 0 0 23.8%;height: 382px;"></div>`);
         }else{
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
               $("#hot-list").append(`<div class="product">
               <a href="javascript:;" class="p-inner">
               <img src="./images/${product[i]["coverIdStr"]}.jpg" alt="">
               </a>

               <h3>
               <span class="tags" style="display:${none}"><em>${discount}</em></span>
               <a href="javascript:;" class="p-name">${product[i]["name"]}</a>
               </h3>
               <p>¥<em>${minPrice}</em> <em style="font-size: 15px; color: rgb(254, 103, 46);></em></p>      
               </div> `);
               if(minPrice!==o_price){
                $($("#hot-list .p-inner")[i]).append(`<span class="discount"><i class="m-p">&yen;${minPrice}</i><i class="dis">&yen;${o_price}</i></span>`);
            }
         }
    }
       
     
},"json");