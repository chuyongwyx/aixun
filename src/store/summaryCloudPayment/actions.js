import {GetApplicationForms,GetRefferenceApplicationForms,ModifyRemark,CloseApplicationForm} from  "../../apis/summaryCloudPayment"
export default{
    //查询云支付申请跟进总表
    async getApplicationForms({commit,state},param){
        let dataList = await GetApplicationForms(param)
        commit("handleToSearchDataList",dataList)
    }, 

    //获取引用申请单
    async getRefferenceApplicationForms({commit,state},param){
        let dataList = await GetRefferenceApplicationForms(param)
        commit("handleImportDataList",dataList)
    },

    //修改备注
    async modifyRemark({commit,state},param){
        let dataInfo = await ModifyRemark(param);
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


    //关闭窗口清除vuex中的数据
    async handleClearDataList({commit,state}){
        state.count=0,
        state.dataList=[]
    } 
}      