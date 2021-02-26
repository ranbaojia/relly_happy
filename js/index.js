 // 一二级菜单样式展现
 (function() {
     //二级菜单选项卡切换
     // 获取一级菜单
     // 需求， 鼠标移入一级菜单， 二级菜单展示， 鼠标移出一级菜单， 二级菜单消失（ 如果此时鼠标移入二级菜单， 二级菜单继续展示）
     var cla_show = $q(".main_left .cla_show")
     var classify_li = $qa(".main_left .classify li");
     var classify = $q(".classify")
     var previndex = 0;
     var cla_second = $qa(".main_left .cla_show .cla_second");
     var index = 0;
     //  给一级菜单事件委托
     //  for (var i = 0, len = classify_li.length; i < len; i++) {
     //      classify_li[i].index = i
     //  }
     //  onTarget(classify, "mouseover", "li", function(ev) {
     //      var cla_second = this.parentNode.parentNode.children[1].children;
     //      var e = ev || window.event;
     //      var from = e.relatedTarget || e.fromElement;
     //      while (from) {
     //          //  从目标元素进入子集，不触发函数
     //          if (from == this) {
     //              return false;
     //          };
     //          from = from.parentNode;
     //      };
     //      console.log("第一次");
     //      cla_second[this.index].style.display = "block";

     //      console.log(cla_second);
     //      var _this = this
     //      this.onmouseover = function(ev) {
     //          var e = ev || window.event;
     //          var from = e.relatedTarget || e.fromElement;
     //          while (from) {
     //              //  从目标元素进入子集，不触发函数
     //              if (from == this) {
     //                  return false;
     //              };
     //              from = from.parentNode;
     //          };
     //          console.log("进入");
     //          cla_second[previndex].style.display = "none";
     //          cla_second[_this.index].style.display = "block";
     //          previndex = this.index;
     //      };


     //      //  此函数实现两个功能，从外部进入目标元素触发事件，在
     //  });

     //  onTarget(cla_show, "mouseover", ".cla_show", function(ev) {
     //      var cla_second = this.children;
     //      console.log(this);
     //      var e = ev || window.event;
     //      var from = e.relatedTarget || e.fromElement;

     //      this.mouse
     //      while (from) {
     //          //  目标元素是from(从哪里来);不触发事件
     //          if (from == this) {
     //              return false;
     //          }
     //          from = from.parentNode;
     //      }
     //      this.style.display = "block";
     //  });
     //  onTarget(cla_show, "mouseout", ".cla_second", function(ev) {
     //      var e = ev || window.event;
     //      var from = e.relatedTarget || e.fromElement;

     //      while (from) {
     //          //  目标元素是from(从哪里来);不触发事件
     //          if (from == this) {
     //              return false;
     //          }
     //          from = from.parentNode;
     //      };
     //      this.style.display = "none";
     //      previndex = 0;
     //  });

     //  onTarget(classify, "mouseout", ".classify", function(ev) {
     //      var cla_second = this.parentNode.parentNode.children[1].children;

     //      for (var i = 0, len = classify_li.length; i < len; i++) {
     //          classify_li[i].index = i;
     //      }
     //      //  此函数实现两个功能，从外部进入目标元素触发事件，在
     //      var e = ev || window.event;
     //      var from = e.relatedTarget || e.fromElement;
     //      console.log(from);
     //      while (from) {
     //          //  从目标元素进入子集，不触发函数
     //          if (from == this) {
     //              return false;
     //          };
     //          from = from.parentNode;
     //      };
     //      cla_second[previndex].style.display = "none";
     //  });

     for (var i = 0, len = classify_li.length; i < len; i++) {
         classify_li[i].index = i;
         classify_li[i].onmouseenter = function() {
             cla_second[previndex].style.display = "";
             cla_second[this.index].style.display = "block";
             previndex = this.index;

         }

         // 进入二级菜单，三级菜单要展示
         cla_second[i].onmouseenter = function() {
             this.style.display = "block";
         };
         //移出二级菜单，对应的三级菜单也要消失
         cla_second[i].onmouseleave = function() {
             this.style.display = "none";
         };

     };
     // 离开一级级菜单，选项卡也要消失
     classify.onmouseleave = function() {
         cla_second[previndex].style.display = "none";
     };
     // 注意在这里不能使用委托事件，不然进入三级菜单的子菜单，display三级菜单会消失
     // 委托事件只适合进入到对应子菜单改变样式，要是还要进入孙子菜单如display就会发生变化
 })();


<<<<<<< HEAD
=======
 // 搜索框跨域jsonp访问

 // 当输入框输入文字时，下拉提示框出现
 (function() {
     var search_json = $q(".search_json ");
     var search_text = $q(".search_input");
     search_text.oninput = function() {
         search_json.style.display = "block";
         ajax({
             type: "get",
             data: "wd=" + search_text.value,
             url: "http://suggestion.baidu.com/su",
             jsonp: "cb",
             jsonpCallback: "test",
             dataType: "jsonp",
             success: function(json) {
                 var str = ""
                 console.log(json)
                 json.s.forEach(function(item) {
                     str += `<li><a  href="javascript:"> ${item}</a></li>`;
                 })
                 search_json.innerHTML = str;
             }
         })
     };
     // 当输入框失去焦点时下拉提示消失
     search_text.onblur = function() {
         search_json.style.display = "none";
     };

     // 当鼠标移出下拉提示框时， 1s 后消失;
     search_json.onmouseleave = function() {
         setTimeout(function() {
             search_json.style.display = "none";
         }, 1500);
     };

 })();


>>>>>>> test
 // 轮播图js

 (function() {
     var imgsmax = $qa(".wrap_img li");
     var ali = $qa(".banner_wrap .btn span");
     var main_imgwrap = $q(".wrap_img");
     var banner_list = $q(".banner_list")
     var next = $q(".banner_wrap .nexts");
     var prev = $q(".banner_wrap .prevs");
     var imgIndex = 0;
     var prevIndex = 0;
     var timer = null;
     var mark = 0;
<<<<<<< HEAD
     console.log(ali);
=======
>>>>>>> test
     // 背景颜色变化的数据库
     var arr = ['#A6D8C7', '#EAC7A1', '#F2BFC7', '#F2BFB7', '#B90909', '#D8453B']
     var lastTime = 0;

     // 初始化当前背景颜色
     banner_list.style.backgroundColor = arr[imgIndex];
     //第一步 进入页面执行自动播放函数封装
     animate(imgsmax[imgIndex], {
         "opacity": 1
     }, function() {
         autoPlay();
     });

     function autoPlay() {
         timer = setInterval(function() {
             moveNext()
         }, 2000)
     }

     //第二步  封装往下一张索引运动的函数

     function moveNext() {
         // console.log(1);
         // 在自动播放的时候， 每个图片都会有个animate动画，如果autoPlay执行太快，前两个动画还没走完，就已经到当前动画，
         //会导致上上个动画到达target而没有设置回0.1，从而错乱;解决方法一：将animate动画速度加快
         //，二清除上一个图片的定时器，不会导致动画还在继续执行而产生异步操作，错过imgs[prevIndex].style.opacity = 0.1;
         clearInterval(imgsmax[prevIndex].timer);

         //  清除上一张图片显示类名
         imgsmax[prevIndex].className = "";
         ali[prevIndex].className = ""
             //并且把上一张图片的透明度改为0.1
         imgsmax[prevIndex].style.opacity = 0.1;
         // 当前索引加1
         imgIndex++;
         // 判断临界值
         if (imgIndex > imgsmax.length - 1) {
             imgIndex = 0;
         }
         // 给当前图片添加样式
         imgsmax[imgIndex].className = "show";
         ali[imgIndex].className = "light";
         // 调用多属性封装函数;
         // 改变当前背景颜色
         banner_list.style.backgroundColor = arr[imgIndex];
         animate(imgsmax[imgIndex], {
             "opacity": 1
         });
         // 用上一次索引保存当前索引值
         prevIndex = imgIndex;
     }
     // 封装向上一张移动的函数
     function movePrev() {
         clearInterval(imgsmax[prevIndex].timer)
             // 清空上一张图片样式
         imgsmax[prevIndex].className = "";
         ali[prevIndex].className = ""
         imgsmax[prevIndex].style.opacity = 0.1;

         imgIndex--;
         if (imgIndex < 0) {
             imgIndex = imgsmax.length - 1;
         }
         // 给当前图片添加样式
         imgsmax[imgIndex].className = "show";
         ali[imgIndex].className = "light";
         // 改变当前背景颜色
         banner_list.style.backgroundColor = arr[imgIndex];
         animate(imgsmax[imgIndex], {
             "opacity": 1
         });
         prevIndex = imgIndex;
     }
     //第三步 点击箭头按钮切换图片
     next.onclick = function() {
         clearInterval(timer);
<<<<<<< HEAD
         var nowTime = Date.now();
         //  同样用函数节流，防止用户点击过快
         if (lastTime && (nowTime - lastTime) < 100) {
=======
         clearInterval(imgsmax[prevIndex].timer)
         var nowTime = Date.now();
         //  同样用函数节流，防止用户点击过快
         if (lastTime && (nowTime - lastTime) < 200) {
>>>>>>> test
             // 这里用防抖节流最后点击的一次把autoplay加在定时器里会
             // 和autoplay的定时器发生冲突
             // clearInterval(next.timer)
             // next.timer = setInterval(() => {
             //     autoPlay();
             // }, 1000);
             clearInterval(timer)
             autoPlay();
         } else {
             lastTime = nowTime;
             moveNext();
         }
     }

     // 点击上一张，切换到上一张图片
     prev.onclick = function() {
         // 先清除定时器， 等到图片运动到达target在调用movePrev()和autoplay();
<<<<<<< HEAD
         clearInterval(timer);
         var nowTime = Date.now();

         if (lastTime && (nowTime - lastTime) < 100) {
=======
         clearInterval(imgsmax[prevIndex].timer)
         clearInterval(timer);
         var nowTime = Date.now();

         if (lastTime && (nowTime - lastTime) < 200) {
>>>>>>> test
             clearInterval(timer)
                 // 最后一次点击，触发一次自动播放
             autoPlay();
         } else {
             lastTime = nowTime;
             movePrev();
         }
     };
     // 阻止双击默认事件点击会选中文本
     // 当鼠标移入图片，清除自动播放
     main_imgwrap.onmouseover = function() {
         clearInterval(timer);
         // 当mark为1时，再清除当前图片定时器，目的为了让当前图片完全到达target
         clearInterval(imgsmax[imgIndex].timer);
         // 处理页面刚打开，定时器还没走完就被清除的bug
         animate(imgsmax[imgIndex], {
             "opacity": 1
         })

     }
     main_imgwrap.onmouseout = function() {
             autoPlay();
         }
         //第四步 点击小图标，对应播放图片动画。
     for (var i = 0, len = imgsmax.length; i < len; i++) {
         ali[i].index = i;
         ali[i].onmouseenter = function() {
             clearInterval(timer);
             // 清空上一张图片的定时器
             clearInterval(imgsmax[prevIndex].timer);
             // 清空上一张样式
             imgsmax[prevIndex].className = "";

             ali[prevIndex].className = "";
             // 上次显示的图片透明度为0.1
             imgsmax[prevIndex].style.opacity = 0.1;
             // 更新imgIdex
             imgIndex = this.index;
             ali[imgIndex].className = "light";
             imgsmax[imgIndex].className = "show";
             // 改变当前背景颜色
             banner_list.style.backgroundColor = arr[imgIndex];
             animate(imgsmax[this.index], {
                 "opacity": 1
             })
             prevIndex = imgIndex;
             autoPlay();
         }
     }
 })();


 // 选项卡区
 // 调用Tabchange选项卡面向对象
 var tab = new Tabchange({
     btn: ".charge_icon .tab",
     display: ".charge_show",
     index: 0
 });
 // 鼠标移入icon图表,

 (function() {
     var wrap = $q('.charge_icon')
     var move = $q('.charge_input');
     var mark = $q('.charge_input .iconfont');
     // 事假委托，移入mousemove_wrap，动画启动
     onTarget(wrap, 'mouseover', '.tab', function() {
         //tickets-wrap 向上移动,ticket_charge展示，向上移动63px;
         // animate(wrap, { "top": "0" });
         move.style.display = "block";
         // 待.ticket_charge移动到目的地， 执行animate的回调函数， 把tickets-wrap移回原地
         animate(move, {
             "top": "70"
         }, function() {
             // animate(wrap, { "top": "0" });
             console.log('完成');
         }, 15)
     });

     //点击叉号,消失且回到原来的地方
     mark.onclick = function() {
         move.style.display = 'none';
         animate(move, {
             'top': '140'
         }, function() {
             console.log('完成');
         })
     }
 })();


 // 倒计时区
 // 倒计时区
 (function() {
     function common(n) {
         return n > 9 ? n : "0" + n;
     }
     //    封装倒计时函数
     function reverseTime() {
         var spanhours = $q(".time_wrap .on");
         var spanminutes = $q(".time_wrap .tw");
         var spansecond = $q(".time_wrap .th");
         var time = new Date();
         // 获取现在时间的小时数
         var nowHour = time.getHours();
         var nowTime = time.getTime();
         // 未来时间在偶数小时内都作为倒计时终点
         if (nowHour % 2) {
             time.setHours(nowHour + 1);

             var t = time.getHours();
             var someTime = new Date();
             var y = someTime.getFullYear();
             var m = someTime.getMonth();
             var d = someTime.getDate();

             var h = t;
             //京东页面设置秒杀开始的时间
             var showTime = t - 2;
             if (h == 0) {
                 var showTime = "22";
                 d = d + 1;
             } else {
                 var showTime = h - 2;
             }

             showTime = common(showTime)
                 // 时间在字符串里设置的月份是1-12
             var newTime = new Date(`${y}/${m+1}/${d} ${h}:00:00`)
         } else {
             time.setHours(nowHour + 2);
             var t = time.getHours();
             var someTime = new Date();
             var y = someTime.getFullYear();
             var m = someTime.getMonth();
             var d = someTime.getDate();
             var h = t;
             //京东页面设置秒杀开始的时间

             if (h == 0) {
                 var showTime = "22";
                 // d = d + 1;
             } else {
                 var showTime = h - 2;
             }

             showTime = common(showTime)
             var newTime = new Date(`${y}/${m+1}/${d} ${h}:00:00`)
         }

         var allTime = newTime - nowTime;
         var day = parseInt(allTime / (24 * 60 * 60 * 1000));
         var hour = parseInt(allTime % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
         /********************************  模天剩余不够一天的小时  模小时剩余不够1小时的分钟*/
         var minutes = parseInt(allTime % (24 * 60 * 60 * 1000) % (60 * 60 * 1000) / (60 * 1000));
         var seconds = parseInt(allTime % (24 * 60 * 60 * 1000) % (60 * 60 * 1000) % (60 * 1000) / 1000)

         day = common(day);
         hour = common(hour);
         minutes = common(minutes);
         seconds = common(seconds);
         // 倒计时开始显示区如18:00开始
         // 倒计时显示区
         spanhours.innerText = hour;
         spanminutes.innerText = minutes;
         spansecond.innerText = seconds;

     }
     var timer = setInterval(reverseTime, 30);
 })();


 // 渲染商品列表区
 //  (function() {
 //      ajax({
 //          type: 'get',
 //          dataType: 'json',
 //          url: './json/index.json'
 //      }).then((val) => {
 //          var str1 = '';
 //          var main_left_list = $q('.main_container .main_left ul')
 //          var obj = val[0].goodslist;
 //          for (var key in obj) {
 //              var str2 = "";
 //              obj[key].forEach((item, index) => {
 //                  str2 += `<a href="./goodslist.html">${item}</a>`
 //              })
 //              str1 += `<li>${str2}</li>`;
 //          }
 //          main_left_list.innerHTML = str1;
 //      })
 //  })();

 //  渲染每日必抢
 (function() {
     ajax({
         dataType: 'json',
         url: './json/guess.json',
         type: 'get'
     }).then((val) => {
         var charge_barOne = $q('.charge_wrap .charge_bar .one');
         var charge_barTwo = $q('.charge_wrap .charge_bar .two')
         var str1 = '',
             str2 = '';
         val[0].charge.forEach((item, index) => {
             if (index <= 3) {
                 str1 += ` 
             <li>
                 <a href="./detial.html  "><img src="${item.imgUrl}" alt=""></a><span class="charge_price">${item.price} <i>¥399</i><a href="./detial.html">${item.title}</a></span>
             </li>
                 `
             } else if (index > 3) {
                 str2 += `
             <li>
             <a href="./detial.html  "><img src="${item.imgUrl}" alt=""></a><span class="charge_price">${item.price} <i>¥399</i><a href="./detial.html">${item.title}</a></span>
             </li>
             `
             }
         })
         charge_barOne.innerHTML = str1;
         charge_barTwo.innerHTML = str2;
     })
 })();



 // 渲染商品列表三级菜单//完全渲染
 //  (function() {
 //      ajax({
 //          type: 'get',
 //          dataType: 'json',
 //          url: './json/index.json'
 //      }).then((val) => {
 //          var Array = val[0].thirdMenu.arr;
 //          // console.log(obj);
 //          var str1 = "";
 //          var cla_show = $q('.cla_show');
 //          Array.forEach((itemOne) => {
 //              var str2 = "";
 //              //  console.log(itemOne); //15个obj
 //              itemOne.cla_third.forEach((itemTwo, index) => {
 //                  var str3 = "";
 //                  for (var key in itemTwo) {
 //                      if (key === "fourObj") {
 //                          itemTwo[key].forEach((itemThree) => {
 //                              str3 += `<li><a href="./goodslist.html">${itemThree}</a></li>`
 //                          });
 //                      } else if (key === "shopping_list") {
 //                          itemTwo[key].forEach((itemThree) => {
 //                              str3 += `<li><a href="./goodslist.html">${itemThree}</a></li>`
 //                          });
 //                      } else {
 //                          itemTwo[key].forEach((itemThree) => {
 //                              str3 += `${itemThree}`
 //                          });
 //                      }
 //                  }
 //                  if (index === 0) {
 //                      str2 += `<ul class="cla_third clearfix">${str3}</ul>`;
 //                  } else if (index === 1) {
 //                      str2 += `<ul class="shopping_list clearfix">${str3}</ul>`;
 //                  } else {
 //                      str2 += `<div class="num">${str3}</div>`;
 //                  }

 //              });
 //              str1 += `<li class="cla_second">${str2}</li>`
 //                  //  console.log(str1, str2);
 //          });
 //          cla_show.innerHTML = str1;
 //      });
 //  })();

 //  渲染商品三级菜单
 (function() {
     ajax({
         type: 'get',
         dataType: 'json',
         url: './json/index.json'
     }).then((val) => {
         var Array = val[0].goodsArr;
         // console.log(obj);
<<<<<<< HEAD
         console.log(Array);
         var cla_show = $q('.cla_show');
         var cla_second = $qa('.cla_second');
         console.log(cla_second);
=======
         var cla_show = $q('.cla_show');
         var cla_second = $qa('.cla_second');
>>>>>>> test
         Array.forEach((itemOne, num) => {
             //  console.log(itemOne); //15个obj
             var str1 = "";
             itemOne.cla_third.forEach((itemTwo, index) => {
                 var str2 = "";
                 for (var key in itemTwo) {
                     if (key === "fourObj") {
                         itemTwo[key].forEach((itemThree) => {

                             str2 += `<li><a href="./goodslist.html">${itemThree}</a></li>`
                         });
                     } else if (key === "shopping_list") {
                         itemTwo[key].forEach((itemThree) => {
                             str2 += `<li><a href="./goodslist.html">${itemThree}</a></li>`
                         });
                     } else {
                         itemTwo[key].forEach((itemThree) => {
                             str2 += `${itemThree}`
                         });
                     }
                 }
                 if (index === 0) {
                     str1 += `<ul class="cla_third clearfix">${str2}</ul>`;
                 } else if (index === 1) {
                     str1 += `<ul class="shopping_list clearfix">${str2}</ul>`;
                 } else {
                     str1 += `<div class="num">${str2}</div>`;
                 }

             });
             cla_second[num].innerHTML = str1;
<<<<<<< HEAD
             console.log(cla_second[num]);


         });
         console.log(cla_show);
=======
         });
>>>>>>> test
     });
 })();

 // 渲染主页猜你喜欢数据
 (function() {
     ajax({
         dataType: 'json',
         url: './json/guess.json',
         type: 'get'
     }).then((val) => {
         var list = $q('#guess .guess_list')
         var str = '';
         val[0].detail.forEach((item, index) => {
             str += ` 
                    <li class="clearfix">
                        <a href="./detial.html"><img src="${item.imgUrl}" alt=""></a>
                        <div>
                            <a href="./detial.html">${item.title}</a>
                            <span>¥${item.price}</span>
                        </div>
                    </li>
                `
         })
         list.innerHTML = str;

     })
 })();


 // 思路，根据变化选项的层级实现动图效果
 (function() {


     function init(dom) {

         var prevIndex = 0;
         var dtIndex = 0;
         // 切换
         var tab = $qa(`.${dom} .head_chose li`);
         // 展示
         var show = $qa(`.${dom} .floor_r_wrap dt`)
             // 当鼠标移入tab时，对应的tab栏高亮，且展示的z-index升高

         for (var i = 0, len = tab.length; i < len; i++) {
             tab[i].index = i;

             tab[i].onmouseenter = function() {
                 // 将上一次样式清除
                 tab[prevIndex].className = ''
                 show[prevIndex].style.zIndex = '1';
                 //  改变当前样式
                 this.className = 'active';
                 show[this.index].style.zIndex = '9';
                 // 更新本上次索引
                 prevIndex = this.index;
             }


         }
         // 点击箭头更新上一次tab和上一次show的层级，做边界检测

         var next = $q(`.${dom} .floor_r_wrap .next`)
         next.onclick = function() {
             //   清除数组上次索引样式
             tab[prevIndex].className = '';
             show[prevIndex].style.zIndex = '1';
             // 更新当前索引
             prevIndex++;
             // 做边界检测
             if (prevIndex >= tab.length) {
                 prevIndex = 0;
             }
             // 更新样式
             tab[prevIndex].className = 'active';
             show[prevIndex].style.zIndex = '9';
         }

         // 内部小轮播图动画效果

         var nexts = $q(`.${dom} .floor_r_wrap .special .special_left .nexts`);
         var prevs = $q(`.${dom} .floor_r_wrap .special .special_left .prevs`);
         // 选中当前父级的两个li元素
         var special = nexts.parentNode.children[0].children;
         // 上次缩影
         var doneIndex = 0;
         var index = 0;
         //点击下一次按钮
         nexts.onclick = function() {
             // 更新上次索引层级
             special[doneIndex].style.zIndex = '';
             // 更新当前索引
             index++;
             // 边界检测
             if (index >= special.length) {
                 index = 0;
             }
             // 显示当前样式
             special[index].style.zIndex = '9';
             // 更新上次索引
             doneIndex = index;
         }


         // 更新上一次
         prevs.onclick = function() {
             // 更新上次索引层级
             special[doneIndex].style.zIndex = '';
             // 更新当前索引
             index--;
             // 边界检测
             if (index < 0) {
                 index = special.length - 1;
             }
             // 显示当前样式
             special[index].style.zIndex = '9';
             // 更新上次索引
             doneIndex = index;
         }

     }

     //    楼层调用
     // 1楼
     init('one_floor');
     // 2楼

     init('two_floor');
     // 3楼

     init('three_floor');
     // 4楼
     init('four_floor');
     // 5楼
     init('five_floor');
     // 6楼
     init('six_floor');
     // 7楼
     init('seven_floor');


 })();