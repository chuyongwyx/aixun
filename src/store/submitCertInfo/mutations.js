export default{
    //获取申请中的申请单
    handleDataList(state,param){
         state.getApplyingApplicationForms= param.result
         console.log(state.getApplyingApplicationForms);
    }
}