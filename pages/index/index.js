//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imageWidth: wx.getSystemInfoSync().windowWidth,//图片宽度 
    imgUrls: [                        'http://image.niuxiao.net/upload/2015-01-09/9e333d1a-262f-4b7c-9c1c-073049682ca7.jpg',
'http://www.glarie.com/upfile/image/20160811/20160811085300_23468.jpg',       'http://zikao.2018.cn/attachment/album/201501/14225428207ludu.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,

    menus:[
      {
        "name":"我的好友",
        "icon":"/images/menus/1.png",
        "url":"/pages/friend/friend"
      },
      {
        "name": "失物招领",
        "icon": "/images/menus/2.png"
      },
      {
        "name": "兼职工作",
        "icon": "/images/menus/3.png"
      },
      {
        "name": "我的账本",
        "icon": "/images/menus/4.png",
        "url": "/pages/account/account"
      },
      {
        "name": "课堂签到",
        "icon": "/images/menus/5.png"
      },
      {
        "name": "二手市场",
        "icon": "/images/menus/6.png",
        "url" : "/pages/market/market"
      },
      {
        "name": "实物扫描",
        "icon": "/images/menus/7.png",
        "url": "../recognition/recognition"
      },
      {
        "name": "课表查询",
        "icon": "/images/menus/8.png"
      }
    ],

    newses:[
      {
        "url": "http://www.ghost64.com/qqtupian/zixunImg/local/2017/04/13/14920524173348.jpg",
        "summary":"买个外卖二哈就把家拆了，隔着屏幕都能感觉到他的无奈!内容内容内容内容内容内容内容内容内容内容内容内容"
      },
      {
        "url":"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2531244085,1057801494&fm=173&app=25&f=JPEG?w=550&h=370&s=F43682744A2137093E0418C7030070AA",
        "summary":"朴槿惠三起案件同天“过堂”，刑期将超过30年？"
      }
    ]

  },


});
