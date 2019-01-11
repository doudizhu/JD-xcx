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
      console.log(e)
    },
    add(e){
      // console.log(3);
      console.log(e)
    },
  }
})