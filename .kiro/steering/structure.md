# 项目结构

```
├── miniprogram/              # 小程序源码目录
│   ├── app.ts               # 应用入口，全局状态管理
│   ├── app.json             # 应用配置（页面路由、tabBar、窗口设置）
│   ├── app.scss             # 全局样式
│   ├── pages/               # 页面目录
│   │   ├── home/            # 首页
│   │   ├── category/        # 分类页
│   │   ├── cart/            # 购物车
│   │   ├── mine/            # 我的（个人中心）
│   │   ├── orders/          # 订单列表
│   │   ├── order-detail/    # 订单详情
│   │   ├── product-detail/  # 商品详情
│   │   ├── favorites/       # 收藏夹
│   │   └── logs/            # 日志页
│   ├── components/          # 公共组件
│   │   └── navigation-bar/  # 自定义导航栏
│   ├── images/              # 图片资源
│   ├── assets/              # 静态资源（如隐私协议）
│   └── utils/               # 工具函数
├── typings/                 # TypeScript 类型定义
│   └── index.d.ts           # 全局接口定义（IUserInfo, ICartItem, IOrder 等）
├── project.config.json      # 微信开发者工具项目配置
└── tsconfig.json            # TypeScript 编译配置
```

## 页面结构规范

每个页面/组件包含 4 个文件：
- `*.ts` - 逻辑代码（使用 Component 构造器）
- `*.wxml` - 模板结构
- `*.scss` - 样式文件
- `*.json` - 页面配置

## 全局状态

通过 `app.ts` 的 `globalData` 管理：
- `isLoggedIn`: 登录状态
- `userInfo`: 用户信息
- `cartItems`: 购物车数据
- `orderHistory`: 订单历史
- `favorites`: 收藏列表

数据持久化使用 `wx.setStorageSync` / `wx.getStorageSync`。
