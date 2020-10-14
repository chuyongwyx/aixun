import {GetUsers,GetUserPermissionDatas,ModifyUserPermission} from '../../apis/permissions';
export default{
        //获取权限用户
        async handleGetUsers({commit,state}){
                var data = await GetUsers();
                commit("handleUsersData",data);
        },
       //获取用户权限数据
       async getUserPermissionDatas({commit,state},param){
            
                  //云支付申请跟进总表
                  //查看
                  state.permissAllow["CloudPayInquiry.CloudApplicationFormSummaryStatement.Inquiry"]=false;        
                  //关闭
                  state.permissAllow["CloudPayInquiry.CloudApplicationFormSummaryStatement.Close"]=false;
                  //修改备注
                  state.permissAllow["CloudPayInquiry.CloudApplicationFormSummaryStatement.ModifyRemark"]=false;
                  //品牌认证跟进总表
                  //查看
                  state.permissAllow["CloudPayInquiry.BrandCertificationApplicationFormSummaryStatement.Inquiry"]=false;
                  //关闭
                  state.permissAllow["CloudPayInquiry.BrandCertificationApplicationFormSummaryStatement.Close"]=false;
                  //品牌总表
                  //查看
                  state.permissAllow["CloudPayInquiry.ProjectBrandSummaryStatement.Inquiry"]=false;
                  //云支付收款账号申请跟进总表
                  //查看
                  state.permissAllow["CloudPayInquiry.ReceivableAccountApplicationFormSummaryStatement.Inquiry"]=false;
                  //关闭
                  state.permissAllow["CloudPayInquiry.ReceivableAccountApplicationFormSummaryStatement.Close"]=false;
                  //新建申请单
                  state.permissAllow["CloudPay.CloudApplicationForm.Create"] =false;
                  //受理&完成申请单
                  state.permissAllow["CloudPay.CloudApplicationForm.AcceptAndFinish"]=false;
                  //申请品牌认证
                  state.permissAllow["CloudPay.BrandCertificationApplicationForm.Create"]=false;
                  //提交认证资料
                  state.permissAllow["CloudPay.BrandCertificationApplicationForm.Upload"]=false;
                  //品牌认证
                  state.permissAllow["CloudPay.BrandCertificationApplicationForm.Verify"]=false;
                  //开通云单据
                  state.permissAllow["CloudPay.BrandCertificationApplicationForm.OpenOrder"]=false;
                  //开通云支付
                  state.permissAllow["CloudPay.BrandCertificationApplicationForm.OpenPay"]=false;
                  //申请云支付收款账号
                  state.permissAllow["CloudPay.ApplicationFormFollowUp.Create"]=false,
                  //安排培训机构
                  state.permissAllow["CloudPay.ApplicationFormFollowUp.ArrangeTrainingInstitution"]=false;
                  //人员
                  state.permissAllow["SystemSetting.Users"]=false;
                  //权限
                  state.permissAllow["SystemSetting.Permissions"]=false;
          

              var dataList = await GetUserPermissionDatas(param)
             commit("handleGetUserPermissionDatas",dataList)
       },
       //用户操作选中权限
       async opationPermission({commit,state},param){
            
            for(var key in param){
                  state.permissAllow[key] = param[key];
            }
       },
       //修改用户权限
       async modifyUserPermission({commit,state},param){
            state.saveLoading=true;
            state.saveSuccess=false;
             var dataInfo = await ModifyUserPermission(param);
             if(dataInfo.success){
                  // alert('保存成功');
                  state.saveSuccess=true;
                  state.saveLoading=false;
            }else{
                  state.saveSuccess=false;
                  state.saveLoading=false;
            }  
       },



     
}   