//实现一些公共js功能
//什么时候开始  / /什么时候结束
//当ajax请求请求开始的时候，显示进度条
// 当ajax请求结束的时候，隐藏进度条
// jquery.ajax的全局事件
// jquery的ajax全局事件 会 在任意一个ajax请求请求执行的时候触发
// 6 个全局事件
// ajaxStart:   开始进度条
// ajaxSend:
// ajaxSuccess:
// ajaxError:
// ajaxComplete
// ajaxStop  ：   结束进度条
// NProgress.start()
// NProgress.done()
$(document).ajaxStart(function(){
  NProgress.start()
})
$(document).ajaxStart(function(){
  setTimeout(function(){
    NProgress.done()
  },500)
})
//二级菜单的显示和隐藏
$('.second').prev().on('click',function(){
  $(this).next().stop().slideToggle()
})
//菜单的显示和隐藏
$('.topbar .left').click(function(){
  $('.lt_aside,.lt_main,.topbar').toggleClass('now')
})

//退出功能
$('.topbar .right').on('click',function(){
  $('#logoutModal').modal('show')
})
//给确定按钮注册事件,注意: 不要在 事件中注册事件
$('.confirm').on('click',function(){
  $('#logoutModal').modal('show')
})
$('.confirm').on('click',function(){
  //发送ajax请求,告诉服务器需要退出
  // $.ajax({
  //   type:'get',
  //   url:'/employee/employeeLogout',
  //   success:function(info){
  //     if(info.sucess) {
  //       location.href = 'login.html'
  //     }
  //   }
  // })

  //参数1 : 直接就是url地址
  //参数2 : 可选的data
  //参数3 : success的回调\
  $.get('/employee/employeeLogout',function(info){
    if(info.success){
      location.href = 'login.html'
    }
  })
})
 