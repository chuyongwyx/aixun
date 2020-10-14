<template>
        <div class="pay-query-r">
                <div>
                         <div><a href="http://is-test.aserweb.com:50101/#/summaryCloudPayments" target="_blank" >申请云支付功能总表</a></div>
                </div>
                <div>
                         <div><a href="http://is-test.aserweb.com:50101/#/generalApplicationBrandCert" target="_blank">申请品牌认证总表</a></div>
                         <div><a href="http://is-test.aserweb.com:50101/#/summaryBrands" target="_blank">项目品牌总表</a></div>        
                </div>
               
                <div>
                        <div><a href="http://is-test.aserweb.com:50101/#/taskSummaryStatem" target="_blank"> 申请云支付账号总表</a></div>
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
         .pay-query-r>div>div a{
                  display:block;
                 float: left;
                 margin-right: 30px;
                 padding:15px 18px 14px 16px;
                 border:1px solid rgba(102,102,102,1);
                 border-radius:10px;
                 margin-top: 28px;
                 font-size: 16px;
                 color: #333;
         }
       .pay-query-r>div:last-of-type{
               margin-bottom: 28px;
       }
       .pay-query-r>div>div a:hover{
               cursor: pointer;
               color: #5897FF;
               border:1px solid #5897FF;
       }
}

@media screen and (max-width: 1400px) {
        .pay-query-r{
                margin-left: 54px;
        }
         .pay-query-r>div{
                 overflow: hidden;
         }
         .pay-query-r>div>div a{
                 display:block;
                 float: left;
                 margin-right: 21px;
                 padding:11px 13px 10px 12px;
                 border:1px solid rgba(102,102,102,1);
                 border-radius:7px;
                 margin-top: 20px;
                 font-size: 14px;
                 color: #333;
         }
       .pay-query-r>div:last-of-type{
               margin-bottom: 20px;
       }
       .pay-query-r>div>div a:hover{
               cursor: pointer;
               color: #5897FF;
               border:1px solid #5897FF;
       } 
}
</style>