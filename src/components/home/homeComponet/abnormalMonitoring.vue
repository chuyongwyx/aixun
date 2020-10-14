<template>
        <div class="Monitoring">
                <Badge :count="4">
                             <a  class="demo-badge"  href="http://is-test.aserweb.com:50101/#/dataException" target="_blank">数据同步异常</a>
                </Badge>
                 <Badge :count="3">
                             <a  class="demo-badge" href="http://is-test.aserweb.com:50101/#/abnormalCapitalFlow" target="_blank">资金流水核对异常</a>
                </Badge>
                 <Badge :count="3">
                             <a  class="demo-badge" href="http://is-test.aserweb.com:50101/#/abnormalAccountBalance" target="_blank">账套余额异常</a>
                </Badge>
        </div>
</template>
<script>
import Vuex from 'vuex';
export default {
      data(){
          return {

          }
      },
      computed:{

      },
      methods:{
      }
}
</script>
<style scoped>
@media screen  and (min-width:1400px){
     .Monitoring{
            margin-left: 74px;
            
    }
    .Monitoring> .ivu-badge{
            margin-top: 27px;
            margin-right: 29px;
            float: left;
           font-size: 15px;
    }
     .ivu-badge{
           margin-right: 40px;
      }
      .demo-badge{
           padding: 15px 21px 14px 20px;
          border:1px solid rgba(102,102,102,1);
          border-radius:10px;
          background: #fff;
         display: inline-block;
         font-size: 16px;
         color: #333;
         
    }
    .demo-badge:hover{
        color: #5897FF;
        border:1px solid #5897FF;
    }
    .ivu-badge{
          cursor: pointer;
      }
}
@media screen and (max-width:1400px){
  .Monitoring{
            margin-left: 54px;
            
    }
    .Monitoring> .ivu-badge{
            margin-top: 20px;
            margin-right: 21px;
            float: left;
           font-size: 13px;
    }
  .ivu-badge{
           margin-right: 29px;
    }
  .demo-badge{
            padding: 11px 15px 10px 14px;
            border:1px solid rgba(102,102,102,1);
            border-radius:7px;
            background: #fff;
            display: inline-block;
            font-size: 14px;
            color: #333;
         
    }
    .demo-badge:hover{
          color: #5897FF;
        border:1px solid #5897FF;
    }
    .ivu-badge{
          cursor: pointer;
      }
}
 
</style>

