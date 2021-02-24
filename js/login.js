(function() {
    // 点击login和你好请登录,跳转到登录页面,
    // 策略,登录的账户和密码用ajax请求json文件以及本地存储数据;
    // 注册的话就用localstorige解决
    var input_user = $q('.input_area .input_user');
    var input_pass = $q('.input_area .input_pass');
    var input_error = $q('.input_area .input_error');
    var auto_login = $q('.auto_login');
    // 点击登录，触发onsubmit事件
    var login = document.querySelector('.login_button');

    ajax({
        type: 'get',
        url: './json/user.json',
        dataType: 'json'
    }).then((val) => {
        // 密码不正确出现
        var error = $q('.input_area .input_error')
        var area_content = $q('.area_content');
        //  登录时先将json数据存到localstorage里面，在点击拿到整个localstorage的数据进行分解

        // localStorage.setItem('local', JSON.stringify(val));
        // 获取本地数据

        var arrjson = JSON.parse(localStorage.getItem('user')) || [];
        var arrlocal = JSON.parse(localStorage.getItem('local')) || [];

        login.onclick = function() {
            // 合并后台文件和注册的本地数据数组
            var arrAll = arrjson.concat(arrlocal, val);
            // 数据去重,用set
            // arrAll = [...new Set(arrAll)];//Set去重只能用于基本数据类型
            arrAll = arrAll.unique();
            // 由于注册页面每次会覆盖user，所以更新local本地存储
            localStorage.setItem('local', JSON.stringify(arrAll));

            var user = input_user.value;
            var pass = input_pass.value;
            console.log(user, pass);
            arrAll.some(attr => {
                // console.log(attr);
                for (var key in attr) {
                    if (key === user && attr[key] === pass) {
                        alert('密码正确');
                        location.href = './index.html';
                        // 不正确消失
                        error.style.display = 'none';
                        return true;
                    } else {
                        //密码不正确出现
                        error.style.display = 'block';
                    }
                }
            });

        };
        // 清除本地属性
        // localStorage.removeItem('local');
        // localStorage.removeItem('user');
    })
})();

// 数组去重的模块，包括复杂数据类型
(function() {
    // var arr = [1, 2, 3, 1, 2, 3];
    var arr = [{ jia: "123456" }, { jia: "123456" }];

    // 数组去重,NAN和复杂数据类型无法去重
    // Array.prototype.unique = function() {
    //     return this.filter((item, index) => {
    //         return index !== this.indexOf(item);
    //     })
    // }
    // filter只返回值为true的元素
    Array.prototype.unique = function() {
        let obj = {};
        return this.filter(function(item, index, arr) {
            return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true);
        });
    }

    // arr1 = arr.unique();
    // window.unique = unique;
})()