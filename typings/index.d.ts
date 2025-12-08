/// <reference path="./types/index.d.ts" />

interface IUserInfo {
  avatarUrl: string
  nickName: string
}

interface IAppOption {
  globalData: {
    isLoggedIn: boolean
    userInfo: IUserInfo | null
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
}