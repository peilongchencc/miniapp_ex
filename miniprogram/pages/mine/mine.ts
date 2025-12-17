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

/**
 * 手机号脱敏处理
 * @param phone 完整手机号
 * @returns 脱敏后的手机号，如 138****8888
 */
function maskPhoneNumber(phone: string): string {
  if (!phone || phone.length !== 11) return phone
  return phone.substring(0, 3) + '****' + phone.substring(7)
}

const appInstance = getApp<IAppOption>()

Component({
  data: {
    isLoggedIn: false,
    showLoginPopup: false,
    showPrivacyPopup: false,
    agreedPrivacy: false,
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
      phoneNumber: '',
    },
    nicknameHighlight: false,
    avatarHighlight: false,
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
    // 显示登录弹窗
    showLoginPopup() {
      this.setData({ showLoginPopup: true })
    },

    // 隐藏登录弹窗
    hideLoginPopup() {
      this.setData({ showLoginPopup: false })
    },

    // 切换隐私协议勾选状态
    togglePrivacyAgreement() {
      this.setData({ agreedPrivacy: !this.data.agreedPrivacy })
    },

    // 未勾选协议时点击登录按钮
    onLoginBtnTap() {
      if (!this.data.agreedPrivacy) {
        wx.showToast({ title: '请先阅读并同意用户隐私协议', icon: 'none' })
      }
    },

    // 查看隐私协议
    viewPrivacyPolicy() {
      this.setData({ showPrivacyPopup: true })
    },

    // 隐藏隐私协议弹窗
    hidePrivacyPopup() {
      this.setData({ showPrivacyPopup: false })
    },

    // 确认已阅读隐私协议
    confirmPrivacyPolicy() {
      this.setData({ 
        showPrivacyPopup: false,
        agreedPrivacy: true
      })
    },

    // 检查登录状态
    checkLoginStatus() {
      const isLoggedIn = appInstance.globalData.isLoggedIn
      const userInfo = appInstance.globalData.userInfo
      if (isLoggedIn && userInfo) {
        this.setData({ 
          isLoggedIn: true, 
          userInfo: {
            avatarUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName,
            phoneNumber: userInfo.phoneNumber || ''
          }
        })
      } else {
        this.setData({
          isLoggedIn: false,
          userInfo: { avatarUrl: defaultAvatarUrl, nickName: '', phoneNumber: '' }
        })
      }
    },

    // 手机号快速验证回调
    onGetPhoneNumber(e: WechatMiniprogram.CustomEvent) {
      const { code, errMsg } = e.detail

      if (errMsg === 'getPhoneNumber:fail user deny' || !code) {
        wx.showToast({ title: '需要授权手机号才能登录', icon: 'none' })
        return
      }

      wx.showLoading({ title: '登录中...' })
      this.mockGetPhoneFromServer(code)
    },

    /**
     * 模拟从服务器获取手机号
     */
    mockGetPhoneFromServer(code: string) {
      console.log('手机号验证 code:', code)
      
      setTimeout(() => {
        wx.hideLoading()
        
        const mockPhone = '13888888888'
        const defaultNickName = getRandomNickname()
        
        const userInfo = {
          avatarUrl: defaultAvatarUrl,
          nickName: defaultNickName,
          phoneNumber: maskPhoneNumber(mockPhone),
        }

        this.setData({ isLoggedIn: true, showLoginPopup: false, userInfo })
        
        appInstance.globalData.isLoggedIn = true
        appInstance.globalData.userInfo = userInfo
        wx.setStorageSync('isLoggedIn', true)
        wx.setStorageSync('userInfo', userInfo)
        
        wx.showToast({ title: '登录成功', icon: 'success' })
        this.playLoginHighlightAnimation()
      }, 800)
    },

    // 选择头像
    onChooseAvatar(e: WechatMiniprogram.CustomEvent) {
      const { avatarUrl } = e.detail
      this.setData({ "userInfo.avatarUrl": avatarUrl })
      this.saveUserInfo()
      wx.showToast({ title: '头像已更新', icon: 'success' })
    },

    // 输入昵称
    onInputChange(e: WechatMiniprogram.CustomEvent) {
      const nickName = e.detail.value
      if (nickName && nickName.trim()) {
        this.setData({ "userInfo.nickName": nickName })
        this.saveUserInfo()
      }
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
              userInfo: { avatarUrl: defaultAvatarUrl, nickName: '', phoneNumber: '' }
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

    // 我的订单
    goToOrders() {
      wx.navigateTo({ url: '/pages/orders/orders' })
    },

    // 我的收藏
    goToFavorites() {
      wx.navigateTo({ url: '/pages/favorites/favorites' })
    },

    // 我的足迹
    goToFootprints() {
      wx.showToast({ title: '我的足迹功能待开发', icon: 'none' })
    },

    // 收货地址
    goToAddress() {
      wx.navigateTo({ url: '/pages/address/address' })
    },

    // 常见问题
    goToFAQ() {
      wx.showToast({ title: '常见问题功能待开发', icon: 'none' })
    },

    // 关于我们
    goToAbout() {
      wx.showToast({ title: '关于我们功能待开发', icon: 'none' })
    },

    /**
     * 播放登录成功高亮动画
     */
    playLoginHighlightAnimation() {
      this.setData({ nicknameHighlight: true })
      
      setTimeout(() => {
        this.setData({ nicknameHighlight: false, avatarHighlight: true })
        
        setTimeout(() => {
          this.setData({ avatarHighlight: false })
        }, 1600)
      }, 1600)
    }
  },
})
