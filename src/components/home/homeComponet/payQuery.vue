<template>
        <div class="pay-query-r">
                <div>
                         <div @click="handleTosummaryCloudPayments">申请云支付功能总表</div>
                </div>
                <div>
                         <div @click="handleToGeneralApplicationBrandCert">申请品牌认证总表</div>
                         <div @click="handleToSummaryBrands">项目品牌总表</div>        
                </div>
               
                <div>
                        <div @click="handleToTaskSummaryStatem">申请云支付账号总表</div>
                </div>
        </div>
</template>
<script>
import Vuex from 'vuex';
export default {
        data(){
                return{
                        
                }
        },
        methods:{
                ...Vuex.mapActions({
                        handlePushRouter:"home/handlePushRouter"
                }),
                handleTosummaryCloudPayments($event){
                          var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/summaryCloudPayments",
                                "name":"summaryCloudPayments"
                         }
                          this.handlePushRouter(paramRouter);
                        this.$router.push('/summaryCloudPayments');
                },
                handleToGeneralApplicationBrandCert($event){
                         var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/generalApplicationBrandCert",
                                "name":"generalApplicationBrandCert"
                         }
                        this.handlePushRouter(paramRouter);
                        this.$router.push('/generalApplicationBrandCert');
                },
                handleToSummaryBrands($event){
                          var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/summaryBrands",
                                "name":"summaryBrands"
                         }
                        this.handlePushRouter(paramRouter);
                        this.$router.push('/summaryBrands');
                },
                handleToTaskSummaryStatem($event){
                         var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/taskSummaryStatem",
                                "name":"taskSummaryStatem"
                         }
                        this.handlePushRouter(paramRouter);
                        this.$router.push('/taskSummaryStatem');
                }
        }
}
</script>
<style lang="" scoped>
@media screen and (min-width: 1400px) {
        .pay-query-r{
                margin-left: 74px;
        }
         .pay-query-r>div{
                 overflow: hidden;
         }
         .pay-query-r>div>div{
                 float: left;
                 margin-right: 30px;
                 padding:15px 18px 14px 16px;
                 border:1px solid rgba(102,102,102,1);
                 border-radius:10px;
                 margin-top: 28px;
                 font-size: 16px;
         }
       .pay-query-r>div:last-of-type{
               margin-bottom: 28px;
       }
       .pay-query-r>div>div:hover{
               cursor: pointer;
       }
}

@media screen and (max-width: 1400px) {
        .pay-query-r{
                margin-left: 54px;
        }
         .pay-query-r>div{
                 overflow: hidden;
         }
         .pay-query-r>div>div{
                 float: left;
                 margin-right: 21px;
                 padding:11px 13px 10px 12px;
                 border:1px solid rgba(102,102,102,1);
                 border-radius:7px;
                 margin-top: 20px;
                 font-size: 14px;
         }
       .pay-query-r>div:last-of-type{
               margin-bottom: 20px;
       }
       .pay-query-r>div>div:hover{
               cursor: pointer;
       } 
}
</style>