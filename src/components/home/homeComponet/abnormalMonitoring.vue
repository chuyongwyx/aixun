<template>
        <div class="Monitoring">
                <Badge :count="4">
                             <a href="##" class="demo-badge" @click="handleToDataException">数据同步异常</a>
                </Badge>
                 <Badge :count="3">
                             <a href="##" class="demo-badge" @click="handleToAbnormalCapitalFlow">资金流水核对异常</a>
                </Badge>
                 <Badge :count="3">
                             <a href="##" class="demo-badge" @click="handleToAbnormalAccountBalance">账套余额异常</a>
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
            ...Vuex.mapActions({
                    //缓存路由
                     handlePushRouter:"home/handlePushRouter",
            }),
         //数据同步异常
          handleToDataException($event){
               var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/dataException",
                                "name":"dataException"
                }
                
                 this.handlePushRouter(paramRouter);
                 this.$router.push('/dataException');
          },
          //资金流水核对异常
          handleToAbnormalCapitalFlow($event){
               var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/abnormalCapitalFlow",
                                "name":"abnormalCapitalFlow"
                }
                
                 this.handlePushRouter(paramRouter);
                 this.$router.push('/abnormalCapitalFlow');
          },
          //账户余额异常
          handleToAbnormalAccountBalance($event){
                   var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/abnormalAccountBalance",
                                "name":"abnormalAccountBalance"
                }
                
                 this.handlePushRouter(paramRouter);
                 this.$router.push('/abnormalAccountBalance');
          }
      },
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
        color: #333;
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
        color: #333;
    }
    .ivu-badge{
          cursor: pointer;
      }
}
 
</style>

