import {GetApplicationForms, GetApplicationFormByID,CloseApplicationForm} from "../../apis/generalApplicationBrandCert"
export default{
    //查询品牌认证申请跟进总表
   async  getApplicationForms({commit,state},param){
       let dataList = await GetApplicationForms(param);
       commit("handleSearchForm",dataList);
   },
   //查看认证资料
  async  getApplicationFormByID({commit,state},param){
      let dataList = await GetApplicationFormByID(param);
      commit("handleBrandCert",dataList);
  },
  //强制关闭申请品牌认证申请单
  async closeApplicationForm ({commit,state},param){
    var paramTwo = JSON.stringify(param)
      let dataInfo = await CloseApplicationForm(paramTwo);
      if(dataInfo.success==true){
        state.dataList.map((item,index)=>{
            if(item.id ==param.id){
                state.dataList.splice(index,1);
                state.count=state.count-1;
            }
        })
    }
  },

  //清除Vuex中的数据
  async  handleClearDatalist({commit,state}){
    state.count = 0; 
    state.dataList =[];
  }
}     