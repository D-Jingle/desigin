import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/info',
    name: 'info',
    meta: {
      // hideInMenu: true,
      icon: 'md-information-circle',
      title: '信息'
    },
    component: Main,
    children: [
      {
        path: 'product_info',
        name: 'product_info',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '产品信息'
        },
        component: () => import('@/view/info-page/product-info.vue')
      },
      {
        path: 'car_info',
        name: 'car_info',
        meta: {
          icon: 'ios-car',
          title: '车辆信息'
        },
        component: () => import('@/view/info-page/car-info.vue')
      },
      {
        path: 'staff_info',
        name: 'staff_info',
        meta: {
          icon: 'ios-people',
          title: '员工信息'
        },
        component: () => import('@/view/info-page/staff-info.vue')
      },
      {
        path: 'custom_info',
        name: 'custom_info',
        meta: {
          icon: 'md-happy',
          title: '客户信息'
        },
        component: () => import('@/view/info-page/custom-info.vue')
      }
    ]
  },
  {
    path: '/delivery',
    name: 'delivery',
    meta: {
      icon: 'md-log-out',
      title: '配送管理'
    },
    component: Main,
    children: [
      {
        path: 'order',
        name: 'order',
        meta: {
          icon: 'md-list-box',
          title: '配送订单'
        },
        component: () => import('@/view/delivery/order.vue')
      },
      {
        path: 'order_detail',
        name: 'order_detail',
        meta: {
          icon: 'ios-contact',
          title: '修改订单',
          hideInMenu: true
        },
        component: () => import('@/view/delivery/order-detail.vue')
      }
    ]
  },
  {
    path: '/account',
    name: 'account',
    meta: {
      icon: 'md-log-out',
      title: '财务管理'
    },
    component: Main,
    children: [
      {
        path: 'collect_money',
        name: 'collect_money',
        meta: {
          icon: 'md-list-box',
          title: '收款登记'
        },
        component: () => import('@/view/collect/collect-money.vue')
      },
      {
        path: 'statistics',
        name: 'statistics',
        meta: {
          icon: 'ios-contact',
          title: '统计'
        },
        component: () => import('@/view/collect/statistics.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
