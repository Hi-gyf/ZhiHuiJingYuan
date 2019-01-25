// pages/market/market.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_page:0,
    my_products_list_icon: 'my_products_list.png',
    products_list_icon: 'products_list.png',

    products : [
    ]

  },

  page_change : function(e){
    var index = e.detail.current;
    if(index == 0){
      this.setData({
        products_list_icon: 'products_list_click.png',
        my_products_list_icon: 'my_products_list.png'
      })
    }else{
      this.setData({
        my_products_list_icon: 'my_products_list_click.png',
        products_list_icon: 'products_list.png'
      })
    }
  },

  publish_products_click : function(){
    wx.navigateTo({
      url: '/pages/publish_products/publish_products',
    })
  },
  products_list_click:function(){
    this.setData({
      current_page: 0,
      products_list_icon:'products_list_click.png',
      my_products_list_icon: 'my_products_list.png'
    })
  },

  my_products_list_click : function(){
   this.setData({
     current_page:1,
     my_products_list_icon:'my_products_list_click.png',
     products_list_icon: 'products_list.png'
   })
  },

  product_click : function(e){
    wx.request({
      url: 'http://localhost:8080/showProductServlet',
      header:{
        "Content-Type": "application/json"//x-www-form-urlencoded
      },
      method: 'GET',
      data: { mkid: e.currentTarget.dataset.mkid},
      success:function(res){
        console.log("成功");
        wx.navigateTo({
          url: '/pages/show_product/show_product',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      products_list_icon:'products_list_click.png'
    })
    wx.request({
      url: 'http://localhost:8080/showMarketServlet',
      header: {
        "Content-Type": "application/json"//x-www-form-urlencoded
      },
      method: "GET",
      success: function (res) {
        var resData = res.data;
        that.setData({
          products : resData
        })
        for(var i = 0; resData[i] != null; i++){
          console.log(resData[i]);
        }
      }
    })
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
    this.onLoad();
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