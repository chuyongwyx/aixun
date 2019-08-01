export default{
        //获取已提交资料的申请单
        handleData(state,param){
            state.getInformationSubmittedApplicationForms =param.result
        }
}