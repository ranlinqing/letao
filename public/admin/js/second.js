
var page = 1
$(function(){
  
  var pageSize = 5
  //渲染
  render()


/*添加分类
 1.给按钮注册事件
 2.准备一个添加的模态框
 3.显示这个模态框
 4.实现表单校验\
 5.表单校验通过,发送ajax请求
 6.重新渲染
*/
$('.btn_add').on('click',function(){
  $('#addModal').modal('show')


$.ajax({
  type:'get',
  url:'/category/querySecondCategoryPaging',
  data: {
      page : 1,
      pageSize: 100
  },
  success:function(info){
    console.log(info)  
      $('.dropdown-menu').html(template('tpl2',info))    
  }
 })
})

//一级分类选择功能
$('.dropdown-menu').on('click','li',function(){
  var id = $(this).data('id')
  console.log(id)
  //还需要修改按钮的内容
  $('.dropdown-text').text($(this).children().text())

  //动态修改  name=categoryId 的value
$('[name=categoryId]').val(id)
//手动修改一级分类校验成功
$form.data('bootstrapValidator').updateStatus('categoryId','VALID')
})


 
//图片的上传功能
$('#file').fileupload({
  //图片上传成功后的回调函数
  done:function(e,data){
    var result = data.result.picAddr
    $('.img_box img').attr('src',result)
    $('[name=brandLogo]').val(result)
    $form.data('bootstrapValidator').updateStatus('brandLogo','VALID')

  }
})

//表单校验功能
var $form = $('form')
$form.bootstrapValidator({
  //指定不校验的类型,默认对禁用的隐藏不可见的不做校验
  excluded:[],
  //指定对谁进行校验,对应表单中的name属性
  fields:{
    //对categoryName进行校验
    categoryId:{
      validators:{
        notEmpty:{
          message:'请选择一个一级分类'
        }
      }
    },
    brandName:{
      validators:{
        notEmpty:{
          message:'请上传二级分类的名称'
        }
      }
    },
    brandLogo:{
      validators:{
        notEmpty:{
          message:'请上传二级分类的名称'
        }
      }
    }
  },
  //文件在bootstrap-validator使用笔记里面
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
})




//注册表单校验成功事件
$form.on('success.form.bv', function(e){
  e.preventDefault()
  //发送ajax请求
  $.ajax({
    type:'post',
    url:'/category/addSecondCategory',
    data: $form.serialize(),
    success:function(info){
      if(info.success){
        //隐藏模态框
        $('#addModal').modal('hide')
        //重置表单样式
        $form.data('bootstrapValidator').resetForm(true)
        //重新渲染第一页
        page = 1
        render()
        //重置下拉框的文字和图片
        $('.dropdown-text').text('请选择一级分类')
        $('.img_box img').attr('src','../imagse/images/none.png')
      }
    }
  })
})




function render(){
   $.ajax({
     type:'get',
     url:'/category/querySecondCategoryPaging',
     data:{
       page:page,
       pageSize:pageSize
     },
     success:function(info){
      //  console.log(info)
      $('tbody').html( template('tpl',info))
      

      // //分页
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
      paginator(info,render)
      }
   })
  }
})