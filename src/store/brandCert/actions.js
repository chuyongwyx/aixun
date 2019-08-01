import {GetInformationSubmittedApplicationForms} from "../../apis/BrandCertificationAllApi"
export default{
    //获取已提交资料的申请单
    async getInformationSubmittedApplicationForms({commit,state}){
        var dataList = await GetInformationSubmittedApplicationForms();
        commit("handleData",dataList);
    }
}