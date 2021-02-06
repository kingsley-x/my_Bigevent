$(function() {
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 8) {
                return "昵称不能超过8个字符";
            }
        }
    })
    initUserInfo();

    function initUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) return layui.layer.msg('获取用户信息失败');
                form.val('formUserInfo', res.data)
            }
        });
    }
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })
    $('#replaceUserInfo').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改用户信息失败！')
                }
                layui.layer.msg(res.message);
                window.parent.getUserInfo();
            }
        });
    })
})