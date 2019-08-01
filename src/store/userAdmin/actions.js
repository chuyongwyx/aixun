import {userAdminInfo,getUserById, addUserInfo,replaceUser,deleteUser,ResetPassword} from '../../apis/userAdmin.js';

export default{
        //获取内部用户
        async getUserAdmininfo({commit,state}){
            let userAdmin = await userAdminInfo();
            commit("getUserAdmininfo",userAdmin)
        },
        //根据Id获取单个用户
        async getUserByIdInfo({commit,state},params){
            let userByIdData = await getUserById(params);
            commit("getUserByIdInfo",userByIdData)
        },
        //添加内部人员
        async handleAddUserInfo({commit,state},params){
            let addData = await addUserInfo(params);
            if(addData.result){
                state.userAdminInfo.push(addData.result);
            }
        },
        //修改内部人员新
        async replaceUserInfo({commit,state},params){
            let userReplace = await  replaceUser(params)
        },
        //删除内部人员
        async handleDeleteUser({commit,state},params){
            let userDelete = await deleteUser(params);
            if(userDelete.success){
                state.userAdminInfo.map((item,index)=>{
                     if(item.id === params){
                        state.userAdminInfo.splice(index,1)
                     }
                })
            }
        },
      //重置密码
      async resetPsw({commit,state},param){
            let dataInfo = await ResetPassword(param);
            if(dataInfo.success){
                alert('重置成功');
            }
      }
    
        

      
}
