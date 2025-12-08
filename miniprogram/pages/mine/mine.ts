// mine.ts
const defaultAvatarUrl = '/images/default-avatar.png'

// 随机昵称列表
const nicknameList = [
  "福善居士", "怀德雅士", "尚善之客", "敬孝之人",
  "仁心之友", "积善之士", "崇礼之人", "明德之友", "养正之客"
]

function getRandomNickname() {
  const randomIndex = Math.floor(Math.random() * nicknameList.length)
  return nicknameList[randomIndex]
}

const appInstance = getApp<IAppOption>()

Component({
  data: {
    isLoggedIn: false,
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
  },

  lifetimes: {
    attached() {
      this.checkLoginStatus()
    }
  },

  pageLifetimes: {
    show() {
      this.checkLoginStatus()
    }
  },

  methods: {
    // 检查登录状态
    checkLoginStatus() {
      const isLoggedIn = appInstance.globalData.isLoggedIn
      const userInfo = appInstance.globalData.userInfo
      if (isLoggedIn && userInfo) {
        this.setData({ isLoggedIn: true, userInfo })
      } else {
        this.setData({
          isLoggedIn: false,
          userInfo: { avatarUrl: defaultAvatarUrl, nickName: '' }
        })
      }
    },

    // 点击登录/注册按钮
    handleLogin() {
      // 生成随机昵称作为默认昵称
      const defaultNickName = getRandomNickname()
      this.setData({
        isLoggedIn: true,
        userInfo: {
          avatarUrl: defaultAvatarUrl,
          nickName: defaultNickName,
        }
      })
      // 保存到全局和本地存储
      appInstance.globalData.isLoggedIn = true
      appInstance.globalData.userInfo = this.data.userInfo
      wx.setStorageSync('isLoggedIn', true)
      wx.setStorageSync('userInfo', this.data.userInfo)
      wx.showToast({ title: '登录成功', icon: 'success' })
    },

    // 选择头像
    onChooseAvatar(e: WechatMiniprogram.CustomEvent) {
      const { avatarUrl } = e.detail
      this.setData({ "userInfo.avatarUrl": avatarUrl })
      this.saveUserInfo()
    },

    // 输入昵称
    onInputChange(e: WechatMiniprogram.CustomEvent) {
      const nickName = e.detail.value
      this.setData({ "userInfo.nickName": nickName })
      this.saveUserInfo()
    },

    // 保存用户信息
    saveUserInfo() {
      appInstance.globalData.userInfo = this.data.userInfo
      wx.setStorageSync('userInfo', this.data.userInfo)
    },

    // 退出登录
    handleLogout() {
      wx.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            this.setData({
              isLoggedIn: false,
              userInfo: { avatarUrl: defaultAvatarUrl, nickName: '' }
            })
            appInstance.globalData.isLoggedIn = false
            appInstance.globalData.userInfo = null
            wx.removeStorageSync('isLoggedIn')
            wx.removeStorageSync('userInfo')
            wx.showToast({ title: '已退出登录', icon: 'success' })
          }
        }
      })
    },

    // 联系客服
    contactShop() {
      wx.showToast({ title: '联系客服功能待开发', icon: 'none' })
    },

    // 我的收藏
    goToFavorites() {
      wx.navigateTo({ url: '/pages/favorites/favorites' })
    },

    // 我的订单（快捷复购入口）
    goToOrders() {
      wx.navigateTo({ url: '/pages/orders/orders' })
    },

    // 我的地址
    goToAddress() {
      wx.showToast({ title: '地址管理功能待开发', icon: 'none' })
    }
  },
})
