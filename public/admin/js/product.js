var page = 1
var pageSize = 5
var picArr = []

var render = function () {
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetailList',
    data: {
      page: page,
      pageSize: pageSize
    },
    success: function (info) {
      console.log(info)
      $('tbody').html(template('tpl', info))

      paginator(info, render)
    }
  })
}

// 页面加载
render()


// 显示添加模态框
$('.btn_add').on('click', function () {
  $('#addModal').modal('show')

  // 发送ajax请求，获取所有的二级分类
  $.ajax({
    type: 'get',
    url: '/category/querySecondCategoryPaging',
    data: {
      page: 1,
      pageSize: 100
    },
    success: function (info) {
      console.log(info)
      $('.dropdown-menu').html(template('tpl2', info))
    }
  })
})


// 二级分类的选择功能
$('.dropdown-menu').on('click', 'a', function () {
  // 修改按钮的文本
  $('.dropdown-text').text($(this).text())
  // 修改隐藏表单的vlaue值
  $('[name=brandId]').val($(this).data('id'))
  $form.data('bootstrapValidator').updateStatus('brandId', 'VALID')
})


// 商品图片上传功能
$('#file').fileupload({
  done: function (e, data) {
    console.log(data.result)
    // 往img_box中添加一张图片
    $('.img_box').prepend('<img src="' + data.result.picAddr + '" width="100" height="100" alt=""> ')
    $('.img_box img').eq(3).remove()

    // 把上传的图片的结构存储到数组中
    picArr.unshift(data.result)
    if (picArr.length > 3) {
      picArr.pop()
    }

    // 判断数组的长度，如果是3，应该让picStatus校验通过
    if (picArr.length === 3) {
      $form.data('bootstrapValidator').updateStatus('picStatus', 'VALID')
    } else {
      $form.data('bootstrapValidator').updateStatus('picStatus', 'INVALID')
    }
  }
})

// 表单校验功能
var $form = $('form')
$form.bootstrapValidator({
  // 指定不校验的类型， 默认对禁用的 隐藏 不可见的不做校验
  excluded: [],
  // 指定对谁进行校验， 对应表单中的name属性
      fields: {
        brandId: {
          validators: {
            notEmpty: {
              message: '请选择一个二级分类'
            }
          }
        },
        proName: {
          validators: {
            notEmpty: {
              message: '请输入商品的名称'
            }
          }
        },
        proDesc: {
          validators: {
            notEmpty: {
              message: '请输入商品的描述'
            }
          }
        },
        num: {
          validators: {
            notEmpty: {
              message: '请输入商品的库存'
            },
            // 1-99999 
            regexp: {
              regexp: /^[1-9]\d{0,4}$/,
              message: '商品库存只能是1-99999之间'
            }
          }
        },
        size: {
          validators: {
            notEmpty: {
              message: '请输入商品的尺码'
            },
            // xx-xx
            regexp: {
              regexp: /^\d{2}-\d{2}$/,
              message: '尺码的格式必须是xx-xx'
            }
          }
        },
        oldPrice: {
          validators: {
            notEmpty: {
              message: '请输入商品的原价'
            }
          }
        },
        price: {
          validators: {
            notEmpty: {
              message: '请输入商品的价格'
            }
          }
        },
        picStatus: {
          validators: {
            notEmpty: {
              message: '请上传3张图片'
            }
          }
        }
      },
      feedbackIcons: {
        valid: 'glyphicon glyphicon-thumbs-up',
        invalid: 'glyphicon glyphicon-thumbs-down',
        validating: 'glyphicon glyphicon-refresh'
      }
    })


// 注册表单校验成功的事件
$form.on('success.form.bv', function (e) {
  e.preventDefault()

  // 获取到了除了picArr之外所有的参数
  var params = $form.serialize()
  params += '&picArr=' + JSON.stringify(picArr)
  // console.log(params)
  // 发送ajax请求
  $.ajax({
    type: 'post',
    url: '/product/addProduct',
    data: params,
    success: function (info) {
      if (info.success) {
        // 关闭模态框
        $('#addModal').modal('hide')
        // 重置表单的内容
        $form.data('bootstrapValidator').resetForm(true)
        // 重新渲染第一页
        page = 1
        render()
        // 重置下拉框的文字和图片
        $('.dropdown-text').text('请选择二级分类')
        picArr = []
        $('.img_box img').remove()
      }
    }
  })
})
