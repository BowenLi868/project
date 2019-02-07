<template>
  <div class="star" :class="starType">
    <span v-for="item_class in item_classes" :class="item_class" class="star-item"></span>
  </div>
</template>
<script>
  export default{
    props:['score','size'],
    computed:{
      item_classes(){
        var result = [];
        var on_size = Math.floor(this.score);
        for(var i = 0;i < on_size;i++){
          result.push('on');
        }
        var decimal = (this.score-on_size);

        if(decimal>=0.5){
          result.push('on');
        }
        else if(decimal == 0){
          result.push('off');
        }
        else{
          result.push('half');
        }
        while(i < 4){
          result.push('off');
          i++;
        }
        return result;
      },
      starType(){
        return 'star-'+ this.size;
      }
    }
  }
</script>

<style>
  .star {
    font-size: 0;
  }
  .star-48 .star-item{
    width: 20px;
    height: 20px;
    margin-right: 16px;
    display: inline-block;
    font-size: 12px;
  }
  .star-48 .star-item:last-child{
    margin-right: 0;
  }
  .star-48 .star-item.on{
    background: url('/static/images/star24_on@2x.png') no-repeat center center;
    background-size: 20px 20px;
  }
  .star-48 .star-item.half{
    background: url('/static/images/star24_half@2x.png') no-repeat center center;
    background-size: 20px 20px;
  }
  .star-48 .star-item.off{
    background: url('/static/images/star24_off@2x.png') no-repeat center center;
    background-size: 20px 20px;
  }
  .star-36 .star-item{
    width: 15px;
    height: 15px;
    margin-right: 6px;
    display: inline-block;
    font-size: 12px;
  }
  .star-36 .star-item:last-child{
    margin-right: 0;
  }
  .star-36 .star-item.on{
    background: url('/static/images/star24_on@2x.png') no-repeat center center;
    background-size: 15px 15px;
  }
  .star-36 .star-item.half{
    background: url('/static/images/star24_half@2x.png') no-repeat center center;
    background-size: 15px 15px;
  }
  .star-36 .star-item.off{
    background: url('/static/images/star24_off@2x.png') no-repeat center center;
    background-size: 15px 15px;
  }
  .star-24 .star-item{
    width: 10px;
    height: 10px;
    margin-right: 3px;
    display: inline-block;
  }
  .star-24 .star-item:last-child{
    margin-right: 0;
  }
  .star-24 .star-item.on{
    background: url('/static/images/star24_on@2x.png') no-repeat center center;
    background-size: 10px 10px;
  }
  .star-24 .star-item.half{
    background: url('/static/images/star24_half@2x.png') no-repeat center center;
    background-size: 10px 10px;
  }
  .star-24 .star-item.off{
    background: url('/static/images/star24_off@2x.png') no-repeat center center;
    background-size: 10px 10px;
  }
</style>