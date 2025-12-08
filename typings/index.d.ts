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

interface IFavoriteItem {
  id: string
  name: string
  image: string
  basePrice: number
  userPrice?: number | null
  addTime: number
}

interface IAppOption {
  globalData: {
    isLoggedIn: boolean
    userInfo: IUserInfo | null
    cartItems: ICartItem[]
    orderHistory: IOrder[]
    favorites: IFavoriteItem[]
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
  addToCart: (item: ICartItem) => void
  clearCart: () => void
  submitOrder: (remark?: string) => IOrder | null
  reorder: (orderId: string) => boolean
  addFavorite: (item: Omit<IFavoriteItem, 'addTime'>) => boolean
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}