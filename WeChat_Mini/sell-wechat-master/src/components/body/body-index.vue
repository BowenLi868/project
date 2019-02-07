<template>
  <div class="index">
    <div class="index-content">
      <div>
        <header class="index-header">
          <div class="top-banner">
            <div class="address-box"><span class="iconfont icon-dizhi"></span>{{address}}</div>
            <div class="weather">
              <span class="temperature">{{weather.temperature}}°</span>
              <span class="text">{{weather.description}}</span>
              <img class="weather-icon" :src="weather.image_path" alt="">
            </div>
            <div class="search-box" @click="search"><input type="text" placeholder="搜索商家、商品" readonly></div>
          </div>
          <div class="nav-bar">
            <ul class="nav-bar-list" @click="topbannerpage">
              <li class="nav-bar-list-item" v-lazy:background-image="'/static/images/meishi.jpeg'">
                美食
              </li>
              <li class="nav-bar-list-item" v-lazy:background-image="'/static/images/chaoshi.jpeg'">
                超市
              </li>
              <li class="nav-bar-list-item" v-lazy:background-image="'/static/images/shuiguo.jpeg'">
                鲜果购
              </li>
              <li class="nav-bar-list-item" v-lazy:background-image="'/static/images/tianpin.jpeg'">
                甜点饮品
              </li>
              <li class="nav-bar-list-item" v-lazy:background-image="'/static/images/hanbao.jpeg'">
                汉堡
              </li>
              <li class="nav-bar-list-item" v-lazy:background-image="'/static/images/xindian.jpeg'">
                新店
              </li>
              <li class="nav-bar-list-item" v-lazy:background-image="'/static/images/zhunshi.jpeg'">
                准时达
              </li>
              <li class="nav-bar-list-item" v-lazy:background-image="'/static/images/malatang.jpeg'">
                麻辣烫
              </li>
            </ul>
          </div>
        </header>
        <div class="content">
          <h2 class="content-title">
            <p>附近商家</p>
          </h2>
          <div>
            <good-list-item v-for="item in goods_data" :key="item.id" :restaurant_info="item" @go="goShopPage"></good-list-item>
          </div>
        </div>
        <div class="more">
          {{more_text}}
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import router from '@/router'
  import goodListItem from './good-list-item';
  import Footer from '../footer/index-footer';
  import BScroll from 'better-scroll'
  import axios from 'axios'

  export default {
    name: 'index',
    data() {
      return {
        address: "地址获取中...",
        goods_data: [],
        weather: {},
        offset: 1,
        scroll: '',
        has_data: true,
      };
    },
    components: {
      'good-list-item': goodListItem,
      'v-footer': Footer
    },
    methods: {
      goShopPage: function (id) {
        router.push('/shoppage/' + id + '/goods');
      },
      search: function () {
        router.push('/search');
      },
      loadData: function () {
        var self = this;
        axios.get('/restaurant/', {
          params: {
            longitude: sessionStorage.getItem('lng'),
            latitude: sessionStorage.getItem('lat'),
            offset: self.offset * 10,
            limit: 10,
          }
        }).then(function (response) {
          self.goods_data = self.goods_data.concat(response.data);
          self.$store.commit('setRestaurant', response.data);
          self.offset += 1;
          if (response.data.length < 10) {
            self.has_data = false;
          }
        });
      },
      topbannerpage: function (e) {
        this.$store.commit('setTopbanner', e.target.innerText);
        router.push('/topbannerpage');
      }
    },
    computed: {
      more_text() {
        return this.has_data ? '加载中...' : '更多商家正在接入中';
      }
    },
    updated: function () {
      if (this.scroll) {
        this.scroll.refresh();
      }
    },
    created: function () {
      var self = this;
      let geoc = new BMap.Geocoder();
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          geoc.getLocation(r.point, function (rs) {
            var addComp = rs.addressComponents;
            self.address = addComp.district+addComp.street+addComp.streetNumber;
            sessionStorage.setItem('lng',r.point.lng);
            sessionStorage.setItem('lat',r.point.lat);
            axios.get('/weather/', {
              params: {
                longitude: r.point.lng,
                latitude: r.point.lat,
              }
            }).then(function (response) {
              self.weather = response.data;
            });
            axios.get('/restaurant/', {
              params: {
                longitude: r.point.lng,
                latitude: r.point.lat,
                offset: 0,
                limit: 10,
              }
            }).then(function (response) {
              self.goods_data = response.data;
              self.$store.commit('setRestaurant', response.data);
              self.$nextTick(function () {
                if (!self.scroll) {
                  self.scroll = new BScroll(document.querySelector('.index-content'), {
                    click: true,
                    probeType: 3
                  });
                } else {
                  self.scroll.refresh();
                }
                self.scroll.on('touchend', function () {
                  if (this.y < (this.maxScrollY)) {
                    if (self.has_data) {
                      self.loadData();
                    }
                  }
                })
              });
            });
          });
        } else {
          self.address = '定位失败';
        }
      }, {
        enableHighAccuracy: true
      });


    },
    mounted: function () {


    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .index-content {
    height: 100%;
    overflow: hidden;
  }

  .index-header {
    width: 100%;
    border-bottom: 1px solid #ddd;
    position: relative;
  }

  .index-header .weather {
    position: absolute;
    right: 15px;
    color: #fff;
    font-size: 10px;
    top: 15px;
    padding-right: 26px;
  }

  .index-header .weather span {
    display: block;
  }

  .index-header .weather .weather-icon {
    position: absolute;
    height: 24px;
    width: 24px;
    right: 0;
    top: 0;
  }

  .index-header .top-banner {
    width: 100%;
    height: 120px;
    background-color: rgb(0, 150, 255);
    position: relative;
    padding: 15px;
    box-sizing: border-box;
  }

  .index-header .address-box {
    font-size: 18px;
    max-width: 80%;
    white-space: nowrap;
    overflow: hidden;
    color: #fff;
    margin-bottom: 20px;
  }

  .address-box .iconfont {
    font-size: 14px;
    color: #fff;
    display: inline-block;
    margin-right: 4px;
  }

  .index-header .search-box {
    height: 40px;
    width: 100%;
    border-radius: 40px;
    background: #fff;
    overflow: hidden;
    padding: 0 40px;
    box-sizing: border-box;
  }

  .index-header .search-box input {
    border: none;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 14px;
    outline: none;
  }

  .nav-bar-list {
    display: flex;
    width: 100%;
    height: 160px;
    background-color: #fff;
    flex-flow: row wrap;
    align-content: flex-start;
    font-size: 12px;
  }

  .nav-bar-list .nav-bar-list-item {
    box-sizing: border-box;
    flex: 0 0 25%;
    height: 80px;
    overflow: hidden;
    text-align: center;
    background-position: center 10px;
    background-repeat: no-repeat;
    background-size: 40px 40px;
    padding-top: 60px;
  }

  .content {
    width: 100%;
    background-color: #ddd;
  }

  .more {
    text-align: center;
    height: 20px;
    background-color: #f3f3ea;
    position: absolute;
    bottom: -30px;
    width: 100%;
  }

  .content .content-title {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #666;
    background-color: #ddd;
    padding: 5px 0;
  }

  .content .content-title p {
    padding-left: 20px;
    border-left: 4px solid #fdad3a;
  }

</style>
