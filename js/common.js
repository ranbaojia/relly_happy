// // 选项卡
class Tabchange {
    constructor(options) {
        this.init(options);
    };
    // 初始化
    init(options) {
        this.prevIndex = options.index || 0;
        this.btn = this.getElement(options.btn);
        this.display = this.getElement(options.display);
        this.setClass(this.btn[this.prevIndex], "tab");
        this.setClass(this.display[this.prevIndex], "block");
        this.addEvent();
    };
    getElement(selector) {
        return document.querySelectorAll(selector);
    };
    // 化页面
    setClass(dom, oClass) {
        dom.className = oClass;
    };
    addEvent() {
        for (var i = 0, len = this.btn.length; i < len; i++) {
            this.btn[i].onmouseenter = function(index) {
                //清除上次点击样式
                this.setClass(this.btn[this.prevIndex], "tab");
                this.setClass(this.display[this.prevIndex], "charge_show");
                //给当前点击的加样式
                this.setClass(this.btn[index], "tab");
                this.setClass(this.display[index], "block");
                this.prevIndex = index;
            }.bind(this, i)
        }
    };
};


// // 选项卡使用方法
// var tab = new Tab({
//     btn: "#container a",
//     display: ".wrap div",
//     index: 2
// })





/* 1、 需求分析， 当点击对应按钮时， 其他按钮熄灭（类名清空）， 当前按钮高亮(即增加高亮类名) */
/*  2、点击按钮时，对应按钮对应菜单展示 */

// 步骤1、 先构建一个构造函数， 固定不变属性加到实例化对象， 方法放在原型里；
// 2、 给a增加点击事件a
;
// (function() {
//     function Tab(options) {
//         this.init();
//     };
//     Tab.prototype = {
//         init(options) {
//             this.prevIndex = options.index || 0;
//             this.btn = this.getElement(options.btn);
//             this.display = this.getElement(options.display);
//             this.setClass(this.btn[this.prevIndex], "active");
//             this.setClass(this.display[this.prevIndex], "content");
//             this.addEvent();
//         },
//         getElement(selector) {
//             return document.querySelectorAll(selector);
//         },
//         // 化页面
//         setClass(dom, oClass) {
//             dom.className = oClass;
//         },
//         addEvent() {
//             for (var i = 0, len = this.btn.length; i < len; i++) {
//                 this.btn[i].onclick = function(index) {
//                     //清除上次点击样式
//                     this.setClass(this.btn[this.prevIndex], "");
//                     this.setClass(this.display[this.prevIndex], "");
//                     //给当前点击的加样式
//                     this.setClass(this.btn[index], "active");
//                     this.setClass(this.display[index], "content");
//                     this.prevIndex = index;
//                 }.bind(this, i)
//             }
//         }


//     }


//     /* 调用方法 */
//     function factory(options) {
//         return new Tab(options);
//     };
//     window.t1 = factory;
// })();

// var t1 = new Tab();

// 拖拽放大镜
(function() {
    function Max(options) {
        this.getDom(options); //添加属性函数以及事件调用函数
    }
    Max.prototype = {
        constructor: Max,
        getDom: function(options) {
            this.wrap = this.getElement(options.wrap); //选择属性元素时有共同的获取元素的方法，调用该函数
            this.small = this.getElement(options.small);
            this.big = this.getElement(options.big);
            this.cap = this.getElement(options.cap);
            this.bimg = this.getElement(options.bimg);
            this.disX = 0;
            this.disY = 0;
            this.l = parseInt(this.small.offsetWidth);
            this.s = parseInt(this.bimg.offsetWidth);
            this.addEvent(); //调用事件处理函数
        },
        getElement: function(selector) {
            return document.querySelector(selector);
        },
        // 事件调用函数
        addEvent: function() {
            var _this = this;
            console.log(this.small);
            this.small.onmouseenter = this.enter.bind(_this);
            this.small.onmouseleave = this.leave.bind(_this);
            this.small.onmousemove = this.move.bind(_this);
        },
        // 鼠标移动事件处理函数
        move: function(ev) {
            var e = ev || window.event;
            var x = 0;
            var y = 0;
            this.disX = this.cap.clientWidth / 2;
            this.disY = this.cap.clientHeight / 2;
            // 遮罩层的left就等于，鼠标位置减去自身宽度一半再减去上层有定位父级距离页面最左侧的距离，
            // top同理即可让遮罩层一直位于鼠标中间位置

            x = e.clientX - this.disX - this.offset(this.cap.offsetParent, false).left;
            y = e.clientY - this.disY - this.offset(this.cap.offsetParent, false).top;
            // console.log(this.offset(this.small, false).left);
            // 边界检测
            if (x < 0) {
                x = 0
                    // clientWidth不包括边框，offsetwidth包括边框
            } else if (x > this.small.clientWidth - this.cap.offsetWidth) {
                x = this.small.clientWidth - this.cap.offsetWidth;
            }
            if (y < 0) {
                y = 0
            } else if (y > this.small.clientHeight - this.cap.offsetHeight) {
                y = this.small.clientHeight - this.cap.offsetHeight;
            }
            this.cap.style.left = x + "px";
            this.cap.style.top = y + "px";
            this.bimg.style.left = -x / this.l * this.bimg.offsetWidth + "px";
            this.bimg.style.top = -y / this.l * this.bimg.offsetHeight + "px";
        },
        // 鼠标进入处理函数
        enter: function() {
            this.cap.style.display = "block";
        },
        // 鼠标移除处理函数
        leave: function() {
            this.cap.style.display = "none";
        },
        // 计算定位元素到页面左侧/顶部的距离
        offset: function(dom, bool) {
            var l = 0
            var t = 0
            var domBDL = dom.clientLeft;
            var domBDT = dom.clientTop;
            while (dom) {
                l += dom.clientLeft + dom.offsetLeft;
                t += dom.clientTop + dom.offsetTop;
                dom = dom.offsetParent
            }
            // return [l,t]
            if (bool) { // 带自身边框
                return {
                    left: l,
                    top: t
                }
            } else { // 不带自身边框
                return {
                    left: l - domBDL,
                    top: t - domBDT
                }
            }
        }
    }

    //  接口连接的工厂函数
    function factory(options) {
        return new Max(options);
    }
    // 对外暴露接口
    window.watch = factory;
})();
// 放大镜使用方法
// watch({
//     wrap: "#wrap",
//     small: ".small",
//     big: ".big",
//     cap: ".cap",
//     bimg: ".big img"
// })