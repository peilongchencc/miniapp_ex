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
    
    // 所有商品列表
    allProducts: [
      // 热销推荐 - 爆款热卖
      { id: 'hot-101', name: '高档真丝寿衣七件套', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-1' },
      { id: 'hot-102', name: '天然玉石骨灰盒', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-1' },
      { id: 'hot-103', name: '鲜花花圈精选款', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-1' },
      { id: 'hot-104', name: '祭祀用品套装', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-1' },
      { id: 'hot-105', name: '精品檀木骨灰盒', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-1' },
      { id: 'hot-106', name: '豪华寿衣九件套', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-1' },
      { id: 'hot-107', name: '精品陶瓷骨灰盒', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-1' },
      { id: 'hot-108', name: '高档绸缎寿衣', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-1' },
      { id: 'hot-109', name: '纯手工刺绣寿衣', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-1' },
      // 热销推荐 - 人气精选
      { id: 'hot-201', name: '白菊花圈大号', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-2' },
      { id: 'hot-202', name: '高级香烛礼盒', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-2' },
      { id: 'hot-203', name: '纯铜香炉套装', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-2' },
      { id: 'hot-204', name: '精美遗像框', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-2' },
      { id: 'hot-205', name: '金银元宝组合装', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-2' },
      { id: 'hot-206', name: '殡葬一条龙服务', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-2' },
      { id: 'hot-207', name: '高档纸扎别墅', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-2' },
      { id: 'hot-208', name: '精品挽联套装', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-2' },
      { id: 'hot-209', name: '豪华花篮组合', image: '/images/default-product.png', categoryId: 'hot', subCategoryId: 'hot-2' },

      // 寿衣系列 - 男款
      { id: '101', name: '男士唐装寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-1' },
      { id: '102', name: '男士中山装', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-1' },
      { id: '103', name: '男士西装寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-1' },
      { id: '113', name: '男士棉麻寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-1' },
      { id: '114', name: '男士真丝寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-1' },
      { id: '115', name: '男士刺绣寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-1' },
      // 寿衣系列 - 女款
      { id: '104', name: '女士旗袍寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-2' },
      { id: '105', name: '女士唐装寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-2' },
      { id: '106', name: '女士绣花寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-2' },
      { id: '116', name: '女士真丝旗袍', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-2' },
      { id: '117', name: '女士棉麻寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-2' },
      { id: '118', name: '女士凤凰刺绣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-2' },
      // 寿衣系列 - 套装
      { id: '107', name: '五件套寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-3' },
      { id: '108', name: '七件套寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-3' },
      { id: '109', name: '九件套寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-3' },
      { id: '119', name: '十一件套寿衣', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-3' },
      { id: '120', name: '豪华十三件套', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-3' },
      { id: '121', name: '经济五件套', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-3' },
      // 寿衣系列 - 单件
      { id: '110', name: '寿衣外套', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-4' },
      { id: '111', name: '寿衣裤子', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-4' },
      { id: '112', name: '寿鞋', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-4' },
      { id: '122', name: '寿帽', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-4' },
      { id: '123', name: '寿袜', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-4' },
      { id: '124', name: '寿枕', image: '/images/default-product.png', categoryId: '1', subCategoryId: '1-4' },

      // 祭祀用品 - 香烛
      { id: '201', name: '檀香', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-1' },
      { id: '202', name: '线香', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-1' },
      { id: '203', name: '莲花蜡烛', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-1' },
      { id: '213', name: '沉香', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-1' },
      { id: '214', name: '盘香', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-1' },
      { id: '215', name: '塔香', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-1' },
      // 祭祀用品 - 纸钱
      { id: '204', name: '金元宝', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-2' },
      { id: '205', name: '银元宝', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-2' },
      { id: '206', name: '冥币', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-2' },
      { id: '216', name: '黄纸', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-2' },
      { id: '217', name: '往生钱', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-2' },
      { id: '218', name: '纸钱套装', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-2' },
      // 祭祀用品 - 供品
      { id: '207', name: '供果套装', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-3' },
      { id: '208', name: '糕点供品', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-3' },
      { id: '209', name: '酒水供品', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-3' },
      { id: '219', name: '素食供品', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-3' },
      { id: '220', name: '茶叶供品', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-3' },
      { id: '221', name: '鲜花供品', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-3' },
      // 祭祀用品 - 香炉烛台
      { id: '210', name: '铜香炉', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-4' },
      { id: '211', name: '陶瓷香炉', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-4' },
      { id: '212', name: '烛台', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-4' },
      { id: '222', name: '玉石香炉', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-4' },
      { id: '223', name: '铜烛台', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-4' },
      { id: '224', name: '香炉套装', image: '/images/default-product.png', categoryId: '2', subCategoryId: '2-4' },

      // 丧葬配件 - 灵位牌
      { id: '301', name: '木质灵位牌', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-1' },
      { id: '302', name: '玉石灵位牌', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-1' },
      { id: '303', name: '铜质灵位牌', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-1' },
      { id: '312', name: '陶瓷灵位牌', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-1' },
      { id: '313', name: '水晶灵位牌', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-1' },
      { id: '314', name: '金属灵位牌', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-1' },
      // 丧葬配件 - 遗像框
      { id: '304', name: '实木遗像框', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-2' },
      { id: '305', name: '金属遗像框', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-2' },
      { id: '306', name: '水晶遗像框', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-2' },
      { id: '315', name: '亚克力遗像框', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-2' },
      { id: '316', name: '电子遗像框', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-2' },
      { id: '317', name: '双人遗像框', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-2' },
      // 丧葬配件 - 挽联
      { id: '307', name: '绸缎挽联', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-3' },
      { id: '308', name: '纸质挽联', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-3' },
      { id: '318', name: '布艺挽联', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-3' },
      { id: '319', name: '定制挽联', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-3' },
      { id: '320', name: '挽联套装', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-3' },
      { id: '321', name: '横幅挽联', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-3' },
      // 丧葬配件 - 黑纱袖章
      { id: '309', name: '黑纱', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-4' },
      { id: '310', name: '孝章', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-4' },
      { id: '311', name: '袖章', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-4' },
      { id: '322', name: '孝服', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-4' },
      { id: '323', name: '孝帽', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-4' },
      { id: '324', name: '孝带', image: '/images/default-product.png', categoryId: '3', subCategoryId: '3-4' },

      // 骨灰盒 - 实木
      { id: '401', name: '紫檀骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-1' },
      { id: '402', name: '红木骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-1' },
      { id: '403', name: '金丝楠骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-1' },
      { id: '408', name: '黄花梨骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-1' },
      { id: '409', name: '乌木骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-1' },
      { id: '410', name: '檀木骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-1' },
      // 骨灰盒 - 玉石
      { id: '404', name: '汉白玉骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-2' },
      { id: '405', name: '青玉骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-2' },
      { id: '411', name: '和田玉骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-2' },
      { id: '412', name: '翡翠骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-2' },
      { id: '413', name: '岫玉骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-2' },
      { id: '414', name: '玛瑙骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-2' },
      // 骨灰盒 - 陶瓷
      { id: '406', name: '青花瓷骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-3' },
      { id: '407', name: '白瓷骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-3' },
      { id: '415', name: '粉彩骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-3' },
      { id: '416', name: '珐琅彩骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-3' },
      { id: '417', name: '釉下彩骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-3' },
      { id: '418', name: '景德镇骨灰盒', image: '/images/default-product.png', categoryId: '4', subCategoryId: '4-3' },

      // 花圈花篮 - 鲜花花圈
      { id: '501', name: '菊花花圈', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-1' },
      { id: '502', name: '百合花圈', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-1' },
      { id: '503', name: '白玫瑰花圈', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-1' },
      { id: '508', name: '康乃馨花圈', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-1' },
      { id: '509', name: '混合鲜花花圈', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-1' },
      { id: '510', name: '大型鲜花花圈', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-1' },
      // 花圈花篮 - 绢花花圈
      { id: '504', name: '绢花悼念花圈', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-2' },
      { id: '505', name: '绢花祭奠花圈', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-2' },
      { id: '511', name: '绢花大号花圈', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-2' },
      { id: '512', name: '绢花小号花圈', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-2' },
      { id: '513', name: '绢花豪华花圈', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-2' },
      { id: '514', name: '绢花经济花圈', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-2' },
      // 花圈花篮 - 花篮
      { id: '506', name: '悼念花篮', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-3' },
      { id: '507', name: '祭奠花篮', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-3' },
      { id: '515', name: '鲜花花篮', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-3' },
      { id: '516', name: '绢花花篮', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-3' },
      { id: '517', name: '大型花篮', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-3' },
      { id: '518', name: '精品花篮', image: '/images/default-product.png', categoryId: '5', subCategoryId: '5-3' },

      // 纸扎用品 - 纸钱元宝
      { id: '601', name: '金银纸', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-1' },
      { id: '602', name: '纸元宝', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-1' },
      { id: '609', name: '大号金元宝', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-1' },
      { id: '610', name: '聚宝盆', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-1' },
      { id: '611', name: '金条纸扎', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-1' },
      { id: '612', name: '元宝套装', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-1' },
      // 纸扎用品 - 纸扎房屋
      { id: '603', name: '纸扎别墅', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-2' },
      { id: '604', name: '纸扎四合院', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-2' },
      { id: '613', name: '纸扎楼房', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-2' },
      { id: '614', name: '纸扎庭院', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-2' },
      { id: '615', name: '纸扎宫殿', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-2' },
      { id: '616', name: '纸扎商铺', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-2' },
      // 纸扎用品 - 纸扎车辆
      { id: '605', name: '纸扎轿车', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-3' },
      { id: '606', name: '纸扎摩托', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-3' },
      { id: '617', name: '纸扎豪车', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-3' },
      { id: '618', name: '纸扎自行车', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-3' },
      { id: '619', name: '纸扎飞机', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-3' },
      { id: '620', name: '纸扎游艇', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-3' },
      // 纸扎用品 - 纸扎家电
      { id: '607', name: '纸扎电视', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-4' },
      { id: '608', name: '纸扎手机', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-4' },
      { id: '621', name: '纸扎电脑', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-4' },
      { id: '622', name: '纸扎冰箱', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-4' },
      { id: '623', name: '纸扎空调', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-4' },
      { id: '624', name: '纸扎洗衣机', image: '/images/default-product.png', categoryId: '6', subCategoryId: '6-4' },

      // 墓碑墓地 - 墓碑定制
      { id: '701', name: '大理石墓碑', image: '/images/default-product.png', categoryId: '7', subCategoryId: '7-1' },
      { id: '702', name: '花岗岩墓碑', image: '/images/default-product.png', categoryId: '7', subCategoryId: '7-1' },
      { id: '703', name: '艺术墓碑', image: '/images/default-product.png', categoryId: '7', subCategoryId: '7-1' },
      { id: '706', name: '黑金沙墓碑', image: '/images/default-product.png', categoryId: '7', subCategoryId: '7-1' },
      { id: '707', name: '汉白玉墓碑', image: '/images/default-product.png', categoryId: '7', subCategoryId: '7-1' },
      { id: '708', name: '青石墓碑', image: '/images/default-product.png', categoryId: '7', subCategoryId: '7-1' },
      // 墓碑墓地 - 墓地服务
      { id: '704', name: '公墓选址', image: '/images/default-product.png', categoryId: '7', subCategoryId: '7-2' },
      { id: '705', name: '树葬服务', image: '/images/default-product.png', categoryId: '7', subCategoryId: '7-2' },
      { id: '709', name: '海葬服务', image: '/images/default-product.png', categoryId: '7', subCategoryId: '7-2' },
      { id: '710', name: '草坪葬服务', image: '/images/default-product.png', categoryId: '7', subCategoryId: '7-2' },
      { id: '711', name: '壁葬服务', image: '/images/default-product.png', categoryId: '7', subCategoryId: '7-2' },
      { id: '712', name: '花坛葬服务', image: '/images/default-product.png', categoryId: '7', subCategoryId: '7-2' },

      // 殡葬服务 - 殡仪服务
      { id: '801', name: '殡仪策划', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-1' },
      { id: '802', name: '追思会布置', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-1' },
      { id: '807', name: '灵堂布置', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-1' },
      { id: '808', name: '告别仪式', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-1' },
      { id: '809', name: '遗体化妆', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-1' },
      { id: '810', name: '遗体整容', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-1' },
      // 殡葬服务 - 法事服务
      { id: '803', name: '法师念经', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-2' },
      { id: '804', name: '超度法事', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-2' },
      { id: '811', name: '头七法事', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-2' },
      { id: '812', name: '周年祭祀', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-2' },
      { id: '813', name: '清明祭扫', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-2' },
      { id: '814', name: '中元祭祀', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-2' },
      // 殡葬服务 - 运输服务
      { id: '805', name: '遗体接运', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-3' },
      { id: '806', name: '骨灰寄存', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-3' },
      { id: '815', name: '长途运输', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-3' },
      { id: '816', name: '冷藏服务', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-3' },
      { id: '817', name: '火化服务', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-3' },
      { id: '818', name: '骨灰盒刻字', image: '/images/default-product.png', categoryId: '8', subCategoryId: '8-3' }
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
      
      this.setData({
        statusBarHeight: systemInfo.statusBarHeight || 0,
        menuButtonHeight: menuButtonInfo.height,
        menuButtonTop: menuButtonInfo.top,
        menuButtonRight: systemInfo.windowWidth - menuButtonInfo.right,
        menuButtonWidth: menuButtonInfo.width
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
      const { id, name, image } = e.currentTarget.dataset
      wx.navigateTo({
        url: `/pages/product-detail/product-detail?id=${id}&name=${encodeURIComponent(name)}&image=${encodeURIComponent(image)}`
      })
    },

    /**
     * 加入购物车
     * 
     * 未登录时弹出登录提示，已登录时直接加入购物车
     */
    onAddToCart(e: WechatMiniprogram.CustomEvent) {
      const { id, name, image } = e.currentTarget.dataset
      
      // 检查登录状态
      const isLoggedIn = wx.getStorageSync('isLoggedIn') || false
      if (!isLoggedIn) {
        wx.showModal({
          title: '提示',
          content: '请先登录后再加入购物车',
          confirmText: '去登录',
          cancelText: '取消',
          success: (res) => {
            if (res.confirm) {
              wx.switchTab({ url: '/pages/mine/mine' })
            }
          }
        })
        return
      }
      
      // 加入购物车
      const app = getApp<IAppOption>()
      const cartItem: ICartItem = {
        id: String(id),
        name,
        image,
        quantity: 1
      }
      app.addToCart(cartItem)
      
      wx.showToast({
        title: '已加入购物车',
        icon: 'success',
        duration: 800
      })
    }
  }
})
