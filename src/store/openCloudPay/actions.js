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
        state.success = false;
        var  dataInfo = await OpenCloudPay(paramStr);
       
        //如果返回成功则在vuex中删除对应的
        if(dataInfo.success){
            var len = param.IDs.length;
            state.success = true;
            for(var i=0;i<len;i++){
                state.GetOpenedCloudOrderBrands.map((item,index)=>{
                     if(param.IDs[i]==item.id){
                        state.GetOpenedCloudOrderBrands.splice(index,1);
                     }
                })


            }
        } 


    }
}   