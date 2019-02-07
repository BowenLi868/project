<template>
  <div class="evaluate">
    <div class="evaluate-content">
      <div class="top-score">
        <div class="left-content">
          <span class="score">3.9</span>
          <span class="total-evaluate">综合评价</span>
          <span class="high-rate">高于周边商家{{(Number.parseFloat(top_score.compare_rating)*100).toFixed(1)}}%</span>
        </div>
        <div class="right-content">
          <div class="service"><span class="title">服务态度</span>
            <v-star :score="Number.parseFloat(top_score.service_score).toFixed(1)" :size="36"></v-star><span class="score">{{Number.parseFloat(top_score.service_score).toFixed(1)}}</span></div>
          <div class="goods-evaluate"><span class="title">菜品评价</span>
            <v-star :score="Number.parseFloat(top_score.food_score).toFixed(1)" :size="36"></v-star><span class="score" v-text="Number.parseFloat(top_score.food_score).toFixed(1)"></span></div>
          <div class="send-time"><span class="title">送达时间</span><span class="time">{{top_score.deliver_time}}分钟</span></div>
        </div>
      </div>
      <div class="evaluate-bottom">
        <div class="evaluate-bottom-label">
          <span class="label-item all">全部<span class="number">{{rating_label.total}}</span></span>
          <span class="label-item satisfaction">满意<span class="number">{{rating_label.safe}}</span></span>
          <span class="label-item dissatisfaction">不满意<span class="number">{{rating_label.unsafe}}</span></span>
        </div>
        <div class="evaluate-bottom-content">
          <v-evaluateitem v-for="(item,index) in rating" :key="index" :evaluate="item"></v-evaluateitem>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Star from '../component/star'
  import EvaluateItem from '../component/evaluate-item'
  import BScroll from 'better-scroll'
  import axios from 'axios'

  export default {
    name: 'evaluate',
    data() {
      return {
        top_score: {},
        rating: [],
        rating_label: {},
        offset:0,
        scroll:'',
      }
    },
    components: {
      'v-star': Star,
      'v-evaluateitem': EvaluateItem
    },
    created: function () {
      let self = this;
      axios.all([this.getScore(), this.getRatingCount(), this.getRating()]).then(axios.spread(function (score,
        rating_label, rating) {
        self.top_score = score.data;
        self.rating_label = rating_label.data;
        self.rating = rating.data;
        self.$nextTick(function () {
          if (!self.scroll) {
            self.scroll = new BScroll(document.querySelector('.evaluate'), {
              click: true,
            });
          } else {
            self.scroll.refresh();
          }
          self.scroll.on('touchend', function () {
            if (this.y < (this.maxScrollY)) {
              self.loadData();
            }
          })
        });
      }));
    },
    updated:function(){
      if(this.scroll){
        this.scroll.refresh();
      }
    },
    methods: {
      getScore() {
        var self= this;
        return axios.get('/rating/score/',{params:{
          restaurant_id:self.$route.params.id
        }});
      },
      getRatingCount() {
        var self= this;
        return axios.get('/rating/ratingcount',{params:{
          restaurant_id:self.$route.params.id
        }});
      },
      getRating() {
        var self = this;
        return axios.get('/rating/', {
          params: {
            restaurant_id: self.$route.params.id,
            offset: 0,
            limit: 10
          }
        });
      },
      loadData(){
        let self = this;
        axios.get('/rating/', {
          params: {
            restaurant_id: self.$route.params.id,
            offset: this.offset*10,
            limit: 10
          }
        }).then(function(response){
          self.rating = self.rating.concat(response.data);
          self.offset++;
        });

      }
    }
  }

</script>
<style>
  .evaluate {
    position: absolute;
    top: 0;
    bottom: 0;
    background: #f3f5f7;
    overflow: hidden;
    width: 100%;
  }

  .top-score {
    padding: 18px 0;
    display: flex;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    margin-bottom: 18px;
    background: #fff;
  }

  .top-score .left-content {
    flex: 0 0 135px;
    width: 135px;
    text-align: center;
  }

  .top-score .left-content .score {
    font-size: 24px;
    color: rgb(255, 153, 0);
    line-height: 28px;
    display: block;
    margin-bottom: 6px;
  }

  .top-score .left-content .total-evaluate {
    display: block;
    font-size: 12px;
    line-height: 12px;
    color: rgb(7, 17, 27);
    margin-bottom: 8px;
  }

  .top-score .left-content .high-rate {
    font-size: 10px;
    line-height: 10px;
    color: rgb(147, 153, 159);
  }

  .top-score .right-content {
    flex: 1;
    border-left: 1px solid rgba(7, 17, 27, 0.1);
    padding: 0 24px;
  }

  .top-score .right-content .star {
    display: inline-block;
    vertical-align: top;
  }

  .top-score .right-content .service,
  .top-score .right-content .goods-evaluate,
  .top-score .right-content .send-time {
    font-size: 0px;
    color: rgb(7, 17, 27);
    margin-bottom: 8px;
  }

  .top-score .right-content .send-time .title {
    vertical-align: top;
    display: inline-block;
    font-size: 12px;
    line-height: 18px;
    margin-right: 6px;
  }

  .top-score .right-content .score {
    vertical-align: top;
    display: inline-block;
    font-size: 16px;
    line-height: 18px;
    margin-left: 10px;
    color: rgb(255, 153, 0);
  }

  .top-score .right-content .send-time {
    margin-bottom: 0;
  }

  .top-score .right-content .send-time .time {
    color: rgb(147, 153, 159);
    display: inline-block;
    font-size: 12px;
    line-height: 18px;
  }

  .evaluate-bottom {
    padding: 18px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    background: #fff;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .evaluate-bottom-label {
    font-size: 0;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .evaluate-bottom-label .label-item {
    display: inline-block;
    line-height: 32px;
    padding: 0 12px;
    font-size: 12px;
    border-radius: 2px;
    margin-left: 8px;
  }

  .evaluate-bottom-label .label-item .number {
    font-size: 8px;
    padding-left: 4px;
  }

  .evaluate-bottom-label .all {
    background: rgb(0, 160, 220);
    color: #fff;
  }

  .evaluate-bottom-label .satisfaction {
    background: rgba(0, 160, 220, 0.2);
    color: rgb(77, 85, 93);
  }

  .evaluate-bottom-label .dissatisfaction {
    background: rgba(77, 85, 93, 0.2);
    color: #5b6269;
  }

</style>
