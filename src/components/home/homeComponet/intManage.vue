<template>
        <div class="intManage-r">
                <div ><a href="http://is-test.aserweb.com:50101/#/userAdmin" target="_blank">人员</a></div>
                <div><a href="http://is-test.aserweb.com:50101/#/userPermissions" target="_blank">权限</a></div>
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
                        //获取权限中的人员
                        handlePremissionGetUsers:"permissions/handleGetUsers"
                }),
              
        },
     created() {
          
     },

}
</script>

<style lang="" scoped>
@media screen and (min-width: 1400px) {
.intManage-r{
            margin-left: 74px;      
    }
    .intManage-r>div a{
            margin-top: 28px;
            margin-right: 30px;
            display:block;
           float: left;
          font-size: 16px;
          padding: 15px 21px 14px 20px;
          border:1px solid rgba(102,102,102,1);
          border-radius:10px;
          margin-right: 40px;
          color: #333;
    }
.intManage-r>div a:hover{
        cursor: pointer;
        color: #5897FF;
        border: 1px solid #5897FF;
}   
}

@media screen  and (max-width: 1400px){
 .intManage-r{
            margin-left: 54px;
            
    }
    .intManage-r>div a{
             display:block;
            margin-top: 20px;
            margin-right: 21px;
            float: left;
            padding: 10px 22px;
            border:1px solid rgba(102,102,102,1);
           border-radius:7px;
           font-size: 13px;
           color: #333;
    }
.intManage-r>div a:hover{
        cursor: pointer;
        color: #5897FF;
        border:1px solid #5897FF;
}
}
   
</style>