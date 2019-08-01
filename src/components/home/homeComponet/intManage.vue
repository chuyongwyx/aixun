<template>
        <div class="intManage-r">
                <div @click="handleToUserAdmin">人员</div>
                <div @click="handleToSetPermissions">权限</div>
        </div>
</template>
<script>
import Vuex from 'vuex';
export default {
       
        data(){
                return{

                }
        },
        methods:{
                ...Vuex.mapActions({
                        //获取内部人员
                        getUserAdmin: 'userAdmin/getUserAdmininfo',
                        handlePushRouter:"home/handlePushRouter",
                        //获取权限中的人员
                        handlePremissionGetUsers:"permissions/handleGetUsers"
                }),
                handleToUserAdmin($event){
                        var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/userAdmin",
                                "name":"userAdmin"
                        }
                        this.handlePushRouter(paramRouter);
                        this.getUserAdmin();
                        this.$router.push("/userAdmin");
                },
                  //跳转到设置权限页面
                handleToSetPermissions($event){
                         var paramRouter ={
                                "text":$event.target.innerText,
                                "path":"/userPermissions",
                                "name":"userPermissions"
                        }
                        this.handlePremissionGetUsers();
                        this.handlePushRouter(paramRouter);
                        this.$router.push("/userPermissions");
                }
        }

}
</script>

<style lang="" scoped>
@media screen and (min-width: 1400px) {
.intManage-r{
            margin-left: 74px;      
    }
    .intManage-r>div{
            margin-top: 28px;
            margin-right: 30px;
            float: left;
            padding: 14px 31px;
            border:1px solid rgba(102,102,102,1);
           border-radius:10px;
           font-size: 16px;
    }
.intManage-r>div:hover{
        cursor: pointer;
}   
}

@media screen  and (max-width: 1400px){
 .intManage-r{
            margin-left: 54px;
            
    }
    .intManage-r>div{
            margin-top: 20px;
            margin-right: 21px;
            float: left;
            padding: 10px 22px;
            border:1px solid rgba(102,102,102,1);
           border-radius:7px;
           font-size: 13px;
    }
.intManage-r>div:hover{
        cursor: pointer;
}
}
   
</style>