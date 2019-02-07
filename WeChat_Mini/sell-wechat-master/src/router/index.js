import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
// import Index from '@/components/body/body-index'
// import Order from '@/components/body/body-order'
// import PersonerCenter from '@/components/body/body-personcenter'
// import ShopPage from '@/components/shop/ShopPage'
// import Goods from '@/components/shop/goods'
// import Seller from '@/components/shop/seller'
// import Evaluate from '@/components/shop/evaluate'
// import Loginphonenumber from '../components/user/loginphonenumber'
// import Loginpassword from '../components/user/loginpassword'
// import Accountsetting from '../components/user/accountsetting'
// import Setpassword from '../components/user/setpassword'
// import Comfirmorder from '../components/body/comfirmorder'
// import Sendaddress from '../components/body/sendaddress'
// import Addaddress from '../components/body/addaddress'
// import Payonline from '../components/body/payonline'
// import Search from '../components/body/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/index'
    },
    {
      path: '/index',      
      component: resolve => require(['../components/body/body-index.vue'], resolve)
    },
    {
      path: '/order',
      component: resolve => require(['../components/body/body-order.vue'], resolve)
    },
    {
      path: '/personcenter',
      component: resolve => require(['../components/body/body-personcenter.vue'], resolve)
    },
    {
      path: '/shoppage/:id',
      component: resolve => require(['../components/shop/ShopPage.vue'], resolve),
      children: [{
          path: 'evaluate',
          component: resolve => require(['../components/shop/evaluate.vue'], resolve)
        },
        {
          path: 'goods/',
          component: resolve => require(['../components/shop/goods.vue'], resolve)
        },
        {
          path: 'seller',
          component: resolve => require(['../components/shop/seller.vue'], resolve)
        },
      ]
    },
    {
      path: '/user',
      component:App,
      children: [
      {
        path: 'loginphonenumber',
        component: resolve => require(['../components/user/loginphonenumber.vue'], resolve)
      },
      {
        path: 'loginpassword',
        component: resolve => require(['../components/user/loginpassword.vue'], resolve)
      },
      {
        path: 'accountsetting',
        component: resolve => require(['../components/user/accountsetting.vue'], resolve)
      },
      {
        path: 'setpassword',
        component: resolve => require(['../components/user/setpassword.vue'], resolve)
      },
      ]
    },
    {
      path:'/comfirmorder/:id',
      component:resolve => require(['../components/body/comfirmorder.vue'], resolve)
    },
    {
      path:'/sendaddress',
      component:resolve => require(['../components/body/sendaddress.vue'], resolve)
    },
    {
      path:'/addaddress',
      component:resolve => require(['../components/body/addaddress.vue'], resolve)
    },
    {
      path:'/payonline/:id',
      component:resolve => require(['../components/body/payonline.vue'], resolve)
    },
    {
      path:'/search',
      component:resolve => require(['../components/body/search.vue'], resolve)
    },
    {
      path:'/topbannerpage',
      component:resolve => require(['../components/body/topbannerpage'], resolve)
    }
  ]
})
