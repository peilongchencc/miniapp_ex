/**
 * HTTP 请求封装模块
 * 统一处理 API 请求、Token 管理、错误处理
 */

// API 基础地址
const BASE_URL = 'https://guifaxiang.vip/api'

// 通用响应格式
interface ApiResponse<T = unknown> {
  code: number
  message: string
  request_id: string
  data: T
}

// 请求配置
interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: Record<string, unknown>
  header?: Record<string, string>
  needToken?: boolean
}

/**
 * 获取存储的 Token
 */
export function getToken(): string {
  return wx.getStorageSync('access_token') || ''
}

/**
 * 保存 Token
 */
export function setToken(token: string): void {
  wx.setStorageSync('access_token', token)
}

/**
 * 清除 Token
 */
export function clearToken(): void {
  wx.removeStorageSync('access_token')
}

/**
 * 统一请求方法
 */
export function request<T = unknown>(options: RequestOptions): Promise<ApiResponse<T>> {
  const { url, method = 'GET', data, header = {}, needToken = false } = options

  // 添加 Token
  if (needToken) {
    const token = getToken()
    if (token) {
      header['Authorization'] = `Bearer ${token}`
    }
  }

  // 设置 Content-Type
  if (!header['Content-Type']) {
    header['Content-Type'] = 'application/json'
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header,
      success: (res) => {
        const response = res.data as ApiResponse<T>
        
        if (response.code === 200) {
          resolve(response)
        } else if (response.code === 401) {
          // Token 过期，清除登录状态
          clearToken()
          wx.removeStorageSync('isLoggedIn')
          wx.removeStorageSync('userInfo')
          reject(new Error(response.message || '登录已过期'))
        } else {
          reject(new Error(response.message || '请求失败'))
        }
      },
      fail: (err) => {
        console.error('请求失败:', err)
        reject(new Error('网络请求失败'))
      }
    })
  })
}

/**
 * GET 请求
 */
export function get<T = unknown>(url: string, needToken = false): Promise<ApiResponse<T>> {
  return request<T>({ url, method: 'GET', needToken })
}

/**
 * 带参数的 GET 请求（自动处理 URL 编码）
 */
export function getWithParams<T = unknown>(
  url: string,
  params?: Record<string, string | number | boolean>,
  needToken = false
): Promise<ApiResponse<T>> {
  let fullUrl = url
  if (params && Object.keys(params).length > 0) {
    const queryString = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&')
    fullUrl = `${url}?${queryString}`
  }
  return request<T>({ url: fullUrl, method: 'GET', needToken })
}

/**
 * POST 请求
 */
export function post<T = unknown>(
  url: string, 
  data?: Record<string, unknown>, 
  needToken = false
): Promise<ApiResponse<T>> {
  return request<T>({ url, method: 'POST', data, needToken })
}
