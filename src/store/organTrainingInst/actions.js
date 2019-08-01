import {InitialArrangeTrainingInstitutionDatas,ArrangeTrainingInstitution} from '../../apis/organTrainingInst';
export default{
    //初始化安排培训机构数据
    async getOrgnTrainingInstInfo (){
      let data = await InitialArrangeTrainingInstitutionDatas();
      console.log(data);
    },
    //安排培训机构
    async putArrangeTrainingInstitution(param){
      let deal = await ArrangeTrainingInstitution(param);
      
    }
}