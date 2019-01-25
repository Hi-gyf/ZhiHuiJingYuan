// pages/publish_products/publish_products.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    uSizeIndex:0,
    clothesTypeIndex:0,
    array:[
      "化妆品",
      "U盘/存储设备",
      "书籍/试题",
      "钱包/背包",
      "衣物/配饰",
      "其它"
    ],
    uSizeArray:[
      "8G","16G","32G","64G","128G","512G","1T","2T"
    ],
    clothesTypeArray : ['男款','女款','中性款'],
    controlIfHide: {
      ifCosmetics: "block",
      ifUDisk: "none",
      ifBook:"none",
      ifWallet:"none",
      ifClothes:"none",
      ifOther:"none"
    },
    tempFilePaths: '/images/bar/upload_images.png', 
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    console.log(e.detail.value);
    var that = this;
    switch (e.detail.value){
      case '0':
        that.setData({
          controlIfHide:{
            ifCosmetics:"block",
            ifUDisk:"none",
            ifBook: "none",
            ifWallet: "none",
            ifClothes: "none",
            ifOther: "none"
          }
        })
        break;
      case '1':
        that.setData({
          controlIfHide: {
            ifCosmetics: "none",
            ifUDisk: "block",
            ifBook: "none",
            ifWallet: "none",
            ifClothes: "none",
            ifOther: "none"
          }
        })
        break;
      case '2':
        that.setData({
          controlIfHide: {
            ifCosmetics: "none",
            ifUDisk: "none",
            ifBook: "block",
            ifWallet: "none",
            ifClothes: "none",
            ifOther: "none"
          }
        })
        break;
      case '3':
        that.setData({
          controlIfHide: {
            ifCosmetics: "none",
            ifUDisk: "none",
            ifBook: "none",
            ifWallet: "block",
            ifClothes: "none",
            ifOther: "none"
          }
        })
        break;
      case '4':
        that.setData({
          controlIfHide: {
            ifCosmetics: "none",
            ifUDisk: "none",
            ifBook: "none",
            ifWallet: "none",
            ifClothes: "block",
            ifOther: "none"
          }
        })
        break;
      case '5':
        that.setData({
          controlIfHide: {
            ifCosmetics: "none",
            ifUDisk: "none",
            ifBook: "none",
            ifWallet: "none",
            ifClothes: "none",
            ifOther: "block"
          }
        })
        break;
    }
  },
  uSizeChange : function(e){
    this.setData({
      uSizeIndex: e.detail.value
    })
  },
  clothesTypeChange: function (e) {
    this.setData({
      clothesTypeIndex: e.detail.value
    })
  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      // 可以指定是原图还是压缩图，默认二者都有  
      sizeType: ['original', 'compressed'],
      // 可以指定来源是相册还是相机，默认二者都有
      sourceType: ['album', 'camera'],
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片   
      success: function (res) {
        var tempfileSize = res.tempFiles[0].size;
        //如果图片大小在4M以内才允许上传
        if (tempfileSize <= 4194304){
          _this.setData({
            tempFilePaths: res.tempFilePaths
          })
        }else{
          wx.showToast({
            title: '上传图片不能大于4M!',  //标题
            icon: 'none' 
          })
        }
      }
    })
  },

  formSubmit : function(e){
    var that = this;
    console.log(e.detail.value);
    var uid = wx.getStorageSync("uid");
    console.log(uid);
    if(uid == null || uid == ""){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      var data = "{" + "'mkpid':'" + uid + "','mktitle':'" + e.detail.value.pTitle + "','mkprice':'" + e.detail.value.pPrice + "','mkname':'" + e.detail.value.pType;
      var ptype = e.detail.value.pType;
      if (ptype == "0") {
        //化妆品
        data += "','fcname':'" + e.detail.value.cosName;
        data += "','fctype':'" + e.detail.value.cosType;
        data += "','fcdescribe':'" + e.detail.value.desc;
      } else if (ptype == "1") {
        data += "','funame':'" + e.detail.value.uName;
        data += "','fusize':'" + that.data.uSizeArray[e.detail.value.uSize];
        data += "','fudescribe':'" + e.detail.value.desc;
        //U盘
      } else if (ptype == "2") {
        data += "','bAuthor':'" + e.detail.value.bAuthor;
        data += ",bName:" + e.detail.value.bName;
        //书籍
      } else if (ptype == "3") {
        //钱包
        data += "','wColor':'" + e.detail.value.wColor;
      } else if (ptype == "4") {
        //衣物
        data += "','clothesColor':'" + e.detail.value.clothesColor;
        data += "','clothesType':'" + that.data.clothesTypeArray[e.detail.value.clothesType];
      } else if (ptype == "5") {
        data += "','oName':'" + e.detail.value.oName;
        //其他
      }
      data += "'}";
      console.log(data + "****" + that.data.tempFilePaths[0]);
      wx.uploadFile({
        url: 'http://localhost:8080/publishProductServlet',
        filePath: that.data.tempFilePaths[0],
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData:{ 
          userId: uid
        },
        success: function (res) {
          
          wx.request({
            url: 'http://localhost:8080/publishProductServlet',
            header: {
              "Content-Type": "application/json"//x-www-form-urlencoded
            },
            method: "GET",
            data:{
              productInfo: data,
              filePath:res.data
            },
            success: function (res) {
              wx.showToast({
                title: '发布成功',
                icon: 'success',
                duration: 2000,
                complete: function (res) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            }
          })
        }
      })
      // wx.request({
      //   url: 'http://localhost:8080/publishProductServlet',
      //   header: {
      //     "Content-Type": "application/json"//x-www-form-urlencoded
      //   },
      //   method: "GET",
      //   data: { productInfo: data },
      //   success: function (res) {
      //     console.log("success:" + res.data);
      //   }
      // })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})