// order-detail.ts
import { formatTime } from '../../utils/util'

const app = getApp<IAppOption>()

// 订单状态步骤
interface StatusStep {
  status: string
  label: string
  time?: string
  active: boolean
  done: boolean
}

// 扩展的订单详情类型
interface OrderDetail {
  id: string
  createTime: string
  status: string
  statusText: string
  remark?: string
  // 收货信息
  receiver: {
    name: string
    phone: string
    address: string
  }
  // 商品列表
  items: Array<{
    id: string
    name: string
    image: string
    quantity: number
    spec?: string
    /** 基准价（划线价） */
    basePrice: number
    /** 用户专属价格，null表示未设置 */
    userPrice: number | null
  }>
  // 价格信息
  pricing: {
    subtotal: number
    freight: number
    discount: number
    total: number
  }
  // 状态进度
  statusSteps: StatusStep[]
  // 物流信息
  logistics?: {
    company: string
    trackingNo: string
    latestInfo?: string
  }
}

Component({
  data: {
    order: null as OrderDetail | null,
    orderId: '' as string,
    statusMap: {
      pending: '待确认',
      confirmed: '已确认',
      shipped: '配送中',
      completed: '已完成'
    } as Record<string, string>,
    // 状态对应的图标
    statusIconMap: {
      pending: '⏳',
      confirmed: '✓',
      shipped: '🚚',
      completed: '✅'
    } as Record<string, string>
  },

  pageLifetimes: {
    show() {
      // 在页面显示时获取参数并加载数据
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1] as WechatMiniprogram.Page.Instance<
        Record<string, unknown>,
        Record<string, unknown>
      >
      const orderId = currentPage.options?.id as string
      if (orderId && orderId !== this.data.orderId) {
        this.setData({ orderId })
        this.loadOrder(orderId)
      }
    }
  },

  methods: {
    // 加载订单详情
    loadOrder(orderId: string) {
      const order = app.globalData.orderHistory.find(o => o.id === orderId)
      if (!order) return

      // 构建状态步骤
      const statusOrder = ['pending', 'confirmed', 'shipped', 'completed']
      const currentIndex = statusOrder.indexOf(order.status)
      const statusSteps: StatusStep[] = statusOrder.map((status, index) => ({
        status,
        label: this.data.statusMap[status],
        active: index === currentIndex,
        done: index < currentIndex,
        time: index <= currentIndex ? this.getMockStatusTime(order.createTime, index) : undefined
      }))

      // 商品列表（添加价格信息）
      const itemsWithPrice = order.items.map(item => ({
        ...item,
        basePrice: item.basePrice || this.getMockBasePrice(item.name),
        userPrice: item.userPrice !== undefined ? item.userPrice : null
      }))

      // 模拟完整订单详情数据（后续替换为真实API数据）
      const orderDetail: OrderDetail = {
        id: order.id,
        createTime: formatTime(new Date(order.createTime)),
        status: order.status,
        statusText: this.data.statusMap[order.status],
        remark: order.remark,
        // 模拟收货信息
        receiver: {
          name: '张先生',
          phone: '138****8888',
          address: '北京市朝阳区XX街道XX小区XX号楼XX单元XX室'
        },
        items: itemsWithPrice,
        // 计算总价
        pricing: this.calculatePricing(itemsWithPrice),
        statusSteps,
        // 配送中状态显示物流信息
        logistics: order.status === 'shipped' || order.status === 'completed' ? {
          company: '顺丰速运',
          trackingNo: 'SF' + order.id.replace('ORD', ''),
          latestInfo: '快递员正在派送中，请保持电话畅通'
        } : undefined
      }

      this.setData({ order: orderDetail })
    },

    // 模拟获取商品基准价
    getMockBasePrice(name: string): number {
      const priceMap: Record<string, number> = {
        '金元宝（大号）': 38,
        '香烛套装': 48,
        '纸钱（整箱）': 88,
        '花圈（中号）': 268,
        '寿衣套装': 888,
        '莲花灯': 25,
        '黄纸（大捆）': 35,
        '骨灰盒（红木）': 3888,
        '寿被': 368,
        '挽联': 58,
        '白布': 68,
        '纸扎别墅': 588,
        '纸扎汽车': 388,
        '纸扎手机': 128
      }
      return priceMap[name] || 128
    },

    // 计算价格（优先使用专属价，否则使用基准价）
    calculatePricing(items: Array<{ userPrice: number | null; basePrice: number; quantity: number }>) {
      const subtotal = items.reduce((sum, item) => {
        const price = item.userPrice ?? item.basePrice
        return sum + price * item.quantity
      }, 0)
      const freight = subtotal >= 200 ? 0 : 15
      const discount = subtotal >= 500 ? 20 : 0
      return {
        subtotal,
        freight,
        discount,
        total: subtotal + freight - discount
      }
    },

    // 模拟状态时间
    getMockStatusTime(createTime: number, stepIndex: number): string {
      const time = new Date(createTime + stepIndex * 3600000 * 2)
      return formatTime(time)
    },

    // 复制订单号
    copyOrderId() {
      if (!this.data.order) return
      wx.setClipboardData({
        data: this.data.order.id,
        success: () => {
          wx.showToast({ title: '已复制', icon: 'success' })
        }
      })
    },

    // 复制物流单号
    copyTrackingNo() {
      if (!this.data.order?.logistics) return
      wx.setClipboardData({
        data: this.data.order.logistics.trackingNo,
        success: () => {
          wx.showToast({ title: '已复制', icon: 'success' })
        }
      })
    },

    // 拨打电话
    callPhone() {
      wx.makePhoneCall({
        phoneNumber: '13888888888'
      })
    },

    // 联系客服
    contactService() {
      wx.showModal({
        title: '联系客服',
        content: '客服电话：400-XXX-XXXX\n服务时间：9:00-18:00',
        showCancel: false,
        confirmText: '知道了'
      })
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

    // 取消订单
    cancelOrder() {
      wx.showModal({
        title: '确认取消',
        content: '确定要取消该订单吗？',
        success: (res) => {
          if (res.confirm) {
            wx.showToast({ title: '订单已取消', icon: 'success' })
            setTimeout(() => wx.navigateBack(), 1500)
          }
        }
      })
    },

    // 确认收货
    confirmReceive() {
      wx.showModal({
        title: '确认收货',
        content: '请确认您已收到商品',
        success: (res) => {
          if (res.confirm) {
            wx.showToast({ title: '已确认收货', icon: 'success' })
          }
        }
      })
    },

    // 返回
    goBack() {
      wx.navigateBack()
    }
  }
})
