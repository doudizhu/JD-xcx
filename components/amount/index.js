// components/amount/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count:{
      type:Number,
      value:1,
    }
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
    inputChangeHandle(e){
      // console.log(1);
      // console.log(e)
      var value = e.detail.value
      var myEventDetail ={
        val:value,
      }

      // 数据改变时，向父组件传递新数据
      this.triggerEvent('myevent',myEventDetail)
    },
    subtract(e){
      // console.log(2);
      // console.log(e)
      let count = this.data.count
      count > 1 ? count-- : 1
      var myEventDetail ={
        val:count
      }

      this.setData({
        count:count
      })

      // 数据改变时，向父组件传递新数据
      this.triggerEvent('myevent', myEventDetail)

      // 购物车时调用，点击减号触发
      this.triggerEvent('subevent')
    },
    add(e){
      let count = this.data.count
      var myEventDetail = {
        val: ++count
      }

      this.setData({
        count: count
      })

      // 数据改变时，向父组件传递新数据
      this.triggerEvent('myevent', myEventDetail)

      // 购物车时调用，点击加号触发
      this.triggerEvent('subevent')
    },
  }
})
