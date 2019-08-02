import http from '../utils/http';
/// 获取培训建行用户
export const buildBankManager =()=>{
    return  http("get","/apis/api/GZTI/GetTrainingInstitutionUsers")
}

//添加负责人扫描二维码

export const buildBankManagerWxEr = (param)=>{
    return http("get","/apis/api/GZTI/GetChargerInviteQRCode/?width="+param)
}

//获取培训单个用户信息
export const builBankUserInfo =(param)=>{
    return http("get","/apis/api/GZTI/GetTrainingInstitutionUserByID/?id="+param)
}

//审核培训用户信息
export const ExaminePass =(param)=>{
    return http('put',"/apis/api/GZTI/VerifyTrainingInstitutionUser",param)
}

//拒绝培训用户信息
export const refuseUserInfo =(param)=>{
    return http('put',"/apis/api/GZTI/RejectTrainingInstitutionUser",param)
}

//撤销培训负责人资格
export const RevokeBuidlManager =(param)=>{
    return http("put","/apis/api/GZTI/RevokeTrainingInstitutionUser",param)
}

