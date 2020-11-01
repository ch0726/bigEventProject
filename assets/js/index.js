$(function() {
    $.ajax({
        methed: "get",
        url: "http://ajax.frontend.itheima.net/my/userinfo",
        headers: { Authorization: localStorage.getItem("token") || "" },
        success: function(res) {
            console.log(res);
            if (res.status == 0) {
                renderAvater(res.data);
            }
        },
        //无论成功还是失败都会调用的函数-- complate
        complete: function(res) {
            console.log(res.responseJSON);
            if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
                location.href = '/login.html';
                layer.close(index);
            };

        }
    })

    //渲染头像的函数
    function renderAvater(data) {
        var username = data.nickname;
        if (data.nickname == "" || data.nickname == null) {
            username = data.username
        }
        if (username.length >= 5) {
            username = username.substr(0, 5) + "...";
        }
        $("#welcome").html("欢迎你 " + username);
        // $(".layui-nav-img").prop(href(data.user_pic))
        if (data.user_pic !== null) {
            $(".layui-nav-img").attr("src", data.user_pic).show();
            $(".text-avatar").hide();
        } else {
            var str = data.username.substr(0, 1);
            str = str.toUpperCase();
            console.log(str);
            $(".text-avatar").html(str);
            $(".layui-nav-img").hide();
        }
    }

    //退出功能
    $("#btnlogout").on("click", function() {
        console.log(123);
        var layer = layui.layer;
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem("token");
            // 跳转到后台主页
            location.href = '/login.html';
            layer.close(index);
        });
    })
})