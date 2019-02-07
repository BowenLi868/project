<template>
  <div class="goods">
    <div class="goods-content">
      <div class="goods-left-side" ref="menuWrapper">
        <ul class="goods-left-side-list">
          <li class="goods-left-side-list-item" :class="{'on':index == currentIndex}" v-for="(item,index) in goods" @click="selectMenu(index,$event)"><span class="text"><img class="icon" :src="item.icon_url" v-if="item.icon_url"></img>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="goods-right-content" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" ref="foodList">
            <h2 class="goods-item-list-title">{{item.name}}</h2>
            <ul class="goods-item-list-content">
              <li v-for="food in item.foods">
                <div class="item-icon"><img v-lazy="food.image_path" alt=""></div>
                <div class="item-description">
                  <h3 class="item-title">{{food.name}}</h3>
                  <div class="item-name">{{food.description}}</div>
                  <div class="sell-number"><span class="">月售{{food.month_sales}}份</span> <span class="good-evaluation-rate" v-if="food.satisfy_rate > 0">好评率{{food.satisfy_rate}}%</span></div>
                  <div class="price"><span class="now"><i>￥</i>{{food.price}}</span> <span class="old" v-show="food.original_price"><i>￥</i>{{food.original_price}}</span>
                  <div class="cartcontrol-wrap" style="display:inline-block;vertical-align:top;float:right;"><v-cartcontrol :food="food"></v-cartcontrol></div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <v-shopcart :restaurant_id="$route.params.id" :selectFoods = "selectFoods"></v-shopcart>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import shopcart from '../shop/shopcart'
  import cartcontrol from '../shop/cartcontrol'
  import axios from 'axios'
  export default {
    name: 'goods',
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];

          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    components: {
      'v-shopcart': shopcart,
      'v-cartcontrol':cartcontrol
    },
    created() {
      let self = this;
      axios.get('/menu/',{params:{
        restaurant_id:this.$route.params.id
      }}).then(function (response) {
        self.goods = response.data.content;
        self.$nextTick(function () {
          self._initScroll();
          self._calculateHeight();
        });
      }).catch(function (error) {
        console.log('请求出错了');
      });
    }
  }

</script>
<style>
  .goods-content {
    position: absolute;
    top: 0px;
    bottom: 46px;
    display: flex;
    width: 100%;
    overflow: hidden;
  }

  .goods-left-side {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    color: #666;
  }

  .goods-left-side-list-item {
    display: table;
    height: 54px;
    width: 56px;
    padding: 0 12px;
    font-size: 0;
    line-height: 14px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    font-size: 12px;
  }

  .goods-left-side-list-item.on {
    background: #fff;
    border-left: 3px solid rgb(0, 150, 255);
  }
   .goods-left-side-list-item.on .text{
    color: #666;
    font-size: 14px;
    line-height: 16px;
    font-weight: bolder;
   }
  .goods-left-side-list-item .icon {
    display: inline-block;
    height: 14px;
    width: 10px;
    margin-right: 2px;
  }

  .goods-left-side-list-item .text {
    display: table-cell;
    width: 56px;
    font-weight: 200;
    vertical-align: middle;
  }

  .goods-right-content {
    flex: 1;
    background: #fff;
  }

  .goods-item-list-title {
    height: 26px;
    line-height: 26px;
    background-color: #f3f5f7;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    padding-left: 14px;
  }

  .goods-item-list-content {
    padding: 0 18px;
  }

  .goods-item-list-content li {
    box-sizing: border-box;
    display: flex;
    margin: 18px 0;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .goods-item-list-content li:first-child {
    border-bottom: none;
  }

  .goods-item-list-content .item-icon {
    flex: 0 0 60px;
    width: 60px;
    overflow: hidden;
    height: 60px;
    border-radius: 4px;
    margin-right: 10px;
  }

  .goods-item-list-content .item-icon img {
    height: 60px;
    width: 60px;
  }

  .goods-item-list-content .item-description {
    flex: 1;
  }

  .goods-item-list-content .item-description .item-title {
    margin-top: 2px;
    font-size: 16px;
    line-height: 14px;
    color: rgb(7, 17, 27);
  }

  .goods-item-list-content .item-description .item-name {
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 12px;
    margin: 8px 0;
  }

  .goods-item-list-content .item-description .price {
    font-size: 10px;
    color: rgb(240, 20, 20);
    font-weight: normal;
    line-height: 24px;
  }

  .goods-item-list-content .item-description .price .now {
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    vertical-align: middle;
  }

  .goods-item-list-content .item-description .price .now i {
    font-size: 10px;
    font-weight: normal;
  }

  .goods-item-list-content .item-description .price .old {
    display: inline-block;
    font-size: 10px;
    color: rgb(147, 153, 159);
    font-weight: 700;
    text-decoration: line-through;
  }

  .goods-item-list-content .item-description .sell-number {
    font-size: 10px;
    color: rgb(147, 153, 159);
    margin-top: 8px;
    line-height: 12px;
    margin-bottom: 4px;
  }

</style>
