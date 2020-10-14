import {buildBankManager ,buildBankManagerWxEr,builBankUserInfo,ExaminePass,refuseUserInfo,RevokeBuidlManager,GetWorkingCarById} from '../../apis/industrialBank';
let  Base64 = require('js-base64').Base64;
export default{
        //获取建行用户
        async getBuildBankManager({commit,state}){
            let bankManagerData = await buildBankManager();
            commit("getBuildBankManager",bankManagerData)
        },

        //添加银行负责人二维码
        async  getbuildManagerWxEr({commit,state},param){
            let bankManagerDataWxEr = await buildBankManagerWxEr(param);
            commit("getbuildBankManagerDataWxEr",bankManagerDataWxEr);
            // if(bankManagerDataWxEr.success){
            //     let bankManagerData = await buildBankManager();
            //     commit("getBuildBankManager",bankManagerData)
            // }
        },
         //获取单个建行用户信息
         async getBankUserInfo({commit,state},param){
            let userInfo = await builBankUserInfo(param);
            commit("getBankUserInfo",userInfo);
        },
        //审核建行用户信息
        async putExaminePass({commit,state},param){
            let userData = await ExaminePass(param);
            if(userData.success){
                let bankManagerData = await buildBankManager();
                commit("getBuildBankManager",bankManagerData)
            }
           
        },
        //拒绝建行用户信息
        async refuseUserInfo({commit,state},param){
            let refuserUserInfo = await refuseUserInfo(param);
            if(refuserUserInfo.success){
                let bankManagerData = await buildBankManager();
                commit("getBuildBankManager",bankManagerData)
            }
        },
        //撤销建行负责人
        async revokeBuidlManager({commit,state},param){
            let RevokeManagerInfo = await RevokeBuidlManager(param);
            if(RevokeManagerInfo.success){
                let bankManagerData = await buildBankManager();
                commit("getBuildBankManager",bankManagerData)
            }
        },
        //查看办理人员附件
        async getWorkingCardByID({commit,state},param){
            let WorkingCar = await GetWorkingCarById(param);
            commit("handleToWorkingCar",WorkingCar)
        }
 
}