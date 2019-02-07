<template>
  <div class="topbannberpage">
    <v-topbar :title="title" :is_arrow_show="topbar.is_arrow_show" @back="topBack"></v-topbar>
    <div class="topbannerpage-content">
      <div class="search-result">
        <div class="top-select">
          <div class="sort">智能排序</div>
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
</template>
<script>
  import router from '../../router'
  import axios from 'axios'
  import topbar from '../header/header-top-bar'
  import BScroll from 'better-scroll'
  import goodListItem from './good-list-item';
  export default {
    name: 'topbannerpage',
    data() {
      return {
        topbar: {
          is_arrow_show: true
        },
        search_data: [],
        scroll: '',
        has_data: true,
        keyword: '',
        offset: 1
      }
    },
    components: {
      'v-topbar': topbar,
      'v-goodlistitem': goodListItem
    },
    computed: {
      title() {
        return this.$store.getters.getTopbanner;
      },
      more_text(){
        return this.has_data? '加载中...':'更多商家正在接入中';
      }
    },
    methods: {
      topBack() {
        router.go(-1);
      },
      loadData: function () {
        var self = this;
        axios.get('/restaurant/' + this.keyword, {
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
      goShopPage: function (id) {
        router.push('/shoppage/' + id + '/goods');
      },
    },
     updated:function(){
      if(this.scroll){
        this.scroll.refresh();
      }
    },
    created: function () {
      var self = this;
      switch (this.title) {
        case '美食':
          this.keyword = 'meishi';
          break;
        case '超市':
          this.keyword = 'chaoshi';
          break;
        case '鲜果购':
          this.keyword = 'shuiguo';
          break;
        case '甜点饮品':
          this.keyword = 'tianpin';
          break;
        case '汉堡':
          this.keyword = 'hanbao';
          break;
        case '新店':
          this.keyword = 'xindian';
          break;
        case '准时达':
          this.keyword = 'zhunshida';
          break;
        case '麻辣烫':
          this.keyword = 'malatang';
          break;
      }
      axios.get('/restaurant/' + this.keyword, {
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
  }

</script>

<style scoped>
  .topbannerpage-content{
    height:100%;
    position:relative;
  }
  .list-content-wrap {
    overflow: hidden;
    position:absolute;
    top:33px;
    bottom:0;
    width:100%;
  }

  .search-result {
    position: fixed;
    top: 45px;
    bottom: 0;
    width: 100%;
  }

  .empty {
    position: absolute;
    top: 30px;
    bottom: 0;
    width: 100%;
    text-align: center;
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
    padding-left: 20px;
    border-left: 1px solid rgba(7, 17, 27, 0.1);
    box-sizing: border-box;
  }

  .top-select div:first-child {
    border-left: none;
  }
  .more {
    text-align: center;
    height: 20px;
    background-color: #f3f3ea;
    position: absolute;
    bottom: -30px;
    width: 100%;
  }
</style>
