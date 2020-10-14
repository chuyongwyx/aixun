export default{
    //获取取内部所有用户
    handleUsersData(state,data){
        state.permissionUser = data.result;
    },
    //获取他的全部权限
    handleGetUserPermissionDatas(state,param){
        //拥有的权限
        var haveuserPermissions = param.result.userPermissions;
        //遍历它如在对应的对象中找到他
        haveuserPermissions.map((item,index)=>{
            if(state.permissAllow[item]===false){
                state.permissAllow[item]=true
            }
        })
    }
}  