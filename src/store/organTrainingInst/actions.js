import {GetSettedApplicationForms,InitialArrangeTrainingInstitutionDatas,ArrangeTrainingInstitution} from '../../apis/organTrainingInst';
export default{
    //初始化设置完成的申请单
    async getSettedApplicationForms({commit,state}){
      let dataList = await GetSettedApplicationForms();
      commit("handleToDataList",dataList);
      console.log(dataList);
    },

    //培训机构数据
    async getOrgnTrainingInstInfo ({commit,state}){
      let dataList = await InitialArrangeTrainingInstitutionDatas();
      commit("handleTrainingNames",dataList)
    },
    //安排培训机构
    async putArrangeTrainingInstitution({commit,state},param){
      let deal = await ArrangeTrainingInstitution(param);
      
    }
}