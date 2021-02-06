$(function() {
    getUserInfo();
    $('#btnLogout').on('click', function() {
        layui.layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function() {
            localStorage.removeItem('token');
            location.href = '/login.html'
        });
    })
})

function getUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function(res) {
            if (res.status !== 0) return layui.layer.msg(res.message);
            renderAvatar(res.data);
        }

    });
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp；&nbsp;' + name);
    if (user.user_pic !== null) {
        console.log(user.user_pic);
        $('.text-avatar').hide();
        $('.layui-nav-img').prop('src', user.user_pic).show();
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name.substr(0, 1)).show();
    }

}