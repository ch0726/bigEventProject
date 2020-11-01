$(function() {
    function inituserinfo() {
        var layer = layui.layer;
        //昵称长度验证
        var form = layui.form;
        form.verify({
            nickname: function(value) {
                if (value.length > 6) {
                    return '昵称长度必须在 1 ~ 6 个字符之间！'
                }
            }
        })
        $.ajax({
                methed: "get",
                url: "http://ajax.frontend.itheima.net/my/userinfo",
                headers: { Authorization: localStorage.getItem("token") || "" },
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg("获取用户信息失败！")
                    }
                    // layer.msg("获取用户信息成功！");
                    //快速为表单赋值
                    form.val("formuserinfo", res.data);
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
            //重置按钮功能
        $("#btnreset").on("click", function(e) {

            e.preventDefault();
            inituserinfo();
        })
    }

    //提交功能
    $(".layui-form").on("submit", function(e) {
            var layer = layui.layer;
            e.preventDefault();
            $.ajax({
                method: "post",
                url: "http://ajax.frontend.itheima.net/my/userinfo",
                headers: { Authorization: localStorage.getItem("token") || "" },
                data: {
                    id: $($(".layui-input")[0]).val(),
                    nickname: $($(".layui-input")[2]).val(),
                    email: $($(".layui-input")[3]).val(),
                },
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg("获取用户信息失败！")
                    }
                    layer.msg("修改成功！")
                    console.log(window.parent.getuserinfo);
                    window.parent.getuserinfo();
                }

            })

        })
        //获取用户信息

    inituserinfo();





})