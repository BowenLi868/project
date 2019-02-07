<template>
  <div style="background:#fff;">
    <div class="order-list-item">
      <div class="left-content">
        <img :src="order.restaurant_image_path" alt="" class="shop-icon">
      </div>
      <div class="right-content">
        <div class="top-content">
          <div class="shop-name">
            {{order.shop_name}}<span class="iconfont icon-arrow"></span>
            <div class="time">{{order_time}}</div>
          </div>
          <div class="order-status">
            {{status_text}}
          </div>
        </div>
        <div class="center-content">
          <ul class="good-list">
            <li class="good-list-item" v-for="item in order.good_list">
              <div class="text">{{item.name}}</div>
              <div class="price">￥{{(item.count * item.price).toFixed(2)}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom">
        <div class="again-order" @click="againOne">
            再来一单
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import router from '../../router'
  import moment from 'moment'
  
  export default {
    name: 'order-list-item',
    data() {
      return {
      };
    },
    props:{
      order:{
        type:Object
      }
    },
    computed:{
      status_text(){
        switch(this.order.status){
          case 1:
            return '正在配送中';
          case -1:
            return '已取消';
        }
      },
      order_time(){
        return moment(this.order.meta.createAt).format('YYYY-MM-DD');
      }
    },
    methods:{
      againOne:function(){
        router.push('/shoppage/' + this.order.restaurant_id + '/goods');
      }
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .order-list-item {
    display: flex;
    width: 100%;
    overflow: hidden;
    padding: 10px 10px 0;
    background: #fff;
    margin-top: 8px;
    box-sizing: border-box;
  }

  .order-list-item .left-content {
    flex: 0 0 40px;
  }

  .order-list-item .left-content .shop-icon {
    display: inline-block;
    width: 36px;
    text-align: center;
    border-radius: 2px;
  }

  .order-list-item .right-content {
    flex: 1;
    overflow: hidden;
  }

  .order-list-item .right-content .top-content {
    display: flex;
    color: #222;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .order-list-item .right-content .top-content .order-status {
    flex: 0 0 120px;
    font-size: 14px;
    padding-top: 6px;
    text-align: right;
  }

  .order-list-item .right-content .top-content .shop-name {
    flex: 1;
    font-size: 16px;
    padding: 4px 0 10px;
  }

  .order-list-item .right-content .top-content .shop-name .iconfont {
    font-size: 8px;
    display: inline-block;
    height: 18px;
    line-height: 18px;
    vertical-align: top;
    margin-left: 6px;
  }

  .order-list-item .right-content .top-content .shop-name .time {
    font-size: 10px;
    margin-top: 8px;
    color: #999;
  }

  .order-list-item .right-content .center-content {
    padding: 15px 0;
    box-sizing: border-box;
    width: 100%;
  }

  .order-list-item .right-content .center-content .good-list-item {
    display: flex;
    font-size: 14px;
    color: #666;
    width: 100%;
    line-height:24px;
  }

  .order-list-item .right-content .center-content .good-list-item .text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 10px;
  }

  .order-list-item .right-content .center-content .good-list-item .price {
    font-weight: bolder;
    color: #222;
  }
  .bottom{
      height: 40px;
      line-height: 40px;
      border-top: 1px solid rgba(7, 17, 27, 0.1);
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      text-align: right;
      padding-right: 10px;
  }
  .bottom .again-order{
      display: inline-block;
      height: 24px;
      border: 1px solid rgb(0, 150, 255);
      line-height: 24px;
      padding: 0 10px;
      border-radius: 3px;
      color: rgb(0, 150, 255);   
      font-size:14px;
  }
</style>
