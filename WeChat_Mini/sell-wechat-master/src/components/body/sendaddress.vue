<template>
  <div class="sendaddress">
    <v-topbar :title="topbar.title" :is_arrow_show="topbar.is_arrow_show" @back="topBack"></v-topbar>
    <div class="sendaddress-content">
      <div class="no-address" v-if="empty">
        <div class="text">没有收货地址</div>
        <div class="tip">点击下方按钮新增</div>
      </div>
      <ul class="address-list" v-else>
        <li class="address-list-item" @click="select(item)" v-for="(item,index) in sendaddress">
          <!--<div class="radio">
            <span class="iconfont icon-radio"></span>
          </div>-->
          <div class="address-content">
            <div class="top">
              <span class="name">{{item.name}}</span>
              <span class="sex">{{item.sex}}</span>
              <span class="phonenumber">{{item.phonenumber}}</span>
            </div>
            <div class="bottom">
              <span class="label">{{item.label}}</span>{{item.address}}-{{item.detail_address}}
            </div>
            <span class="iconfont icon-bi" @click.stop="modify(index)"></span>
          </div>
        </li>
      </ul>
      <div class="bottom-content" @click="addAddress">
        <span class="iconfont icon-jia"></span>新增地址
      </div>
    </div>
  </div>
</template>
<script>
  import router from '../../router'
  import topbar from '../header/header-top-bar'
  import bus from '../../bus';
  import axios from 'axios';
  import qs from 'qs';
  export default {
    name: 'sendaddress',
    data() {
      return {
        topbar: {
          title: '收货地址',
          is_arrow_show: true
        },
        sendaddress: [],
        is_login: true,
        empty: true,
        is_click: false,
        restaurant_id: ''
      }
    },
    methods: {
      topBack: function () {
        router.go(-1);
      },
      addAddress: function () {
        router.push('/addaddress');
      },
      modify: function (index) {
        let data = {
          name: this.sendaddress[index].name,
          sex: this.sendaddress[index].sex,
          phonenumber: this.sendaddress[index].phonenumber,
          address: this.sendaddress[index].address,
          detail_address: this.sendaddress[index].detail_address,
          door_number: this.sendaddress[index].door_number,
          label: this.sendaddress[index].label,
          _id: this.sendaddress[index]._id
        }
        sessionStorage.setItem('current_address', JSON.stringify(data));
        router.push('/addaddress');
      },
      select: function (item) {
        if (this.is_click) {
          router.push('/comfirmorder/' + this.restaurant_id);
          sessionStorage.setItem('selectAddress', JSON.stringify(item));
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      if (from.path.indexOf('comfirmorder') > -1) {
        sessionStorage.setItem('sign', 1);
        next(vm => {
          vm.restaurant_id = from.path.split('/')[from.path.split('/').length - 1]
        })
      } else if (from.path.indexOf('personcenter') > -1) {
        sessionStorage.setItem('sign', 2);
        next();
      } else {
        next();
      }
    },
    components: {
      'v-topbar': topbar
    },
    created: function () {
      var self = this;
      if (sessionStorage.getItem('sign') == 1) {
        this.is_click = true;
      } else {
        this.is_click = false;
      }
      axios.get('/user/getaddress/').then(function (response) {
        if (response.data.success == 0) {
          self.sendaddress = response.data.data;
          if (self.sendaddress.length > 0) {
            self.empty = false;
          } else {
            self.empty = true;
          }
        } else if (response.data.success == -1) {
          self.empty = true;
        } else if (response.data.success == -2) {
          self.is_login = false;
        }
      });
    }
  }

</script>

<style scoped>
  .sendaddress {
    height: 100%;
  }

  .sendaddress-content {
    padding-top: 45px;
    position: relative;
    height: 100%;
    box-sizing: border-box;
  }

  .sendaddress-content .no-address {
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  .sendaddress-content .no-address .text {
    font-size: 18px;
  }

  .sendaddress-content .no-address .tip {
    font-size: 12px;
    color: #333;
  }

  .sendaddress .bottom-content {
    height: 45px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    background: #fff;
    color: rgb(0, 150, 255);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 45px;
    text-align: center;
  }

  .sendaddress .bottom-content .iconfont {
    margin-right: 10px;
    font-size: 20px;
  }

  .sendaddress .address-list {
    background: #fff;
  }

  .sendaddress .address-list .address-list-item {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .sendaddress .address-list-item .radio {
    flex: 0 0 20px;
    position: relative;
  }

  .sendaddress .address-list-item .radio .iconfont {
    position: absolute;
    top: 50%;
    color: #4cd964;
    transform: translateY(-50%);
  }

  .sendaddress .address-list-item .address-content {
    flex: 1;
    padding: 0 30px 0 10px;
    position: relative;
  }

  .sendaddress .address-list-item .address-content .iconfont {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    color: #ccc;
  }

  .sendaddress .address-list-item .address-content .top {
    padding-bottom: 10px;
  }

  .sendaddress .address-list-item .address-content .name {
    font-size: 16px;
  }

  .sendaddress .address-list-item .address-content .sex,
  .sendaddress .address-list-item .address-content .phonenumber {
    font-size: 14px;
  }

  .sendaddress .address-list-item .address-content .bottom {
    font-size: 12px;
    line-height: 18px;
  }

  .sendaddress .address-list-item .address-content .bottom .label {
    color: #fff;
    background: rgb(0, 150, 255);
    font-size: 10px;
    padding: 0 5px;
    margin-right: 10px;
    border-radius: 2px;
  }

</style>
