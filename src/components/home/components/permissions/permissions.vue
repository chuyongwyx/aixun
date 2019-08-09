<template>
      <div class="Permissions">
        <div class="user-Permissions" v-show="userPermissions">
                  <div class="userAdmin-head">
                     <h2>权限</h2>
                     <div class="addUserAdmin" @click="handleToSetPermission" :class="[{'disable':userId==''},{'addUserAdminActive':userId !=''}]">设置权限</div>
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
                            <tr v-for="(item,index) in permissionUser"  @click="handleReplacePermissions($event,item)"  class="trhover" >
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
                            <div @click="handelBack"><span class="goback">返回上一级</span></div>
                            <div><span class="iconfont icon-xiangyou"></span></div>
                            <div><span>{{ModifyDepartmentName}}</span><span>{{ModifyName}}</span></div>
                            <div><button @click="handlePermission">保存</button></div>

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
                                    <td @click="handleInquiryCloudApplicationFormSummaryStatement"  id="CloudPayInquiryCloudApplicationFormSummaryStatementInquiry">
                                        <!-- 可查看所有 -->
                                            <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['CloudPayInquiry.CloudApplicationFormSummaryStatement.Inquiry']"></span>
                                            <span class="iconfont icon-radio icon" v-else></span>
                                    </td>
                                    <td @click="handleCloseCloudApplicationFormSummaryStatement" id="CloudPayInquiryCloudApplicationFormSummaryStatementClose">
                                      <!-- 关闭 -->
                                      <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['CloudPayInquiry.CloudApplicationFormSummaryStatement.Close']"></span>
                                      <span class="iconfont icon-radio icon" v-else></span>
                                      
                                    </td>
                                    <td @click="handleModifyRemarkCloudApplicationFormSummaryStatement" id="CloudPayInquiryCloudApplicationFormSummaryStatementModifyRemark">
                                      <!-- 备注  -->
                                      <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['CloudPayInquiry.CloudApplicationFormSummaryStatement.ModifyRemark']"></span>
                                      <span class="iconfont icon-radio icon" v-else></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>品牌认证申请跟进总表</td>
                                    <td @click="handleInquiryBrandCertificationApplicationFormSummaryStatement" id="CloudPayInquiryBrandCertificationApplicationFormSummaryStatementInquiry"> 
                                      <!-- 查看 -->
                                      <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['CloudPayInquiry.BrandCertificationApplicationFormSummaryStatement.Inquiry']"></span>
                                      <span class="iconfont icon-radio icon" v-else></span>
                                    </td>
                                    <td @click="handleCloseBrandCertificationApplicationFormSummaryStatement" id="CloudPayInquiryBrandCertificationApplicationFormSummaryStatementClose">
                                      <!-- 关闭 -->
                                      <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['CloudPayInquiry.BrandCertificationApplicationFormSummaryStatement.Close']"></span>
                                      <span class="iconfont icon-radio icon" v-else></span>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>品牌总表</td>
                                    <td @click="handleInquiryProjectBrandSummaryStatement" id="CloudPayInquiryProjectBrandSummaryStatementInquiry">
                                      <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['CloudPayInquiry.ProjectBrandSummaryStatement.Inquiry']"></span>
                                      <span class="iconfont icon-radio icon" v-else></span>
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>任务跟进表</td>
                                    <td @click="handleInquiryReceivableAccountApplicationFormSummaryStatement" id="CloudPayInquiryReceivableAccountApplicationFormSummaryStatementInquiry">
                                      <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['CloudPayInquiry.ReceivableAccountApplicationFormSummaryStatement.Inquiry']"></span>
                                      <span class="iconfont icon-radio icon" v-else></span>
                                    </td>
                                    <td @click="handleCloseReceivableAccountApplicationFormSummaryStatement" id="CloudPayInquiryReceivableAccountApplicationFormSummaryStatementClose">  
                                      <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['CloudPayInquiry.ReceivableAccountApplicationFormSummaryStatement.Close']"></span>
                                      <span class="iconfont icon-radio icon" v-else></span>
                                    </td>
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
                                    <div @click="handleCreateCloudApplicationForm" id="CloudApplicationFormCreate">
                                      <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['CloudPay.CloudApplicationForm.Create']"></span>
                                      <span class="iconfont icon-radio icon" v-else></span>
                                    </div>
                                    <div>新建申请单</div>
                            </div>
                            <div>
                                   <div @click="handleAcceptAndFinishCloudApplicationForm" id="CloudApplicationFormAcceptAndFinish">
                                      <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['CloudPay.CloudApplicationForm.AcceptAndFinish']"></span>
                                       <span class="iconfont icon-radio icon" v-else></span>
                                   </div>
                                   <div> 受理&完成申请单</div>
                            </div>
                        </div>
                    </div>

                    <div  class="formTr">
                         <div class="">为商户申请品牌认证:</div>
                         <div class="formselect">
                             <div>
                                    <div @click="handleCreateBrandCertificationApplicationForm" id="BrandCertificationApplicationFormCreate">
                                        <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['CloudPay.BrandCertificationApplicationForm.Create']"></span>
                                        <span class="iconfont icon-radio icon" v-else></span>
                                    </div>
                                    <div>申请品牌认证</div>
                             </div>
                             <div>
                                    <div @click="handleUploadBrandCertificationApplicationForm" id="BrandCertificationApplicationFormUpload">
                                       <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['CloudPay.BrandCertificationApplicationForm.Upload']"></span>
                                       <span class="iconfont icon-radio icon" v-else></span>
                                    </div>
                                    <div>提交认证资料</div>
                             </div>
                             <div>
                                    <div @click="handleVerifyBrandCertificationApplicationForm" id="BrandCertificationApplicationFormVerify">
                                        <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['CloudPay.BrandCertificationApplicationForm.Verify']"></span>
                                        <span class="iconfont icon-radio icon" v-else></span>
                                    </div>
                                    <div>品牌认证</div>
                             </div>
                             <div>
                                    <div @click="handleOpenOrderBrandCertificationApplicationForm" id="BrandCertificationApplicationFormOpenOrder">
                                        <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['CloudPay.BrandCertificationApplicationForm.OpenOrder']"></span>
                                        <span class="iconfont icon-radio icon" v-else></span>
                                    </div>
                                    <div>开通云单据</div>
                             </div>
                             <div>
                                     <div @click="handleOpenPayBrandCertificationApplicationForm" id="BrandCertificationApplicationFormOpenPay">
                                        <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['CloudPay.BrandCertificationApplicationForm.OpenPay']"></span>
                                       <span class="iconfont icon-radio icon" v-else></span>
                                     </div>
                                    <div>开通云支付</div>
                             </div>
                         </div>
                    </div>

                    <div class="formTr">
                            <div>爱迅、银行配合开通云支付收款账号:</div>
                            <div class="formselect">
                                <div>
                                    <div @click="handleCreateApplicationFormFollowUp" id="ApplicationFormFollowUpCreate">
                                       <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['CloudPay.ApplicationFormFollowUp.Create']"></span>
                                      <span class="iconfont icon-radio icon" v-else></span>
                                    </div>
                                    <div>申请云支付收款账号</div>
                                </div>
                                <div>
                                    <div @click="handleArrangeTrainingInstitution" id="ApplicationFormFollowUpArrangeTrainingInstitution">
                                        <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['CloudPay.ApplicationFormFollowUp.ArrangeTrainingInstitution']"></span>
                                        <span class="iconfont icon-radio icon" v-else></span>
                                    </div>
                                    <div>安排培训机构</div>
                                </div>
                            </div>
                    </div>

                    <div class="formTr">
                        <div>内部管理:</div>
                            <div class="formselect">
                                <div>
                                    <div @click="handleUsersSystemSetting" id="SystemSettingUsers">
                                        <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['SystemSetting.Users']"></span>
                                        <span class="iconfont icon-radio icon" v-else></span>
                                    </div>
                                    <div>人员</div>
                                </div>
                                <div>
                                    <div @click="handlePermissionsSystemSetting" id="SystemSettingPermissions">
                                        <span class="iconfont icon-xuanzhong1 icon1" v-if="permissAllow['SystemSetting.Permissions']"></span>
                                        <span class="iconfont icon-radio icon" v-else></span>
                                    </div>
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
              permissionUser:state=>state.permissions.permissionUser,
              permissAllow:state=>state.permissions.permissAllow
        })
     }, 
     methods:{
       ...Vuex.mapActions({
            handleGetUsers:"permissions/handleGetUsers",
            //获取用户权限
            getUserPermissionDatas:"permissions/getUserPermissionDatas",
            //设置用户权限
            modifyUserPermission:"permissions/modifyUserPermission"
       }),
       //切换到设置权限
        handleToSetPermission($event){
          
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
         var trs = document.getElementsByClassName('trhover');
          var len = trs.length;
          for(var i=0;i<len;i++){
             trs[i].style.background=''
          }
          $event.target.parentNode.style.background ='#EDEEEF';
         this.userId=param.id;
         this.ModifyDepartmentName= param.departmentName
         this.ModifyName=param.name
      },
      //选择权限操作
      handleSelectIcon($event){
           if($event.target.className.indexOf('icon1')!==-1){
              //现在是有权限,让他没有权限
              $event.target.classList.remove('icon1');
              $event.target.classList.remove('icon-xuanzhong1');
              $event.target.classList.add('icon');
              $event.target.classList.add('icon-radio');

          }else{
              $event.target.classList.remove('icon');
              $event.target.classList.remove('icon-radio');
              $event.target.classList.add('icon1');
              $event.target.classList.add('icon-xuanzhong1');
          }
      },
      //云支付申请跟进总表
      //查看权限
      handleInquiryCloudApplicationFormSummaryStatement($event){
           this.handleSelectIcon($event)
      },
      //关闭
      handleCloseCloudApplicationFormSummaryStatement($event){
           this.handleSelectIcon($event)
      },
      //备注修改
      handleModifyRemarkCloudApplicationFormSummaryStatement($event){
          this.handleSelectIcon($event)
      },
      //品牌认证申请总表
      //查看
      handleInquiryBrandCertificationApplicationFormSummaryStatement($event){
          this.handleSelectIcon($event) 
      },
      //关闭
      handleCloseBrandCertificationApplicationFormSummaryStatement($event){
           this.handleSelectIcon($event) 
      },

      //品牌总表
    handleInquiryProjectBrandSummaryStatement($event){
           this.handleSelectIcon($event) 
    },

    //任务跟进总表
    //查看
    handleInquiryReceivableAccountApplicationFormSummaryStatement($event){
        this.handleSelectIcon($event) 
    },
    handleCloseReceivableAccountApplicationFormSummaryStatement($event){
         this.handleSelectIcon($event) 
    },
    //新建申请单
     handleCreateCloudApplicationForm($event){
            this.handleSelectIcon($event)
      },
    //受理完成
    handleAcceptAndFinishCloudApplicationForm($event){
          this.handleSelectIcon($event)
    },
    //申请品牌认证
    handleCreateBrandCertificationApplicationForm($event){
        this.handleSelectIcon($event)
    },
    //提交认证资料
    handleUploadBrandCertificationApplicationForm($event){
         this.handleSelectIcon($event)
    },
    //品牌认证
    handleVerifyBrandCertificationApplicationForm($event){
         this.handleSelectIcon($event)
    },
    //开通云单据
    handleOpenOrderBrandCertificationApplicationForm($event){
        this.handleSelectIcon($event)
    },
    //开通云支付 
    handleOpenPayBrandCertificationApplicationForm($event){
      this.handleSelectIcon($event)
    },
    //申请云支付收款账号
    handleCreateApplicationFormFollowUp($event){
     this.handleSelectIcon($event)
    },
    //安排培训机构
    handleArrangeTrainingInstitution($event){
      this.handleSelectIcon($event)
    },
    //人员
    handleUsersSystemSetting($event){
      this.handleSelectIcon($event)
    },
    //权限
    handlePermissionsSystemSetting($event){
     this.handleSelectIcon($event)
    },

    //最后保存操作
    handlePermission(){
      //查看每个块中的权限
      //设置权限
      var permissArray =[];
      //云支付申请跟进总表
      var CloudPayInquiryCloudApplicationFormSummaryStatementInquiry =document.getElementById('CloudPayInquiryCloudApplicationFormSummaryStatementInquiry');
      if(CloudPayInquiryCloudApplicationFormSummaryStatementInquiry.children[0].className.indexOf('icon-radio')===-1){
           permissArray.push('CloudPayInquiry.CloudApplicationFormSummaryStatement.Inquiry');
      }

      var CloudPayInquiryCloudApplicationFormSummaryStatementClose = document.getElementById('CloudPayInquiryCloudApplicationFormSummaryStatementClose');
      if(CloudPayInquiryCloudApplicationFormSummaryStatementClose.children[0].className.indexOf('icon-radio')===-1){
           permissArray.push('CloudPayInquiry.CloudApplicationFormSummaryStatement.Close');
      }

      var CloudPayInquiryCloudApplicationFormSummaryStatementModifyRemark= document.getElementById('CloudPayInquiryCloudApplicationFormSummaryStatementModifyRemark');
      if(CloudPayInquiryCloudApplicationFormSummaryStatementModifyRemark.children[0].className.indexOf('icon-radio')===-1){
          permissArray.push('CloudPayInquiry.CloudApplicationFormSummaryStatement.ModifyRemark');
      }

    //品牌认证申请跟进总表
      var CloudPayInquiryBrandCertificationApplicationFormSummaryStatementInquiry = document.getElementById('CloudPayInquiryBrandCertificationApplicationFormSummaryStatementInquiry');
      if(CloudPayInquiryBrandCertificationApplicationFormSummaryStatementInquiry.children[0].className.indexOf('icon-radio')===-1){
         permissArray.push('CloudPayInquiry.BrandCertificationApplicationFormSummaryStatement.Inquiry');
      }

      var CloudPayInquiryBrandCertificationApplicationFormSummaryStatementClose = document.getElementById('CloudPayInquiryBrandCertificationApplicationFormSummaryStatementClose');
      if(CloudPayInquiryBrandCertificationApplicationFormSummaryStatementClose.children[0].className.indexOf('icon-radio')===-1){
           permissArray.push('CloudPayInquiry.BrandCertificationApplicationFormSummaryStatement.Close');

      }

    //品牌总表
    var CloudPayInquiryProjectBrandSummaryStatementInquiry = document.getElementById('CloudPayInquiryProjectBrandSummaryStatementInquiry');
    if(CloudPayInquiryProjectBrandSummaryStatementInquiry.children[0].className.indexOf('icon-radio')===-1){
        permissArray.push('CloudPayInquiry.ProjectBrandSummaryStatement.Inquiry');
    }
    //任务跟进表
    var CloudPayInquiryReceivableAccountApplicationFormSummaryStatementInquiry = document.getElementById('CloudPayInquiryReceivableAccountApplicationFormSummaryStatementInquiry');
    if(CloudPayInquiryReceivableAccountApplicationFormSummaryStatementInquiry.children[0].className.indexOf('icon-radio')===-1){
       permissArray.push('CloudPayInquiry.ReceivableAccountApplicationFormSummaryStatement.Inquiry');
    }

    var CloudPayInquiryReceivableAccountApplicationFormSummaryStatementClose =document.getElementById('CloudPayInquiryReceivableAccountApplicationFormSummaryStatementClose');
    if(CloudPayInquiryReceivableAccountApplicationFormSummaryStatementClose.children[0].className.indexOf('icon-radio')===-1){
         permissArray.push('CloudPayInquiry.ReceivableAccountApplicationFormSummaryStatement.Close');
    }
      
    //新建申请单id
      var CloudApplicationFormCreate= document.getElementById('CloudApplicationFormCreate');
         if(CloudApplicationFormCreate.children[0].className.indexOf('icon-radio')===-1){
              permissArray.push('CloudPay.CloudApplicationForm.Create');
        }
      //受理完成申请单id
      var CloudApplicationFormAcceptAndFinish= document.getElementById('CloudApplicationFormAcceptAndFinish');
       if(CloudApplicationFormAcceptAndFinish.children[0].className.indexOf('icon-radio')===-1){
            
             permissArray.push('CloudPay.CloudApplicationForm.AcceptAndFinish')
        }
        //申请品牌认证
      var BrandCertificationApplicationFormCreate= document.getElementById('BrandCertificationApplicationFormCreate');
       if(BrandCertificationApplicationFormCreate.children[0].className.indexOf('icon-radio')===-1){
             
              permissArray.push('CloudPay.BrandCertificationApplicationForm.Create')
        }
      //提交认证资料
      var BrandCertificationApplicationFormUpload = document.getElementById('BrandCertificationApplicationFormUpload');
         if(BrandCertificationApplicationFormUpload.children[0].className.indexOf('icon-radio')===-1){
              permissArray.push('CloudPay.BrandCertificationApplicationForm.Upload')

        }
      //品牌认证
      var BrandCertificationApplicationFormVerify = document.getElementById('BrandCertificationApplicationFormVerify');
        if(BrandCertificationApplicationFormVerify.children[0].className.indexOf('icon-radio')===-1){
             
              permissArray.push('CloudPay.BrandCertificationApplicationForm.Verify')
        }
      //开通云单据
      var BrandCertificationApplicationFormOpenOrder = document.getElementById('BrandCertificationApplicationFormOpenOrder');
       if(BrandCertificationApplicationFormOpenOrder.children[0].className.indexOf('icon-radio')===-1){
                permissArray.push('CloudPay.BrandCertificationApplicationForm.OpenOrder')
        }
      //开通云支付
      var BrandCertificationApplicationFormOpenPay =document.getElementById('BrandCertificationApplicationFormOpenPay');
        if(BrandCertificationApplicationFormOpenPay.children[0].className.indexOf('icon-radio')===-1){
              
              permissArray.push('CloudPay.BrandCertificationApplicationForm.OpenPay')
        }
      //申请云支付收款账号
      var ApplicationFormFollowUpCreate  = document.getElementById('ApplicationFormFollowUpCreate');
       if(ApplicationFormFollowUpCreate.children[0].className.indexOf('icon-radio')===-1){
              permissArray.push('CloudPay.ApplicationFormFollowUp.Create')
              
        }
      //安排培训机构
      var ApplicationFormFollowUpArrangeTrainingInstitution = document.getElementById('ApplicationFormFollowUpArrangeTrainingInstitution');
       if(ApplicationFormFollowUpArrangeTrainingInstitution.children[0].className.indexOf('icon-radio')===-1){
              
               permissArray.push('CloudPay.ApplicationFormFollowUp.ArrangeTrainingInstitution')
        }
      //人员
      var  SystemSettingUsers = document.getElementById('SystemSettingUsers');
       if(SystemSettingUsers.children[0].className.indexOf('icon-radio')===-1){
            
              permissArray.push('SystemSetting.Users')
        }
      //权限
      var SystemSettingPermissions =document.getElementById('SystemSettingPermissions');
       if(SystemSettingPermissions.children[0].className.indexOf('icon-radio')===-1){
             
               permissArray.push('SystemSetting.Permissions')
        }
      var param = JSON.stringify({
          "UserID":this.userId,
          "UserPermissions":permissArray
      })

       this.modifyUserPermission(param);

       //此时关闭着这个组件
        this.userPermissions =true,
        this.setPermissions=false
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
.goback:hover{
  cursor: pointer;
}
.userAdmin-head >.addUserAdmin {
  float: right;
  width: 100px;
  height: 36px; 
  color: #fff;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  border-radius: 4px;
  
}
.addUserAdminActive{
  background: #5897ff;
}
.disable{
  background: #E1E1E1;
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
  cursor: pointer;
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
        font-size:21px;
        color:#5897FF;
        display:block;
    }
.icon::before{
      display: block;
}
.icon1{
       
        font-size:18px;
        color: #5897FF;
        margin-left: -3px;
        display:block;
}
.icon1::before{
      display: block;
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
   margin-right: 20px;
   height: 37px;
}
.formselect>div>div{
 float: left;
    line-height: 20px;
    margin-top: 15px;
    margin-right: 10px;
}
.formselect>div>div:nth-of-type(1){
   
    width:27px;
   
    
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
.goback:hover{
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
  color: #fff;
  line-height: 26px;
  text-align: center;
  font-size: 12px;
  border-radius: 4px;
}
.addUserAdminActive{
  background: #5897ff;
}
.disable{
  background: #E1E1E1;
}
.trhover:hover{
  background:#EDEEEF;
  cursor: pointer;
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
          display: block;
    }
.icon::before{
      display: block;
}
.icon1{
        font-size:18px;
        color: #5897FF;
        margin-left: -3px;
          display: block;
}
.icon1::before{
      display: block;
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
   margin-right:15px;
   height:29px;
}
.formselect>div>div{
    float: left;
    line-height: 15px;
    margin-top: 11px;
    margin-right: 7px;
    
}
.formselect>div>div:nth-of-type(1){
  width:27px;
}
}
</style>
