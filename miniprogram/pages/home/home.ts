// home.ts
// 首页 - 包含搜索、轮播、分类、推荐商品、服务特色、联系方式

/** 热销商品类型 */
interface HotProduct {
  id: number
  name: string
  /** 基准价（划线价） */
  basePrice: number
  /** 用户专属价格，null表示未设置 */
  userPrice: number | null
  image: string
  sales: number
}

Component({
  data: {
    // 用户登录状态
    isLoggedIn: false,
    
    // 搜索关键词
    searchKeyword: '',
    
    // 轮播图数据
    banners: [
      { id: 1, image: '/images/default-product.png', title: '专业殡葬服务 用心守护每一程' },
      { id: 2, image: '/images/default-product.png', title: '全城免费配送 24小时响应' },
      { id: 3, image: '/images/default-product.png', title: '品质保证 价格优惠' }
    ],
    currentBanner: 0,
    
    // 商品分类入口
    categories: [
      { id: 1, name: '寿衣', emoji: '👔' },
      { id: 2, name: '骨灰盒', emoji: '🏺' },
      { id: 3, name: '花圈', emoji: '💐' },
      { id: 4, name: '祭祀用品', emoji: '🕯️' },
      { id: 5, name: '丧葬服务', emoji: '🙏' },
      { id: 6, name: '纸扎用品', emoji: '📜' },
      { id: 7, name: '香烛', emoji: '🪔' },
      { id: 8, name: '更多', emoji: '📋' }
    ],
    
    // 热销/推荐商品
    // basePrice: 基准价（划线价）
    // userPrice: 用户专属价格（当前价），低于基准价时显示划线效果
    hotProducts: [
      { id: 1, name: '高档真丝寿衣七件套', basePrice: 1580, userPrice: 1280, image: '/images/default-product.png', sales: 328 },
      { id: 2, name: '天然玉石骨灰盒', basePrice: 4280, userPrice: 3680, image: '/images/default-product.png', sales: 256 },
      { id: 3, name: '鲜花花圈精选款', basePrice: 488, userPrice: 388, image: '/images/default-product.png', sales: 512 },
      { id: 4, name: '祭祀用品套装', basePrice: 218, userPrice: 168, image: '/images/default-product.png', sales: 892 }
    ] as HotProduct[],
    
    // 服务特色
    services: [
      { id: 1, icon: '🕐', title: '24小时服务', desc: '全天候响应' },
      { id: 2, icon: '🚚', title: '免费配送', desc: '全城免运费' },
      { id: 3, icon: '👨‍💼', title: '专业指导', desc: '一对一咨询' },
      { id: 4, icon: '✅', title: '品质保证', desc: '正品保障' }
    ],
    
    // 联系信息（修改电话号码在此处）
    contact: {
      phone: '13895617366',  // 服务热线号码，点击后会调用 wx.makePhoneCall
      workTime: '24小时服务',
      address: '宁夏回族自治区银川市兴庆区立达国际建材城39号楼2层203室'
    }
  },

  lifetimes: {
    attached() {
      this.checkLoginStatus()
      this.loadHotProducts()
    }
  },

  pageLifetimes: {
    show() {
      // 每次显示页面时检查登录状态（可能从登录页返回）
      this.checkLoginStatus()
    }
  },

  methods: {
    /**
     * 检查用户登录状态
     */
    checkLoginStatus() {
      const isLoggedIn = wx.getStorageSync('isLoggedIn') || false
      this.setData({ isLoggedIn })
    },

    /**
     * 加载热销商品
     * TODO: 替换为真实API调用，后端根据当前用户返回对应的userPrice
     */
    loadHotProducts() {
      // 模拟数据，实际开发时从后端获取
      // 后端会根据当前登录用户返回每个商品的 userPrice
      // basePrice: 基准价（划线价）
      // userPrice: 用户专属价格（当前价）
      const mockProducts: HotProduct[] = [
        { id: 1, name: '高档真丝寿衣七件套', basePrice: 1580, userPrice: 1280, image: '/images/default-product.png', sales: 328 },
        { id: 2, name: '天然玉石骨灰盒', basePrice: 4280, userPrice: 3680, image: '/images/default-product.png', sales: 256 },
        { id: 3, name: '鲜花花圈精选款', basePrice: 488, userPrice: 388, image: '/images/default-product.png', sales: 512 },
        { id: 4, name: '祭祀用品套装', basePrice: 218, userPrice: 168, image: '/images/default-product.png', sales: 892 }
      ]
      this.setData({ hotProducts: mockProducts })
    },

    /**
     * 跳转登录
     */
    goToLogin() {
      wx.navigateTo({ url: '/pages/login/login' })
    },

    /**
     * 联系客服获取报价
     */
    contactForPrice() {
      wx.showActionSheet({
        itemList: ['拨打电话咨询', '微信客服'],
        success: (res) => {
          if (res.tapIndex === 0) {
            wx.makePhoneCall({
              phoneNumber: '13900000000',
              fail: () => {
                wx.showToast({ title: '拨打失败', icon: 'none' })
              }
            })
          } else {
            wx.showToast({ title: '请添加微信：xxxxx', icon: 'none', duration: 3000 })
          }
        }
      })
    },

    // 搜索输入
    onSearchInput(e: WechatMiniprogram.Input) {
      this.setData({ searchKeyword: e.detail.value })
    },

    // 执行搜索
    onSearch() {
      const keyword = this.data.searchKeyword.trim()
      if (!keyword) {
        wx.showToast({ title: '请输入搜索内容', icon: 'none' })
        return
      }
      wx.showToast({ title: '搜索功能待开发', icon: 'none' })
    },

    // 轮播图切换
    onBannerChange(e: WechatMiniprogram.SwiperChange) {
      this.setData({ currentBanner: e.detail.current })
    },

    // 点击轮播图
    onBannerTap() {
      wx.showToast({ title: '轮播详情待开发', icon: 'none' })
    },

    // 点击分类
    onCategoryTap() {
      wx.switchTab({ url: '/pages/category/category' })
    },

    // 查看更多热销商品
    onViewMoreHot() {
      // 设置全局状态，让分类页知道要跳转到热销推荐
      const app = getApp<IAppOption>()
      app.globalData.targetCategoryId = 'hot'
      wx.switchTab({ url: '/pages/category/category' })
    },

    // 点击商品
    onProductTap(e: WechatMiniprogram.TouchEvent) {
      const { id, name, image, basePrice } = e.currentTarget.dataset
      wx.navigateTo({
        url: `/pages/product-detail/product-detail?id=${id}&name=${encodeURIComponent(name)}&image=${encodeURIComponent(image)}&basePrice=${basePrice}`
      })
    },

    /**
     * 拨打服务热线
     * 
     * 使用 wx.makePhoneCall 调起系统拨号界面
     * 注意：弹窗文案 "拨打xxx?" 是系统原生弹窗，无法自定义
     * 开发者工具中显示 "【仅为模拟】"，真机上会直接调起拨号
     */
    onCallPhone() {
      wx.makePhoneCall({
        phoneNumber: this.data.contact.phone.replace(/-/g, ''),
        fail: () => {
          wx.showToast({ title: '拨打电话失败', icon: 'none' })
        }
      })
    },

    // 联系客服
    onContactService() {
      wx.showModal({
        title: '联系我们',
        content: '如需咨询或下单，请拨打电话或添加微信联系',
        confirmText: '拨打电话',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: this.data.contact.phone.replace(/-/g, ''),
              fail: () => {
                wx.showToast({ title: '拨打失败', icon: 'none' })
              }
            })
          }
        }
      })
    },

    // 查看地址
    onViewAddress() {
      wx.showToast({ title: '地图导航待开发', icon: 'none' })
    }
  }
})
