$(function() {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    template.defaults.imports.dataFormat = function(data) {
        const dt = new Date(data);

        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());
        var h = padZero(dt.getHours());
        var f = padZero(dt.getMinutes());
        var s = padZero(dt.getSeconds());

        return y + '-' + m + '-' + d + ' ' + h + ':' + f + ':' + s;
    };

    function padZero(n) {
        return n > 9 ? n : '0' + n;
    };
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    };
    initTable();
    initCate();

    function initTable() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: q,
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取文章列表失败！');
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
                renderPage(res.total);
            }
        });
    };

    function initCate() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败！');
                }
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        });
    };
    $('#form-search').on('submit', function(e) {
        e.preventDefault();
        var id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = id;
        q.state = state;
        initTable();
    })

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function(obj, first) {
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) {
                    initTable();
                }
            }
        });

    }
    $('tbody').on('click', '#btnDelete', function() {
        var id = $(this).attr('data-id');
        var len = $('tbody #btnDelete').length;
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: "get",
                url: "/my/article/delete/" + id,
                success: function(res) {
                    if (res.status !== 0) return layer.msg('删除失败！');
                    layer.msg('删除文章成功！');
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
                    };
                    initTable();
                }
            });
            layer.close(index);
        });
    })
})