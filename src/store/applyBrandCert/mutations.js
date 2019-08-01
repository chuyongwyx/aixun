export default{
    //获取申请品牌认证项目信息
    handleInitialAddDatas(state,param){
        state.InitialAddDatas = param.result.projects;
    }
}