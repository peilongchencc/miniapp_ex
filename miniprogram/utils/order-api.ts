/**
 * 订单 API 封装模块
 * 提供订货清单的提交、查询功能
 */
import { get, post } from './request'

// 订单商品项
interface OrderItem {
  id: string
  name: string
  image: string
  quantity: number
  spec?: string
}

// 订单数据
interface OrderData {
  id: string
  items: OrderItem[]
  total_quantity: number
  status: string
  remark?: string
  contact_name?: string
  contact_phone?: string
  address?: string
  createTime: number
}

// API 响应类型
interface SubmitOrderResponse {
  order_id: string
  total_quantity: number
  status: string
}

interface OrderListResponse {
  orders: OrderData[]
  count: number
}

/**
 * 提交订货清单
 */
export async function submitOrderApi(
  items: OrderItem[],
  remark?: string,
  contactName?: string,
  contactPhone?: string,
  address?: string
): Promise<{ success: boolean; orderId?: string }> {
  try {
    const res = await post<SubmitOrderResponse>('/api/order/submit', {
      items,
      remark,
      contact_name: contactName,
      contact_phone: contactPhone,
      address
    }, true)
    return { success: true, orderId: res.data.order_id }
  } catch (err) {
    console.error('提交订货清单失败:', err)
    return { success: false }
  }
}

/**
 * 获取订货记录列表
 */
export async function fetchOrderList(
  limit: number = 20,
  offset: number = 0
): Promise<OrderData[]> {
  try {
    const res = await get<OrderListResponse>(
      `/api/order/list?limit=${limit}&offset=${offset}`,
      true
    )
    return res.data.orders || []
  } catch (err) {
    console.error('获取订货记录失败:', err)
    return []
  }
}

/**
 * 获取订单详情
 */
export async function fetchOrderDetail(orderId: string): Promise<OrderData | null> {
  try {
    const res = await get<OrderData>(`/api/order/detail/${orderId}`, true)
    return res.data
  } catch (err) {
    console.error('获取订单详情失败:', err)
    return null
  }
}


/**
 * 取消订单
 */
export async function cancelOrderApi(orderId: string): Promise<boolean> {
  try {
    const res = await post<{ order_id: string; status: string }>(
      `/api/order/cancel/${orderId}`,
      {},
      true
    )
    return res.code === 200
  } catch (err) {
    console.error('取消订单失败:', err)
    return false
  }
}

/**
 * 确认收货
 */
export async function confirmReceiveApi(orderId: string): Promise<boolean> {
  try {
    const res = await post<{ order_id: string; status: string }>(
      `/api/order/confirm/${orderId}`,
      {},
      true
    )
    return res.code === 200
  } catch (err) {
    console.error('确认收货失败:', err)
    return false
  }
}
