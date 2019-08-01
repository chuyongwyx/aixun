<template>
      <div class="Permissions">
        <div class="user-Permissions" v-show="userPermissions">
                  <div class="userAdmin-head">
                     <h2>权限</h2>
                     <div class="addUserAdmin" @click="handleToSetPermission">设置权限</div>
                 </div>
                  <div class="userAdminForm">
                        <table cellpadding="0" cellspacing="0">
                            <tr class="caption">
                            <th>
                                <span>部门</span>
                                <span class="iconfont icon-xiala1"></span>
                            </th>
                            <th>人员名称</th>
                            </tr>
                            <tr v-for="(item,index) in permissionUser"  @click="handleReplacePermissions($event,item)" class="trhover" >
                            <td>{{item.DepartmentName}}</td>
                            <td>{{item.name}}</td>
                            </tr>
                        </table>
                </div>
        </div>


        <!-- 这是设置权限部分 -->
         <div class="setPermissions" v-if="setPermissions">
                <div class="setPermissions-head">
                        <h2>权限</h2>
                </div>
                <div class="setPermissionsFormone">
                      <div class="userSetForm">
                            <div @click="handelBack"><span>返回上一级</span></div>
                            <div><span class="iconfont icon-xiangyou"></span></div>
                            <div><span>{{ModifyDepartmentName}}</span><span>{{ModifyName}}</span></div>
                            <div><button>保存</button></div>

                      </div>
                        <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>报表</td>
                                    <td>可查看所有</td>
                                    <td>强制关闭</td>
                                    <td>修改完成时备注</td>
                                </tr>
                                <tr>
                                    <td>云支付申请跟进总表</td>
                                    <td><span class="iconfont icon-xuanzhong1 icon1"></span></td>
                                    <td><span class="iconfont icon-radio icon"></span></td>
                                    <td><span class="iconfont icon-radio icon"></span></td>
                                </tr>
                                <tr>
                                    <td>品牌认证申请跟进总表</td>
                                    <td><span class="iconfont icon-radio icon"></span></td>
                                    <td><span class="iconfont icon-radio icon"></span></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>品牌总表</td>
                                    <td><span class="iconfont icon-radio icon"></span></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>任务跟进表</td>
                                    <td><span class="iconfont icon-radio icon"></span></td>
                                    <td><span class="iconfont icon-radio icon"></span></td>
                                    <td></td>
                                </tr>
                        </table>
                </div>
                <div class="Bill"><span>单据</span></div>
                <div class="setPermissionsFormtwo">
                    <div class="formTr">
                        <div class="">商户向爱心申请开通云支付:</div>
                        <div class="formselect">
                             <div>
                                    <div><span class="iconfont icon-radio icon"></span></div>
                                    <div>新建申请单</div>
                            </div>
                            <div>
                                   <div><span class="iconfont icon-xuanzhong1 icon1"></span></div>
                                   <div> 受理&完成申请单</div>
                            </div>
                        </div>
                    </div>

                    <div  class="formTr">
                         <div class="">为商户申请品牌认证:</div>
                         <div class="formselect">
                             <div>
                                    <div><span class="iconfont icon-radio icon"></span></div>
                                    <div>申请品牌认证</div>
                             </div>
                             <div>
                                     <div><span class="iconfont icon-radio icon"></span></div>
                                    <div>提交认证资料</div>
                             </div>
                             <div>
                                     <div><span class="iconfont icon-radio icon"></span></div>
                                    <div>品牌认证</div>
                             </div>
                             <div>
                                    <div><span class="iconfont icon-radio icon"></span></div>
                                    <div>开通云单据</div>
                             </div>
                             <div>
                                     <div><span class="iconfont icon-radio icon"></span></div>
                                    <div>开通云单据</div>
                             </div>
                         </div>
                    </div>

                    <div class="formTr">
                            <div>爱迅、银行配合开通云支付收款账号:</div>
                            <div class="formselect">
                                <div>
                                    <div><span class="iconfont icon-radio icon"></span></div>
                                    <div>申请云支付收款账号</div>
                                </div>
                                <div>
                                    <div><span class="iconfont icon-radio icon"></span></div>
                                    <div>安排培训机构</div>
                                </div>
                            </div>
                    </div>

                    <div class="formTr">
                        <div>内部管理:</div>
                            <div class="formselect">
                                <div>
                                    <div><span class="iconfont icon-radio icon"></span></div>
                                    <div>人员</div>
                                </div>
                                <div>
                                    <div><span class="iconfont icon-radio icon"></span></div>
                                    <div>权限</div>
                                </div>
                            </div>

                    </div>
                </div>
            
        </div>
    </div>
</template>
<script>
import Vuex from 'vuex';
export default {
     name:"userPermissions",
     data(){
       return{
          userPermissions:true,
          setPermissions:false,
          ModifyName:"",
          ModifyDepartmentName:"",
          userId:"",
       }
     },
     computed:{
        ...Vuex.mapState({
              permissionUser:state=>state.permissions.permissionUser
        })
     }, 
     methods:{
       ...Vuex.mapActions({
            handleGetUsers:"permissions/handleGetUsers",
            getUserPermissionDatas:"permissions/getUserPermissionDatas",
       }),
       //切换到设置权限
        handleToSetPermission(){
          if(this.userId){
              this.getUserPermissionDatas(this.userId);
              this.userPermissions =false,
              this.setPermissions=true
          }
           
        },
      //切换到权限
        handelBack(){
            this.setPermissions=false,
            this.userPermissions=true
        },
      //选中修改权限的栏
      handleReplacePermissions($event,param){
         this.userId=param.id;
         this.ModifyDepartmentName= param.departmentName
         this.ModifyName=param.name
         console.log(this.userId)
      }
     },
    created(){
      this.handleGetUsers();
    }


    
}
</script>
<style scoped>
@media screen and (min-width: 1400px){
  /* 权限页面 */
.Permissions{
   width: 1400px;
   margin: 0 auto;
}
.user-Permissions{
 
}
.userAdmin-head {
  width: 529px;
  margin-left: 89px;
  margin-top: 75px;
  overflow: hidden;
}
.addUserAdmin:hover{
  cursor: pointer;
}
.userAdmin-head > h2 {
  width: 54px;
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  float: left;
}
.userAdmin-head >.addUserAdmin {
  float: right;
  width: 100px;
  height: 36px;
   background: #E1E1E1;
  color: #fff;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  border-radius: 4px;
}
.addUserAdmin-active{
  background: #5897ff; 
}
.userAdminForm {
 
  margin-left: 89px;
  margin-top: 49px;
}
.userAdminForm > table {
 
  table-layout: fixed;
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
}
.userAdminForm > table > tr > td {
  border-bottom: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  line-height: 42px;
  text-align: left;
  text-indent: 15px;
  font-size: 14px;
  color: #888888;
}

.trhover:hover{
  background:#EDEEEF;
}
.userAdminForm > .caption {
  width:331px;
  height: 42px;
}

.userAdminForm > table th {
  line-height: 42px;
  text-align: left;
  text-indent: 15px;
  font-size: 14px;
  background: rgba(241, 243, 246, 1);
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  color: #888888;
  height: 42px;
  font-weight: normal;
  font-size: 14px;
}
.userAdminForm > table th:nth-of-type(1) {
  width: 151px;
}
.userAdminForm > table th:nth-of-type(2) {
  width: 180px;
}
.userAdminForm > table th > span:nth-of-type(2) {
  float: right;
  font-size: 18px;
  line-height: 42px;
  margin-right: 14px;
}
.userAdminForm > table > tr > td:nth-of-type(1) {
  width: 150px;
}
.userAdminForm > table > tr > td:nth-of-type(2) {
  width: 180px;
}
/* 设置权限页面 */
.setPermissions{
    width:1400px;
    margin: 0 auto;
}
.setPermissions-head {
  width: 529px;
  margin-left: 89px;
  margin-top: 75px;
  overflow: hidden;
}

.setPermissions-head > h2 {
  width: 54px;
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  float: left;
}
.setPermissions-head > div {
  float: right;
  width: 100px;
  height: 36px;
   background: #E1E1E1;
  color: #fff;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  border-radius: 4px;
}
.userSetForm{
   overflow: hidden;
   margin-top:15px;
   margin-bottom: 12px;
}
.userSetForm>div{
  float:left;
  font-size: 14px;
  line-height: 32px;
}
.userSetForm>div:nth-of-type(1){
  color: #5897FF;
}
.userSetForm>div:nth-of-type(2)>span{
  font-size: 12px;
  margin: 0 5px;
}
.userSetForm>div:nth-of-type(3)>span{
    color:#666666; 
}
.userSetForm>div:nth-of-type(3)>span:nth-of-type(1){
  margin-right: 5px;
}
.userSetForm>div:nth-of-type(4){
  margin-left:306px;
  width: 88px;
  height: 32px;
}
.userSetForm>div:nth-of-type(4)>button{
  width: 88px;
  height: 32px;
  background: #5897FF;
  border: 0;
  outline: none;
  color: #fff;
  border-radius: 4px;
}
.setPermissionsFormone {
 
  margin-left: 89px;
  /* margin-top: 49px; */
}
.setPermissionsFormone > table {
 
  table-layout: fixed;
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
}
.setPermissionsFormone > table > tr > td {
  border-bottom: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  line-height: 42px;
  text-align: left;
  text-indent: 15px;
  font-size: 14px;
  color: #888888;
}

.setPermissionsFormone > table tr>td:nth-of-type(1) {
  width: 200px;
}
.setPermissionsFormone > table tr>td:nth-of-type(2) {
  width: 110px;
}
.setPermissionsFormone > table tr>td:nth-of-type(3){
    width: 100px;
}
.setPermissionsFormone > table tr>td:nth-of-type(4){
    width: 150px;
}

.setPermissionsFormone>table tr:nth-of-type(1)>td{
    background:#F1F3F6;
}

.icon{
    
        font-size:20px;
        color:#5897FF;
    }
.icon1{
        font-size:18px;
        color: #5897FF;
        margin-left: -3px;
}

.setPermissionsFormone>table tr>td>img{
        display: block;
        width:20px;
        height: 20px;
        margin-left: 15px;
}
.Bill{
        margin-top: 52px;
        padding-left: 110px;
        margin-bottom: 12px;    
        font-size: 14px;
}
.setPermissionsFormtwo{
        width: 760px;
        border: 1px solid #E7E7E7;
        margin-left: 90px;
        font-size: 14px;
        box-sizing: border-box;
        padding-left: 29px;
}
.setPermissionsFormtwo >.formTr{
        margin-top: 25px;
}
.formselect{
    overflow: hidden;
}
.formselect>div{
   float: left;
   margin-right: 40px;
}
.formselect>div>div{
    float: left;
    line-height: 20px;
    margin-top: 15px;
    margin-right: 10px;
    
}
}
@media screen  and (max-width:1400px) {
  .user-Permissions{
  width: 1024px;
  margin: 0 auto;
}
.userAdmin-head {
  width: 386px;
  margin-left: 65px;
  margin-top: 55px;
  overflow: hidden;
}
.addUserAdmin:hover{
  cursor: pointer;
}
.userAdmin-head > h2 {
  width: 39px;
  font-size: 19px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  float: left;
}
.userAdmin-head > .addUserAdmin {
  float: right;
  width: 73px;
  height: 26px;
  background: #E1E1E1;
  color: #fff;
  line-height: 26px;
  text-align: center;
  font-size: 12px;
  border-radius: 4px;
}
.trhover:hover{
  background:#EDEEEF;
}
.addUserAdmin-active{
  background: #5897ff; 
}
.userAdminForm {
 
  margin-left: 65px;
  margin-top: 35px;
}
.userAdminForm > table {
 
  table-layout: fixed;
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
}
.userAdminForm > table > tr > td {
  border-bottom: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  line-height: 30px;
  text-align: left;
  text-indent: 15px;
  font-size: 14px;
  color: #888888;
}
.userAdminForm > .caption {
  width: 241px;
  height: 30px;
}

.userAdminForm > table th {
  line-height: 30px;
  text-align: left;
  text-indent: 15px;
  font-size: 12px;
  background: rgba(241, 243, 246, 1);
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  color: #888888;
  height: 30px;
  font-weight: normal;
  font-size: 12px;
}
.userAdminForm > table th:nth-of-type(1) {
  width: 110px;
}
.userAdminForm > table th:nth-of-type(2) {
  width: 131px;
}
.userAdminForm > table th > span:nth-of-type(2) {
  float: right;
  font-size: 14px;
  line-height: 30px;
  margin-right: 10px;
}
.userAdminForm > table > tr > td:nth-of-type(1) {
  width: 109px;
}
.userAdminForm > table > tr > td:nth-of-type(2) {
  width: 131px;
}
/* 设置权限页面 */
.setPermissions{
    width:1024px;
    margin: 0 auto;
}
.setPermissions-head {
  width: 386px;
  margin-left: 65px;
  margin-top: 35px;
  overflow: hidden;
}

.setPermissions-head > h2 {
  width: 39px;
  font-size: 19px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  float: left;
}
.setPermissions-head > div {
  float: right;
  width: 73px;
  height: 26px;
  background: #5897ff;
  color: #fff;
  line-height: 26px;
  text-align: center;
  font-size: 12px;
  border-radius: 4px;
}
/* 111 */
.userSetForm{
   overflow: hidden;
   margin-top:11px;
   margin-bottom: 9px;
}
.userSetForm>div{
  float:left;
  font-size: 12px;
  line-height: 23px;
}
.userSetForm>div:nth-of-type(1){
  color: #5897FF;
}
.userSetForm>div:nth-of-type(2)>span{
  font-size: 12px;
  margin: 0 4px;
}
.userSetForm>div:nth-of-type(3)>span{
    color:#666666; 
}
.userSetForm>div:nth-of-type(3)>span:nth-of-type(1){
  margin-right: 4px;
}
.userSetForm>div:nth-of-type(4){
  margin-left:200px;
  width: 64px;
  height: 23px;
}
.userSetForm>div:nth-of-type(4)>button{
  width: 64px;
  height: 23px;
  background: #5897FF;
  border: 0;
  outline: none;
  color: #fff;
  border-radius: 4px;
}

.setPermissionsFormone {
 
  margin-left: 65px;
  margin-top: 35px;
}
.setPermissionsFormone > table {
 
  table-layout: fixed;
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
}
.setPermissionsFormone > table > tr > td {
  border-bottom: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  line-height: 30px;
  text-align: left;
  text-indent: 15px;
  font-size: 12px;
  color: #888888;
}

.setPermissionsFormone > table tr>td:nth-of-type(1) {
  width: 146px;
}
.setPermissionsFormone > table tr>td:nth-of-type(2) {
  width: 80px;
}
.setPermissionsFormone > table tr>td:nth-of-type(3){
    width: 73px;
}
.setPermissionsFormone > table tr>td:nth-of-type(4){
    width: 109px;
}

.setPermissionsFormone>table tr:nth-of-type(1)>td{
    background:#F1F3F6;
}

.icon{
    
        font-size:20px;
        color:#5897FF;
    }
.icon1{
        font-size:18px;
        color: #5897FF;
        margin-left: -3px;
}
.setPermissionsFormone>table tr>td>img{
        display: block;
        width:15px;
        height:15px;
        margin-left: 15px;
}
.Bill{
        margin-top: 38px;
        padding-left: 80px;
        margin-bottom: 12px;    
        font-size: 12px;
}
.setPermissionsFormtwo{
        width: 554px;
        border: 1px solid #E7E7E7;
        margin-left: 66px;
        font-size: 12px;
        box-sizing: border-box;
        padding-left: 21px;
}
.setPermissionsFormtwo >.formTr{
        margin-top: 18px;
}
.formselect{
    overflow: hidden;
}
.formselect>div{
   float: left;
   margin-right: 29px;
}
.formselect>div>div{
    float: left;
    line-height: 15px;
    margin-top: 11px;
    margin-right: 7px;
    
}
}
</style>
