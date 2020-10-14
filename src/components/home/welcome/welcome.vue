<template>
    <div class="welcome">
                    <div class="nav">
                            <!-- 左边导航栏部分 -->
                                <div class="nav-left">
                                    <div class="pay-items" :class='{"nav-active":payItems}' @click="handelToItem"><span class="iconfont icon-zhifu"></span><span>云支付项目</span></div>
                                    <div class="pay-query" :class='{"nav-active":payQuery}'  @click="handelToSearch"><span class="iconfont icon-chaxun1"></span><span>云支付查询</span></div>
                                    <div class="pay-abnormalMonitoring" :class='{"nav-active":payAbnormalMonitoring}' @click="handelToMonitoring"><span class="iconfont icon-shebeileijiankongdian"></span><span>云支付异常监控</span></div>
                                    <div class="Int-manage" :class='{"nav-active":IntManage}' @click="handelToManage" ><span class="iconfont icon-guanli"></span><span>内部管理</span></div>
                                </div>
                                <div class="nav-right">
                                        <router-view></router-view>  
                                </div>
                            
                    </div>
    </div>
</template>

<script>
import Vuex from 'vuex';

export default {
    data(){
        return{
                payItems:true,
                payQuery:false,
                IntManage:false,
                payAbnormalMonitoring:false,        
        }
    },
    methods:{
        ...Vuex.mapActions({
            //刷新未读消息
            hanlePayItemMessage:"payItem/hanlePayItemMessage"
        }),
        //菜单右边的切换
        handelToItem(){
             this.payItems = true;
             this.payQuery =false;
            this.IntManage= false;
            this.payAbnormalMonitoring=false;
            if(this.$route.name !=="payItem"){
                   
                    this.$router.push('/payItem');
                    // this.hanlePayItemMessage();
            }
             
        },
        handelToSearch(){
             this.payItems = false;
             this.payQuery =true;
             this.IntManage= false;
             this.payAbnormalMonitoring=false;
            if(this.$route.name !=="payQuery"){
            
              this.$router.push('/payQuery');
            }
             
        },
        handelToMonitoring(){
             this.payItems = false;
             this.payQuery =false;
             this.IntManage= false;
             this.payAbnormalMonitoring=true;
            if(this.$route.name !=="abnormalMonitoring"){
            
            this.$router.push('/abnormalMonitoring')
            }
        },
        handelToManage(){
             this. payItems = false;
             this.payQuery =false;
             this.payAbnormalMonitoring=false;
             this.IntManage= true;
            if(this.$route.name !=="intManage"){
            
            this.$router.push('/intManage');
            }
        },

       
    },
    created(){
      this.hanlePayItemMessage();
    }
}
</script>
<style lang="" scoped>
@media screen and (min-width:1400px){
    .welcome{
         width:100%;
         height: 100%;
    }
    .nav{
         width: 100%;
         height:100%;
    }
   .welcome .nav> .nav-left{
            width:20%;
            box-sizing: border-box;
            float: left;
            height: 100%;
    }
    .nav-left>div:hover{
        cursor: pointer;
    }
   
    .welcome .nav> .nav-left>div{
            height:88px;
            margin-left:19px;
            margin-right: 20px;
            box-sizing: border-box;
            border-bottom: 2px solid rgba(241,243,246,1); 
           
    }
    .welcome .nav> .nav-left>div span{
            text-align: center;
            line-height: 88px;
    }
     .welcome .nav> .nav-left>div span:nth-of-type(1){
          font-size: 14px;
          margin-right: 8px;
          margin-left: 35px;
     }
    .nav-left>div span:nth-of-type(2){
            font-size: 14px;
    }
     .welcome .nav> .nav-left> .nav-active{
        color:#5897FF;
    }
    .welcome .nav> .nav-right{
        float:left;
        width:80% ;
        height: 100%;
        box-sizing: border-box;
        min-height: 260px;
        border-left:1px solid rgba(235,237,239,1);
    }
}
@media screen and (max-width:1400px){
    .welcome{
        width: 100%;
        height: 100%;
    }
     .welcome .nav{
           width:100%;
           background:rgba(255,255,255,1);
           height: 100%;
           
     }
    .welcome .nav> .nav-left{
            width:20%;
            height:100%;
            box-sizing: border-box;
            float: left;
    }
    .nav-left>div:hover{
        cursor: pointer;
    }
   
    .welcome .nav> .nav-left>div{
            height:64px;
            margin-left:14px;
            margin-right: 15px;
            box-sizing: border-box;
            border-bottom: 2px solid rgba(241,243,246,1); 
           
    }
    .welcome .nav> .nav-left>div span{
            text-align: center;
            line-height: 64px;
    }
     .welcome .nav> .nav-left>div span:nth-of-type(1){
          font-size: 12px;
          margin-right:6px;
          margin-left: 25px;
     }
    .nav-left>div span:nth-of-type(2){
            font-size: 12px;
    }
     .welcome .nav> .nav-left> .nav-active{
        color:#5897FF;
    }
    .welcome .nav> .nav-right{
        float:left;
        width:80% ;
        height: 100%;
        box-sizing: border-box;
        height: 100%;
        border-left:1px solid rgba(235,237,239,1);
    }
}
</style>