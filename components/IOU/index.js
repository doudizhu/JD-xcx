// components/IOU/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideBaitiao: {
      type: Boolean,
      value: true,
    },
    baitiao: {
      type: Array,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 隐藏白条弹框
    hideBaitiaoView(e){
      if(e.target.dataset.target == "self"){
        this.setData({
          hideBaitiao: true,
        })
      }
    },
  }
})
