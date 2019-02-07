<template>
  <div class="search">
    <v-topbar :title="topbar.title" :is_arrow_show="topbar.is_arrow_show" @back="topBack"></v-topbar>
    <div class="search_content" style="padding-top:44px;">
      <div class="search-box">
        <form action="" @submit="searchData">
          <input type="search" placeholder="搜索商家、商品名称" v-focus v-model="search_text">
        </form>
        <span class="iconfont icon-search"></span>
      </div>
      <div class="search-main">
        <div class="search-history" v-show="search_history.length > 0 && search_text.length == 0">
          <h3 class="title">历史搜索<span class="iconfont icon-shanchu" @click="deleteHistory"></span></h3>
          <div class="search-history-content">
            <span class="label" v-for="(item,index) in search_history" :class="{active:index==0}">{{item}}</span>
          </div>
        </div>
        <div class="search-result" v-show="search_text.length > 0">
          <div class="top-select">
            <div class="delicious">美食</div>
            <div class="sort">智能排序</div>
            <div class="filter">筛选条件</div>
          </div>
          <div class="list-content" v-if="search_data.length > 0">
            <div class="list-content-wrap">
              <div>
                <v-goodlistitem v-for="item in search_data" :key="item.id" :restaurant_info="item" @go="goShopPage"></v-goodlistitem>
                <div class="more">
                  {{more_text}}
                </div>
              </div>
            </div>
          </div>
          <div class="empty" v-else>
            <div>没有找到相应的餐厅，您可以切换地址试一试</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import router from '../../router'
  import axios from 'axios';
  import topbar from '../header/header-top-bar'
  import goodListItem from './good-list-item';
  import BScroll from 'better-scroll'

  export default {
    name: 'search',
    data() {
      return {
        search_data: [],
        topbar: {
          title: '小迪外卖',
          is_arrow_show: true,
        },
        search_text: '',
        search_history: ['早餐', '鸭脖'],
        scroll: ''
      }
    },
    components: {
      'v-topbar': topbar,
      'v-goodlistitem': goodListItem
    },
    methods: {
      topBack: function () {
        router.go(-1);
      },
      goShopPage: function (id) {
        router.push('/shoppage/' + id + '/goods');
      },
      deleteHistory: function () {
        this.search_history = [];
      },
      loadData: function () {
        var self = this;
        axios.get('/restaurant/' + this.search_text, {
          params: {
            longitude: sessionStorage.getItem('lng'),
            latitude: sessionStorage.getItem('lat'),
            offset: self.offset * 10,
            limit: 10,
          }
        }).then(function (response) {
          self.search_data = self.search_data.concat(response.data);
          self.$store.commit('setRestaurant', response.data);
          self.offset += 1;
          if (response.data.length < 10) {
            self.has_data = false;
          }
        });
      },
      searchData: function () {
        var self = this;
        axios.get('/restaurant/' + this.search_text, {
          params: {
            longitude: sessionStorage.getItem('lng'),
            latitude: sessionStorage.getItem('lat'),
            offset: 0,
            limit: 10,
          }
        }).then(function (response) {
          self.search_data = response.data;
          self.$store.commit('setRestaurant', response.data);
          self.$nextTick(function () {
            if (!self.scroll) {
              self.scroll = new BScroll(document.querySelector('.list-content-wrap'), {
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
        })
      }
    },
    updated: function () {
      if (this.scroll) {
        this.scroll.refresh();
      }
    },
    watch: {
      search_text: function (val, oldval) {
        console.log(1);
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus();
        }
      }
    },
    created: function () {
      
    }
  }

</script>

<style scoped>
  .search-box {
    background: rgb(0, 150, 255);
    height: 40px;
    padding: 8px;
    box-sizing: border-box;
    position: relative;
  }

  .search-box .iconfont {
    display: inline-block;
    font-size: 12px;
    position: absolute;
    left: 15px;
    line-height: 24px;
    color: #666;
  }

  .search-box input {
    border: none;
    background: #fff;
    height: 24px;
    font-size: 12px;
    width: 100%;
    border-radius: 12px;
    outline: none;
    box-sizing: border-box;
    padding: 0;
    padding-left: 20px;
  }

  .search-history .title {
    height: 30px;
    font-size: 14px;
    color: #666;
    line-height: 30px;
    padding: 0 10px;
  }

  .search-history .iconfont {
    font-size: 12px;
    float: right;
    width: 20px;
    text-align: center;
  }

  .search-history .search-history-content {
    background: #fff;
    padding: 10px;
    font-size: 0;
  }

  .search-history .search-history-content .label {
    font-size: 14px;
    padding: 3px 10px;
    border: 1px solid rgba(7, 17, 27, 0.1);
    border-radius: 2px;
    color: #666;
    margin: 10px 10px 0 0;
    display: inline-block;
  }

  .search-history .search-history-content .label.active {
    color: rgb(0, 150, 255);
    border: 1px solid rgb(0, 150, 255);
  }

  .search-result {
    position: fixed;
    top: 84px;
    bottom: 0;
    text-align: center;
    width: 100%;
  }

  .empty {
    position: absolute;
    top: 30px;
    bottom: 0;
    width: 100%;
  }

  .empty div {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    font-size: 14px;
    color: #666;
  }

  .top-select {
    display: flex;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #666;
    border-bottom: 1px dotted rgba(7, 17, 27, 0.1);
    background: #fff;
  }

  .top-select div {
    flex: 1;
    text-align: center;
    border-left: 1px solid rgba(7, 17, 27, 0.1);
    box-sizing: border-box;
  }

  .top-select div:first-child {
    border-left: none;
  }

</style>
