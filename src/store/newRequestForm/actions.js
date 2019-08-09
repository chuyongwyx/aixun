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
            var sendData = await newRequestForm(param); 
            if(sendData.success ===false){
                 state.closeWindow = false; 
            }else{
                state.closeWindow=true
            }

        },
        //如果是否关闭当前窗口
        async handleCloseWindow({commit,state}){
                state.closeWindow =false;
        },
       
       //清空查询出来数据
      async  handleclickClearSearchData({commit,state}){
            state.searchProjects=[];
       }
}  