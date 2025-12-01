// mine.ts
// 使用本地默认头像,请将default-avatar.png放入images文件夹
const defaultAvatarUrl = '/images/default-avatar.png'

// 随机昵称列表
const nicknameList = [
  "福善居士",
  "怀德雅士",
  "尚善之客",
  "敬孝之人",
  "仁心之友",
  "积善之士",
  "崇礼之人",
  "明德之友",
  "养正之客"
]

// 从昵称列表中随机选择一个
function getRandomNickname() {
  const randomIndex = Math.floor(Math.random() * nicknameList.length)
  return nicknameList[randomIndex]
}

Component({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: getRandomNickname(),
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  methods: {
    // 选择头像
    onChooseAvatar(e: any) {
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    // 输入昵称
    onInputChange(e: any) {
      const nickName = e.detail.value
      const { avatarUrl } = this.data.userInfo
      this.setData({
        "userInfo.nickName": nickName,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    // 获取用户信息
    getUserProfile() {
      wx.getUserProfile({
        desc: '展示用户信息',
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },
    // 联系客服
    contactShop() {
      // TODO: 调用联系客服接口或跳转客服
      wx.showToast({
        title: '联系客服功能待开发',
        icon: 'none'
      })
    },
    // 我的订单
    goToOrders() {
      // TODO: 跳转到订单列表
      wx.showToast({
        title: '订单功能待开发',
        icon: 'none'
      })
    },
    // 我的地址
    goToAddress() {
      // TODO: 跳转到地址管理页面
      wx.showToast({
        title: '地址管理功能待开发',
        icon: 'none'
      })
    }
  },
})

