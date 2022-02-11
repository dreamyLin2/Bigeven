$(function() {
    // 点击登录页面的注册链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击注册表单的登录链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
            //BUG:var pwd = $('.reg-box [name=password]').val() 密码不加引号
            // 自定义了一个叫做 pwd 校验规则
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            // 校验两次密码是否一致的规则
            repwd: function(value) {
                // 通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于的判断
                // 如果判断失败,则return一个提示消息即可
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致！'
                }
            }
        })
        // 监听注册表单的提交事件
        // BUG:监听注册表单的提交事件是写在表单上面的， 不是写在按钮上的
    $('#form_reg').on('submit', function(e) {
        // 1.阻止提交的默认行为
        e.preventDefault()
            // 2.发起Ajax请求
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function(res) {

            if (res.status != 0) {
                layer.msg('res.message');
            }
            layer.msg('注册成功');
            //模拟人的点击行为
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    // BUG:post请求要加引号；function()里面要加e，然后再加阻止提交的默认行为；res.status !== 0 是要写两个等号，不能写一个；

    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                    // console.log(res.token);
                    // 将登录成功后得到的token字符串，保存到localStorge中
                localStorage.setItem('token', res.token)
                    // 登录后台主页
                location.href = '/index.html'
            }
        })
    })

})