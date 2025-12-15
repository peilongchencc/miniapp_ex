// product-detail.ts
// 商品详情页 - 订货目录展示

const app = getApp<IAppOption>()

/** 商品规格类型 */
interface ProductSpec {
  id: string
  name: string
  values: SpecValue[]
}

/** 规格值类型 */
interface SpecValue {
  id: string
  name: string
  selected?: boolean
}

/** 商品详情类型 */
interface ProductDetail {
  id: string
  name: string
  images: string[]
  soldCount: number
  stock: number
  categoryId: string
  subCategoryId: string
  description: string
  specs: ProductSpec[]
  details: string[]
  services: string[]
}

Component({
  data: {
    // 商品详情
    product: null as ProductDetail | null,
    // 用户登录状态
    isLoggedIn: false,
    // 导航栏高度（用于安全区占位）
    navBarHeight: 0,
    // 当前轮播索引
    currentImageIndex: 0,
    // 购买数量
    quantity: 1,
    // 已选规格文本
    selectedSpecText: '请选择规格',
    // 是否显示规格弹窗
    showSpecPopup: false,
    // 是否正在加入购物车
    isAddingToCart: false,
    // 是否收藏
    isFavorite: false
  },

  lifetimes: {
    attached() {
      this.initNavBarHeight()
      this.checkLoginStatus()
      this.loadProductDetail()
    }
  },

  pageLifetimes: {
    show() {
      // 刷新收藏状态
      this.checkFavoriteStatus()
    }
  },

  methods: {
    /**
     * 初始化导航栏高度
     * 用于计算安全区占位，防止内容与状态栏重叠
     */
    initNavBarHeight() {
      const rect = wx.getMenuButtonBoundingClientRect()
      const systemInfo = wx.getSystemInfoSync()
      // 导航栏高度 = 状态栏高度 + 胶囊按钮高度 + 上下边距
      const navBarHeight = systemInfo.statusBarHeight! + rect.height + (rect.top - systemInfo.statusBarHeight!) * 2
      this.setData({ navBarHeight })
    },

    /**
     * 检查用户登录状态
     * TODO: 替换为真实登录状态检查
     */
    checkLoginStatus() {
      // 模拟：从全局状态或storage获取登录状态
      const isLoggedIn = wx.getStorageSync('isLoggedIn') || false
      this.setData({ isLoggedIn })
    },

    /**
     * 加载商品详情
     * TODO: 替换为真实API调用
     */
    loadProductDetail() {
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1] as WechatMiniprogram.Page.Instance<
        Record<string, unknown>,
        Record<string, unknown>
      >
      const { id, name, image } = currentPage.options || {}

      // 模拟商品数据
      const mockProduct: ProductDetail = {
        id: (id as string) || '1',
        name: name ? decodeURIComponent(name as string) : '高档檀木骨灰盒 精雕细琢 庄重典雅',
        images: [
          image ? decodeURIComponent(image as string) : '/images/default-product.png',
          '/images/default-product.png',
          '/images/default-product.png'
        ],
        soldCount: 128,
        stock: 50,
        categoryId: '1',
        subCategoryId: '101',
        description: '采用优质檀木精心制作，工艺精湛，庄重典雅，是对逝者最好的缅怀。',
        specs: [
          {
            id: 'material',
            name: '材质',
            values: [
              { id: 'm1', name: '檀木', selected: true },
              { id: 'm2', name: '楠木', selected: false },
              { id: 'm3', name: '红木', selected: false }
            ]
          },
          {
            id: 'size',
            name: '尺寸',
            values: [
              { id: 's1', name: '标准款', selected: true },
              { id: 's2', name: '加大款', selected: false }
            ]
          }
        ],
        details: [
          '材质：精选优质檀木',
          '工艺：传统手工雕刻',
          '尺寸：长32cm × 宽22cm × 高20cm',
          '重量：约3.5kg',
          '包装：精美礼盒包装'
        ],
        services: [
          '7天无理由退换',
          '正品保障',
          '全国配送'
        ]
      }

      this.setData({
        product: mockProduct,
        selectedSpecText: this.getSelectedSpecText(mockProduct.specs)
      })
    },

    /**
     * 获取已选规格文本
     */
    getSelectedSpecText(specs: ProductSpec[]): string {
      const selected = specs.map(spec => {
        const selectedValue = spec.values.find(v => v.selected)
        return selectedValue ? selectedValue.name : ''
      }).filter(Boolean)
      
      return selected.length > 0 ? selected.join('，') : '请选择规格'
    },

    /**
     * 轮播图切换
     */
    onSwiperChange(e: WechatMiniprogram.SwiperChange) {
      this.setData({
        currentImageIndex: e.detail.current
      })
    },

    /**
     * 预览图片
     */
    previewImage(e: WechatMiniprogram.TouchEvent) {
      const { index } = e.currentTarget.dataset
      const { product } = this.data
      if (!product) return

      wx.previewImage({
        current: product.images[index],
        urls: product.images
      })
    },

    /**
     * 显示规格弹窗
     */
    showSpecSelector() {
      this.setData({ showSpecPopup: true })
    },

    /**
     * 隐藏规格弹窗
     */
    hideSpecPopup() {
      this.setData({ showSpecPopup: false })
    },

    /**
     * 选择规格
     */
    selectSpec(e: WechatMiniprogram.TouchEvent) {
      const { specId, valueId } = e.currentTarget.dataset
      const { product } = this.data
      if (!product) return

      const newSpecs = product.specs.map(spec => {
        if (spec.id === specId) {
          return {
            ...spec,
            values: spec.values.map(v => ({
              ...v,
              selected: v.id === valueId
            }))
          }
        }
        return spec
      })

      this.setData({
        'product.specs': newSpecs,
        selectedSpecText: this.getSelectedSpecText(newSpecs)
      })
    },

    /**
     * 减少数量
     */
    decreaseQuantity() {
      if (this.data.quantity > 1) {
        this.setData({ quantity: this.data.quantity - 1 })
      }
    },

    /**
     * 增加数量
     */
    increaseQuantity() {
      const { product, quantity } = this.data
      if (product && quantity < product.stock) {
        this.setData({ quantity: quantity + 1 })
      }
    },

    /**
     * 输入数量
     */
    onQuantityInput(e: WechatMiniprogram.Input) {
      const { product } = this.data
      let value = parseInt(e.detail.value) || 1
      if (value < 1) value = 1
      if (product && value > product.stock) value = product.stock
      this.setData({ quantity: value })
    },

    /**
     * 检查收藏状态
     */
    checkFavoriteStatus() {
      const { product } = this.data
      if (product) {
        const isFavorite = app.isFavorite(product.id)
        this.setData({ isFavorite })
      }
    },

    /**
     * 切换收藏状态
     */
    toggleFavorite() {
      const { product, isFavorite } = this.data
      if (!product) return

      if (isFavorite) {
        app.removeFavorite(product.id)
        this.setData({ isFavorite: false })
        wx.showToast({ title: '已取消收藏', icon: 'none' })
      } else {
        app.addFavorite({
          id: product.id,
          name: product.name,
          image: product.images[0]
        })
        this.setData({ isFavorite: true })
        wx.showToast({ title: '已收藏', icon: 'success' })
      }
    },

    /**
     * 加入购物车
     */
    addToCart() {
      const { product, quantity, isAddingToCart, isLoggedIn } = this.data
      if (!product || isAddingToCart) return

      // 未登录提示
      if (!isLoggedIn) {
        wx.showModal({
          title: '提示',
          content: '请先登录后再操作',
          confirmText: '去登录',
          success: (res) => {
            if (res.confirm) {
              wx.switchTab({ url: '/pages/mine/mine' })
            }
          }
        })
        return
      }

      this.setData({ isAddingToCart: true })

      app.addToCart({
        id: product.id,
        name: product.name,
        image: product.images[0],
        quantity: quantity
      })

      wx.showToast({
        title: '已加入购物车',
        icon: 'success',
        duration: 1500
      })

      setTimeout(() => {
        this.setData({ 
          isAddingToCart: false,
          showSpecPopup: false
        })
      }, 1500)
    },

    /**
     * 立即购买
     */
    buyNow() {
      const { product, quantity, isLoggedIn } = this.data
      if (!product) return

      // 未登录提示
      if (!isLoggedIn) {
        wx.showModal({
          title: '提示',
          content: '请先登录后再操作',
          confirmText: '去登录',
          success: (res) => {
            if (res.confirm) {
              wx.switchTab({ url: '/pages/mine/mine' })
            }
          }
        })
        return
      }

      app.addToCart({
        id: product.id,
        name: product.name,
        image: product.images[0],
        quantity: quantity
      })

      wx.switchTab({ url: '/pages/cart/cart' })
    },

    /**
     * 联系客服
     */
    contactService() {
      wx.showActionSheet({
        itemList: ['拨打电话', '在线客服'],
        success: (res) => {
          if (res.tapIndex === 0) {
            wx.makePhoneCall({
              phoneNumber: '13900000000',
              fail: () => {
                wx.showToast({ title: '拨打失败', icon: 'none' })
              }
            })
          } else {
            wx.showToast({ title: '客服功能开发中', icon: 'none' })
          }
        }
      })
    },

    /**
     * 分享商品
     */
    shareProduct() {
      wx.showToast({ title: '分享功能开发中', icon: 'none' })
    },

    /**
     * 返回上一页
     */
    goBack() {
      wx.navigateBack()
    }
  }
})
