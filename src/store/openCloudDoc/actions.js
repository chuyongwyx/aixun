import {GetVerifiedBrands,OpenCloudOrder}  from "../../apis/BrandCertificationAllApi";
export default{
    // 获取已认证品牌（未开通云单据，也未开通云支付）
    async getVerifiedBrands({commit,state}){
            var dataList = await GetVerifiedBrands();
            commit("handleDataList",dataList)
    },
    //开通云单据
    async openCloudOrder({commit,state},param){
        var paramStr = JSON.stringify(param);
        state.success=false;
        state.openLoading=true;
        var  dataInfo = await OpenCloudOrder(paramStr);
        //如果返回成功则在vuex中删除他
       if(dataInfo.success){
        state.success=true;
        state.openLoading=false;
        var len = param.IDs.length;
        for(var i=0;i<len;i++){
            state.GetVerifiedBrands.map((item,index)=>{
                 if(param.IDs[i]==item.id){
                    state.GetVerifiedBrands.splice(index,1)
                 }
            })

        }
    }else{
        state.openLoading=false; 
    }
 

    }
}      