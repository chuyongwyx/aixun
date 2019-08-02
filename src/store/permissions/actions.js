import {GetUsers,GetUserPermissionDatas,ModifyUserPermission} from '../../apis/permissions';
export default{
        //获取权限用户
        async   handleGetUsers({commit,state}){
                var data = await GetUsers();
                console.log(data);
                commit("handleUsersData",data);
        },
       //获取用户权限数据
       async getUserPermissionDatas({commit,state},param){
              var dataList = await GetUserPermissionDatas(param)
             commit("handleGetUserPermissionDatas",dataList)
       },
       //修改用户权限
       async modifyUserPermission({commit,state},param){
             var dataInfo = await ModifyUserPermission(param)  
       }
} 