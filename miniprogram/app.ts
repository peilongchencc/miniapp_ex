// app.ts
// 类型定义已移至 typings/index.d.ts

App<IAppOption>({
  globalData: {
    isLoggedIn: false,
    userInfo: null,
    cartItems: [] as ICartItem[],
    orderHistory: [] as IOrder[],
  },

  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 检查本地是否有登录信息
    const userInfo = wx.getStorageSync('userInfo')
    const isLoggedIn = wx.getStorageSync('isLoggedIn')
    if (userInfo && isLoggedIn) {
      this.globalData.userInfo = userInfo
      this.globalData.isLoggedIn = true
    }

    // 加载购物车数据
    const cartItems = wx.getStorageSync('cartItems')
    if (cartItems) {
      this.globalData.cartItems = cartItems
    }

    // 加载订单历史
    const orderHistory = wx.getStorageSync('orderHistory')
    if (orderHistory && orderHistory.length > 0) {
      this.globalData.orderHistory = orderHistory
    } else {
      // 添加测试数据（正式上线时删除）
      this.globalData.orderHistory = [
        {
          id: 'ORD1733731200000',
          items: [
            { id: '1', name: '金元宝（大号）', image: '/images/default-product.png', quantity: 10 },
            { id: '2', name: '香烛套装', image: '/images/default-product.png', quantity: 5 },
            { id: '3', name: '纸钱（整箱）', image: '/images/default-product.png', quantity: 3 },
            { id: '4', name: '花圈（中号）', image: '/images/default-product.png', quantity: 2 },
            { id: '5', name: '寿衣套装', image: '/images/default-product.png', quantity: 1 }
          ],
          createTime: Date.now() - 86400000,
          status: 'pending',
          remark: '急需，请尽快发货'
        },
        {
          id: 'ORD1733644800000',
          items: [
            { id: '6', name: '莲花灯', image: '/images/default-product.png', quantity: 20 },
            { id: '7', name: '黄纸（大捆）', image: '/images/default-product.png', quantity: 10 }
          ],
          createTime: Date.now() - 86400000 * 3,
          status: 'shipped'
        },
        {
          id: 'ORD1733558400000',
          items: [
            { id: '8', name: '骨灰盒（红木）', image: '/images/default-product.png', quantity: 1 },
            { id: '9', name: '寿被', image: '/images/default-product.png', quantity: 2 },
            { id: '10', name: '挽联', image: '/images/default-product.png', quantity: 4 },
            { id: '11', name: '白布', image: '/images/default-product.png', quantity: 5 }
          ],
          createTime: Date.now() - 86400000 * 7,
          status: 'completed'
        },
        {
          id: 'ORD1733472000000',
          items: [
            { id: '12', name: '纸扎别墅', image: '/images/default-product.png', quantity: 1 },
            { id: '13', name: '纸扎汽车', image: '/images/default-product.png', quantity: 1 },
            { id: '14', name: '纸扎手机', image: '/images/default-product.png', quantity: 2 }
          ],
          createTime: Date.now() - 86400000 * 10,
          status: 'completed'
        }
      ]
    }

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },

  // 添加商品到购物车
  addToCart(item: ICartItem) {
    const existIndex = this.globalData.cartItems.findIndex(i => i.id === item.id)
    if (existIndex > -1) {
      this.globalData.cartItems[existIndex].quantity += item.quantity
    } else {
      this.globalData.cartItems.push(item)
    }
    wx.setStorageSync('cartItems', this.globalData.cartItems)
  },

  // 清空购物车
  clearCart() {
    this.globalData.cartItems = []
    wx.setStorageSync('cartItems', [])
  },

  // 提交订单（将购物车转为订单）
  submitOrder(remark?: string): IOrder | null {
    if (this.globalData.cartItems.length === 0) return null
    
    const order: IOrder = {
      id: `ORD${Date.now()}`,
      items: [...this.globalData.cartItems],
      createTime: Date.now(),
      status: 'pending',
      remark
    }
    
    this.globalData.orderHistory.unshift(order)
    wx.setStorageSync('orderHistory', this.globalData.orderHistory)
    this.clearCart()
    return order
  },

  // 快捷复购 - 将历史订单商品加入购物车
  reorder(orderId: string) {
    const order = this.globalData.orderHistory.find(o => o.id === orderId)
    if (!order) return false
    
    order.items.forEach(item => {
      this.addToCart({ ...item })
    })
    return true
  },
})