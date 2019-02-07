<template>
  <div class="index-footer">
    <div class="footer-tab">
      <router-link to="/index" class="footer-tab-item">
        <i class="iconfont icon-shouye-shouye footer-icon"></i><span class="footer-tab-item-content">首页</span>
      </router-link>
      <router-link to="/order" class="footer-tab-item">
        <i class="iconfont icon-dingdan footer-icon"></i><span class="footer-tab-item-content">订单</span></span>
      </router-link>
      <router-link to="/personcenter" class="footer-tab-item">
        <i class="iconfont icon-gerenzhongxin footer-icon"></i><span class="footer-tab-item-content">我的</span>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'indexfooter',
    data() {
      return {}
    }
  }

</script>
<style>
  .index-footer {
    position: fixed;
    border-top: 1px solid #ccc;
    height: 50px;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.7)
  }
  
  .footer-tab {
    display: flex;
  }
  
  .footer-tab-item {
    text-decoration: none;
    display: block;
    color: #333;
    flex-grow: 1;
    text-align: center;
  }
  
  .footer-tab .router-link-active {
    color: rgb(0, 150, 255);;
  }
  
  .footer-icon {
    display: block;
    height: 20px;
    font-size: 20px;
    padding: 7px 0 2px;
  }
  
  .footer-tab-item-content {
    height: 20px;
    font-size: 14px;
    display: block;
  }

</style>
