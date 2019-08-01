import  {InitialAddDatas,newRequestForm} from "../../apis/newRequestForm"
export default{
        //请求项目初始化信息
        async getInitialAddDatas ({commit,state}){
             var getData  = await InitialAddDatas();
              commit("handleGetInitialAddDatas",getData);  
        },
        //新建生成申请单
        async newRequestForm ({commit,state},param){
            var sendData = await newRequestForm(param);
        }
}