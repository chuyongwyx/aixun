export default{
    handleToDataList(state,param){
            state.dataList = param.result;
    },

    //培训机构名称
    handleTrainingNames(state,param){
        state.traningKinds = param.result.trainingInstitutions;
    }
}