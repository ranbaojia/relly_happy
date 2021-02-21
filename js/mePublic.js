// 随机产生一个min到max之间的随机整数
function rand(min, max) {
    return parseInt(Math.random() * (max - min + 1)) + min;
};
// 封装一个生成随机颜色的函数
function getColor() {
    var color = "#"
    for (var i = 0; i < 6; i++) {
        color += rand(0, 15).toString(16)
    };
    return color;
}

// 根据id返回给id对应的元素标签
function $id(id) {
    return document.getElementById(id);
}

// 封装一个方法用来获取页面滚动的距离
function getScroll() {
    if (window.pageYOffset) {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    } else if (document.documentElement.scrollTop) {
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    } else {
        return {
            top: document.body.scrollTop,
            left: document.body.scrollLeft
        }
    }
}

// 判断arr里面是否含有num
function has(arr, num) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == num) {
            return true;
        }
    }
    return false;
}

// 随机产生一个包含n个字母或数字的字符串
function randChar(n) {
    var str = ""; //用来记录随机字符串集合
    for (var i = 0; i < n; i++) {
        // 所以先随机产生一个48-122之间的随机整数
        var code = rand(48, 122)
        if ((code > 57 && code < 65) || (code > 90 && code < 97)) {
            // 如果产生的编码不是数字或字符，本次作废
            i--;
        } else {
            // 如果产生的编码是数字或字符，可以
            var char = String.fromCharCode(code);
            str += char;
        }
    }
    return str;
}
// 封装一个随机产生颜色代码且大小写都有的函数
function getMixColor(i) {
    var str = '';

    for (let i = 0; i < 6; i++) {
        var num = rand(48, 103);
        if ((num > 57 && num < 65) || (num > 70 && num < 97)) {
            /* 拼接前先将数字编码转为asicc码 */
            var char = String.fromCharCode(num);
            str += char;
        } else {
            /* 为了使目标次数和循环次数一致, */
            i--;
        }
    }
    return str;
}


// 封装一个函数来返回指定元素的指定样式
function getStyle(dom, attr) {
    if (window.getComputedStyle) {
        // 如果能进这里，非IE，说明window.getComputedStyle存在
        return window.getComputedStyle(dom, null)[attr]
    } else {
        // 如果进这里，IE浏览器
        return dom.currentStyle[attr]

    }
}


// 随机产生一个包含n个字母或数字的字符串
function randChar(n) {
    var str = ""; //用来记录随机字符串集合
    for (var i = 0; i < n; i++) {
        // 所以先随机产生一个48-122之间的随机整数
        var code = rand(48, 122)
        if ((code > 57 && code < 65) || (code > 90 && code < 97)) {
            // 如果产生的编码不是数字或字符，本次作废
            i--;
        } else {
            // 如果产生的编码是数字或字符，可以
            var char = String.fromCharCode(code);
            str += char;
        }
    }
    return str;
}

// 可以去除字符串两端的空格
function trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "")
}

/* 封装一个处理绑定事件兼容的函数 */
function attachEv(elem, click, bool) {
    if (elem.addEventListener) {
        elem.addEventListener(click, fn, false)
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + click, function fn() {
            /* 由于attachEvent的this不是指向事件源，而是window，所以用call改变他的this指向事件源 */
            fn.call(elem);
        })
    } else {
        elem['on' + click] = fn;
    }
}

/* 封装一个解决PageX/PageY兼容问题的函数,原理client事件对象的方法没有兼容性问题 */
function Page(e) {
    var e = e || window.event;
    return {
        x: document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset + e.clientX,
        y: document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset + e.clientY
    }
}
// 程序优化，由于偏移量属性是只读的，而且每次访问都不要重新计算，
// 所以将他们保存在局部变量中以供下次访问而提高性能
function btPage(e) {
    var e = e || window.event;
    var atop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    var aleft = document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset;
    return {
        x: atop + e.clientX,
        y: aleft + e.clientY
    }
}
/* 键盘按键兼容函数 */
function getKeyCode(e) {
    var ev = e || window.event;
    return ev.keyCode || ev.witch;
}
/* 阻止默认事件兼容问题 */
function def(ev) {
    var e = ev || window.event;
    return e.preventDefault ? e.preventDefault : e.returnValue = false;
}

/* 事件委托兼容问题处理 */
function target(e) {
    var e = e || window.event;
    var target = e.target || e.srcElement;
    return target;
}
/*阻止冒泡事件兼容 */
function propaBuble(e) {
    var e = e || window.event;
    return e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;

}
// 封装trim方法
function trim(str) {
    return str.replace(/\s+/, "")
}

/* 关于clientWidth和clientHeight的兼容处理 */
/* 与偏移量相似，客户区大小也是只读的，有需要每次访问都要重新计算 */
/* document.compatMode == "BackCompat"; */ //确定浏览器是否处于混杂模式，safari3.1之前不支持这个属性，因此自动else
/* Chrome、Opera和Firefox大多数情况下都运行在标准模式下，因此直接else，document.body在ie7之前的版本 */

function getViewport() {
    if (document.compatMode == "backCompat") {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        };
    } else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        };
    }
}

/* 由于ie异步加载过程中script没有load方法(onload方法用于检测文件何时能加载完)异步加载的封装函数 */
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadyStatechange = function() {
            if (readyState == 'complete' || readyState == 'loaded') {
                callback();
            }
        }
    } else {
        script.onload = function() {
            callback();
        }
    }
    script.src = url; /* 由于下载时间不定导致干扰onreadyStatechange所以地址的加载放在最后； */

    document.appendChild(script);
}

// 封装Ajax请求函数
// Ajax的五种状态
// 0、(未初始化)还没有调用open()方法；
// 1、(载入)已调用send()方法，正在发送请求
// 2、(载入完成)send()方法完成，已收到全部响应内容
// 3,、(解析)正在解析响应内容
// 4 、(完成)响应内容解析完成，可以在客户端调用了
// function Ajax(url, fnSucc, fnFaild) {
//     if (window.XMLHttpRequest) {
//         var oAjax = new XMLHttpRequest();
//     } else {
//         var oAjax = new ActiveXObject("Microsoft")
//     }

//     //   2、连接服务器
//     // open(方法，文件名，异步传输)
//     oAjax.open("GET", url, true);
//     // 发送请求
//     oAjax.send();
//     oAjax.onreadystatechange = function() {
//         if (oAjax.readyState == 4) {
//             if (oAjax.status == 200) {
//                 // 如果读取成功，返回读取到的文件文本内容
//                 fnSucc(oAjax.responseText)
//             } else {
//                 if (fnFaild) {
//                     // 如果失败了,返回节点
//                     fnFaild(oAjax.status);
//                 }
//                 // alert("失败：" + oAjax.status);
//             }
//         }
//     }
// }

// 封装鼠标滚轮事件处理函数
function scrollEvent(dom, callBack, bol) {

    var bom = navigator.userAgent.toLowerCase();
    // 火狐
    if (bom.indexOf("firefox") !== -1) {
        dom.addEventListener("DOMMouseScroll", callBack, bol)
    } else { //非火狐中
        dom.onmousewheel = callBack;
    }
}
//封装获取元素的函数
function $q(selector) {
    return document.querySelector(selector)
}

function $qa(selector) {
    return document.querySelectorAll(selector)
}

function $id(id) {
    return document.getElementById(id)
}

// 封装多属性缓动
// function animate(dom, json, callback) {
//     for (var key in json) {
//         if (key == "opacity") {
//             var current = parseInt(getComputedStyle(dom, null)[key] * 100);
//             var target = json[key] * 100;
//         } else if (key.indexOf("scroll") !== -1) {
//             var current = dom[key];
//             var target = json[key];
//         } else {
//             var current = parseInt(getComputedStyle(dom, null)[key]);
//             var target = json[key];
//         }
//         json[key] = {
//             "current": current,
//             "target": target
//         }
//     }

//     clearInterval(dom.timer);
//     dom.timer = setInterval(function() {
//         for (var key in json) {
//             var current = json[key].current;
//             var target = json[key].target;
//             var speed = (target - current) / 10;
//             speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
//             json[key].current += speed;
//             if (Math.abs(target - current) < Math.abs(speed)) {
//                 current = target;
//                 delete key;
//                 for (var attr in json) {
//                     return false;
//                 }
//                 clearInterval(dom.timer)

//                 typeof callback == "function" ? callback() : "";
//             } else {
//                 if (key == "opacity") {
//                     dom.style[key] = json[key].current / 100;
//                 } else if (key.indexOf("scroll") !== -1) {
//                     dom[key] = json[key].current;
//                 } else {
//                     dom.style[key] = json[key].current + "px"
//                 }
//             }
//         }
//     }, 30)
// }

// 封装多属性缓动陈玉蕊-贾存庆方法
function animate(dom, json, callback, t) {
    // var json = {
    //     width: 200,
    //     height: 300,
    //     opacity: 0.1,
    //     left: 100,
    //     zIndex: 99999
    // };
    // function fn() {
    //     console.log('finish')
    // }
    /* 定义定时器前先清除定时器，防止多属性定时器互相干扰 */
    var t = t || 30;

    clearInterval(dom.timer);
    dom.timer = setInterval(move, t);

    function move() {
        // console.log(1)
        flag = true; //定时器每进来一次重新赋值给flag
        for (var attr in json) {
            if (attr == 'opacity') {
                var current = parseInt(getStyle(dom, 'opacity') * 100);
                var target = json[attr] * 100
            } else if (attr.indexOf('scroll') !== -1) {
                var current = dom[attr]; // wrap.scrollTop
                var target = json[attr];
            } else {
                var current = parseInt(getStyle(dom, attr));
                var target = json[attr];
            }
            var speed = (target - current) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            current += speed;
            // console.log(current);
            if (attr == "zIndex") {
                current = json[attr];
            }

            if (current != target) {
                flag = false;
            }

            if (attr == "opacity") {
                dom.style.opacity = current / 100;
                dom.style.filter = "alpha(opacity:" + current + ")";
            } else if (attr == "zIndex") {
                dom.style.zIndex = current;
            } else {
                dom.style[attr] = current + 'px';
            }
            // console.log(attr, current, speed, target);
        }
        /* 为啥放在for...in语句里定时器提前停住，因为只遍历一个属性flag就位true */
        if (flag) {
            // 直到都到达目的地flag执行到这里时
            clearInterval(dom.timer)
            typeof callback == "function" ? callback() : "";
        }
    }

};
/* 跨浏览器的事件绑定处理程序(兼容) */
var EventUtil = {
        addHandler: function(elem, type, handler) {
            if (elem.addEventListener) {
                elem.addEventListener(type, handler, false);
            } else if (elem.attachEvent) {
                /*   编写跨浏览器的代码时， ie的attahEvent事件处理函数会在全局作用域中运行，*/
                /* 因此this指向window， 因此可以用call在调用函数中改变下this指向 */
                elem.attachEvent('on' + type, function() {
                    handler.call(elem);
                });
            } else {
                elem['on' + type] = handler;
            }
        },
        removeHandler: function(elem, type, handler) {
            if (elem.removeEventListener) {
                //此处用匿名函数而不是函数调用名，那么由于复杂数据类型
                elem.removeEventListener(type, handler, false);
            } else if (elem.detachEvent) {

                elem.detachEvent('on' + type, handler);
            } else {
                elem['on' + type] = null;
            }

        }
    }
    // 版本二
    // 封装绑定事件处理函数和移除事件处理函数
var Event = {
    addEvent: function(dom, type, callBack, bol) {
        if (window.addEventListener) {
            dom.addEventListener(type, callBack, bol)
        } else if (window.attachEvent) {
            dom.attachEvent("on" + type, function() {
                callBack.call(dom);
            })
        } else {
            dom["on" + type] = callBack
        }
    },
    removeEvent: function(type, dom, callback) {
        if (window.removeEventListener) {
            dom.removeEventListener(type, callback)
        } else if (window.detachEvent) {
            dom.detachEvent("on" + type, callback);
        } else {
            dom["on" + type] = null;
        }
    }

}

//封装事件委托函数使用封装委托函数注意事项1parent不能传字符串，因为他是获取的父级对象
//2type不能用on+type，因为绑定事件处理函数已经对on做了处理
function onTarget(parent, type, selector, callback) {

    Event.addEvent(parent, type, function(ev) {
        var e = ev || window.event;
        var target = e.target || e.srcElement;
        var selector_first = selector.substr(0, 1);
        var selector_type = null;
        var selector_last = null;
        switch (selector_first) {
            case ".":
                selector_type = "className";
                selector_last = selector.substr(1);
                break;
            case "#":
                selector_type = "id";
                selector_last = selector.substr(1);
                break;
            default:
                selector_type = "tagName";
                selector_last = selector.toUpperCase();
        }
        if (target[selector_type] == selector_last) {

            callback.call(target, e)
        }
    })
}
// 封装byClass函数取class第一个元素
function byClas(oClass) {
    var all = document.all || document.getElementsByTagName("*");
    var reg = new RegExp("\\b" + oClass + "\\b");
    var arr = [];
    for (var i = 0, len = all.length; i < len; i++) {
        if (reg.test(all[i].className)) {
            arr.push(all[i])
        }
    }
    return arr[0];
}
// 封装byClass函数
function byClass(oClass) {
    var all = document.all || document.getElementsByTagName("*");
    var reg = new RegExp("\\b" + oClass + "\\b");
    var arr = [];
    for (var i = 0, len = all.length; i < len; i++) {
        if (reg.test(all[i].className)) {
            arr.push(all[i])
        }
    }
    return arr;
}

// 获取某个元素到最外层左侧/顶部的距离
function offset(dom, bool) {
    var l = 0
    var t = 0
    var domBDL = dom.clientLeft
    var domBDT = dom.clientTop
    while (dom) {
        l += dom.clientLeft + dom.offsetLeft
        t += dom.clientTop + dom.offsetTop
        dom = dom.offsetParent
    }
    // return [l,t]
    if (bool) { // 带自身边框
        return { left: l, top: t }
    } else { // 不带自身边框
        return { left: l - domBDL, top: t - domBDT }
    }
}

// 封装个ajax库
function ajax(options) {
    return new Promise((resolve, reject) => {
        // 1.创建数据交互对象（XMLHttpRequest）
        var xhr = new XMLHttpRequest() //除了IE56其他都支持
        var data = ''
        if (typeof options.data === 'string') {
            //如果参数是字符串不做任何处理
            data = options.data;
        }
        if (Object.prototype.toString.call(options.data) === '[object Object]') {
            // 如果参数是对象，转成参数字符串 'user=xiaocuo&pass=123456'
            for (var key in options.data) {
                data += (key + '=' + options.data[key] + '&')
            }
            // 'user=xiaocuo&pass=123456&'
            data = data.substring(0, data.length - 1);
        }
        // console.log(data)//'user=xiaocuo&pass=123456'
        if (options.type.toLowerCase() === 'get') {
            // 在此处添加jsonp处理函数
            if (options.dataType.toLowerCase() === "jsonp") {
                window[options.jsonpCallback] = options.success;
                // 动态添加script标签
                var oScript = document.createElement("script");
                oScript.src = options.url + "?" + options.jsonp + "=" + options.jsonpCallback +
                    "&" + data;
                document.body.appendChild(oScript);
                // 数据加载完成后删除script标签
                oScript.onload = function() {
                    document.body.removeChild(oScript);
                }
                return;
            }
            // 2.初始化请求
            if (options.cache) {
                xhr.open(options.type, options.url + '?' + data, true)
            } else {
                xhr.open(options.type, options.url + '?' + data + '&_=' + Date.now(), true)
            }
            // 3.发送请求
            xhr.send(null);
        } else if (options.type.toLowerCase() === 'post') {
            // 2.初始化请求
            xhr.open(options.type, options.url, true)
                // 设置请求头，模拟表单post提交数据
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                // 3.发送请求
            xhr.send(data);
        } else {
            alert('仅支持 get和post 请求方式！');
            return; //结束执行
        }
        // 4.请求响应状态
        // xhr.readyState 属性值会从0-4发送变化
        // 当xhr.readyState属性发生变化时，会触发onreadystatechange事件
        xhr.onreadystatechange = function() {
            // console.log( xhr.readyState )//2 3 4
            if (xhr.readyState === 4) { //请求完成
                // 响应状态码 xhr.status
                if (xhr.status >= 200 && xhr.status < 300) { // 响应就绪
                    // 可以拿到数据了
                    // xhr.responseText  接收文本字符串数据
                    // xhr.responseXML  接收xml数据
                    if (options.dataType === 'json') {
                        var json = JSON.parse(xhr.responseText)
                        resolve(json)
                    } else if (options.dataType === 'xml') {
                        resolve(xhr.responseXML)
                    } else {
                        resolve(xhr.responseText)
                    }
                } else {
                    reject(xhr.status);
                }
            }
        }
    })

}

// 获取url中的某个参数值
function getQueryString(key) {
    var url = location.href;
    var searchStr = url.split('?')[1];
    var reg = new RegExp('[&]?' + key + '=([^&#]*)[&]?', 'i');
    var arr = searchStr.match(reg);
    return (RegExp.$1);
}

// 封装设置cookie
function setCookie(options) {
    if (!options.key || !options.val) {
        throw new Error('设置失败，缺少必须参数！')
    }
    // 可选参数的默认值
    options.domain = options.domain || ''
    options.path = options.path || ''
    options.days = options.days || 0
        // 判断是否设置有效期
    if (options.days === 0) { //不设置有效期
        document.cookie = options.key + '=' + escape(options.val) + '; domain=' + options.domain + '; path=' + options.path
    } else { //设置有效期
        var d = new Date()
        d.setDate(d.getDate() + options.days)
        document.cookie = options.key + '=' + escape(options.val) + '; domain=' + options.domain + '; path=' + options.path + '; expires=' + d
    }
}

// 封装获取cookie
function getCookie(key) {
    var arr = document.cookie.split('; ')
        // ["user1=xiaoming", "user3=xiaodong"]
    for (var i = 0, len = arr.length; i < len; i++) {
        var arr2 = arr[i].split('=') // ["user1","xiaoming"]
        if (arr2[0] === key) {
            // return arr2[1]
            return unescape(arr2[1])
        }
    }
    return null //没有数据
}

// 删除cookie
// cookie过期会被浏览器删除
function removeCookie(key) {
    setCookie({
        'key': key,
        'val': '123',
        days: -2
    })
}