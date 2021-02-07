$(function() {
    var layer = layui.layer;
    var form = layui.form;
    initArtCateList();

    function initArtCateList() {
        $.ajax({
            type: 'get',
            url: "/my/article/cates",
            success: function(res) {
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr)
            }
        });
    }
    var indexAdd = null;
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章列表',
            content: $('#dialog-add').html()
        });
    });
    $('body').on('submit', '#formAdd', function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList();
                layer.msg('新增列表成功！');
                layer.close(indexAdd);
            }
        });
    });
    var indexEdit = null;
    $('tbody').on('click', '#btnEdit', function() {
        var id = $(this).attr('data-id')
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章列表',
            content: $('#dialog-edit').html()
        });
        $.ajax({
            type: "get",
            url: "/my/article/cates/" + id,
            success: function(res) {
                form.val('form-edit', res.data);
            }
        });
    });
    $('body').on('submit', '#formEdit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新文章失败！')
                }
                initArtCateList();
                layer.msg('更新文章成功！');
                layer.close(indexEdit);
            }
        });
    });
    $('tbody').on('click', '#btndelete', function() {
        var id = $(this).siblings().attr('data-id');
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！');
                    layer.close(index);
                    initArtCateList();
                }
            });
        });
    })
})