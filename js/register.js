; // 注册数据  加入正则验证
(function() {

    var sub = $q('.next button');
    // 选中成功提示
    var success = $q('.success')
    var user = $q('.register .user');
    var pass = $q('.register .pass');
    // 增加新的user本地存储.工具人思想
    localStorage.setItem('user', "[]");
    var arr = JSON.parse(localStorage.getItem('user'));
    var num_register = $q('.num_register');
    var num_success = $q('.num_success');
    // var success = $q('su')
    // 注册输入框
    var wrap = $q('#content .register_wrap');
    wrap.style.display = "block";
    success.style.display = "none";
    // 显示当前步骤样式
    num_register.style.backgroundColor = "#ff4d4d";
    num_register.style.color = "#fff";
    sub.onclick = function() {
            var obj = {};
            var username = user.value;
            var password = pass.value;
            // var reg1 = /^\w{1,12}$/ig;
            var reg1 = new RegExp('\\w{1,12}', "gi")
            var reg2 = /\w{1,12}/gi;
            var bol1 = reg1.test(username);
            var bol2 = reg2.test(password);
            console.log(reg1.test(username), true);
            console.log(bol1, bol2); //问题一个正则对象只能对应一个变量 
            if (bol1 && bol2) {
                // 创建新的用户对象;
                var obj = {};
                obj[username] = password;
                // 存入数据库对应value的数组
                // console.log(arr.push(obj));//输出数组长度
                arr.push(obj);
                // 存入数据库,数据库的setItem的特点是key值重复则覆盖
                localStorage.setItem('user', JSON.stringify(arr));
                // 成功后跳到第三条显示注册成功,且更新当前3样式，2恢复原状
                num_register.style.backgroundColor = "#fff";
                num_register.style.color = "#666";
                // 第3
                num_success.style.backgroundColor = "#ff4d4d";
                num_success.style.color = "#fff";
                // 并将注册输入框隐藏,提示展示
                wrap.style.display = "none"
                success.style.display = "block";
                alert('注册成功');
                return false;
            } else {
                alert('用户名和密码输入1到12位数字、字母下划线');
                return false;
            }
        }
        //  清除此key值的本地存储数据
        // localStorage.removeItem('user')
})();