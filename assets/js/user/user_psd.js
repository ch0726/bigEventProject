$(function() {

    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        newpwd: function() {
            if ($($(".layui-input")[0]).val() == $($(".layui-input")[1]).val()) {
                return '新密码不能与旧密码相同！';
            }
            if ($($(".layui-input")[1]).val() !== $($(".layui-input")[2]).val()) {
                return '两次密码不一致！';
            }
        }

    });
    //提交密码功能
    $("#btnsubmit").on("click", function(e) {
        var layer = layui.layer;
        e.preventDefault();
        $.ajax({
            method: "post",
            url: "http://ajax.frontend.itheima.net/my/updatepwd",
            headers: { Authorization: localStorage.getItem("token") || "" },
            data: {
                oldPwd: $($(".layui-input")[0]).val(),
                newPwd: $($(".layui-input")[1]).val(),
            },
            success: function(res) {
                // layer.msg(res.message)
                if (res.status == 0) {
                    $(".layui-form")[0].reset();
                    console.log($(".layui-form")[0]);
                    return layer.msg("修改密码成功！")


                }
                layer.msg(res.message);

            },
            templete: function(res) {
                if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
                    location.href = '/login.html';

                };
            }
        })
    })



})