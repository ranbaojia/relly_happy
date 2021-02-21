(function() {
    function small() {
        var showWrap = $q('.small-show-div ul');
        // 更换放大镜区图片
        var amplify = $q('.amplify');
        var small = $q('.item-top .small');
        // 事件委托
        onTarget(showWrap, 'mouseover', 'img', function(e) {
            this.style.border = "1px solid #ff062b";
            small.innerHTML = '';
            amplify.innerHTML = '';
            // 克隆节点的方法，target.cloneNode(true) 深复制
            var img1 = this.cloneNode(true);
            var img2 = this.cloneNode(true);
            img1.setAttribute('class', 'superImg');
            img2.setAttribute('class', 'bigImg');
            amplify.appendChild(img1);
            small.appendChild(img2);
            // 调用全局拖拽方法
            onDrag();
        });
        onTarget(showWrap, 'mouseout', 'img', function(e) {
            this.style.border = "1px solid #ddd";
        });

    }
    small();
    window.small = small;
})();
// 放大镜大图

(function() {
    function drag() {
        // 选中小图
        var minImg = $q('.item-top .bigImg');
        // 选中大图
        var maxImg = $q('.amplify .superImg');
        var x = 0;
        var y = 0;
        // 为了方便以后图片更替，也能操作，用事件委托
        var item_left = $q('P-item-left');
        var wrap = $q('.item-top');
        var mark = $q('.item-top .mask');
        var maxWrap = $q('.amplify');
        console.log(minImg.offsetWidth);
        var W = wrap.offsetWidth;
        var H = wrap.offsetHeight;
        //  当鼠标移入wrap，mark到达鼠标中心，且跟着鼠标移动，且做边界检测
        wrap.onmouseover = function() {
            //   mark的左边和上面位置一直与鼠标相距自身宽高的一半
            mark.style.display = 'block';
            maxWrap.style.display = 'block';
            //display为none时拿不到元素的宽高
            var w = mark.clientWidth;
            var h = mark.clientHeight;
            var maxWrapWidth = maxWrap.offsetWidth;
            var maxWrapHeight = maxWrap.offsetHeight;
            var maxImgWidth = maxImg.offsetWidth;
            var maxImgHeight = maxImg.offsetHeight;
            // 先获取父级边框相对页面的left和top值
            var l = offset(wrap, false).left;
            var t = offset(wrap, false).top;
            wrap.onmousemove = function(ev) {
                var e = ev || window.event;
                // 遮罩的left等于鼠标相对于页面的距离-父级相对于页面的left距离-遮罩本身宽高的1/2
                x = e.pageX - l - mark.offsetWidth / 2;
                y = e.pageY - t - mark.offsetHeight / 2;

                // 边界判断
                if (x < 0) {
                    x = 0
                } else if (x > W - w) {
                    x = W - w;
                }

                if (y < 0) {
                    y = 0;
                } else if (y > H - h) {
                    y = H - h;
                }
                mark.style.left = x + 'px';
                mark.style.top = y + 'px';
                // 计算大图和小图的关系
                maxImg.style.left = -x * ((maxImgWidth - maxWrapWidth) / (W - w)) + 'px';
                maxImg.style.top = -y * ((maxImgHeight - maxWrapHeight) / (H - h)) + 'px';
            }

        };
        wrap.onmouseout = function() {
            mark.style.display = 'none';
            maxWrap.style.display = 'none';
        }
    }
    drag();
    window.onDrag = drag;
})();

// 动态渲染详情页面

(function() {

    ajax({
        type: "get",
        dataType: "json",
        url: "./json/detail_list.json"
    }).then((val) => {
        console.log(val);
        // 渲染放大镜区域
        var str = '';
        var small_img = $q('.item-top .small img');
        var amplify_img = $q('.amplify img');
        //  放大镜插入图片
        small_img.src = `${val[0].img.item_top}`;
        amplify_img.src = `${val[0].img.item_top}`;
        // 放大镜小图区插入图片
        var str1 = "";
        var minshow = $q('.small-show-div ul');
        val[0].img.small_show.forEach((item, index) => {
            str += `<img src="${item}" alt="">`
        });

        minshow.innerHTML = str;
        // 产品信息渲染
        var message = $q('.message');
        message.innerText = `${val[0].product_information.name}`;
        //产品价格渲染
        var price = $q('.inf-top h5');
        price.innerText = `${val[0].product_information.price}`;

        // 服务信息渲染
        var service = $q('.service_mes');
        console.log(service);
        service.innerText = `${val[0].product_information.service}`;
        // 品牌渲染

        var brand = $q('.brand_nav .brand');
        brand.innerText = `${val[0].product_information.brand}`

    })

})()