// order-detail.ts
import { formatTime } from '../../utils/util'

const app = getApp<IAppOption>()

// 格式化后的订单类型（createTime 为字符串）
interface FormattedOrder extends Omit<IOrder, 'createTime'> {
  createTime: string
}

Component({
  data: {
    order: null as FormattedOrder | null,
    statusMap: {
      pending: '待确认',
      confirmed: '已确认',
      shipped: '配送中',
      completed: '已完成'
    } as Record<string, string>
  },

  lifetimes: {
    attached() {
      // 从页面参数获取订单ID
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1] as WechatMiniprogram.Page.Instance<
        Record<string, unknown>,
        Record<string, unknown>
      >
      const orderId = currentPage.options?.id as string
      if (orderId) {
        this.loadOrder(orderId)
      }
    }
  },

  methods: {
    // 加载订单详情
    loadOrder(orderId: string) {
      const order = app.globalData.orderHistory.find(o => o.id === orderId)
      if (order) {
        // 格式化时间
        const formattedOrder: FormattedOrder = {
          ...order,
          createTime: formatTime(new Date(order.createTime))
        }
        this.setData({ order: formattedOrder })
      }
    },

    // 快捷复购
    handleReorder() {
      const order = this.data.order
      if (!order) return

      const success = app.reorder(order.id)
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
      }
    },

    // 返回
    goBack() {
      wx.navigateBack()
    }
  }
})
