import http from '../utils/http'
//1.7品牌认证所有申请单下所有api 
//初始化新建数据
export const InitialAddDatas =()=>{
    return http("get","/apis/api/BrandCertificationApplicationForm/InitialAddDatas")
}

//新建申请单
export const AddApplicationForm =(param)=>{
    return http("post","/apis/api/BrandCertificationApplicationForm/AddApplicationForm",param)
}

//验证品牌名称 唯一性
export const CheckBrandName=(param)=>{
    return http("put","/apis/api/BrandCertificationApplicationForm/CheckBrandName",param)
}
 
//获取状态为申请中的申请单
export const GetApplyingApplicationForms=()=>{
    return http("get","/apis/api/BrandCertificationApplicationForm/GetApplyingApplicationForms")
}

//提交品牌认证申请资料
export const UploadApplicationFormInformation=(param)=>{
    return  http("put","/apis/api/BrandCertificationApplicationForm/UploadApplicationFormInformation",param)
}

//获取已提交资料的申请单
export const GetInformationSubmittedApplicationForms=()=>{
    return  http("get","/apis/api/BrandCertificationApplicationForm/GetInformationSubmittedApplicationForms")
}

//补充上传资料
export const ReplenishApplicationFormInformation=(param)=>{
    return http("put","/apis/api/BrandCertificationApplicationForm/ReplenishApplicationFormInformation",param)
}

//根据ID获取已提交资料的申请单信息（包含图片）
export const GetInformationSubmittedApplicationFormByID=()=>{
    return http("get","/apis/api/BrandCertificationApplicationForm/GetInformationSubmittedApplicationFormByID")
}

//认证提交的资料
export const VerifyApplicationFormInformation=(param)=>{
    return http("put","/apis/api/BrandCertificationApplicationForm/VerifyApplicationFormInformation",param)
}

//获取已认证品牌（未开通云单据，也未开通云支付）
export const GetVerifiedBrands=(param)=>{
    return http("get","/apis/api/BrandCertificationApplicationForm/GetVerifiedBrands") 
}
//获取已开通云单据的品牌（只开通云单据，未开通云支付）
export const GetOpenedCloudOrderBrands=()=>{
    return http("get","/apis/api/BrandCertificationApplicationForm/GetOpenedCloudOrderBrands")
}

//开通云单据
export const OpenCloudOrder=(param)=>{
    return http("put","/apis/api/BrandCertificationApplicationForm/OpenCloudOrder",param)
}

//开通云支付
export const OpenCloudPay=(param)=>{
    return http("put","/apis/api/BrandCertificationApplicationForm/OpenCloudPay",param)
}