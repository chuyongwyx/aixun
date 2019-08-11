import {InitialAddDatas,AddApplicationForm, GetBrandByProjectNumber} from "../../apis/applyPayReceipt"
export default{
    //初始化云单据收款账号申请单-1.1初始化新建数据
    async initialAddDatas({commit,state}){
        var dataList = await InitialAddDatas();
        commit("handleDataList",dataList)
    },
    //模糊查询
    async  getSearchVal({commit,state},param){
        state.searchProjects=[];
        state.projects.map((item,index)=>{
            if(item.name.indexOf(param)!==-1||item.projectNumber.indexOf(param)!==-1){
                 state.searchProjects.push(item);
                 state.searchNot=false;
            }
        })
        if(state.searchProjects.length==0){
            state.searchNot = true;
            var notValue =setInterval(function(){
                state.searchNot = false;
                clearInterval(notValue);
            },1000)
        }
    }, 
    //根据项目获取编号
   async getBrandByProjectNumber({commit,state},param){
        let dataList = await GetBrandByProjectNumber(param);
        commit("handleBrandsData",dataList);
   },

    //新建申请单
    async addApplicationForm({commit,state},param){
        var dataInfo = await AddApplicationForm(param);
        if(dataInfo.success ===false){
            state.closeWindow = false; 
       }else{
           state.closeWindow=true
       }
 
    }, 
    //如果是否关闭当前窗口
    async handleCloseWindow({commit,state}){
        state.closeWindow =false;
    },
    //清空模糊查询查询出来数据
    async  handleclickClearSearchData({commit,state}){
        state.searchProjects=[];
   },

   //路由关闭清除的数据
   async  handleClickVuexDataList({commit,state}){
     state.brands=[];
   }
}   