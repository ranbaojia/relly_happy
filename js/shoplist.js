// 操作以及更新本地数据库
$(function() {
    //    封装提示语warn函数，购物车为空使用
    function addWarn() {
        var $span = `<span class="warn">亲！您还没有添加商品，再看看吧！</span>`;
        var $wrap_list = $('.wrap_list');
        $wrap_list.append($span);
    };

    //更新本地存储函数封装,给arg设置默认参数
    function changeStroge(arg = null, del = "b") {
        // 遍历本地存储数据
        var goodsArr = JSON.parse(localStorage.getItem("goods"));
        // 结算区

        if (arg !== null) {
            $(this).parent().children().eq(1).val(arg);
            // 找到此条点击的id
            var $id = $(this).parent().children().eq(1).attr("data-id");
            $.each(goodsArr, function(index, item) {
                // 当id相同时，更新此条num
                // 小于1移除li
                if (item.id == $id && arg < 1) {
                    // 并且在本地缓存里也移除这条数据
                    goodsArr.splice(index, 1);
                }
                if (item.id == $id) {
                    item.num = arg;
                    // 找到就截断
                    return false;
                }
            })
            if (arg < 1) {
                $(this).parent().parent().remove();
            }
        }
        // 点击删除按钮，数据库里的对象消失
        if (del !== "b") {
            var $id = $(this).parent().children().eq(4).children().eq(1).attr("data-id");
            $.each(goodsArr, function(index, item) {
                // 当id相同时，更新此条num
                // 小于1移除li
                if (item.id == $id) {
                    // 并且在本地缓存里也移除这条数据
                    goodsArr.splice(index, 1);
                    return false;
                }
            })
        }
        // 商品列表为0，增加提示语，清空页面内容 ，全选按钮点亮
        if (goodsArr.length == 0) {
            // 增加提示语
            addWarn();
            var $account = $('.account');
            var $allchose = $('.allchose')
                // 结算条消失
            $account.css({
                    display: "none"

                })
                // 全选按钮点亮
            $allchose.attr('checked', "true");
        } else {
            var $account = $('.account');
            // 数据库没有清空则展示
            $account.css({
                display: "block"
            })

        }
        localStorage.setItem('goods', JSON.stringify(goodsArr))
    };

    // 求单条购物车总价的封装函数
    function allPrice(num) {
        // 总价随着数量改变
        var $sin_price = $(this).parent().parent().children().eq(3).children().eq(0);
        console.log($sin_price);
        var price = parseInt($sin_price.text());
        $(this).parent().parent().children().eq(5).children().eq(0).text(price * (num));
    }

    // 封装已选择商品数量函数
    function hasChose(all) {
        var $has_chose = $('.has_chose');
        var str = `已选<span style="color:#ff2200;float:none">${all}</span>件商品`
        $has_chose.html(str);
    };

    // 封装改变结算总价的函数
    function sum(sum) {
        console.log(sum);
        var $sum_chose = $('.sum_chose');
        var str = `结算总价：¥<span style="color:#ff2200;float:none">${sum}</span>`
        $sum_chose.html(str);
    };

    //购物车页面ajax动态渲染
    $.ajax({
        url: "./json/goodslist.json",
        dataType: "json",
        type: 'get'
    }).then((val) => {
        var wrap_list = '';
        // 取出数组

        // 再遍历数组,第一层循环为了遍历数组里的对象
        if (!localStorage.getItem("goods")) {
            localStorage.setItem('goods', '[]')

        }
        var arr = JSON.parse(localStorage.getItem("goods"));
        arr.forEach((obj, i) => {
            // 拿到数组的obj后再和动态渲染的json数组对比id值，符合要求的加入wrap_list；
            // 第二层循环为了遍历ajax返回的数据
            $(val).each(function(index, item) {
                if (obj["id"] == item.id) {
                    wrap_list += ` <li class="clearfix">                
                <input class="chose"  type="checkbox">
                <a href=""><img src="${item.imgUrl}" alt=""></a>
                <span class="title">${item.title}</span>
                <span class="sin_price" >¥<span>${item.price}</span></span>
                <div class="num_wrap"> <span class="iconfont plus">&#xe6aa;</span>
                <input type="text" class="num" data-id="${item.id}" value="${obj.num}"><span class="iconfont minus">&#xe6a9;</span>
                </div>
                <span class="all_price">¥<span>${item.price*obj.num}</span></span>
                <span class="del" >删除</span>
                </li>`
                }
            });
        });
        $('wrap_list').empty();
        // jq要用jq的方法
        $('.wrap_list').append(wrap_list);

        // 购物车todolist搭建，
        var $wrap_list = $('.wrap_list');
        var allNum = 0;
        var sumPrice = 0;
        //点击+号 ，
        $wrap_list.on('click', '.plus', function() {
            var num = $(this).parent().children().eq(1).val();
            num++;
            // 在选中的情况下更新结算总价和数量
            var $choses = $(this).parent().parent().children().eq(0);
            if ($choses.prop('checked')) {
                var targetPrice = $(this).parent().parent().children().eq(3).children().eq(0).text();
                allNum++;
                sumPrice += parseInt(targetPrice);
                hasChose(allNum);
                sum(sumPrice);
            }

            console.log(allNum, sumPrice, $choses, targetPrice);
            // 输出页面结算总价和数量
            // 表单++；并且将总价改变
            changeStroge.call($(this), num);
            allPrice.call($(this), num);
        });

        // 点击-号，
        $wrap_list.on('click', '.minus', function() {
            var num = $(this).parent().children().eq(1).val();
            num--;
            // 数值--；数量为0时，购物车记录移除
            changeStroge.call($(this), num);
            allPrice.call($(this), num);
            // 在选中的情况下更新总价和数量
            var $chose = $(this).parent().parent().children().eq(0);
            if ($chose.prop('checked')) {
                var targetPrice = $(this).parent().parent().children().eq(3).children().eq(0).text();
                allNum--;
                sumPrice -= parseInt(targetPrice);
                hasChose(allNum);
                sum(sumPrice);
            }
            // 输出页面结算总价和数量
            // console.log(allNum, sumPrice, $chose, targetPrice);

        });
        // 更新本地存储
        if (localStorage.getItem("goods") == "[]") {
            addWarn();
        }

        // 表单数字输入
        var value = 0;
        var inpPrice = 0
        $wrap_list.on('focus', '.num', function() {
            value = $(this).parent().parent().children().eq(4).children().eq(1).val();
            inpPrice = $(this).parent().parent().children().eq(3).children().eq(0).text();

            return false;
        })
        $wrap_list.on('input', '.num', function() {
            clearTimeout($(this).timer);
            var num = parseInt($(this).val());
            //  如果是选中状态，对应的总价以及数量也改变,且对应本地存储数据更新
            var $chose = $(this).parent().parent().children().eq(0).prop("checked");
            // 选中
            if ($chose) {
                // 更新选中总数
                if (value - num > 0) {
                    allNum -= value - num;
                    sumPrice -= (value - num) * inpPrice;

                } else {
                    allNum += num - value;
                    sumPrice += (num - value) * inpPrice
                }
                // 更新数量
                hasChose(allNum);
                //更新选中总价
                sum(sumPrice);
                // console.log(allNum, sumPrice);

            };
            // console.log(value, num);
            // 更新数据库
            changeStroge.call($(this), num);
            // 更新当前商品的总价
            allPrice.call($(this), num);
            // 失去焦点
            $_this = $(this);
            $(this).timer = setTimeout(() => {
                $_this.blur();
            }, 2000)

        });

        // 点击删除del
        $wrap_list.on('click', ".del", function() {
            // 当前父级移出
            $(this).parent().remove();
            // 更新本地存储数据
            changeStroge.call($(this), null, true);
            console.log($targetnum);
            // 如果删除的商品是选中的，则更新结算总价和数量
            var $chose = $(this).parent().children().eq(0).prop('checked');
            if ($chose) {
                // 获取当前商品的总价以及数量
                var $targetnum = $(this).parent().children().eq(4).children().eq(1).val();
                var $targetPrice = $(this).parent().children().eq(5).children().eq(0).text();
                $targetnum = parseInt($targetnum);
                $targetPrice = parseInt($targetPrice);
                allNum -= $targetnum;
                sumPrice -= $targetPrice;
            }
            // 更新总数量以及结算总价
            hasChose(allNum);
            sum(sumPrice);
        });

        // 点击全选按钮，
        var $wrap = $('.wrap');

        var $all_chose = $('.allchose');
        var $sum_chose = $('sum_chose');

        $wrap.on('click', '.allchose', function() {
            // 全选按钮的选中数量和结算总价清零，防止之前选中元素影响
            allNum = 0;
            sumPrice = 0;
            // 所有chose选中,并更新对应总价数值
            var $chose = $('.chose');
            $num = $('.wrap_list .num');
            if ($(this).prop('checked')) {
                $chose.prop('checked', true);
                $all_chose.prop('checked', true);

                // 计算被选中商品总数
                $.each($num, (index, item) => {
                    var all_price = $(item).parent().parent().children().eq(5).children().eq(0).text();
                    all_price = parseInt(all_price);
                    sumPrice += all_price;
                    allNum += parseInt($(item).val())
                })

            } else {
                $chose.prop('checked', false);
                $all_chose.prop('checked', false);
                allNum = 0;
                sumPrice = 0;

            };

            // 更新已选商品数据
            hasChose(allNum);
            // 改变结算总价
            sum(sumPrice);
        })


        //   点击chose按钮，
        $wrap_list.on('click', '.chose', function() {
            var $chosed = $('.chose:checked');
            var $chose = $('.chose');
            // 更新总数和总价
            // 点灭，--
            if (!$(this).prop('checked')) {
                // 获取当前商品总数
                //获取当前商品总价
                var $target = $(this).parent().children().eq(4).children().eq(1);
                var $targetPrice = $(this).parent().children().eq(5).children().eq(0);
                allNum -= parseInt($target.val());
                sumPrice -= parseInt($targetPrice.text());
                //更新已选数量内容
                hasChose(allNum);
                sum(sumPrice);
            } else {
                var $target = $(this).parent().children().eq(4).children().eq(1);
                var $targetPrice = $(this).parent().children().eq(5).children().eq(0);
                //高亮++
                allNum += parseInt($target.val());
                sumPrice += parseInt($targetPrice.text());

                //更新已选数量内容
                hasChose(allNum);
                sum(sumPrice);
            };
            // 有一个不亮，全选不亮
            if ($chose.length !== $chosed.length) {
                $all_chose.prop('checked', false);
                return; //截断
            }
            // 否则全选亮
            $all_chose.prop('checked', true);
        })

        // 点击批量删除按钮
        var $delAll = $('#delAll');
        $delAll.click(function() {
            var $chose = $('.chose:checked');
            $chose.each(function(index, item) {
                $(item).parent().remove();
            })
        });
    });

});

// 分析：结算总价以及数量需要变得事件触发：1：+和-号按钮变化，且在选中的状态下，对应的总价以及数量变化:2：删除按钮
// 触发时，如果状态是选中的话，总价以及数量变化，3：在触发全选按钮时，总价以及数量要变。4删除按钮触发，总价和数量要变。
// 5：单选按钮触发时，对应的总价也要变 6：删除选中商品，总价和数量要变