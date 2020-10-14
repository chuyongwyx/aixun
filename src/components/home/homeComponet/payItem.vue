<template>
     <div class="pay-item-r">
           <div>
               <h4>商户向爱迅申请开通云支付</h4>
               <div class="new-request-form"><a href="http://is-test.aserweb.com:50101/#/newRequestForm" target="_blank" > 新建申请单</a></div>
               <Badge :count="AcceptingCloudApplicationFormCount">
                             <a  class="demo-badge" href="http://is-test.aserweb.com:50101/#/requestFormFinished" target="_blank">受理&完成申请单</a>
               </Badge>
               
              
           </div>
           <div>
               <h4>为商户申请品牌认证</h4>
               <div><a href="http://is-test.aserweb.com:50101/#/applyBrandCert" target="_blank">申请品牌认证</a></div>
             
                   <Badge :count="ApplyingBrandCertificationApplicationFormCount">
                             <a  class="demo-badge" href="http://is-test.aserweb.com:50101/#/submitCertInfo" target="_blank">提交认证资料</a>
                    </Badge>
              
               
                   <Badge :count="InformationSubmittedBrandCertificationApplicationFormCount">
                             <a  class="demo-badge" href="http://is-test.aserweb.com:50101/#/brandCert" target="_blank">品牌认证</a>
                    </Badge>
               
               
                   <Badge :count="VerifiedBrandCertificationApplicationFormCount">
                             <a  class="demo-badge" href="http://is-test.aserweb.com:50101/#/openCloudDoc" target="_blank">开通云单据</a>
                    </Badge>
              
               
                   <Badge :count="OpenedCloudOrderBrandCertificationApplicationFormCount">
                             <a  class="demo-badge"  href="http://is-test.aserweb.com:50101/#/openCloudPay" target="_blank">开通云支付</a>
                    </Badge>
               
           </div>
           <div>
                    <h4>爱迅、银行配合开通云支付收款账号</h4>
                    <div><a href="http://is-test.aserweb.com:50101/#/applyPayReceipt" target="_blank">申请云支付收款账号</a></div>
                    
                   <Badge :count="SettedReceivableAccountApplicationFormCount">
                             <a  class="demo-badge" href="http://is-test.aserweb.com:50101/#/organTrainingInst" target="_blank">安排培训人员</a>
                    </Badge>
               
           </div>
           <div>
                <h4>第三方人员管理</h4>
                    <div> <a href="http://is-test.aserweb.com:50101/#/buildBank" target="_blank" >建行</a></div>
                    <div> <a href="http://is-test.aserweb.com:50101/#/industrialBank" target="_blank" >兴业</a></div>
                    <div> <a href="http://is-test.aserweb.com:50101/#/trainingOrg" target="_blank" >广州培训</a></div>
           </div>
     </div>
</template>
<script>
import Vuex from 'vuex';
import submitCertInfoVue from '../components/submitCertInfo/submitCertInfo.vue';
export default {
        data(){
            return{
                   
            }
        },
        computed:{ 
            ...Vuex.mapState({
                // 未受理的云单据/云支付申请单数量（显示在：受理&完成申请单）
                AcceptingCloudApplicationFormCount: state=>state.payItem.AcceptingCloudApplicationFormCount,
                //申请中品牌申请单数量（显示在：提交认证资料）
                ApplyingBrandCertificationApplicationFormCount:state=>state.payItem.ApplyingBrandCertificationApplicationFormCount,
                // 已提交资料品牌申请单数量（显示在：品牌认证）
                InformationSubmittedBrandCertificationApplicationFormCount:state=>state.payItem.InformationSubmittedBrandCertificationApplicationFormCount,
                //已认证品牌申请单数量（显示在：开通云单据）
                VerifiedBrandCertificationApplicationFormCount:state=>state.payItem.VerifiedBrandCertificationApplicationFormCount,
                //已开通云单据的品牌数量（显示在：开通云支付）
                OpenedCloudOrderBrandCertificationApplicationFormCount:state=>state.payItem.OpenedCloudOrderBrandCertificationApplicationFormCount,
                //设置完成的云支付账号申请单数量（显示在：安排培训人员）
                SettedReceivableAccountApplicationFormCount:state=>state.payItem.SettedReceivableAccountApplicationFormCount,
            })
        },
        methods:{
            ...Vuex.mapActions({
                    payItemMessage :"payItem/hanlePayItemMessage",
            }),
        created(){
            this.payItemMessage();
        },
        mounted(){
           
        }
    
}
}
</script>
<style lang="" scoped>
@media screen and (min-width: 1400px) {
    .pay-item-r{
            padding-left:74px;
            padding-right: 66px;
            width: 100%;
            box-sizing: border-box;
            float: left;
    }
    .pay-item-r>div{
            height:165px;
            box-sizing: border-box;
            border-bottom: 2px solid rgba(241,243,246,1);
            padding-top: 39px;
    }
     .pay-item-r>div>h4{
          font-size: 16px;
          color: #333;
          line-height: 1;
          margin-bottom:24px; 
     }
      .pay-item-r>div>div{
          
      }
     .pay-item-r>div>div a{
         display:block;
         float: left;
          font-size: 16px;
          padding: 15px 21px 14px 20px;
          border:1px solid rgba(102,102,102,1);
          border-radius:10px;
          margin-right: 40px;
          color: #333;
    }
   
     .pay-item-r>div>div a:hover{
          cursor: pointer;
          border:1px solid #5897FF;
          color:#5897FF ;
      }
      .pay-item-r>div .ivu-badge{
          cursor: pointer;

      }
      .ivu-badge{
           margin-right: 40px;
      }
      .demo-badge:hover{
           border:1px solid #5897FF;
           color:#5897FF;
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
  
}
@media screen  and (max-width: 1400px){ 
      .pay-item-r{
            padding-left:54px;
            padding-right: 48px;
            width: 100%;
            box-sizing: border-box;
            float: left;
    }
    .pay-item-r>div{
            height:120px;
            box-sizing: border-box;
            border-bottom: 2px solid rgba(241,243,246,1);
            padding-top: 28px;
    }
     .pay-item-r>div>h4{
          font-size: 12px;
          color: #333;
          line-height: 1;
          margin-bottom:17px; 
     }
      .pay-item-r>div>div{
          
      }
    .pay-item-r>div>div a{
          display:block;
          float: left;
          font-size: 14px;
          padding: 11px 15px 10px 14px;
          border:1px solid rgba(102,102,102,1);
          border-radius:7px;
          margin-right: 29px;
          color: #333;
    }
   
     .pay-item-r>div>div a:hover{
          cursor: pointer;
          border:1px solid #5897FF;
          color:#5897FF ;
      }




      .pay-item-r>div .ivu-badge{
          cursor: pointer;
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
        border: 1px solid #5897FF;
    }
}

</style>