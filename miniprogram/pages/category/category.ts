// category.ts
// 分类页面

// 商品数据类型
interface Product {
  id: string
  name: string
  image: string
  categoryId: string
}

// 分类数据类型
interface Category {
  id: string
  name: string
}

Component({
  data: {
    // 搜索关键词
    searchKeyword: '',
    
    // 左侧分类列表
    categories: [
      { id: '1', name: '骨灰盒' },
      { id: '2', name: '寿衣' },
      { id: '3', name: '花圈花篮' },
      { id: '4', name: '纸扎用品' },
      { id: '5', name: '香烛供品' },
      { id: '6', name: '墓碑墓地' },
      { id: '7', name: '祭祀用品' },
      { id: '8', name: '殡葬服务' }
    ] as Category[],
    
    // 当前选中的分类ID
    currentCategoryId: '1',
    
    // 所有商品列表
    allProducts: [
      // 骨灰盒
      { id: '101', name: '紫檀骨灰盒', image: '/images/default-product.png', categoryId: '1' },
      { id: '102', name: '红木骨灰盒', image: '/images/default-product.png', categoryId: '1' },
      { id: '103', name: '金丝楠盒', image: '/images/default-product.png', categoryId: '1' },
      { id: '104', name: '檀香木盒', image: '/images/default-product.png', categoryId: '1' },
      { id: '105', name: '花梨木盒', image: '/images/default-product.png', categoryId: '1' },
      { id: '106', name: '玉石骨灰盒', image: '/images/default-product.png', categoryId: '1' },
      
      // 寿衣
      { id: '201', name: '五件套寿衣', image: '/images/default-product.png', categoryId: '2' },
      { id: '202', name: '七件套寿衣', image: '/images/default-product.png', categoryId: '2' },
      { id: '203', name: '丝绸寿衣', image: '/images/default-product.png', categoryId: '2' },
      { id: '204', name: '棉麻寿衣', image: '/images/default-product.png', categoryId: '2' },
      { id: '205', name: '中山装套装', image: '/images/default-product.png', categoryId: '2' },
      { id: '206', name: '唐装寿衣', image: '/images/default-product.png', categoryId: '2' },
      
      // 花圈花篮
      { id: '301', name: '菊花花圈', image: '/images/default-product.png', categoryId: '3' },
      { id: '302', name: '百合花圈', image: '/images/default-product.png', categoryId: '3' },
      { id: '303', name: '悼念花篮', image: '/images/default-product.png', categoryId: '3' },
      { id: '304', name: '祭奠花圈', image: '/images/default-product.png', categoryId: '3' },
      { id: '305', name: '康乃馨花篮', image: '/images/default-product.png', categoryId: '3' },
      { id: '306', name: '白玫瑰花圈', image: '/images/default-product.png', categoryId: '3' },
      
      // 纸扎用品
      { id: '401', name: '纸钱元宝', image: '/images/default-product.png', categoryId: '4' },
      { id: '402', name: '金银纸', image: '/images/default-product.png', categoryId: '4' },
      { id: '403', name: '纸扎别墅', image: '/images/default-product.png', categoryId: '4' },
      { id: '404', name: '纸扎轿车', image: '/images/default-product.png', categoryId: '4' },
      { id: '405', name: '纸扎家电', image: '/images/default-product.png', categoryId: '4' },
      { id: '406', name: '纸扎衣物', image: '/images/default-product.png', categoryId: '4' },
      
      // 香烛供品
      { id: '501', name: '檀香', image: '/images/default-product.png', categoryId: '5' },
      { id: '502', name: '莲花蜡烛', image: '/images/default-product.png', categoryId: '5' },
      { id: '503', name: '祭祀贡品', image: '/images/default-product.png', categoryId: '5' },
      { id: '504', name: '线香', image: '/images/default-product.png', categoryId: '5' },
      { id: '505', name: '盘香', image: '/images/default-product.png', categoryId: '5' },
      { id: '506', name: '龙涎香', image: '/images/default-product.png', categoryId: '5' },
      
      // 墓碑墓地
      { id: '601', name: '大理石墓碑', image: '/images/default-product.png', categoryId: '6' },
      { id: '602', name: '花岗岩墓碑', image: '/images/default-product.png', categoryId: '6' },
      { id: '603', name: '艺术墓碑', image: '/images/default-product.png', categoryId: '6' },
      { id: '604', name: '传统墓碑', image: '/images/default-product.png', categoryId: '6' },
      { id: '605', name: '家族墓地', image: '/images/default-product.png', categoryId: '6' },
      { id: '606', name: '树葬墓地', image: '/images/default-product.png', categoryId: '6' },
      
      // 祭祀用品
      { id: '701', name: '供桌', image: '/images/default-product.png', categoryId: '7' },
      { id: '702', name: '香炉', image: '/images/default-product.png', categoryId: '7' },
      { id: '703', name: '烛台', image: '/images/default-product.png', categoryId: '7' },
      { id: '704', name: '祭祀毯', image: '/images/default-product.png', categoryId: '7' },
      { id: '705', name: '祭祀袋', image: '/images/default-product.png', categoryId: '7' },
      { id: '706', name: '供果盘', image: '/images/default-product.png', categoryId: '7' },
      
      // 殡葬服务
      { id: '801', name: '殡仪服务', image: '/images/default-product.png', categoryId: '8' },
      { id: '802', name: '追思会布置', image: '/images/default-product.png', categoryId: '8' },
      { id: '803', name: '遗体接运', image: '/images/default-product.png', categoryId: '8' },
      { id: '804', name: '火化服务', image: '/images/default-product.png', categoryId: '8' },
      { id: '805', name: '法师念经', image: '/images/default-product.png', categoryId: '8' },
      { id: '806', name: '殡葬策划', image: '/images/default-product.png', categoryId: '8' }
    ] as Product[],
    
    // 当前显示的商品列表
    currentProducts: [] as Product[]
  },
  
  lifetimes: {
    attached() {
      // 初始化显示第一个分类的商品
      this.filterProducts(this.data.currentCategoryId)
    }
  },
  
  methods: {
    // 搜索输入
    onSearchInput(e: any) {
      const keyword = e.detail.value
      this.setData({
        searchKeyword: keyword
      })
      this.performSearch(keyword)
    },
    
    // 搜索确认
    onSearchConfirm(e: any) {
      const keyword = e.detail.value
      this.performSearch(keyword)
    },
    
    // 清除搜索
    onClearSearch() {
      this.setData({
        searchKeyword: ''
      })
      this.filterProducts(this.data.currentCategoryId)
    },
    
    // 执行搜索
    performSearch(keyword: string) {
      if (!keyword.trim()) {
        // 如果搜索词为空，显示当前分类的商品
        this.filterProducts(this.data.currentCategoryId)
        return
      }
      
      // 搜索所有商品
      const searchResults = this.data.allProducts.filter((product: Product) => 
        product.name.toLowerCase().includes(keyword.toLowerCase())
      )
      
      this.setData({
        currentProducts: searchResults
      })
      
      if (searchResults.length === 0) {
        wx.showToast({
          title: '未找到相关商品',
          icon: 'none',
          duration: 2000
        })
      }
    },
    
    // 点击左侧分类
    onCategoryTap(e: any) {
      const categoryId = e.currentTarget.dataset.id
      this.setData({
        currentCategoryId: categoryId,
        searchKeyword: '' // 切换分类时清空搜索
      })
      this.filterProducts(categoryId)
    },
    
    // 根据分类ID筛选商品
    filterProducts(categoryId: string) {
      const products = this.data.allProducts.filter(
        (product: Product) => product.categoryId === categoryId
      )
      this.setData({
        currentProducts: products
      })
    },
    
    // 点击商品
    onProductTap(e: any) {
      const productName = e.currentTarget.dataset.name
      wx.showToast({
        title: `${productName}功能待开发，敬请期待`,
        icon: 'none',
        duration: 2000
      })
    }
  }
})

