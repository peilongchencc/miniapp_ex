// app.ts
App<IAppOption>({
  globalData: {
    isLoggedIn: false,
    userInfo: null,
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 检查本地是否有登录信息
    const userInfo = wx.getStorageSync('userInfo')
    const isLoggedIn = wx.getStorageSync('isLoggedIn')
    if (userInfo && isLoggedIn) {
      this.globalData.userInfo = userInfo
      this.globalData.isLoggedIn = true
    }

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})