// category.ts
// 分类页面 - 二级分类结构

// 二级分类数据类型
interface SubCategory {
  id: string
  name: string
  parentId: string
}

// 一级分类数据类型
interface Category {
  id: string
  name: string
}

// 商品数据类型
interface Product {
  id: string
  name: string
  image: string
  categoryId: string
  subCategoryId: string
  /** 基准价（划线价） */
  basePrice: number
}

// 分组后的商品数据类型
interface GroupedProducts {
  id: string  // 用于 wx:key
  subCategory: SubCategory
  products: Product[]
}

Component({
  data: {
    // 胶囊按钮和状态栏信息
    statusBarHeight: 0,
    menuButtonHeight: 0,
    menuButtonTop: 0,
    menuButtonRight: 0,
    menuButtonWidth: 0,
    
    // 搜索关键词
    searchKeyword: '',

    // 自定义导航高度占位
    navPlaceholderHeight: 0,
    
    // 左侧一级分类列表
    categories: [
      { id: 'hot', name: '热销推荐' },
      { id: '1', name: '寿衣系列' },
      { id: '2', name: '祭祀用品' },
      { id: '3', name: '丧葬配件' },
      { id: '4', name: '骨灰盒' },
      { id: '5', name: '花圈花篮' },
      { id: '6', name: '纸扎用品' },
      { id: '7', name: '墓碑墓地' },
      { id: '8', name: '殡葬服务' }
    ] as Category[],

    // 二级分类列表
    subCategories: [
      // 热销推荐
      { id: 'hot-1', name: '爆款热卖', parentId: 'hot' },
      { id: 'hot-2', name: '人气精选', parentId: 'hot' },
      // 寿衣系列
      { id: '1-1', name: '男款寿衣', parentId: '1' },
      { id: '1-2', name: '女款寿衣', parentId: '1' },
      { id: '1-3', name: '寿衣套装', parentId: '1' },
      { id: '1-4', name: '寿衣单件', parentId: '1' },
      // 祭祀用品
      { id: '2-1', name: '香烛', parentId: '2' },
      { id: '2-2', name: '纸钱', parentId: '2' },
      { id: '2-3', name: '供品', parentId: '2' },
      { id: '2-4', name: '香炉烛台', parentId: '2' },
      // 丧葬配件
      { id: '3-1', name: '灵位牌', parentId: '3' },
      { id: '3-2', name: '遗像框', parentId: '3' },
      { id: '3-3', name: '挽联', parentId: '3' },
      { id: '3-4', name: '黑纱袖章', parentId: '3' },
      // 骨灰盒
      { id: '4-1', name: '实木骨灰盒', parentId: '4' },
      { id: '4-2', name: '玉石骨灰盒', parentId: '4' },
      { id: '4-3', name: '陶瓷骨灰盒', parentId: '4' },
      // 花圈花篮
      { id: '5-1', name: '鲜花花圈', parentId: '5' },
      { id: '5-2', name: '绢花花圈', parentId: '5' },
      { id: '5-3', name: '花篮', parentId: '5' },
      // 纸扎用品
      { id: '6-1', name: '纸钱元宝', parentId: '6' },
      { id: '6-2', name: '纸扎房屋', parentId: '6' },
      { id: '6-3', name: '纸扎车辆', parentId: '6' },
      { id: '6-4', name: '纸扎家电', parentId: '6' },
      // 墓碑墓地
      { id: '7-1', name: '墓碑定制', parentId: '7' },
      { id: '7-2', name: '墓地服务', parentId: '7' },
      // 殡葬服务
      { id: '8-1', name: '殡仪服务', parentId: '8' },
      { id: '8-2', name: '法事服务', parentId: '8' },
      { id: '8-3', name: '运输服务', parentId: '8' }
    ] as SubCategory[],
    
    // 当前选中的分类ID
    currentCategoryId: 'hot',
    
    // 所有商品列表（含基准价）
    allProducts: [
      // 热销推荐 - 爆款热卖（来自首页热销商品）
      { id: 'hot-101', name: '高档真丝寿衣七件套', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-1', basePrice: 1580 },
      { id: 'hot-102', name: '天然玉石骨灰盒', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-1', basePrice: 4280 },
      { id: 'hot-103', name: '鲜花花圈精选款', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-1', basePrice: 488 },
      { id: 'hot-104', name: '祭祀用品套装', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-1', basePrice: 218 },
      { id: 'hot-105', name: '精品檀木骨灰盒', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-1', basePrice: 3880 },
      { id: 'hot-106', name: '豪华寿衣九件套', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-1', basePrice: 2680 },
      // 热销推荐 - 人气精选
      { id: 'hot-201', name: '白菊花圈大号', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-2', basePrice: 358 },
      { id: 'hot-202', name: '高级香烛礼盒', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-2', basePrice: 128 },
      { id: 'hot-203', name: '纯铜香炉套装', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-2', basePrice: 268 },
      { id: 'hot-204', name: '精美遗像框', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-2', basePrice: 158 },
      { id: 'hot-205', name: '金银元宝组合装', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-2', basePrice: 88 },
      { id: 'hot-206', name: '殡葬一条龙服务', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-2', basePrice: 5880 },

      // 寿衣系列 - 男款
      { id: '101', name: '男士唐装寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-1', basePrice: 688 },
      { id: '102', name: '男士中山装', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-1', basePrice: 588 },
      { id: '103', name: '男士西装寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-1', basePrice: 788 },
      // 寿衣系列 - 女款
      { id: '104', name: '女士旗袍寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-2', basePrice: 728 },
      { id: '105', name: '女士唐装寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-2', basePrice: 668 },
      { id: '106', name: '女士绣花寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-2', basePrice: 888 },
      // 寿衣系列 - 套装
      { id: '107', name: '五件套寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-3', basePrice: 980 },
      { id: '108', name: '七件套寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-3', basePrice: 1280 },
      { id: '109', name: '九件套寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-3', basePrice: 1680 },
      // 寿衣系列 - 单件
      { id: '110', name: '寿衣外套', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-4', basePrice: 288 },
      { id: '111', name: '寿衣裤子', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-4', basePrice: 168 },
      { id: '112', name: '寿鞋', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-4', basePrice: 88 },

      // 祭祀用品 - 香烛
      { id: '201', name: '檀香', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-1', basePrice: 38 },
      { id: '202', name: '线香', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-1', basePrice: 28 },
      { id: '203', name: '莲花蜡烛', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-1', basePrice: 25 },
      // 祭祀用品 - 纸钱
      { id: '204', name: '金元宝', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-2', basePrice: 38 },
      { id: '205', name: '银元宝', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-2', basePrice: 35 },
      { id: '206', name: '冥币', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-2', basePrice: 18 },
      // 祭祀用品 - 供品
      { id: '207', name: '供果套装', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-3', basePrice: 68 },
      { id: '208', name: '糕点供品', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-3', basePrice: 58 },
      { id: '209', name: '酒水供品', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-3', basePrice: 88 },
      // 祭祀用品 - 香炉烛台
      { id: '210', name: '铜香炉', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-4', basePrice: 168 },
      { id: '211', name: '陶瓷香炉', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-4', basePrice: 88 },
      { id: '212', name: '烛台', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-4', basePrice: 48 },

      // 丧葬配件 - 灵位牌
      { id: '301', name: '木质灵位牌', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-1', basePrice: 128 },
      { id: '302', name: '玉石灵位牌', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-1', basePrice: 388 },
      { id: '303', name: '铜质灵位牌', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-1', basePrice: 268 },
      // 丧葬配件 - 遗像框
      { id: '304', name: '实木遗像框', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-2', basePrice: 88 },
      { id: '305', name: '金属遗像框', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-2', basePrice: 68 },
      { id: '306', name: '水晶遗像框', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-2', basePrice: 168 },
      // 丧葬配件 - 挽联
      { id: '307', name: '绸缎挽联', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-3', basePrice: 58 },
      { id: '308', name: '纸质挽联', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-3', basePrice: 28 },
      // 丧葬配件 - 黑纱袖章
      { id: '309', name: '黑纱', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-4', basePrice: 15 },
      { id: '310', name: '孝章', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-4', basePrice: 8 },
      { id: '311', name: '袖章', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-4', basePrice: 12 },

      // 骨灰盒 - 实木
      { id: '401', name: '紫檀骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-1', basePrice: 5880 },
      { id: '402', name: '红木骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-1', basePrice: 3880 },
      { id: '403', name: '金丝楠骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-1', basePrice: 8880 },
      // 骨灰盒 - 玉石
      { id: '404', name: '汉白玉骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-2', basePrice: 2880 },
      { id: '405', name: '青玉骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-2', basePrice: 3280 },
      // 骨灰盒 - 陶瓷
      { id: '406', name: '青花瓷骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-3', basePrice: 1680 },
      { id: '407', name: '白瓷骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-3', basePrice: 1280 },

      // 花圈花篮 - 鲜花花圈
      { id: '501', name: '菊花花圈', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-1', basePrice: 288 },
      { id: '502', name: '百合花圈', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-1', basePrice: 388 },
      { id: '503', name: '白玫瑰花圈', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-1', basePrice: 358 },
      // 花圈花篮 - 绢花花圈
      { id: '504', name: '绢花悼念花圈', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-2', basePrice: 168 },
      { id: '505', name: '绢花祭奠花圈', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-2', basePrice: 188 },
      // 花圈花篮 - 花篮
      { id: '506', name: '悼念花篮', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-3', basePrice: 128 },
      { id: '507', name: '祭奠花篮', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-3', basePrice: 148 },

      // 纸扎用品 - 纸钱元宝
      { id: '601', name: '金银纸', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-1', basePrice: 25 },
      { id: '602', name: '纸元宝', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-1', basePrice: 38 },
      // 纸扎用品 - 纸扎房屋
      { id: '603', name: '纸扎别墅', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-2', basePrice: 588 },
      { id: '604', name: '纸扎四合院', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-2', basePrice: 488 },
      // 纸扎用品 - 纸扎车辆
      { id: '605', name: '纸扎轿车', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-3', basePrice: 388 },
      { id: '606', name: '纸扎摩托', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-3', basePrice: 168 },
      // 纸扎用品 - 纸扎家电
      { id: '607', name: '纸扎电视', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-4', basePrice: 128 },
      { id: '608', name: '纸扎手机', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-4', basePrice: 88 },

      // 墓碑墓地 - 墓碑定制
      { id: '701', name: '大理石墓碑', image: '/images/default-product.png', categoryId: '7', subCategoryId: '7-1', basePrice: 3880 },
      { id: '702', name: '花岗岩墓碑', image: '/images/default-product.png', categoryId: '7', subCategoryId: '7-1', basePrice: 2880 },
      { id: '703', name: '艺术墓碑', image: '/images/default-product.png', categoryId: '7', subCategoryId: '7-1', basePrice: 5880 },
      // 墓碑墓地 - 墓地服务
      { id: '704', name: '公墓选址', image: '/images/default-product.png', categoryId: '7', subCategoryId: '7-2', basePrice: 500 },
      { id: '705', name: '树葬服务', image: '/images/default-product.png', categoryId: '7', subCategoryId: '7-2', basePrice: 800 },

      // 殡葬服务 - 殡仪服务
      { id: '801', name: '殡仪策划', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-1', basePrice: 1500 },
      { id: '802', name: '追思会布置', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-1', basePrice: 2000 },
      // 殡葬服务 - 法事服务
      { id: '803', name: '法师念经', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-2', basePrice: 800 },
      { id: '804', name: '超度法事', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-2', basePrice: 1200 },
      // 殡葬服务 - 运输服务
      { id: '805', name: '遗体接运', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-3', basePrice: 600 },
      { id: '806', name: '骨灰寄存', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-3', basePrice: 300 }
    ] as Product[],
    
    // 当前显示的分组商品列表
    groupedProducts: [] as GroupedProducts[],

    // 是否为搜索模式
    isSearchMode: false
  },
  
  lifetimes: {
    attached() {
      // 获取系统信息和胶囊按钮信息
      const systemInfo = wx.getSystemInfoSync()
      const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
      
      const navPlaceholderHeight = menuButtonInfo.bottom

      this.setData({
        statusBarHeight: systemInfo.statusBarHeight || 0,
        menuButtonHeight: menuButtonInfo.height,
        menuButtonTop: menuButtonInfo.top,
        menuButtonRight: systemInfo.windowWidth - menuButtonInfo.right,
        menuButtonWidth: menuButtonInfo.width,
        navPlaceholderHeight
      })
      
      // 初始化显示第一个分类的商品
      this.filterProducts(this.data.currentCategoryId)
    }
  },

  pageLifetimes: {
    show() {
      // 检查是否有目标分类需要跳转
      const app = getApp<IAppOption>()
      if (app.globalData.targetCategoryId) {
        const targetId = app.globalData.targetCategoryId
        app.globalData.targetCategoryId = undefined // 清除状态
        this.setData({ currentCategoryId: targetId })
        this.filterProducts(targetId)
      }
    }
  },
  
  methods: {
    // 搜索输入
    onSearchInput(e: WechatMiniprogram.CustomEvent) {
      const keyword = e.detail.value
      this.setData({ searchKeyword: keyword })
      this.performSearch(keyword)
    },
    
    // 搜索确认
    onSearchConfirm(e: WechatMiniprogram.CustomEvent) {
      const keyword = e.detail.value
      this.performSearch(keyword)
    },
    
    // 清除搜索
    onClearSearch() {
      this.setData({
        searchKeyword: '',
        isSearchMode: false
      })
      this.filterProducts(this.data.currentCategoryId)
    },
    
    // 执行搜索
    performSearch(keyword: string) {
      if (!keyword.trim()) {
        this.setData({ isSearchMode: false })
        this.filterProducts(this.data.currentCategoryId)
        return
      }
      
      this.setData({ isSearchMode: true })
      
      // 搜索所有商品
      const searchResults = this.data.allProducts.filter((product: Product) => 
        product.name.toLowerCase().includes(keyword.toLowerCase())
      )
      
      // 将搜索结果按二级分类分组
      const grouped = this.groupProductsBySubCategory(searchResults)
      this.setData({ groupedProducts: grouped })
      
      if (searchResults.length === 0) {
        wx.showToast({
          title: '未找到相关商品',
          icon: 'none',
          duration: 2000
        })
      }
    },
    
    // 点击左侧分类
    onCategoryTap(e: WechatMiniprogram.CustomEvent) {
      const categoryId = e.currentTarget.dataset.id
      this.setData({
        currentCategoryId: categoryId,
        searchKeyword: '',
        isSearchMode: false
      })
      this.filterProducts(categoryId)
    },
    
    // 根据分类ID筛选商品并按二级分类分组
    filterProducts(categoryId: string) {
      const products = this.data.allProducts.filter(
        (product: Product) => product.categoryId === categoryId
      )
      const grouped = this.groupProductsBySubCategory(products)
      this.setData({ groupedProducts: grouped })
    },

    // 将商品按二级分类分组
    groupProductsBySubCategory(products: Product[]): GroupedProducts[] {
      const subCategoryMap = new Map<string, Product[]>()
      
      // 按二级分类ID分组
      products.forEach(product => {
        const existing = subCategoryMap.get(product.subCategoryId) || []
        existing.push(product)
        subCategoryMap.set(product.subCategoryId, existing)
      })
      
      // 转换为数组格式
      const result: GroupedProducts[] = []
      subCategoryMap.forEach((prods, subCategoryId) => {
        const subCategory = this.data.subCategories.find(
          (sc: SubCategory) => sc.id === subCategoryId
        )
        if (subCategory) {
          result.push({
            id: subCategoryId,  // 添加 id 用于 wx:key
            subCategory,
            products: prods
          })
        }
      })
      
      return result
    },
    
    // 点击商品
    onProductTap(e: WechatMiniprogram.CustomEvent) {
      const { id, name, image, basePrice } = e.currentTarget.dataset
      wx.navigateTo({
        url: `/pages/product-detail/product-detail?id=${id}&name=${encodeURIComponent(name)}&image=${encodeURIComponent(image)}&basePrice=${basePrice}`
      })
    }
  }
})
