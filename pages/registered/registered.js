// pages/login/login.js

const app = getApp();

Page({
  /**
   * 组件的初始数据
   */
  data: {
    show:false,
    currentTab:0,
    winWidth:0,
    winHeight:0,
    userName:null,
    passWord:null,
    user_info:{
      user_id:"myicon",
      user_head:"",      
    }
  },
  /**
   * 组件的onload
   */
  onLoad:function(options){
    var page = this;
    wx.getSystemInfo({
      success : function(res){
        console.log(res);
        page.setData({winWidth:res.windowWidth});
        page.setData({winHeight:res.windowHeight});
      }
    })
  },
  onShow:function(){

  },
  
  username:function(e){
      this.setData({
        userName:e.detail.value
      })
  },
  password:function(e){
      this.setData({
        passWord:e.detail.value
      })
  },
  Registeredbtncheck:function(e){
    console.log(e.detail.value);
    var objectData = e.detail.value;
    wx.request({
      url: 'http://localhost:8080/wxRegisteredServlet',
      data:{
        username:objectData.username,
        password:objectData.password,
      },
      method:'GET',
      header:{
        'Content-Type': 'application/json'
      },
      success:function(res){
        console.log("成功 res.data = " + res.data[0]);
        
        if(res.data[0].sno == null){
          wx.showToast({
            title: '输入有误',
            image: '/images/info.png',
            icon: 'none',
            duration: 1000
          });
        }
        else{
          app.globalData.uid = e.detail.value.username;
          app.globalData.pwd = e.detail.value.password;
          var name = 'userinfo.name';
          var password = 'userinfo.password';
          var photo_url = 'userinfo.photo_url';
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
          if (res.data[0].sno != null) {
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];
            prevPage.setData({
            sno: res.data[0].sno,
            login: 'true',
            [name]: res.data[0].name,
            [password]: res.data[0].password,
            [sno]: res.data[0].sno,
              [photo_url]: res.data[0].photo_url,
            [background_url]: res.data[0].background_url,
            [sex]: res.data[0].sex,
            [age]: res.data[0].age,
            [college]: res.data[0].college,
            [senior]: res.data[0].senior,
            [hobby]: res.data[0].hobby,
            [character]: res.data[0].character,
            [tsflag]: res.data[0].tsflag,
            [tel]: res.data[0].tel,
          });
            wx.navigateBack({
              url: '/pages/me/me'
            });
          }
        }
       
      
      },
      fail:function(res){
        console.log("登陆失败");
      }
    })
    this.onShow();
  },
  photo_fix_click() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],//原图和压缩图均可
      sourceType: ['album', 'camera'],//拍照或从本地选取
      success: function (res) {
        console.log(res.tempFilePaths);
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'http://localhost:8080/uploadPhotoServlet',
          filePath: tempFilePaths[0],
          name: 'user_photo',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData:
            {
              userId: that.data.user_info.user_id //附加信息为用户ID
            },
          success: function (res) {
            console.log(res);
            var user_head = 'user_info.user_head';
            that.setData({
              [user_head]: "http://localhost:8080/images/" + that.data.user_info.user_id + ".jpg?" + Math.random()/9999,
            })
            console.log(that.data.user_info.user_head);
            console.log(that);
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {

          }
        })
      },
    });
   
  },

})
