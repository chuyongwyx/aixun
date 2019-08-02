import http from '../utils/http';
// 获取建行用户
export const buildBankManager =()=>{
    return  http("get","/apis/api/CCB/GetBankUsers")
}

//添加负责人扫描二维码

export const buildBankManagerWxEr = (param)=>{
    return http("get","/apis/api/CCB/GetChargerInviteQRCode/?width="+param)
}

//获取建行单个用户信息
export const builBankUserInfo =(param)=>{
    return http("get","/apis/api/CCB/GetBankUserByID/?id="+param)
}

//审核建行用户信息
export const ExaminePass =(param)=>{
    return http('put',"/apis/api/CCB/VerifyBankUser",param)
}

//拒绝建行用户信息
export const refuseUserInfo =(param)=>{
    return http('put',"/apis/api/CCB/RejectBankUser",param)
}

//撤销建行负责人资格
export const RevokeBuidlManager =(param)=>{
    return http("put","/apis/api/CCB/RevokeBankUser",param)
}