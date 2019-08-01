export default{
    //获取申请单
    handleGetRequestForms(state,param){
        state.count = param.result.totalCount 
        state.dataList =param.result.items
    },
    //获取项目情况
    GetProjectSituationByNumber(state,param){
        state.projectSituation =param.result;
    }
}