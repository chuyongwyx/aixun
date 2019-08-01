import {InitialAddDatas,AddApplicationForm,GetSettedApplicationForms} from "../../apis/applyPayReceipt"
export default{
    //初始化云单据收款账号申请单-1.1初始化新建数据
    async initialAddDatas({commit,state}){
        var dataList = await InitialAddDatas();
        commit("handleDataList",dataList)
    },
    //新建申请单
    async addApplicationForm({commit,state},param){
        var dataInfo = await AddApplicationForm(param)
    } 
}