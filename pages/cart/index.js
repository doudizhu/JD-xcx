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

    // 删除模块
    startX: 0, // 开始坐标
    startY: 0, // 开始坐标
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
        const cartArray = typeof res.data == 'string' ? [] : res.data// 容错

        cartArray.forEach(cart => {
          cart.select = false; // 全都不选中
          cart.isTouchMove = false; // 是否滑动
        })

        self.setData({
          cartArray: cartArray,
          selectAll: false,
          totalMoney: '0.00',
          totalCount: 0,
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

  // 选择单个
  selectGoods(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;

    // 合计和数量
    let totalMoney = Number(this.data.totalMoney);
    let totalCount = this.data.totalCount;

    // 设置选中或者不选中状态
    cartArray[index].select = !cartArray[index].select;

    // 单选联动全选
    let selectAll = this.data.selectAll

    // 如果选中
    if(cartArray[index].select){
      totalMoney += Number(cartArray[index].price) * cartArray[index].total
      totalCount++
    }
    // 没有选中
    else{
      totalMoney -= Number(cartArray[index].price) * cartArray[index].total
      totalCount--
      // 取消全选
      selectAll = false
    }
    
    // 更新数据
    this.setData({
      cartArray: cartArray,
      totalMoney: String(totalMoney.toFixed(2)),
      totalCount: totalCount,
      selectAll: selectAll
    })
  },

  // 自建
  subCount(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    // 合计
    let totalMoney = Number(this.data.totalMoney);

    // 计算金额
    if(cartArray[index].select){
      totalMoney -= Number(cartArray[index].price)
    }

    // 更新数据
    this.setData({
      totalMoney: String(totalMoney.toFixed(2))
    })

  },
  // 自增
  addCount(e) {

    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    // 合计
    let totalMoney = Number(this.data.totalMoney);

    // 计算金额
    if (cartArray[index].select) {
      totalMoney += Number(cartArray[index].price)
    }

    // 更新数据
    this.setData({
      totalMoney: String(totalMoney.toFixed(2))
    })
  },

  // 全选
  selectAll(){
    const cartArray = this.data.cartArray
    let totalMoney = 0
    let totalCount = 0
    let selectAll = this.data.selectAll

    selectAll = !selectAll

    cartArray.forEach(cart => {
      // 设置选中或不选中状态 和全选按钮是一样的状态
      cart.select = selectAll

      // 计算总金额和商品个数
      if(cart.select){
        totalMoney += Number(cart.price) * cart.total
        totalCount++
      }
      // 置为0
      else{
        totalMoney = 0
        totalCount = 0
      }
    })

    // 更新data
    this.setData({
      cartArray: cartArray,
      totalMoney: String(totalMoney.toFixed(2)),
      totalCount: totalCount,
      selectAll: selectAll,
    })
  },

  touchstart(e) {
    // console.log(e)
    // 开始触摸时，重置所有删除
    this.data.cartArray.forEach(cart => {
      if(cart.isTouchMove) // 为ture的时候
        cart.isTouchMove = false; // 其他的对象都为false
    })

    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      cartArray: this.data.cartArray,
    })
  },
  touchmove(e) {
    var index = e.currentTarget.dataset.index

    // 开始x和y坐标
    var startX = this.data.startX,
        startY = this.data.startY

    // 移动的x和y坐标
    var touchMoveX = e.changedTouches[0].clientX,
        touchMoveY = e.changedTouches[0].clientY
    // console.log(touchMoveX)

    // 调用计算角度方法 获取角度
    var angel = this.angel({X:startX,Y:startY},{X:touchMoveX,Y:touchMoveY})

    // 遍历数组中的所有对象
    this.data.cartArray.forEach((cart,i) => {
      cart.isTouchMove = false
      // 滑动的角度>30 直接return
      if(Math.abs(angel) > 30) return

      // 匹配
      if(i == index){
        // 左滑
        if(touchMoveX < startX){
          cart.isTouchMove = true
        }
      }
    })

    // 更新数据
    this.setData({
      cartArray: this.data.cartArray,
    })
  },
  // 计算角度方法
  angel(start,end) {
    var _X = end.X - start.X,
        _Y = end.Y - start.Y
    
    // 返回角度 Math.atan() 返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI)
  },

  // 删除商品
  del(e) {
    var self = this
    const index = e.currentTarget.dataset.index

    wx.getStorage({
      key: 'cartInfo',
      success(res) {
        const partData = typeof res.data == 'string' ? [] : res.data// 容错
        partData.forEach((cart,i) => {
          if (cart.title == self.data.cartArray[index].title){
            partData.splice(i,1)
          }
        })

        // 删完之后，存储
        wx.setStorage({
          key: 'cartInfo',
          data: 'partData',
        })

        // 更新数据
        self.update(index);
      }
    })
  },
  update(index) {
    var cartArray = this.data.cartArray
    var totalMoney = String(Number(this.data.totalMoney).toFixed(2))
    var totalCount = this.data.totalCount

    // 计算价格和数量
    if(cartArray[index].select){
      totalMoney -= Number(cartArray[index].price) * cartArray[index].total
      totalCount--
    }

    // 删除
    cartArray.splice(index, 1)

    // 更新数据
    this.setData({
      cartArray,
      totalMoney,
      totalCount,
    })

    // 设置tabBar图标
    cartArray.length > 0 
      ? wx.setTabBarBadge({
        index: 2,
        text: String(cartArray.length),
      })
      : wx.removeTabBarBadge({
        index: 2,
      })
  },
})