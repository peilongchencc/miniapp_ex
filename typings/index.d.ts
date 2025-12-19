/// <reference path="./types/index.d.ts" />

interface IUserInfo {
  avatarUrl: string
  nickName: string
  phoneNumber?: string  // 用户手机号（脱敏显示）
}

interface ICartItem {
  id: string
  name: string
  image: string
  quantity: number
  spec?: string
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
  addTime: number
}

interface IAppOption {
  globalData: {
    isLoggedIn: boolean
    userInfo: IUserInfo | null
    cartItems: ICartItem[]
    orderHistory: IOrder[]
    favorites: IFavoriteItem[]
    /** 目标分类ID，用于从首页跳转到分类页时指定分类 */
    targetCategoryId?: string
  }
  addToCart: (item: ICartItem) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  syncCartAfterLogin: () => Promise<void>
  refreshCartFromCloud: () => Promise<void>
  submitOrder: (remark?: string) => Promise<IOrder | null>
  refreshOrdersFromCloud: () => Promise<void>
  reorder: (orderId: string) => boolean
  addFavorite: (item: Omit<IFavoriteItem, 'addTime'>) => boolean
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  updateCartBadge: () => void
}
