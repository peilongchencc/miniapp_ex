// orders.ts
const app = getApp<IAppOption>()

Component({
  data: {
    orderList: [] as IOrder[],
    statusMap: {
      pending: '待确认',
      confirmed: '已确认',
      shipped: '配送中',
      completed: '已完成'
    } as Record<string, string>
  },

  lifetimes: {
    attached() {
      this.loadOrders()
    }
  },

  pageLifetimes: {
    show() {
      this.loadOrders()
    }
  },

  methods: {
    // 加载订单列表
    loadOrders() {
      const orderHistory = app.globalData.orderHistory || []
      // 格式化订单时间
      const formattedOrders = orderHistory.map(order => ({
        ...order,
        createTime: this.formatTime(order.createTime as number)
      }))
      this.setData({ orderList: formattedOrders })
    },

    // 快捷复购
    handleReorder(e: WechatMiniprogram.TouchEvent) {
      const targetOrderId = e.currentTarget.dataset.id as string
      const success = app.reorder(targetOrderId)
      
      if (success) {
        wx.showModal({
          title: '复购成功',
          content: '商品已加入购物车，是否立即查看？',
          confirmText: '去购物车',
          cancelText: '继续浏览',
          success: (res) => {
            if (res.confirm) {
              wx.switchTab({ url: '/pages/cart/cart' })
            }
          }
        })
      } else {
        wx.showToast({ title: '复购失败', icon: 'error' })
      }
    },

    // 跳转订单详情
    goToDetail(e: WechatMiniprogram.TouchEvent) {
      const orderId = e.currentTarget.dataset.id as string
      wx.navigateTo({ url: `/pages/order-detail/order-detail?id=${orderId}` })
    },

    // 格式化时间
    formatTime(timestamp: number): string {
      const date = new Date(timestamp)
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0')
      const h = String(date.getHours()).padStart(2, '0')
      const min = String(date.getMinutes()).padStart(2, '0')
      return `${y}-${m}-${d} ${h}:${min}`
    },

    // 返回上一页
    goBack() {
      wx.navigateBack()
    }
  }
})

export {}