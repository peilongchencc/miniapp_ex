/**
 * 足迹 API 封装模块
 * 提供浏览足迹云端同步功能
 */
import { get, post, del } from './request'

// 足迹商品项
interface FootprintItemData {
  id: string
  name: string
  image: string
  viewTime: number
}

// API 响应数据类型
interface FootprintListResponse {
  items: FootprintItemData[]
  count: number
  total: number
}

interface FootprintAddResponse {
  product_id: string
}

interface FootprintRemoveResponse {
  product_id: string
}

interface FootprintClearResponse {
  deleted_count: number
}

/**
 * 获取云端足迹列表
 */
export async function fetchFootprints(
  limit: number = 50,
  offset: number = 0
): Promise<{ items: FootprintItemData[]; total: number }> {
  try {
    const res = await get<FootprintListResponse>(
      `/footprints?limit=${limit}&offset=${offset}`,
      true
    )
    return {
      items: res.data.items || [],
      total: res.data.total || 0
    }
  } catch (err) {
    console.error('获取足迹列表失败:', err)
    return { items: [], total: 0 }
  }
}

/**
 * 添加浏览足迹
 */
export async function addFootprintApi(productId: string): Promise<boolean> {
  try {
    await post<FootprintAddResponse>('/footprints/add', {
      product_id: productId
    }, true)
    return true
  } catch (err) {
    console.error('添加足迹失败:', err)
    return false
  }
}

/**
 * 删除单条足迹
 */
export async function removeFootprintApi(productId: string): Promise<boolean> {
  try {
    await del<FootprintRemoveResponse>(`/footprints/remove/${productId}`, true)
    return true
  } catch (err) {
    console.error('删除足迹失败:', err)
    return false
  }
}

/**
 * 清空所有足迹
 */
export async function clearFootprintsApi(): Promise<boolean> {
  try {
    await del<FootprintClearResponse>('/footprints/clear', true)
    return true
  } catch (err) {
    console.error('清空足迹失败:', err)
    return false
  }
}
