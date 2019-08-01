import {GetOpenedCloudOrderBrands,OpenCloudPay}  from "../../apis/BrandCertificationAllApi"
export default{
     //获取需要开通云支付数据
     async getOpenedCloudOrderBrands({commit,state}){
         var dataList = await GetOpenedCloudOrderBrands();
         commit("handleToDataList",dataList)   
     },
 //开通云单据
    async openCloudPay({commit,state},param){
        var paramStr = JSON.stringify(param);
        var  dataInfo = await OpenCloudPay(paramStr);
        //如果返回成功则在vuex中删除对应的
        if(dataInfo.success){
            state.GetOpenedCloudOrderBrands.map((item,index)=>{  
                if(item.id ===param.id){
                    state.GetOpenedCloudOrderBrands.splice(index,1)
                }
            })
        }


    }
}