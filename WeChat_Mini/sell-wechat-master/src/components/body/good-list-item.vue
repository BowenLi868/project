<template>
  <div class="good-list-item" @click="routerTo">
    <div class="good-list-item-left">
      <img v-lazy="restaurant_info.image_path" alt="商家图片" class="goods-pic">
      <span class="new" v-if="restaurant_info.is_new"><i>新店</i></span>
    </div>

    <div class="good-list-item-right">
      <div class="main">
        <h2 class="good-name"><span class="brand" v-if="restaurant_info.is_brand">品牌</span>{{restaurant_info.name}}<span class="distance">{{parseInt(restaurant_info.distance)}}m</span></h2>
        <div class="score">
          <v-star :score="restaurant_info.rating" :size="24"></v-star><span class="sell-number">月售 {{restaurant_info.recent_order_num}} 单</span><span class="send-time">{{restaurant_info.order_lead_time}}分钟</span></div>
        <div class="send-detail"><span class="send-price">起送价￥{{restaurant_info.minimum_order_amount}}</span><span class="send-money">配送费￥{{restaurant_info.delivery_fee}}</span></div>
      </div>
      <div class="discount" :class="{show:is_show_activities}">
        <span class="activities_num"  v-if="restaurant_info.activities.length > 2" @click.stop="showActivites">{{restaurant_info.activities.length}}个活动<i class="iconfont icon-xiasanjiao"></i></span>
        <p class="discount-item" v-for="item in restaurant_info.activities"><span class="activity-icon" style="color:#fff;margin-right:5px;font-size:10px;padding:2px;border-radius:2px;" :style="{backgroundColor:'#'+item.icon_color}">{{item.icon_name}}</span>{{item.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from '../component/star'
  export default {
    name: 'good-list-item',
    data() {
      return {
        is_show_activities:false,
      };
    },
    props: {
      restaurant_info: {
        type: Object,
      }
    },
    methods: {
      routerTo: function () {
        this.$emit('go', this.restaurant_info.id);
      },
      showActivites:function(){
        this.is_show_activities = !this.is_show_activities;
      }
    },
    components: {
      'v-star': Star
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .good-list-item {
    width: 100%;
    background-color: #fff;
    display: flex;
    border-bottom: 1px solid #d7d7d7;
    padding-bottom: 10px;
    color: #666;
  }

  .good-list-item .good-list-item-left {
    flex: 0 0 70px;
    padding: 16px 8px;
    position: relative;
  }

  .new {
    position: absolute;
    display: block;
    height: 40px;
    width: 40px;
    font-size: 10px;
    top: 0;
    left: 0;
    background-image: linear-gradient(135deg, #26ce61, #26ce61 50%, transparent 0);
  }

  .new i {
    position: absolute;
    display: block;
    color: #fff;
    font-weight: 700;
    top: 7px;
    left: 1px;
    transform: rotate(-45deg);
  }

  .good-list-item .good-list-item-right {
    flex: 1;
    overflow: hidden;
  }

  .good-list-item .good-list-item-right .main {
    padding-right: 10px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 6px;
    position: relative;
  }

  .good-list-item .good-list-item-right .good-name {
    font-size: 16px;
    line-height: 32px;
    height: 32px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 200px;
    color: #333;
  }

  .good-list-item .good-list-item-right .good-name .brand {
    background-color: #ffd930;
    color: #52250a;
    font-size: 10px;
    line-height: 32px;
    padding: 1px 2px;
    font-weight: 700;
    border-radius: 1px;
    margin-right: 4px;
  }

  .good-list-item .good-list-item-right .good-name .distance {
    font-size: 12px;
    position: absolute;
    right: 10px;
    top: 0px;
    color: #666;
  }

  .good-list-item-right .score {
    font-size: 12px;
    padding: 0 0px 8px;
  }

  .good-list-item-right .score .star {
    display: inline-block;
    vertical-align: top;
  }

  .good-list-item-right .score .sell-number {
    padding-left: 10px;
    vertical-align: top;
    line-height: 12px;
  }

  .good-list-item-right .score .send-time {
    float: right;
  }

  .good-list-item-right .send-detail {
    font-size: 12px;
  }

  .good-list-item-right .send-detail .send-price {
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid #ccc;
  }

  .good-list-item .goods-pic {
    width: 60px;
    height: 60px;
    border-radius: 2px;
  }
  .discount{
    position: relative;
    max-height: 40px;
    width: 100%;
    overflow: hidden;
  }
  .discount.show{
    max-height: 160px;
  }
  .discount .discount-item {
    font-size: 10px;
    line-height: 20px;
    padding-right: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;  
  }
  .discount .activities_num{
    position: absolute;
    font-size: 10px;
    right: 10px;
    top: 5px;
  }
  .discount .activities_num .iconfont{
    display: inline-block;
    font-size: 8px;
    transform: scale(0.8);
    margin-left: 4px;
  }
</style>
