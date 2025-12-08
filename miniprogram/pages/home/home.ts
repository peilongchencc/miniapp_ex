// home.ts
// 首页 - 包含搜索、轮播、分类、推荐商品、服务特色、联系方式

Component({
  data: {
    // 搜索关键词
    searchKeyword: '',
    
    // 轮播图数据
    banners: [
      { id: 1, image: '/images/default-product.png', title: '专业殡葬服务 用心守护每一程' },
      { id: 2, image: '/images/default-product.png', title: '全城免费配送 24小时响应' },
      { id: 3, image: '/images/default-product.png', title: '品质保证 价格透明' }
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
    hotProducts: [
      { id: 1, name: '高档真丝寿衣七件套', price: 1280, originalPrice: 1580, image: '/images/default-product.png', sales: 328 },
      { id: 2, name: '天然玉石骨灰盒', price: 2680, originalPrice: 3200, image: '/images/default-product.png', sales: 256 },
      { id: 3, name: '鲜花花圈精选款', price: 388, originalPrice: 488, image: '/images/default-product.png', sales: 512 },
      { id: 4, name: '祭祀用品套装', price: 168, originalPrice: 218, image: '/images/default-product.png', sales: 892 }
    ],
    
    // 服务特色
    services: [
      { id: 1, icon: '🕐', title: '24小时服务', desc: '全天候响应' },
      { id: 2, icon: '🚚', title: '免费配送', desc: '全城免运费' },
      { id: 3, icon: '👨‍💼', title: '专业指导', desc: '一对一咨询' },
      { id: 4, icon: '✅', title: '品质保证', desc: '正品保障' }
    ],
    
    // 联系信息
    contact: {
      phone: '400-XXX-XXXX',
      workTime: '24小时服务',
      address: '贵阳市XX区XX路XX号'
    }
  },

  methods: {
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
      // 跳转到分类页
      wx.switchTab({ url: '/pages/category/category' })
    },

    // 点击商品
    onProductTap(e: WechatMiniprogram.TouchEvent) {
      const { id, name, image } = e.currentTarget.dataset
      wx.navigateTo({
        url: `/pages/product-detail/product-detail?id=${id}&name=${encodeURIComponent(name)}&image=${encodeURIComponent(image)}`
      })
    },

    // 拨打电话
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
