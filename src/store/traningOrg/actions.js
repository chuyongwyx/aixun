import {buildBankManager ,buildBankManagerWxEr,builBankUserInfo,ExaminePass,refuseUserInfo,RevokeBuidlManager} from '../../apis/traningOrg';
let  Base64 = require('js-base64').Base64;
export default{
       //获取培训用户
       async getBuildBankManager({commit,state}){
        let bankManagerData = await buildBankManager();
        commit("getBuildBankManager",bankManagerData)
        },

        //添加培训负责人二维码
        async  getbuildManagerWxEr({commit,state},param){
            let bankManagerDataWxEr = await buildBankManagerWxEr(param);
            commit("getbuildBankManagerDataWxEr",bankManagerDataWxEr)
        },
        //获取单个培训用户信息
        async getBankUserInfo({commit,state},param){
            let userInfo = await builBankUserInfo(param);
            commit("getBankUserInfo",userInfo);
        },
        //审核培训用户信息
        async putExaminePass({commit,state},param){
            let userData = await ExaminePass(param);
        
        },
        //拒绝培训用户信息
        async refuseUserInfo({commit,state},param){
            let refuserUerInfo = await refuseUserInfo(param);
        },
        //撤销培训负责人
        async revokeBuidlManager({commit,state},param){
            let RevokeManagerInfo = await RevokeBuidlManager(param);
        }
        
}
