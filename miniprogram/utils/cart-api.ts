/**
 * 购物车 API 封装模块
 * 提供购物车云端同步功能
 */
import { get, post, put, del } from './request'

// 购物车商品项
interface CartItemData {
  id: string
  name: string
  image: string
  quantity: number
  spec?: string
}

// API 响应数据类型
interface CartListResponse {
  items: CartItemData[]
  count: number
}

interface CartAddResponse {
  product_id: string
  quantity: number
}

interface CartUpdateResponse {
  product_id: string
  quantity: number
}

interface CartRemoveResponse {
  product_id: string
}

interface CartClearResponse {
  cleared_count: number
}

/**
 * 获取云端购物车
 */
export async function fetchCart(): Promise<CartItemData[]> {
  try {
    const res = await get<CartListResponse>('/api/cart', true)
    return res.data.items || []
  } catch (err) {
    console.error('获取购物车失败:', err)
    return []
  }
}

/**
 * 添加商品到云端购物车
 */
export async function addToCartApi(
  productId: string,
  quantity: number = 1,
  spec?: string
): Promise<boolean> {
  try {
    await post<CartAddResponse>('/api/cart/add', {
      product_id: productId,
      quantity,
      spec
    }, true)
    return true
  } catch (err) {
    console.error('添加购物车失败:', err)
    return false
  }
}

/**
 * 更新云端购物车商品数量
 */
export async function updateCartApi(productId: string, quantity: number): Promise<boolean> {
  try {
    await put<CartUpdateResponse>('/api/cart/update', {
      product_id: productId,
      quantity
    }, true)
    return true
  } catch (err) {
    console.error('更新购物车失败:', err)
    return false
  }
}

/**
 * 从云端购物车删除商品
 */
export async function removeFromCartApi(productId: string): Promise<boolean> {
  try {
    await del<CartRemoveResponse>(`/api/cart/remove/${productId}`, true)
    return true
  } catch (err) {
    console.error('删除购物车商品失败:', err)
    return false
  }
}

/**
 * 清空云端购物车
 */
export async function clearCartApi(): Promise<boolean> {
  try {
    await del<CartClearResponse>('/api/cart/clear', true)
    return true
  } catch (err) {
    console.error('清空购物车失败:', err)
    return false
  }
}

/**
 * 同步本地购物车到云端（登录后调用）
 */
export async function syncCartApi(items: CartItemData[]): Promise<CartItemData[]> {
  try {
    const res = await post<CartListResponse>('/api/cart/sync', { items }, true)
    return res.data.items || []
  } catch (err) {
    console.error('同步购物车失败:', err)
    return items  // 同步失败返回原数据
  }
}
