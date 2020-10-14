import http from '../utils/http';
// 获取兴业用户
export const buildBankManager =()=>{
    return  http("get","http://is-test.aserweb.com:50102/api/CIB/GetBankUsers")
}

//添加负责人扫描二维码

export const buildBankManagerWxEr = (param)=>{
    return http("get","http://is-test.aserweb.com:50102/api/CIB/GetChargerInviteQRCode/?width="+param)
}

//获取兴业单个用户信息
export const builBankUserInfo =(param)=>{
    return http("get","http://is-test.aserweb.com:50102/api/CIB/GetBankUserByID/?id="+param)
}

//审核兴业用户信息
export const ExaminePass =(param)=>{
    return http('put',"http://is-test.aserweb.com:50102/api/CIB/VerifyBankUser",param)
}

//拒绝兴业用户信息
export const refuseUserInfo =(param)=>{
    return http('put',"http://is-test.aserweb.com:50102/api/CIB/RejectBankUser",param)
}

//撤销兴业负责人资格
export const RevokeBuidlManager =(param)=>{
    return http("put","http://is-test.aserweb.com:50102/api/CIB/RevokeBankUser",param)
}

//查看办理人员附件
export const  GetWorkingCarById =(param)=>{
    return http("get","http://is-test.aserweb.com:50102/api/CIB/GetWorkingCardByID/?id="+param)
} 