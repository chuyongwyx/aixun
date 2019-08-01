export default{
    //获取人员信息
    getUserAdmininfo(state,params){
        state.userAdminInfo = params.result;
    },
    //获取单个用户信息
    getUserByIdInfo(state,params){
        state.UserInfoById=params.result;
    }
}