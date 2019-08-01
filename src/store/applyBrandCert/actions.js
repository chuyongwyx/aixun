import  {InitialAddDatas,CheckBrandName,AddApplicationForm} from  "../../apis/BrandCertificationAllApi"
export default{
    //初始化新建数据
    async initialAddDatas({commit,state}){
        var dataList = await InitialAddDatas();
        commit("handleInitialAddDatas",dataList);
    },
   //验证品牌唯一性
   async checkBrandName({commit,state},param){
       var dataInfo = await  CheckBrandName(param);
       state.success =dataInfo.success;
       if(state.success){
           alert('品牌名称可用');
       }
   },
   //得焦时释放按钮
   async clearDisable({commit,state}){
       state.success=false;
   },
   //新建申请单
   async addApplicationForm({commit,state},param){
        var datainfo =await AddApplicationForm(param);
   }
}