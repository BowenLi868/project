<template>
  <div class="evaluateitem">
    <div class="left-content">
      <img :src="image_path" alt="">
    </div>
    <div class="right-content">
      <div class="top-content">
        <div class="user-date-box"><span class="user-name">{{evaluate.content.username}}</span><span class="evaluate-date">{{evaluate.content.rated_at}}</span></div>
        <div class="star-time-box">
          <v-star :score="evaluate.content.rating_star" :size="24"></v-star><span class="spend-time">{{evaluate.content.time_spent_desc}}</span></div>
      </div>
      <div class="center-content">
        {{evaluate.content.rating_text}}
      </div>
      <div class="bottom-content">
        <span class="goods-label" v-for="item in evaluate.content.item_ratings">{{item.food_name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import Star from '../component/star'

  export default {
    name: 'evaluateitem',
    components: {
      'v-star': Star
    },
    props:{
      evaluate:Object
    },
    computed:{
      image_path(){
        return this.evaluate.content.avatar || '/static/images/default_icon.png';
      }
    }
  }

</script>
<style>
  .evaluateitem {
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  
  .evaluateitem .left-content {
    flex: 0 0 28px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-right: 12px;
    overflow: hidden;
  }
  
  .evaluateitem .left-content img {
    display: inline-block;
    height: 28px;
    width: 28px;
    border-radius: 50%;
  }
  
  .evaluateitem .right-content {
    flex: 1;
  }
  
  .evaluateitem .right-content .top-content {
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  
  .evaluateitem .right-content .top-content .user-name {
    color: rgb(7, 17, 27);
  }
  
  .evaluateitem .right-content .top-content .evaluate-date {
    font-weight: 200;
    float: right;
  }
  .evaluateitem .right-content .top-content .star-time-box{
    margin-top: 4px;
    font-size: 0;
    margin-bottom: 6px;
  }
  .evaluateitem .right-content .top-content .star-time-box .star{
    display: inline-block;
    vertical-align: top;
  }
  .evaluateitem .right-content .top-content .spend-time{
    font-size:10px;
    vertical-align: top;
    color: rgb(147, 153, 159);
    font-weight: 200;
    line-height: 12px;
  }
  .evaluateitem .center-content{
    font-size: 12px;
    color: rgb(7, 17, 27);
    line-height: 18px;
    margin-bottom: 8px;
  }
  .evaluateitem .bottom-content{
    font-size: 0px;
    color: rgb(183,187,193);
    line-height: 16px;
  }
  .evaluateitem .bottom-content .goods-label{
    display: inline-block;
    font-size: 12px;
    background-color: rgb(255, 255, 255);
    border-radius: 2px;
    border: 1px solid rgba(7, 17, 27, 0.1);
    padding: 0 6px;
    margin-right: 8px;
    width: 90px;
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space:nowrap; overflow:hidden;
  }
</style>
