export default{
        permissionUser:[],
        permissAllow:{
                //新建申请单
                "CloudPay.CloudApplicationForm.Create" :false,
                //受理&完成申请单
                "CloudPay.CloudApplicationForm.AcceptAndFinish":false,
                //申请品牌认证
                "CloudPay.BrandCertificationApplicationForm.Create":false,
                //提交认证资料
                "CloudPay.BrandCertificationApplicationForm.Upload":false,
                //品牌认证
                "CloudPay.BrandCertificationApplicationForm.Verify":false,
                //开通云单据
                "CloudPay.BrandCertificationApplicationForm.OpenOrder":false,
                //开通云支付
                "CloudPay.BrandCertificationApplicationForm.OpenPay":false,
                //申请云支付收款账号
                "CloudPay.ApplicationFormFollowUp.Create":false,
                //安排培训机构
                "CloudPay.ApplicationFormFollowUp.ArrangeTrainingInstitution":false,
                //人员
                "SystemSetting.Users":false,
                //权限
                "SystemSetting.Permissions":false,
        }
}