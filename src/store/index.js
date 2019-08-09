import Vue from "vue";
import Vuex from "vuex";
//银行负责人
import buildBankManager from "./buildBankManager";
//广州培训负责人处理人信息
import trainingOrg  from './traningOrg';
//新建申请单
import  newRequestForm from "./newRequestForm";
//受理完成仓库
import requestFormFinished from "./requestFormFinished";
//申请品牌认证
import applyBrandCert  from  "./applyBrandCert";
//提交认证资料
import submitCertInfo from "./submitCertInfo";
//品牌认证
import  brandCert from "./brandCert";
//开通云单据
import  openCloudDoc from "./openCloudDoc";
//开通云支付
import  openCloudPay from "./openCloudPay";
//申请云支付收款账号
import  applyPayReceipt from "./applyPayReceipt";
//获取登录二维码
import loginWxEr from './login';
//云支付项目中的消息
import payItem from './payItem';
//路由组件的缓存操作
import home from './home';
//安排培训机构
import organTrainingInst from "./organTrainingInst";
//人员
import userAdmin from './userAdmin';
//员工权限
import  permissions from './permissions';
//云支付申请跟进总表
import summaryCloudPayment from './summaryCloudPayment';
//申请品牌认证总表
import generalApplicationBrandCert from "./generalApplicationBrandCert";
//项目品牌总表
import summaryBrands from "./summaryBrands"
//云支付收款账号跟进总表
import taskSummaryStatem from "./taskSummaryStatem";
Vue.use(Vuex);

let state = {};
let actions = {};
let getters = {};
let mutations = {};


const store = new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    modules:{
        buildBankManager,
        userAdmin,
        loginWxEr,
        payItem,
        home,
        organTrainingInst,
        trainingOrg,
        permissions,
        newRequestForm,
        requestFormFinished,
        applyBrandCert,
        submitCertInfo,
        brandCert,
        applyPayReceipt,
        openCloudDoc,
        openCloudPay,
        summaryCloudPayment,
        generalApplicationBrandCert,
        taskSummaryStatem, 
        summaryBrands
    }
})

export default store;