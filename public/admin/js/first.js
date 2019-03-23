
var page = 1
$(function () {

  var pageSize = 5
  //渲染
  render()


  /*添加分类
   1.给按钮注册事件
   2.准备一个添加的模态框
   3.显示这个模态框
   4.实现表单校验\
   5.表单校验通过
  */
  $('.btn_add').on('click', function () {
    $('#addModal').modal('show')
  })
  //表单校验
  var $form = $('form')
  $form.bootstrapValidator({
    //指定对谁进行校验,对应表单中的name属性
    fields: {
      //对categoryName进行校验
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类的名称不能为空'
          }
        }
      }
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok-circle',
      invalid: 'glyphicon glyphicon-remove-circle',
      validating: 'glyphicon glyphicon-refresh'
    },
  })

  //给表单注册表单校验成功的事件
  $form.on('success.form.bv', function (e) {
    //阻止浏览器的默认行为
    e.preventDefault()
    // console.log('haha')
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $form.serialize(),
      success: function (info) {
        console.log(info)
        if (info.success) {
          $('#addModal').modal('hide')
          //重置表单样式
          $form.data('bootstrapValidator').resetForm(true)
          page = 1
          render()
        }
      }
    })
  })




  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        //  console.log(info)
        $('tbody').html(template('tpl', info))


        //分页
        // $("#paginator").bootstrapPaginator({
        //   bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
        //   currentPage: page,//当前页
        //   totalPages: Math.ceil(info.total / info.size),//总页数
        //   size: "small",//设置控件的大小，mini, small, normal,large
        //   onPageClicked: function (a, b, c, p) {
        //     //为按钮绑定点击事件 page:当前点击的按钮值
        //     // console.log("haha",page)
        //     page = p
        //     //重新渲染
        //     render()
        //   }
        // })
        paginator(info, render)
      }
    })
  }
})