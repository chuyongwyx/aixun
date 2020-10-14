import {GetInformationSubmittedApplicationForms,GetInformationSubmittedApplicationFormByID,ReplenishShopPhoto,ReplenishBusinessLicensePhoto,DeleteBusinessLicensePhoto,VerifyApplicationFormInformation} from "../../apis/BrandCertificationAllApi"
export default{
    //获取已提交资料的申请单
    async getInformationSubmittedApplicationForms({commit,state}){
        var dataList = await GetInformationSubmittedApplicationForms();
        commit("handleData",dataList); 
    },
    //根据ID获取已提交资料的申请单信息（包含图片）
    async getInformationSubmittedApplicationFormByID({commit,state},param){
        var dataList = await GetInformationSubmittedApplicationFormByID(param);
        commit("handleToIdDataList",dataList)
    },

   //重新上传门店资料
   async replenishShopPhoto({commit,state},param){
        var dataInfo = await ReplenishShopPhoto(param)
   },

   //补充上传营业执照
   async replenishBusinessLicensePhoto({commit,state},param){
        var dataInfo = await ReplenishBusinessLicensePhoto(param);
   },
   //删除营业执照
   async deleteBusinessLicensePhoto({commit,state},param){
        var dataInfo = await DeleteBusinessLicensePhoto(param);
   },
  //认证通过
   async verifyApplicationFormInformation({commit,state},param){
       var paramTwo =JSON.stringify(param) 
       var datainfo = await VerifyApplicationFormInformation(paramTwo)
       if(datainfo.success){
         state.getInformationSubmittedApplicationForms.map((item,index)=>{
             if(item.id==param.id){
                state.getInformationSubmittedApplicationForms.splice(index,1);
             }
         }) 
       };
   }
} 