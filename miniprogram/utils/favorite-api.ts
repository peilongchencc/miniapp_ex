/**
 * 收藏 API 封装模块
 * 提供收藏云端同步功能
 */
import { get, post, del } from './request'

// 收藏商品项
interface FavoriteItemData {
  id: string
  name: string
  image: string
  addTime: number
}

// API 响应数据类型
interface FavoriteListResponse {
  items: FavoriteItemData[]
  count: number
}

interface FavoriteAddResponse {
  product_id: string
  is_new: boolean
}

interface FavoriteRemoveResponse {
  product_id: string
}

interface FavoriteCheckResponse {
  product_id: string
  is_favorite: boolean
}

/**
 * 获取云端收藏列表
 */
export async function fetchFavorites(): Promise<FavoriteItemData[]> {
  try {
    const res = await get<FavoriteListResponse>('/favorites', true)
    return res.data.items || []
  } catch (err) {
    console.error('获取收藏列表失败:', err)
    return []
  }
}

/**
 * 添加商品到云端收藏
 */
export async function addFavoriteApi(productId: string): Promise<boolean> {
  try {
    await post<FavoriteAddResponse>('/favorites/add', {
      product_id: productId
    }, true)
    return true
  } catch (err) {
    console.error('添加收藏失败:', err)
    return false
  }
}

/**
 * 从云端收藏删除商品
 */
export async function removeFavoriteApi(productId: string): Promise<boolean> {
  try {
    await del<FavoriteRemoveResponse>(`/favorites/remove/${productId}`, true)
    return true
  } catch (err) {
    console.error('取消收藏失败:', err)
    return false
  }
}

/**
 * 检查商品是否已收藏
 */
export async function checkFavoriteApi(productId: string): Promise<boolean> {
  try {
    const res = await get<FavoriteCheckResponse>(`/favorites/check/${productId}`, true)
    return res.data.is_favorite
  } catch (err) {
    console.error('检查收藏状态失败:', err)
    return false
  }
}

/**
 * 同步本地收藏到云端（登录后调用）
 */
export async function syncFavoritesApi(
  items: Array<{ id: string }>
): Promise<FavoriteItemData[]> {
  try {
    const res = await post<FavoriteListResponse>('/favorites/sync', { items }, true)
    return res.data.items || []
  } catch (err) {
    console.error('同步收藏失败:', err)
    return []
  }
}
