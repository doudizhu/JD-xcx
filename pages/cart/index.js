// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray: [],

    // 结算模块
    totalMoney: '0.00', // 总价
    totalCount: 0, // 商品数量
    selectAll: false, // 是否全选
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
    var self = this

    wx.getStorage({
      key: 'cartInfo',
      success: function(res) {
        const cartArray = res.data

        cartArray.forEach(cart => {
          cart.select = false; // 全都不选中
        })

        self.setData({
          cartArray: cartArray,
        })

        // 设置tabbar图标
        cartArray.length > 0 ?
          wx.setTabBarBadge({
            index: 2,
            text: String(cartArray.length)
          }) : wx.removeTabBarBadge({
            index: 2,
          })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 页面离开时更新storage
    const cartArray = this.data.cartArray
    wx.setStorage({
      key: 'cartInfo',
      data: cartArray,
    })
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

  },

  getCount(e){
    // console.log(e)
    const index = e.currentTarget.dataset.index
    const cartArray = this.data.cartArray

    cartArray[index].total = e.detail.val
    // 更新data
    this.setData({
      cartArray: cartArray,
    })
  },

  // 点击跳转商品详情页
  switchGoodDetail(e){
    const index = e.currentTarget.dataset.index
    const cartArray = this.data.cartArray
    wx.navigateTo({
      url: '/pages/detail/index?id=' + cartArray[index].id,
    })
  },

  selectGoods(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;

    // 合计和数量
    let totalMoney = Number(this.data.totalMoney);
    let totalCount = this.data.totalCount;

    // 设置选中或者不选中状态
    cartArray[index].select = !cartArray[index].select;

    // 如果选中
    if(cartArray[index].select){
      totalMoney += Number(cartArray[index].price) * cartArray[index].total
      totalCount++
    }
    // 没有选中
    else{
      totalMoney -= Number(cartArray[index].price) * cartArray[index].total
      totalCount--
    }
    
    // 更新数据
    this.setData({
      cartArray: cartArray,
      totalMoney: String(totalMoney.toFixed(2)),
      totalCount: totalCount,
    })
  },
})