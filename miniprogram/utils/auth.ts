/**
 * 登录认证模块
 * 处理小程序登录、手机号授权等逻辑
 */

import { post, setToken, setRefreshToken, clearToken } from './request'

// 登录响应数据
interface LoginData {
  need_phone: boolean
  openid?: string
  access_token?: string
  refresh_token?: string
  token_type?: string
  expires_in?: number
  user_info?: {
    id: number
    phone_number: string
    user_name: string | null
    avatar_oss: string | null
  }
}

// 手机号授权响应数据
interface PhoneAuthData {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  user_info: {
    id: number
    phone_number: string
    user_name: string | null
    avatar_oss: string | null
  }
}

/**
 * 小程序登录（获取 openid）
 * @returns 登录结果
 */
export async function miniappLogin(): Promise<LoginData> {
  // 调用 wx.login 获取 code
  const loginRes = await new Promise<WechatMiniprogram.LoginSuccessCallbackResult>(
    (resolve, reject) => {
      wx.login({
        success: resolve,
        fail: reject
      })
    }
  )

  if (!loginRes.code) {
    throw new Error('获取登录凭证失败')
  }

  // 调用后端接口
  const res = await post<LoginData>('/auth/miniapp/login', { code: loginRes.code })
  
  // 如果不需要手机号授权，直接保存 token
  if (!res.data.need_phone && res.data.access_token) {
    setToken(res.data.access_token)
    if (res.data.refresh_token) {
      setRefreshToken(res.data.refresh_token)
    }
  }

  return res.data
}

/**
 * 手机号授权登录（新版 code 方式）
 * @param openid 用户 openid
 * @param code getPhoneNumber 返回的 code
 * @returns 授权结果
 */
export async function phoneAuth(
  openid: string,
  code: string
): Promise<PhoneAuthData> {
  const res = await post<PhoneAuthData>('/auth/miniapp/phone', {
    openid,
    code
  })

  // 保存 token
  if (res.data.access_token) {
    setToken(res.data.access_token)
  }
  if (res.data.refresh_token) {
    setRefreshToken(res.data.refresh_token)
  }

  return res.data
}

/**
 * 退出登录
 */
export function logout(): void {
  clearToken()
  wx.removeStorageSync('isLoggedIn')
  wx.removeStorageSync('userInfo')
  wx.removeStorageSync('openid')
}
