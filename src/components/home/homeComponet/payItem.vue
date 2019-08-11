<template>
     <div class="pay-item-r">
           <div>
               <h4>商户向爱迅申请开通云支付</h4>
               <div class="new-request-form" @click="handleToNewRequestForm">新建申请单</div>
               <Badge :count="AcceptingCloudApplicationFormCount">
                             <a href="#" class="demo-badge"  @click="handleToRequestFormFinished">受理&完成申请单</a>
               </Badge>
               
              
           </div>
           <div>
               <h4>为商户申请品牌认证</h4>
               <div @click="handelToApplyBrandCert">申请品牌认证</div>
             
                   <Badge :count="ApplyingBrandCertificationApplicationFormCount">
                             <a href="##" class="demo-badge" @click="handleToSubmitCertInfo">提交认证资料</a>
                    </Badge>
              
               
                   <Badge :count="InformationSubmittedBrandCertificationApplicationFormCount">
                             <a href="##" class="demo-badge" @click="handleToBrandCert">品牌认证</a>
                    </Badge>
               
               
                   <Badge :count="VerifiedBrandCertificationApplicationFormCount">
                             <a href="##" class="demo-badge" @click="handleToOpenCloudDoc">开通云单据</a>
                    </Badge>
              
               
                   <Badge :count="OpenedCloudOrderBrandCertificationApplicationFormCount">
                             <a href="##" class="demo-badge" @click="handleToOpenCloudPay">开通云支付</a>
                    </Badge>
               
           </div>
           <div>
                    <h4>爱迅、银行配合开通云支付收款账号</h4>
                    <div @click="handleToApplyPayReceipt" >申请云支付收款账号</div>
                    
                   <Badge :count="SettedReceivableAccountApplicationFormCount">
                             <a href="##" class="demo-badge" @click="handleToOrganTrainingInst">安排培训人员</a>
                    </Badge>
               
           </div>
           <div>
                <h4>第三方人员管理</h4>
                    <div @click="handleToBuildBank">建行</div>
                    <div>兴业</div>
                    <div @click="handleToTrainingOrg">广州培训</div>
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
                    //缓存路由
                     handlePushRouter:"home/handlePushRouter",
                     //安排培训人员初始化信息
                     getSettedApplicationForms:"organTrainingInst/getSettedApplicationForms",
                     //获取新建申请单的项目信息
                    //  getInitialAddDatas:"newRequestForm/getInitialAddDatas",
                     //获取品牌认证的项目信息
                    //  applyBrandCertInitialAddDatas:"applyBrandCert/initialAddDatas",
                     //获取提交资料页面的数据信息
                     getApplyingApplicationForms:"submitCertInfo/getApplyingApplicationForms",
                     //获取申请云支付收款账号的初始信息
                    //  getPayReceiptInitialAddDatas:"applyPayReceipt/initialAddDatas",
                     //开通云单据的初始信息
                     getVerifiedBrands:"openCloudDoc/getVerifiedBrands",
                     //开通云支付
                     getOpenedCloudOrderBrands:"openCloudPay/getOpenedCloudOrderBrands",
            }),
            //跳转新建表单
            handleToNewRequestForm($event){
                 var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/newRequestForm",
                                "name":"newRequestForm"
                }
                // this.getInitialAddDatas();
                 this.handlePushRouter(paramRouter);
                 this.$router.push('/newRequestForm');
            },
            //跳转受理&完成申请单
            handleToRequestFormFinished($event){
                  var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/requestFormFinished",
                                "name":"requestFormFinished"
                }
                this. handlePushRouter(paramRouter);
                this.$router.push('/requestFormFinished');
            },
            //建行
            handleToBuildBank($event){
                 var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/buildBank",
                                "name":"buildBank"
                }
                 this. handlePushRouter(paramRouter);
                this.$router.push('/buildBank');
            },
            //广州培训
            handleToTrainingOrg($event){
                var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/trainingOrg",
                                "name":"trainingOrg"
                }
                 this. handlePushRouter(paramRouter);
                this.$router.push('/trainingOrg');
            },
               //跳转到申请品牌认证
            handelToApplyBrandCert($event){
                 var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/applyBrandCert",
                                "name":"applyBrandCert"
                }
                 this. handlePushRouter(paramRouter);
                this.$router.push('/applyBrandCert');
                // this.applyBrandCertInitialAddDatas();
            },
            //提交资料
            handleToSubmitCertInfo($event){
                 var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/submitCertInfo",
                                "name":"submitCertInfo"
                }
                 this. handlePushRouter(paramRouter);
                 this.getApplyingApplicationForms();
                this.$router.push('/submitCertInfo');
            },
            //品牌认证
            handleToBrandCert($event){
                 var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/brandCert",
                                "name":"brandCert"
                }
                 this. handlePushRouter(paramRouter);
                this.$router.push('/brandCert');
            },
            //开通云单据
            handleToOpenCloudDoc($event){
                 var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/openCloudDoc",
                                "name":"openCloudDoc"
                }
                 this. handlePushRouter(paramRouter);
                 this.getVerifiedBrands();
                this.$router.push('/openCloudDoc');
            },
            //开通云支付
            handleToOpenCloudPay($event){
                 var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/openCloudPay",
                                "name":"openCloudPay"
                }
                 this. handlePushRouter(paramRouter);
                 this.getOpenedCloudOrderBrands();
                this.$router.push('/openCloudPay');
            },
            //申请云支付收款账号
            handleToApplyPayReceipt($event){
                  var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/applyPayReceipt",
                                "name":"applyPayReceipt"
                }
                 this. handlePushRouter(paramRouter);
                //  this.getPayReceiptInitialAddDatas();
                this.$router.push('/applyPayReceipt');
            },
            //安排培训人员
            handleToOrganTrainingInst($event){
                this.getSettedApplicationForms();
                 var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/organTrainingInst",
                                "name":"organTrainingInst"
                }
                 this.handlePushRouter(paramRouter);
                this.$router.push('/organTrainingInst');
            }
        },
        created(){
            this.payItemMessage();
        },
        mounted(){
           
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
          float: left;
          font-size: 16px;
          padding: 15px 21px 14px 20px;
          border:1px solid rgba(102,102,102,1);
          border-radius:10px;
          margin-right: 40px;
      }
      .pay-item-r>div>div:hover{
          cursor: pointer;
      }
      .pay-item-r>div .ivu-badge{
          cursor: pointer;
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
          float: left;
          font-size: 14px;
          padding: 11px 15px 10px 14px;
          border:1px solid rgba(102,102,102,1);
          border-radius:7px;
          margin-right: 29px;
      }
      .pay-item-r>div>div:hover{
          cursor: pointer;
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
        color: #333;
    }
}

</style>