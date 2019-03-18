$(function () {
  //表单校验
  //bootstrapValidator在表单提交的时候做校验
  //如果表单失败了,阻止表单的提交,提示信息
  //如果表单成功了,
  var $form = $('#form');
  $form.bootstrapValidator({
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        // 校验规则
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 3,
            max: 9,
            message: '用户名长度必须在3到9之间'
          },
          //     //正则校验
          //  regexp: {
          //   regexp: /^[a-zA-Z0-9_\.]+$/,
          //   message: '用户名由数字字母下划线和.组成'
          // }

        }

      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 3,
            max: 6,
            message: '用户密码长度必须在3到6之间'
          },
        }

      }
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok-circle',
      invalid: 'glyphicon glyphicon-remove-circle',
      validating: 'glyphicon glyphicon-refresh'
    },
  })
  //给表单注册校验成功的事件
  $form.on('success.form.bv', function (e) {
    //阻止浏览器默认行为
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $form.serialize(),
      success: function (info) {
        if (info.error === 1000) {
          alert('用户名不存在')
        }
        if (info.error === 1001) {
          alert('密码错误')
        }
        if (info.success) {
          location.href = "index.html"
        }
      }
    })
  })
})