<template>
  <div class="shoppage">
    <div class="shoppage-topbanner">
      <!--<span class="before" :style="{backgroundImage:'url('+restaurant_info.image_path+')'}"></span>-->
      <span class="before" v-lazy:background-image = "restaurant_info.image_path"></span>
      <span class="back-icon iconfont icon-arrow" @click.self="backIconClick"></span>
      <div class="shoppage-topbanner-content">
        <div class="shoppage-topbanner-info clearfix">
          <img v-lazy="restaurant_info.image_path" alt="" class="brand-img">
          <div class="brand-text">
            <div class="shop-name">
              <span class="shop-name-icon" v-if="restaurant_info.is_brand"></span>{{restaurant_info.name}}
            </div>
            <p class="shop-send-time">小迪专送 / {{restaurant_info.order_lead_time}}分钟送达</p>
            <div class="shop-activity">
              <span class="shop-activity-icon" style="color:#fff;margin-right:5px;font-size:10px;padding:2px;border-radius:2px;" :style="{backgroundColor:'#'+restaurant_info.activities[0].icon_color}">{{restaurant_info.activities[0].icon_name}}</span>{{restaurant_info.activities[0].description}}
            </div>
          </div>
        </div>
        <div class="shoppage-notice" @click="showDetail">
          <span class="shop-notice-icon"></span> {{restaurant_info.promotion_info?restaurant_info.promotion_info:'欢迎光临'+ restaurant_info.name}}
          <i class="iconfont icon-arrow"></i>
        </div>
        <div class="shop-activity-number" @click="showDetail">
          {{restaurant_info.activities.length}}个<i class="iconfont icon-arrow"></i>

        </div>
      </div>
    </div>
    <div class="shoppage-tabbar">
      <router-link class="tab-item" :to="'/shoppage/'+restaurant_info.id+'/goods'">商品</router-link>
      <router-link class="tab-item" :to="'/shoppage/'+ restaurant_info.id +'/evaluate'">评价</router-link>
      <router-link class="tab-item" :to="'/shoppage/'+restaurant_info.id+'/seller'">商家</router-link>
    </div>
    <transition name="fade">
      <div class="shoppage-detail" v-show="show_detail">
        <div class="detail-main clearfix">
          <div class="detail-content">
            <div class="shop-name">{{restaurant_info.name}}</div>
            <v-star :score="restaurant_info.rating" :size="48"></v-star>
            <div class="title">
              <div class="line"></div>
              <div class="title-text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul>
              <li class="activity-item" v-for="item in restaurant_info.activities"><span class="icon" style="color:#fff;margin-right:5px;font-size:10px;padding:2px;border-radius:2px;text-align:center;"
                  :style="{backgroundColor:'#'+item.icon_color}">{{item.icon_name}}</span>{{item.description}}</li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="title-text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="shop-bulletin">
              <p class="shop-bulletin-text">{{restaurant_info.promotion_info?restaurant_info.promotion_info:'欢迎光临'+ restaurant_info.name}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="iconfont icon-close" @click="hideDetail"></i>
        </div>
      </div>
    </transition>
    <div class="shoppage-tabcontent">
      <!--<keep-alive>-->
        <router-view></router-view>
      <!--</keep-alive>-->
    </div>
  </div>
</template>
<script>
  import Star from '../component/star';
  import Goods from '../shop/goods'
  import router from '../../router'
  import axios from 'axios'

  export default {
    name: 'shoppage',
    data() {
      return {
        show_detail: false,
      };
    },
    methods: {
      showDetail: function () {
        this.show_detail = true;
      },
      hideDetail: function () {
        this.show_detail = false;
      },
      backIconClick: function () {
        router.go(-1);
      }
    },
    computed: {
      restaurant_info() {
        return this.$store.getters.getRestaurantById
      }
    },
    components: {
      'v-star': Star,
      'v-goods': Goods
    },
    created: function () {
      this.$store.commit('setId', this.$route.params.id);
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        if(from.path.indexOf('index') > -1){
          this.$store.commit('setId', this.$route.params.id);
        }
      }
    }
  }

</script>
<style>
  .back-icon {
    display: block;
    color: #fff;
    font-size: 25px;
    width: 25px;
    transform: rotate(180deg);
    padding: 0px 10px 10px;
  }

  .shoppage {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .shoppage-topbanner {
    position: relative;
    width: 100%;
    background-color: rgba(7, 17, 27, 0.5);
    color: #fff;
    font-weight: normal;
    font-size: 14px;
  }

  .shoppage-topbanner span.before {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    filter: blur(10px);
    z-index: 0;
  }

  .shoppage-topbanner-content {
    position: relative;
  }

  .shoppage-topbanner .shoppage-topbanner-info {
    padding-top: 5px;
    padding-bottom: 18px;
  }

  .shoppage-topbanner .shoppage-topbanner-info .brand-img {
    width: 64px;
    margin: 0px 16px 0px 24px;
    float: left;
  }

  .shoppage-topbanner .shoppage-topbanner-info .brand-text {
    float: left;
  }

  .shoppage-topbanner .shoppage-topbanner-info .shop-name {
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
  }

  .shoppage-topbanner .shoppage-topbanner-info .shop-name .shop-name-icon {
    height: 18px;
    display: inline-block;
    width: 30px;
    vertical-align: top;
    background: url('/static/images/brand@2x.png') no-repeat center center;
    background-size: 30px 18px;
    margin-right: 6px;
  }

  .shoppage-topbanner-info .shop-send-time {
    font-size: 12px;
    font-weight: 200;
    line-height: 12px;
    margin: 8px 0;
  }

  .shoppage-topbanner-info .shop-activity {
    font-size: 10px;
    font-weight: 200;
    line-height: 12px;
  }

  .shoppage-topbanner-info .shop-activity .shop-activity-icon {
    display: inline-block;
    height: 12px;
    width: 12px;
    transform: scale(0.8);
    margin-right: 4px;
  }

  .shoppage-notice {
    position: relative;
    padding: 0 22px 0 12px;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 28px;
    background-color: rgba(7, 17, 27, 0.2);
  }

  .shoppage-notice .shop-notice-icon {
    display: inline-block;
    height: 28px;
    width: 22px;
    background: url('/static/images/bulletin@2x.png') no-repeat center center;
    background-size: 22px 12px;
    vertical-align: top;
    margin-right: 4px;
  }

  .shoppage-notice .icon-arrow {
    position: absolute;
    right: 5px;
    font-size: 12px;
  }

  .shoppage-notice img {
    height: 12px;
    vertical-align: middle;
  }

  .shop-activity-number {
    position: absolute;
    font-size: 10px;
    font-weight: 200;
    height: 24px;
    width: 32px;
    border-radius: 12px;
    line-height: 24px;
    padding: 0 8px;
    background-color: rgba(0, 0, 0, 0.2);
    bottom: 50px;
    right: 12px;
  }

  .shop-activity-number i.icon-arrow {
    position: absolute;
    right: 5px;
    font-size: 12px;
    line-height: 24px;
  }

  .shoppage-tabbar {
    font-size: 14px;
    width: 100%;
    height: 40px;
    display: flex;
    text-align: center;
    line-height: 40px;
    color: rgb(77, 85, 93);
    background-color: #fff;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    box-sizing: border-box;
  }

  .shoppage-tabbar .tab-item {
    flex: 1;
    color: rgb(77, 85, 93);
    text-decoration: none;
  }

  .shoppage-tabbar .router-link-active {
    color: rgb(240, 20, 20);
  }

  .shoppage-detail {
    padding: 0 36px;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
  }

  .shoppage-detail .detail-main {
    min-height: 100%;
    width: 100%;
  }

  .shoppage-detail .detail-main .detail-content {
    margin-top: 64px;
    padding-bottom: 64px;
  }

  .detail-content .shop-name {
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    line-height: 16px;
    text-align: center;
  }

  .shoppage-detail .detail-close {
    position: relative;
    margin: -64px auto 0 auto;
    height: 32px;
    width: 32px;
    font-size: 32px;
    clear: both;
    color: rgba(255, 255, 255, 0.5);
  }

  .detail-close .icon-close {
    font-size: 32px;
  }

  .detail-content .star {
    text-align: center;
    margin: 16px 0 28px 0;
  }

  .shoppage-detail .title {
    width: 100%;
    margin: 28px auto 24px auto;
    display: flex;
  }

  .shoppage-detail .title .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 2555, 0.2);
  }

  .shoppage-detail .title .title-text {
    padding: 0 12px;
    font-size: 14px;
    color: #fff;
    font-weight: 700;
    line-height: 14px;
  }

  .activity-item {
    font-size: 12px;
    font-weight: 200;
    line-height: 16px;
    color: #fff;
    margin-bottom: 12px;
    margin-left: 12px;
  }

  .activity-item .icon {
    display: inline-block;
    height: 16px;
    width: 16px;
    margin-right: 6px;
  }

  .shop-bulletin {
    padding: 0 12px;
    font-size: 12px;
    line-height: 24px;
    font-weight: 200;
    color: #fff;
  }

  .shoppage-tabcontent {
    position: absolute;
    width: 100%;
    top: 192px;
    bottom: 0;
    overflow: hidden;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

</style>
