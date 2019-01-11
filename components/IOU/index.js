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
    selectIndex:0
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
    // 选择白条分期
    selectItem(e){
      let index = e.currentTarget.dataset.index
      let baitiao = this.data.baitiao
      for(let i=0;i<baitiao.length;i++){
        baitiao[i].select=false;
      }
      baitiao[index].select = !baitiao[index].select

      this.setData({
        baitiao:baitiao,
        selectIndex: index,
      })
    },
    // 点击打白条
    makeBaitiao(e){
      this.setData({
        hideBaitiao:true,
      })

      const selectItem = this.data.baitiao[this.data.selectIndex]
      // 事件传递
      this.triggerEvent('updateSelect', selectItem)
    },
  }
})
