/**
 * 收货地址 API 封装模块
 * 提供收货地址的云端同步功能
 */
import { get, post, put, del } from './request'

// 地址数据接口
export interface AddressData {
  id: string
  userName: string
  telNumber: string
  provinceName: string
  cityName: string
  countyName: string
  detailInfo: string
  postalCode: string
  isDefault: boolean
}

// API 响应数据类型
interface AddressListResponse {
  addresses: AddressData[]
  count: number
}

interface AddressAddResponse extends AddressData {}

interface AddressUpdateResponse {
  id: string
}

interface AddressDeleteResponse {
  id: string
}

/**
 * 获取收货地址列表
 */
export async function fetchAddressList(): Promise<AddressData[]> {
  try {
    const res = await get<AddressListResponse>('/api/address', true)
    return res.data.addresses || []
  } catch (err) {
    console.error('获取地址列表失败:', err)
    return []
  }
}

/**
 * 添加收货地址
 */
export async function addAddressApi(address: Omit<AddressData, 'id'>): Promise<AddressData | null> {
  try {
    const res = await post<AddressAddResponse>('/api/address/add', address as unknown as Record<string, unknown>, true)
    return res.data
  } catch (err) {
    console.error('添加地址失败:', err)
    return null
  }
}

/**
 * 更新收货地址
 */
export async function updateAddressApi(id: string, address: Omit<AddressData, 'id'>): Promise<boolean> {
  try {
    await put<AddressUpdateResponse>(`/api/address/update/${id}`, address as unknown as Record<string, unknown>, true)
    return true
  } catch (err) {
    console.error('更新地址失败:', err)
    return false
  }
}

/**
 * 删除收货地址
 */
export async function deleteAddressApi(id: string): Promise<boolean> {
  try {
    await del<AddressDeleteResponse>(`/api/address/remove/${id}`, true)
    return true
  } catch (err) {
    console.error('删除地址失败:', err)
    return false
  }
}

/**
 * 设置默认地址
 */
export async function setDefaultAddressApi(id: string): Promise<boolean> {
  try {
    await put<AddressUpdateResponse>(`/api/address/default/${id}`, {}, true)
    return true
  } catch (err) {
    console.error('设置默认地址失败:', err)
    return false
  }
}
