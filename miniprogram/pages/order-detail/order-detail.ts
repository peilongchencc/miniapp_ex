// order-detail.ts
import { formatTime } from '../../utils/util'
import { fetchOrderDetail, cancelOrderApi, confirmReceiveApi } from '../../utils/order-api'

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
  }>
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
    showSuccessTip: false,  // 是否显示提交成功提示
    statusMap: {
      pending: '待确认',
      confirmed: '已确认',
      shipped: '配送中',
      completed: '已完成',
      cancelled: '已取消'
    } as Record<string, string>,
    // 状态对应的图标
    statusIconMap: {
      pending: '⏳',
      confirmed: '✓',
      shipped: '🚚',
      completed: '✅',
      cancelled: '❌'
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
      const fromSubmit = currentPage.options?.fromSubmit === '1'
      if (orderId && orderId !== this.data.orderId) {
        this.setData({ 
          orderId,
          showSuccessTip: fromSubmit
        })
        this.loadOrder(orderId)
        
        // 3秒后自动隐藏成功提示
        if (fromSubmit) {
          setTimeout(() => {
            this.setData({ showSuccessTip: false })
          }, 3000)
        }
      }
    }
  },

  methods: {
    // 加载订单详情
    async loadOrder(orderId: string) {
      // 优先从本地获取（刚提交的订单）
      let order = app.globalData.orderHistory.find(o => o.id === orderId)
      
      // 本地没有且已登录，从云端获取
      if (!order && app.globalData.isLoggedIn) {
        const cloudOrder = await fetchOrderDetail(orderId)
        if (cloudOrder) {
          order = {
            id: cloudOrder.id,
            items: cloudOrder.items,
            createTime: cloudOrder.createTime,
            status: cloudOrder.status as IOrder['status'],
            remark: cloudOrder.remark
          }
        }
      }
      
      if (!order) return

      // 构建状态步骤
      const statusOrder = ['pending', 'confirmed', 'shipped', 'completed']
      const currentIndex = statusOrder.indexOf(order.status)
      const statusSteps: StatusStep[] = statusOrder.map((status, index) => ({
        status,
        label: this.data.statusMap[status],
        active: index === currentIndex,
        done: index < currentIndex,
        time: index <= currentIndex ? this.getMockStatusTime(order!.createTime, index) : undefined
      }))

      // 构建订单详情数据
      const orderDetail: OrderDetail = {
        id: order.id,
        createTime: formatTime(new Date(order.createTime)),
        status: order.status,
        statusText: this.data.statusMap[order.status],
        remark: order.remark,
        // 收货信息（后续从用户信息获取）
        receiver: {
          name: app.globalData.userInfo?.nickName || '用户',
          phone: app.globalData.userInfo?.phoneNumber || '未设置',
          address: '请联系商家确认配送地址'
        },
        items: order.items,
        statusSteps,
        // 配送中状态显示物流信息
        logistics: order.status === 'shipped' || order.status === 'completed' ? {
          company: '商家配送',
          trackingNo: order.id,
          latestInfo: '商家正在配送中，请保持电话畅通'
        } : undefined
      }

      this.setData({ order: orderDetail })
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
      const order = this.data.order
      if (!order) return

      wx.showModal({
        title: '确认取消',
        content: '确定要取消该订单吗？',
        success: async (res) => {
          if (res.confirm) {
            wx.showLoading({ title: '处理中...' })
            
            // 已登录调用后端 API
            if (app.globalData.isLoggedIn) {
              const success = await cancelOrderApi(order.id)
              wx.hideLoading()
              
              if (success) {
                // 更新本地订单状态
                const localOrder = app.globalData.orderHistory.find(o => o.id === order.id)
                if (localOrder) {
                  localOrder.status = 'cancelled'
                  wx.setStorageSync('orderHistory', app.globalData.orderHistory)
                }
                wx.showToast({ title: '订单已取消', icon: 'success' })
                setTimeout(() => wx.navigateBack(), 1500)
              } else {
                wx.showToast({ title: '取消失败', icon: 'error' })
              }
            } else {
              // 未登录，仅更新本地
              const localOrder = app.globalData.orderHistory.find(o => o.id === order.id)
              if (localOrder) {
                localOrder.status = 'cancelled'
                wx.setStorageSync('orderHistory', app.globalData.orderHistory)
              }
              wx.hideLoading()
              wx.showToast({ title: '订单已取消', icon: 'success' })
              setTimeout(() => wx.navigateBack(), 1500)
            }
          }
        }
      })
    },

    // 确认收货
    confirmReceive() {
      const order = this.data.order
      if (!order) return

      wx.showModal({
        title: '确认收货',
        content: '请确认您已收到商品',
        success: async (res) => {
          if (res.confirm) {
            wx.showLoading({ title: '处理中...' })
            
            // 已登录调用后端 API
            if (app.globalData.isLoggedIn) {
              const success = await confirmReceiveApi(order.id)
              wx.hideLoading()
              
              if (success) {
                // 更新本地订单状态
                const localOrder = app.globalData.orderHistory.find(o => o.id === order.id)
                if (localOrder) {
                  localOrder.status = 'completed'
                  wx.setStorageSync('orderHistory', app.globalData.orderHistory)
                }
                // 刷新页面显示
                this.loadOrder(order.id)
                wx.showToast({ title: '已确认收货', icon: 'success' })
              } else {
                wx.showToast({ title: '确认失败', icon: 'error' })
              }
            } else {
              // 未登录，仅更新本地
              const localOrder = app.globalData.orderHistory.find(o => o.id === order.id)
              if (localOrder) {
                localOrder.status = 'completed'
                wx.setStorageSync('orderHistory', app.globalData.orderHistory)
              }
              wx.hideLoading()
              this.loadOrder(order.id)
              wx.showToast({ title: '已确认收货', icon: 'success' })
            }
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
