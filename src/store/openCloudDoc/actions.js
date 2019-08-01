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
        var  dataInfo = await OpenCloudOrder(paramStr);
        //如果返回成功则在vuex中删除对应的
        if(dataInfo.success){
            state.GetVerifiedBrands.map((item,index)=>{  
                if(item.id ===param.id){
                    state.GetVerifiedBrands.splice(index,1)
                }
            })
        }


    }
}  