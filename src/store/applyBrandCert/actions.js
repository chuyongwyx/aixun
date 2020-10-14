import  {InitialAddDatas,CheckBrandName,AddApplicationForm} from  "../../apis/BrandCertificationAllApi"
export default{
    //初始化新建数据
    async initialAddDatas({commit,state}){
        var dataList = await InitialAddDatas();
        commit("handleInitialAddDatas",dataList);
    },
     //模糊查询
    async  getSearchVal({commit,state},param){
        state.searchProjects=[];
        state.InitialAddDatas.map((item,index)=>{
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

   //验证品牌唯一性
   async checkBrandName({commit,state},param){
       var dataInfo = await  CheckBrandName(param);
       state.success =dataInfo.success; 
       state.isUnique=dataInfo.result.isUnique;
       if(state.isUnique==true){
           state.btnBg=false;
       }
   },
   //得焦时释放按钮
   async clearDisable({commit,state}){
       state.success=false;
       state.isUnique=false;
       state.btnBg=true;
   },
   //新建申请单
   async addApplicationForm({commit,state},param){
            state.saveLoading=true;
            state.saveSuccess=false;
        var datainfo =await AddApplicationForm(param);
        if(datainfo.success ===false){
            state.saveLoading=false;
            state.saveSuccess=false;
       }else{
           state.saveLoading=false;
           state.success=false;
           state.isUnique=false;
           state.btnBg=true;
           state.saveSuccess=true;
       }
   }, 

   
     //清空查询出来数据
    async handleclickClearSearchData({commit,state}){
        state.searchProjects=[];
   },


}  