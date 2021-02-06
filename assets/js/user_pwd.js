$(function() {
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{2,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不一致';
            }
        },
        rePwd: function(value) {
            if (value === $('[name=newPwd]').val()) {
                return '两次密码不一致';
            }
        }
    });
    $("#replacePwd").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('密码输入错误！');
                }
                layui.layer.msg('密码更新成功！');
                $('#replacePwd')[o].reset();
            }
        });
    })

})