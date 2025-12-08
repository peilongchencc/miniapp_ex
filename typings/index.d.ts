/// <reference path="./types/index.d.ts" />

interface IUserInfo {
  avatarUrl: string
  nickName: string
}

interface ICartItem {
  id: string
  name: string
  image: string
  quantity: number
  spec?: string
  /** 基准价（划线价） */
  basePrice?: number
  /** 用户专属价格，null表示未设置需咨询 */
  userPrice?: number | null
}

interface IOrder {
  id: string
  items: ICartItem[]
  createTime: number
  status: 'pending' | 'confirmed' | 'shipped' | 'completed'
  remark?: string
}

interface IAppOption {
  globalData: {
    isLoggedIn: boolean
    userInfo: IUserInfo | null
    cartItems: ICartItem[]
    orderHistory: IOrder[]
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
  addToCart: (item: ICartItem) => void
  clearCart: () => void
  submitOrder: (remark?: string) => IOrder | null
  reorder: (orderId: string) => boolean
}