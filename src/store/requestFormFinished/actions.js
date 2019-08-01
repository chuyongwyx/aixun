import  {getRequestForms,acceptCloudApplicationForm,GetProjectSituationByNumber,cancelAcceptCloudApplicationForm,FinishCloudApplicationForm,GetRefferenceApplicationForms}from "../../apis/requestFormFinished"
export default{
    //获取申请单
    async  handleGetRequestForms({commit,state},param){
        var dataList = await getRequestForms(param);
        commit("handleGetRequestForms",dataList);
    },

    //受理申请单
    async handleToAcceptRequestForms({commit,state},param){
        var index = param.index;
        var send = JSON.stringify({
            "id":param.id
        })
       var datainfo = await acceptCloudApplicationForm(send);
       state.dataList.splice(index,1,datainfo.result);
    },
    //获取项目情况
    async getProjectSituationByNumber({commit,state},param){
        var dataList =await GetProjectSituationByNumber(param);
        commit("GetProjectSituationByNumber", dataList)
    },
    //取消受理受理申请单

    async CancelAcceptCloudApplicationForm({commit,state},param){
        var index = param.index;
        var send = JSON.stringify({
            "id":param.id
        })
        var datainfo  = await cancelAcceptCloudApplicationForm(send);
        state.dataList.splice(index,1,datainfo.result);
    },
    //引用申请单
    async getRefferenceApplicationForms({commit,state},param){
        var dataList = await  GetRefferenceApplicationForms(param);
        state.importForms = dataList.result;

    },
    //完成申请单
    async  finishCloudApplicationForm({commit,state},param){
        var index = param.index;
        var send = JSON.stringify({
            "id":param.id,
            "Remark":param.remark,
        })
        var datainfo  = await FinishCloudApplicationForm(send);
        state.dataList.splice(index,1,datainfo.result);
    }

}