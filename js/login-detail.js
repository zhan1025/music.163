
$(function(){
    var id = location.search.split("=")[1];
    $.get("./json/detail.json?v="+Math.random(), function (res) {
        //商品详情展示，添加购物车，动态创建
        var reg,result,str;
        // str=res["product"][""]
        len=res["product"]["picIds"];//大图
        // reg=/\d{18}/g;
        // result=str.match(reg);
        // $("#main").append(`
        // <div class="m_img"><img src="./images/${}.jpg"></div>
        // `);
        
        //商品详情
        $(".h_inner>em").text(`${res["product"]["name"]}`);
        var len = res["product"]["descr"].length;//拿到详情数据长度
        var resource, key, rawResource;
        for (var i = 0; i < len; i++) {
            key = res["product"]["descr"][i];
            resource = key["resource"];
            rawResource = key["rawResource"];
            //判断创建类型
            if (key["type"] == 1) {
                $(".c_d_inner").append(`<p>${resource}</p>`);
            }
            else { $(".c_d_inner").append(`<img src="./images/${rawResource}.jpg">`); }
        }
    }, "json")
});

//创建商品详情页的热门商品
$($.get("./json/recommend.json?v=" + Math.random(), function (res) {
    var product = res.data["hotProduct"];
    var none, discount, tag, label, minPrice, o_price, p_id;
    for (var i = 0; i < 4; i++) {
        p_id = product[i]["productId"];
        tag = product[i]["products"]["tags"];
        label = product[i]["products"]["couponLabelDesc"];
        minPrice = product[i]["products"]["minPrice"];
        o_price = product[i]["products"]["originalCost"];
        if (label !== null) {
            none = "inline";
            discount = label;
        }
        if (label == null && tag == "") {
            none = "none";
        }
        if (label == null && tag !== "") {
            none = "inline";
            discount = tag;
        }
        $("#rec-list").append(`<div class="product">
      <a  class="p-inner link" data="${p_id}"><img src="./images/${product[i]["products"]["coverIdStr"]}.jpg" alt=""></a>
       <div class="detail"><h3><span class="tags" style="display:${none}"><em>${discount}</em></span><a  class="p-name link" data="${p_id}">${product[i]["products"]["name"]}</a></h3>
      <p>¥<em>${minPrice}</em></p></div> `);
        if (minPrice !== o_price) {
            $($("#rec-list .p-inner")[i]).append(`<span class="discount"><i class="m-p">&yen;${minPrice}</i><i class="dis">&yen;${o_price}</i></span>`);
        }
    }
    //点击商品跳转相应详情页
    $("#rec-list .link").on("click", function () { var id = $(this).attr("data"); window.open(`./detail.html?id=${id}`, "_blank"); });
}, "json")
);

//