// cart.ts
Component({
  data: {
    hasItems: false,
    emptyImage: '/images/cart-empty.png'
  },
  methods: {
    goToCategory() {
      wx.switchTab({
        url: '/pages/category/category'
      })
    }
  }
})

