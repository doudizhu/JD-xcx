const interfaces = require("../../utils/urlconfig.js")

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLeftItems:[],
    navRightItems:[],
    curIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;

    wx.showLoading({
      title:'加载中...'
    })

    wx.request({
      url:interfaces.productions,
      header:{
        "content-type":"application/json"
      },
      success(res){
        console.log(res.data)
        self.setData({
          navLeftItems:res.data.navLeftItems,
          navRightItems:res.data.navRightItems,
        })

        wx.hideLoading()
      }
    })
  },

  // 切换右侧选项卡
  switchRightTab(e){
    // console.log(e)
    let index = parseInt(e.currentTarget.dataset.index)

    this.setData({
      curIndex:index,
    })
  },
  // 展示列表子目录文件视图
  showListView(e){
    // console.log(e.currentTarget.dataset.txt)
    let txt = e.currentTarget.dataset.txt
    // 导航跳转的方法
    wx.navigateTo({
      url:'/pages/list/index?title='+txt,
    })
    
  }
})