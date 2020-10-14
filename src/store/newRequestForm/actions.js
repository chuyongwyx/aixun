import  {InitialAddDatas,newRequestForm} from "../../apis/newRequestForm";
import { setImmediate } from "core-js";
export default{
        //请求项目初始化信息
        async getInitialAddDatas ({commit,state}){
             var getData  = await InitialAddDatas();
              commit("handleGetInitialAddDatas",getData);  
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

        //新建生成申请单
        async newRequestForm ({commit,state},param){
            state.saveLoading =true;
           
            state.success=false;
            var sendData = await newRequestForm(param); 
            if(sendData.success ===false){
                state.saveLoading=false;
                state.success=false;
            }else{
                state.success=true;
                state.saveLoading=false;   
            }

        }, 
       //清空查询出来数据
      async  handleclickClearSearchData({commit,state}){
            state.searchProjects=[];
       }
}     