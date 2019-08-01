import {GetApplyingApplicationForms,UploadApplicationFormInformation} from '../../apis/BrandCertificationAllApi';
export default{
    //提交认证资料的页面初始数据
   async getApplyingApplicationForms({commit,state}){
       var dataList = await GetApplyingApplicationForms();
       commit("handleDataList",dataList)
   },
   //提交数据
   async uploadApplicationFormInformation({commit,state},param){
       var datainfo = await UploadApplicationFormInformation(param);
        console.log(datainfo);
   }
}