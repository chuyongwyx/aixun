import{GetApplicationForms,CloseApplicationForm} from  "../../apis/taskSummaryStatem"
export default{
    //查询云支付收款账号跟进总表
    async getApplicationForms({commit,state},param){
        let dataList = await GetApplicationForms(param);
        commit("handleToSearchDataList",dataList);
    },
    //强制关闭
    async closeApplicationForm({commit,state},param){
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

    //清楚Vuex中申请云支付账号总表中的数据
    async handleClearDataList({commit,state}){
            state.count=0;
            state.dataList=[]
    }
}   