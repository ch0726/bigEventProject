// alert(123);
$(function() {
    $("#link_login").on("click", function() {
        $(".login-box").show();
        $(".reg-box").hide();
    })
    $("#link_reg").on("click", function() {
            $(".login-box").hide();
            $(".reg-box").show();
        })
        // 通过layui获取对象
    var form = layui.form;
    // 通过 form.verity()函数自定义校验规则
    form.verify({
            pwd: [/^[\S]{6,12}$/, "密码必须6-12位置，且不能出现空格"],
            reform: function(value) {
                //第一个密码框的值
                var pwd = $('.reg-box [name=password]').val();
                if (pwd !== value) {
                    return '两次密码不一致！'
                }

            },
        })
        //注册验证
    var layer = layui.layer;
    $("#form_reg").on('submit', function(e) {
            //阻止默认行为
            e.preventDefault();
            $.post("http://ajax.frontend.itheima.net/api/reguser", { username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val() }, function(res) {
                console.log($("#form_reg [name=username]").val(), $("#form_reg [name=password]").val());
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功，请登录！");
                // 模拟人的点击行为
                $('#link_login').click();
            })
        })
        // 登录验证
    $("#form_login").on("submit", function(e) {
        e.preventDefault();
        $.post("http://ajax.frontend.itheima.net/api/login", { username: $("#form_login [name=username]").val(), password: $("#form_login [name=password]").val() }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            console.log(res.token);
            layer.msg("登录成功！");
            // 跳转到后台主页
            location.href = '/index.html';
        })
    })

})