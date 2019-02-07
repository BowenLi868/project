<template>
  <div class="alertbox">
    <h2>提示</h2>
    <div class="content">
      {{content}}
    </div>
    <div class="btn-box" @click="btnClick">
      <div class="btn" v-for="item in btn">{{item}}</div>
    </div>
  </div>
</template>

<script>
  
  export default {
    name:'alertbox',
    data(){
      return{};
    },
    props:{
      content:{
        type:String,
      },
      btn:{
        type:Array,
        default:['确定']
      }
    },
    methods:{
      btnClick(e){
        if(e.target.innerText == '确定'){
          this.$emit('comfirm');
        }
        else{
          this.$emit('cancel');
        }
      }
    }
  }
</script>

<style>
  .alertbox{
    width: 80%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-50%,0);
    background: #fff;
    border-radius: 8px;
  }
  .alertbox h2{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
  }
  .alertbox .content{
    font-size: 16px;
    padding: 10px;
    text-align: center;
    line-height: 20px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    border-top: 1px solid rgba(7, 17, 27, 0.1);
  }
  .alertbox .btn-box{
    height: 40px;
    line-height: 40px;
    text-align: center;
    display: flex;
  }
  .alertbox .btn{
    flex: 1;
    box-sizing: border-box;
  }
  .alertbox .btn:last-child{
    color: rgb(0, 150, 255);
    border-left: 1px solid rgba(7, 17, 27, 0.1);
  }
</style>