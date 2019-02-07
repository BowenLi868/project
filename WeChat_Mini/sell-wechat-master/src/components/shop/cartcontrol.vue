<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count" @click.stop.prevent="decreaseCart">
        <span class="iconfont icon-jian inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="addCart">
      <span class="iconfont icon-jia"></span>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      decreaseCart: function () {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      },
      addCart: function () {
        if(!event._constructed){
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      }
    }
  }

</script>

<style>
  .cartcontrol {
    font-size: 0;
    height: 24px;
  }

  .cart-decrease {
    display: inline-block;
    line-height: 24px;
    vertical-align: top;
    transform: translate3d(0, 0, 0);
  }

  .cartcontrol .iconfont {
    color: rgb(0, 150, 255);
    font-size: 23px;
    line-height: 24px;
  }

  .inner {
    transition: all 0.4s linear;
    transform: rotate(0);
  }

  .cart-count {
    font-size: 10px;
    color: rgb(147, 153, 159);
    display: inline-block;
    width: 24px;
    text-align: center;
    line-height: 24px;
    vertical-align: top;
  }

  .cart-add {
    vertical-align: top;
    display: inline-block;
    color: rgb(0, 150, 255);
    line-height: 24px;
  }

  .move-enter-active,
  .move-leave-active {
    transition: all 0.5s;
  }

  .move-enter,
  .move-leave-active {
    opacity: 0;
    transform: translate3d(22px, 0, 0);
  }

  .move-enter .inner,
  .move-leave-active .inner {
    transform: rotate(180deg);
  }

</style>
