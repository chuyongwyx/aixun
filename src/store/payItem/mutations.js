export default{
    //获取云支付主菜单消息
    getPayItemMessage(state,params){
        state.AcceptingCloudApplicationFormCount =params.result.acceptingCloudApplicationFormCount;
        state.ApplyingBrandCertificationApplicationFormCount=params.result.applyingBrandCertificationApplicationFormCount;
        state.InformationSubmittedBrandCertificationApplicationFormCount=params.result.informationSubmittedBrandCertificationApplicationFormCount;
        state.VerifiedBrandCertificationApplicationFormCount=params.result.verifiedBrandCertificationApplicationFormCount;
        state.OpenedCloudOrderBrandCertificationApplicationFormCount=params.result.openedCloudOrderBrandCertificationApplicationFormCount;
        state.SettedReceivableAccountApplicationFormCount=params.result.settedReceivableAccountApplicationFormCount;
    }
} 