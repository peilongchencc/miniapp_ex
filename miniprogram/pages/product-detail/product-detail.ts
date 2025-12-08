// product-detail.ts
// 商品详情页 - 展示商品信息，支持加入购物车

const app = getApp<IAppOption>()

Component({
  data: {
    product: null as {
      id: string
      name: string
      image: string
      categoryId: string
      subCategoryId: string
      description?: string
    } | null,
    quantity: 1,
    isAddingToCart: false
  },

  lifetimes: {
    attached() {
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1] as WechatMiniprogram.Page.Instance<
        Record<string, unknown>,
        Record<string, unknown>
      >
      const { id, name, image } = currentPage.options || {}
      
      if (id && name) {
        this.setData({
          product: {
            id: id as string,
            name: decodeURIComponent(name as string),
            image: decodeURIComponent((image as string) || '/images/default-product.png'),
            categoryId: '',
            subCategoryId: '',
            description: '如需了解详细规格和价格，请联系客服咨询'
          }
        })
      }
    }
  },

  methods: {
    // 减少数量
    decreaseQuantity() {
      if (this.data.quantity > 1) {
        this.setData({ quantity: this.data.quantity - 1 })
      }
    },

    // 增加数量
    increaseQuantity() {
      if (this.data.quantity < 999) {
        this.setData({ quantity: this.data.quantity + 1 })
      }
    },

    // 输入数量
    onQuantityInput(e: WechatMiniprogram.Input) {
      let value = parseInt(e.detail.value) || 1
      if (value < 1) value = 1
      if (value > 999) value = 999
      this.setData({ quantity: value })
    },

    // 加入购物车
    addToCart() {
      const { product, quantity } = this.data
      if (!product || this.data.isAddingToCart) return

      this.setData({ isAddingToCart: true })

      app.addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        quantity: quantity
      })

      wx.showToast({
        title: '已加入购物车',
        icon: 'success',
        duration: 1500
      })

      setTimeout(() => {
        this.setData({ isAddingToCart: false })
      }, 1500)
    },

    // 立即下单（加入购物车并跳转）
    buyNow() {
      const { product, quantity } = this.data
      if (!product) return

      app.addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        quantity: quantity
      })

      wx.switchTab({ url: '/pages/cart/cart' })
    },

    // 联系客服询价
    contactService() {
      wx.showModal({
        title: '联系客服',
        content: '如需询价或了解更多，请拨打电话或添加微信联系我们',
        confirmText: '拨打电话',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: '13900000000', // 替换为真实电话
              fail: () => {
                wx.showToast({ title: '拨打失败', icon: 'none' })
              }
            })
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
