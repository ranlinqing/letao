

$(function () {
  //1.等待DOM加载
  //2.避免全局污染

  var page = 1
  var pageSize = 5
  render()
  //发送ajax请求
  //启用和禁用功能
  //1.给启用和禁用注册事件
  //2.弹出模态框
  //3.给确定注册事件
  //4.发送ajax请求,启用获取禁用用户
  $('tbody').on('click', '.btn', function () {
    //弹出模态框
    $('#userModal').modal('show')
    //获取到用户的id以及是否启用禁用的状态
    id = $(this).parent().data('id')
    // console.log(id)

    //isDelete
    // var isDelete = $(this).text() === '启用' ? 1 : 0
    isDelete = $(this).hasClass('btn-success') ? 1 : 0
    // console.log(id,isDelete)
   
  })

  //
  $('.update').on('click', function () {
    console.log("我要启用")
    $.ajax({
      type: "post",
      url: '/user/updateUser',
      data: {
        id: id,
        isDelete: isDelete
      },
      success : function(info){
        console.log(info)
        if(info.success){
          //关闭模态框
          $('#userModal').modal('hide')
          //重新渲染
          render()
        }
      }
    })
  })



  //渲染
  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info)
        var html = template('user_tpl', info)
        $('tbody').html(html)

        //分页的功能必须在ajax的数据请求回来之后,才能确定具体有多少页
        //1.引入分页js
        //2.准备了一个ul,给了一个id,(一定要给ul)
        //3.初始化分页: bootstrapPaginator
        //  指定一些参数:bootstrapMajorVersion: 3
        //           currentPage: page,//当前页
        //            totalPages: Math.ceil(info.total/info.size),//总页数
        //           onPageClicked: 通过第四个参数page参数可以获取到底几页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (a, b, c, p) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            // console.log("haha",page)
            page = p
            //重新发送ajax请求
            render()
          }
        });
      }

    })
  }


})