$(function(){
  //后台返回的数据
  // map filter forEach every some node.js
  var data = {
    title: '2018年注册人数',
    list:[
      {month: '1月', count: 1000, count1: 500},
      {month: '2月', count: 2000, count1: 500},
      {month: '3月', count: 1500, count1: 500},
      {month: '4月', count: 2500, count1: 500},
      {month: '5月', count: 3000, count1: 500},
      {month: '6月', count: 3500, count1: 500},
    ]
  }
 var months = []
 var counts = []
 var counts1 = []
 for(var i = 0; i < data.list.length; i++) {
       months.push(data.list[i].month)
       counts.push(data.list[i].count)
      counts1.push(data.list[i].count1)
 }

//初始化echarts实例
var myChart = echarts.init(document.querySelector('.lt_content .left'))
var option ={
  title:{
    text: data.title,
    textStyle: {
      color:'red'
    }
  },
  tooltip:{},
  legend:{
    data:['人数','在线人数']
  },
  xAxis: {
    // data: data.list.map(item => item.month)
    data: months
},
yAxis: {},
series: [{
    name:'人数',
    type: 'bar',
    // data:data.list.map(item => item.count)
    data:counts
// },
// {
  //  name:'在线人数',
  //  type:'bar',
  // //  data:data.list.map(item => item.count1)
  // data:counts1

}]
}
myChart.setOption(option)

//初始化饼图实例
var rightChart = echarts.init(document.querySelector('.lt_content .right'))
var rightOptions = {
  title : {
    text: '热门品牌销售',
    subtext: '2018年3月',
    x:'center'
},
tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
},
legend: {
    orient: 'vertical',
    left: 'left',
    data: ['阿迪达斯','耐克','新百伦','阿迪','安踏']
},
series : [
    {
        name: '销售来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
            {value:335, name:'阿迪达斯'},
            {value:310, name:'耐克'},
            {value:234, name:'新百伦'},
            {value:135, name:'阿迪'},
            {value:1548, name:'安踏'}
        ],
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }
]
}
rightChart.setOption(rightOptions)
})