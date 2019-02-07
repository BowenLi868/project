<template>
  <div class="header-top-bar">
   <i class="iconfont icon-arrow" v-show ="is_arrow_show" @click="back"></i>
   {{title}}
   <span class="right-text" @click="switchLoginModel">{{right_text}}</span>
  </div>
</template>

<script>
export default {
  name: 'header-top-bar',
  data () {
    return {
    };
  },
  props:{
    title:String,
    is_arrow_show:{
      type:Boolean,
      default:false
    },
    right_text:{
      type:String,
      default:''
    }
  },
  methods:{
    back:function(){
      this.$emit('back');
    },
    switchLoginModel:function(){
      this.$emit('switchLoginModel');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header-top-bar{
        position: fixed;
        top: 0;
        left: 0;
        height: 45px;
        width: 100%;
        background-color: rgb(0, 150, 255);
        z-index: 1;
        line-height: 45px;
        font-size: 18px;
        color: #fff;
        text-align: center;
        box-sizing: border-box;
    }
    .icon-arrow{
        position: absolute;
        left: 8px;
        display: inline-block;
        width: 30px;
        font-size: 24px;
        color: #fff;
        transform: rotate(180deg);
    }
    .right-text{
      font-size: 14px;
      display: inline-block;
      position: absolute;
      right: 10px;
      height: 100%;
    }
</style>