var app = getApp();
Page({

  /**
   * 组件的初始数据
   */
  data: {
    id: null,
    login: false,
    userinfo: {
      sno: null,
      name: '点击头像登陆',
      password: null,
      sex: '男',
      age: null,
      college: null,
      senior: null,
      hobby: null,
      character: null,
      tsflag: null,
      photo_url: 'https://www.gcwtg.com/images/wx_management/user/headimg/default.jpeg',
      background_url: 'https://www.gcwtg.com/images/wx_management/swiperimg/school.jpg',
      tel: null,
    },
    orderItems: [
      {
        typeId: 0,
        name: '待付款',
        url: 'bill',
        imageurl: 'https://www.gcwtg.com/images/wx_management/bill/personal_pay.png',
      },
      {
        typeId: 1,
        name: '待发货',
        url: 'bill',
        imageurl: 'https://www.gcwtg.com/images/wx_management/bill/personal_shipped.png',
      },
      {
        typeId: 2,
        name: '待收货',
        url: 'bill',
        imageurl: 'https://www.gcwtg.com/images/wx_management/bill/personal_receipt.png',
      },
      {
        typeId: 3,
        name: '待评价',
        url: 'bill',
        imageurl: 'https://www.gcwtg.com/images/wx_management/bill/personal_comment.png',
      },
    ],
    list_items: [{
      typeId: 0,
      name: '我的收藏',
      url: '',
      imageurl: '/images/bar/my_collection.png',
    },
    {
      typeId: 1,
      name: '系统消息',
      url: '',
      imageurl: '/images/bar/message.png',
    },
    {
      typeId: 2,
      name: '系统设置',
      url: '/pages/wechat/wechat',
      imageurl: '/images/bar/setting.png',
    },
    {
      typeId: 3,
      name: '推广邀请',
      url: '',
      imageurl: '/images/bar/Promotion.png',
    },]
  },

  onLaunch: function () {

  },

  onLoad: function (options) {

  },

  onShow: function () {
    if (app.globalData.login == true) {
      wx.showToast({
        title: "loading",
        icon: "loading",
        duration: 1000
      })
      var that = this;
      var name = 'userinfo.name';
      var password = 'userinfo.password';
      var photo_url = 'userinfo.head_url';
      var sno = 'userinfo.sno';
      var background_url = 'userinfo.background_url';
      var sex = 'userinfo.sex';
      var age = 'userinfo.age';
      var college = 'userinfo.college';
      var senior = 'userinfo.senior';
      var hobby = 'userinfo.hobby';
      var character = 'userinfo.character';
      var tsflag = 'userinfo.tsflag';
      var tel = 'userinfo.tel';
      var jsonstr = app.globalData.jsonstr;
      that.setData({
        sno: jsonstr[0].sno,
        login: 'true',
        [name]: jsonstr[0].name,
        [password]: jsonstr[0].password,
        [sno]: jsonstr[0].sno,
        [photo_url]: jsonstr[0].photo_url,
        [background_url]: jsonstr[0].background_url,
        [sex]: jsonstr[0].sex,
        [age]: jsonstr[0].age,
        [college]: jsonstr[0].college,
        [senior]: jsonstr[0].senior,
        [hobby]: jsonstr[0].hobby,
        [character]: jsonstr[0].character,
        [tsflag]: jsonstr[0].tsflag,
        [tel]: jsonstr[0].tel,
      })
    }

  },
  toLogin: function () {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  towechat: function () {
    wx.navigateTo({
      url: '/pages/wechat/wechat',
    })
  }
})
