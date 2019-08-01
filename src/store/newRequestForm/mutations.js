export default{
    //获取初始化项目新建信息
    handleGetInitialAddDatas(state,param){
            state.projects = param.result.projects;
    }
}