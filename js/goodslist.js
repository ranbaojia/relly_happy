(function() {
    ajax({
        type: "get",
        dataType: "json",
        url: "./json/goodslist.json"
    }).then((val) => {
        var product_show = $q('.product-show-right');
        var product_detail = $q('.product-detail');
<<<<<<< HEAD

=======
>>>>>>> test
        var str = "";
        val.forEach((item, index) => {
            str += `
        <div class="product-detail">
            <a class="clearfix" href="./detial.html"><img src="${item.imgUrl}" alt=""></a>
           
            <a class="clearfix" href="./detial.html"><span class="title">${item.title}</span></a>
            <span class ="title_warn"></span>
            <div class ="dataId">
                <h5>¥${item.price}</h5>
                <span>${item.comment}人评价</span>
            </div>
            <div>
                <p>
                    <input type="checkbox" name="" id=""> 对比
                </p>
                <p>
                    收藏
                </p>
                <p  class="addShopping"  data_id="${item.id}"><span class="iconfont"></span>加入购物车</p>
        </div>
        </div>`
        });
        product_show.innerHTML = str;

<<<<<<< HEAD
        //点击添加购物车，本地存储也改变
=======
        // 点击添加购物车，本地存储也改变
>>>>>>> test
        // 需求，如果点击购物车，本地存储的值先判断有没有这个id的商品，如果有，
        // 则只增加数量，不增加长度，如果没有，直接push进去
        var $shop_btn = $('.product-show-right');
        $shop_btn.on('click', '.addShopping', function() {
            var goodsArr = [];
            var flag = true;
            if (localStorage.getItem("goods")) {
                goodsArr = JSON.parse(localStorage.getItem("goods"));
            }
            var bomId = this.getAttribute('data_id');
            var obj = { num: 1, id: bomId };
            goodsArr.forEach((item, index) => {
                if (item.id === bomId) {
                    flag = !flag
                    item.num++;
                } //else {
                // goodsArr.push(obj)
                // }
            });
            if (flag) {
                goodsArr.push(obj)
            };
<<<<<<< HEAD
            localStorage.setItem("goods", JSON.stringify(goodsArr))
                // localStorage.removeItem("goodsArr");
                // localStorage.removeItem("goods");
=======
            localStorage.setItem("goods", JSON.stringify(goodsArr));
            // 改变购物车数量
            addGoods();
            // localStorage.removeItem("goodsArr");
            // localStorage.removeItem("goods");
>>>>>>> test
        })

        // 点击跳转到购物车
        $('.sub_shop').click(() => {
            location.href = "./shoplist.html";
        });
<<<<<<< HEAD
=======

        // 获取本地存储数据中的goods中商品的总数
        // 获取本地存储数据中的goods中商品的总数

        // var goodsArr = JSON.parse(localStorage.getItem('goods'));
        // var sum = 0;
        // goodsArr.forEach((item, index) => {
        //     sum += item.num;

        // });


>>>>>>> test
    })
})();