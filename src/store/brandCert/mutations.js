export default{
        //获取已提交资料的申请单
        handleData(state,param){
            state.getInformationSubmittedApplicationForms =param.result
        },
        //根据Id获取已提交资料的申请单信息
        handleToIdDataList(state,param){
            console.log(param);
             state.getInformationSubmitteIdList = param.result
        }
}