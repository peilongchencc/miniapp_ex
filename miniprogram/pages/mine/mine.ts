// mine.ts
import { miniappLogin, phoneAuth, logout } from '../../utils/auth'

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
    openid: '',  // 存储 openid 用于手机号授权
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
    async onGetPhoneNumber(e: WechatMiniprogram.CustomEvent) {
      const { code, errMsg, encryptedData, iv } = e.detail

      if (errMsg === 'getPhoneNumber:fail user deny' || !code) {
        wx.showToast({ title: '需要授权手机号才能登录', icon: 'none' })
        return
      }

      wx.showLoading({ title: '登录中...' })

      try {
        // 第一步：调用 wx.login 获取 openid
        const loginData = await miniappLogin()
        
        if (loginData.need_phone && loginData.openid) {
          // 需要手机号授权
          if (!encryptedData || !iv) {
            wx.hideLoading()
            wx.showToast({ title: '获取手机号失败', icon: 'none' })
            return
          }

          // 第二步：手机号授权
          const authData = await phoneAuth(loginData.openid, encryptedData, iv)
          this.handleLoginSuccess(authData.user_info)
        } else if (!loginData.need_phone && loginData.user_info) {
          // 已有用户，直接登录成功
          this.handleLoginSuccess(loginData.user_info)
        }
      } catch (err) {
        wx.hideLoading()
        console.error('登录失败:', err)
        wx.showToast({ 
          title: err instanceof Error ? err.message : '登录失败', 
          icon: 'none' 
        })
      }
    },

    /**
     * 处理登录成功
     */
    handleLoginSuccess(serverUserInfo: { 
      id: number
      phone_number: string
      user_name: string | null
      avatar_oss: string | null 
    }) {
      wx.hideLoading()

      const userInfo = {
        avatarUrl: serverUserInfo.avatar_oss || defaultAvatarUrl,
        nickName: serverUserInfo.user_name || getRandomNickname(),
        phoneNumber: maskPhoneNumber(serverUserInfo.phone_number),
      }

      this.setData({ isLoggedIn: true, showLoginPopup: false, userInfo })
      
      const globalUserInfo: IUserInfo = {
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
        phoneNumber: userInfo.phoneNumber,
      }
      
      appInstance.globalData.isLoggedIn = true
      appInstance.globalData.userInfo = globalUserInfo
      wx.setStorageSync('isLoggedIn', true)
      wx.setStorageSync('userInfo', globalUserInfo)
      
      wx.showToast({ title: '登录成功', icon: 'success' })
      this.playLoginHighlightAnimation()
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
            logout()
            this.setData({
              isLoggedIn: false,
              userInfo: { avatarUrl: defaultAvatarUrl, nickName: '', phoneNumber: '' }
            })
            appInstance.globalData.isLoggedIn = false
            appInstance.globalData.userInfo = null
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
