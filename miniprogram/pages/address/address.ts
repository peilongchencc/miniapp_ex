// address.ts

/**
 * 地址数据接口
 */
interface IAddress {
  id: string
  userName: string
  telNumber: string
  provinceName: string
  cityName: string
  countyName: string
  detailInfo: string
  postalCode: string
  isDefault: boolean
}

/**
 * 生成唯一ID
 */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}

Component({
  data: {
    addressList: [] as IAddress[]
  },

  lifetimes: {
    attached() {
      this.loadAddressList()
    }
  },

  methods: {
    /**
     * 加载地址列表
     * TODO: 后端开发后替换为API调用
     */
    loadAddressList() {
      const addressList = wx.getStorageSync('addressList') || []
      this.setData({ addressList })
    },

    /**
     * 保存地址列表到本地
     * TODO: 后端开发后替换为API调用
     */
    saveAddressList() {
      wx.setStorageSync('addressList', this.data.addressList)
    },

    /**
     * 通过微信原生界面新增地址
     */
    addAddressFromWx() {
      wx.chooseAddress({
        success: (res) => {
          const newAddress: IAddress = {
            id: generateId(),
            userName: res.userName,
            telNumber: res.telNumber,
            provinceName: res.provinceName,
            cityName: res.cityName,
            countyName: res.countyName,
            detailInfo: res.detailInfo,
            postalCode: res.postalCode || '',
            isDefault: this.data.addressList.length === 0
          }
          
          const newList = [...this.data.addressList, newAddress]
          this.setData({ addressList: newList })
          this.saveAddressList()
          wx.showToast({ title: '添加成功', icon: 'success' })
        },
        fail: (err) => {
          if (err.errMsg.includes('auth deny')) {
            wx.showModal({
              title: '提示',
              content: '需要授权地址权限才能使用此功能，是否前往设置？',
              success: (modalRes) => {
                if (modalRes.confirm) {
                  wx.openSetting()
                }
              }
            })
          }
        }
      })
    },

    /**
     * 编辑地址（也通过微信原生界面）
     */
    editAddress() {
      wx.chooseAddress({
        success: (res) => {
          // 微信原生界面编辑后作为新地址添加
          const newAddress: IAddress = {
            id: generateId(),
            userName: res.userName,
            telNumber: res.telNumber,
            provinceName: res.provinceName,
            cityName: res.cityName,
            countyName: res.countyName,
            detailInfo: res.detailInfo,
            postalCode: res.postalCode || '',
            isDefault: false
          }
          
          const newList = [...this.data.addressList, newAddress]
          this.setData({ addressList: newList })
          this.saveAddressList()
          wx.showToast({ title: '添加成功', icon: 'success' })
        },
        fail: (err) => {
          if (err.errMsg.includes('auth deny')) {
            wx.showModal({
              title: '提示',
              content: '需要授权地址权限才能使用此功能，是否前往设置？',
              success: (modalRes) => {
                if (modalRes.confirm) {
                  wx.openSetting()
                }
              }
            })
          }
        }
      })
    },

    /**
     * 设为默认地址
     */
    setDefault(e: WechatMiniprogram.CustomEvent) {
      const id = e.currentTarget.dataset.id
      const newList = this.data.addressList.map(item => ({
        ...item,
        isDefault: item.id === id
      }))
      this.setData({ addressList: newList })
      this.saveAddressList()
      wx.showToast({ title: '已设为默认', icon: 'success' })
    },

    /**
     * 删除地址
     */
    deleteAddress(e: WechatMiniprogram.CustomEvent) {
      const id = e.currentTarget.dataset.id
      wx.showModal({
        title: '提示',
        content: '确定要删除这个地址吗？',
        success: (res) => {
          if (res.confirm) {
            const newList = this.data.addressList.filter(item => item.id !== id)
            this.setData({ addressList: newList })
            this.saveAddressList()
            wx.showToast({ title: '已删除', icon: 'success' })
          }
        }
      })
    },

    /**
     * 选择地址（供其他页面调用）
     */
    selectAddress(e: WechatMiniprogram.CustomEvent) {
      const id = e.currentTarget.dataset.id
      const address = this.data.addressList.find(item => item.id === id)
      
      // 获取页面栈，判断是否从其他页面跳转过来选择地址
      const pages = getCurrentPages()
      if (pages.length > 1 && address) {
        const prevPage = pages[pages.length - 2] as Record<string, unknown>
        if (typeof prevPage.onAddressSelected === 'function') {
          prevPage.onAddressSelected(address)
          wx.navigateBack()
        }
      }
    }
  }
})
