export default{
    //获取云支付主菜单消息
    getPayItemMessage(state,params){
        state.AcceptingCloudApplicationFormCount =params.result.acceptingCloudApplicationFormCount;
        state.ApplyingBrandCertificationApplicationFormCount=params.result.applyingBrandCertificationApplicationFormCount;
        state.InformationSubmittedBrandCertificationApplicationFormCount=params.result.informationSubmittedBrandCertificationApplicationFormCount;
        state.VerifiedBrandCertificationApplicationFormCount=params.result.openedCloudOrderBrandCertificationApplicationFormCount;
        state.OpenedCloudOrderBrandCertificationApplicationFormCount=params.result.settedReceivableAccountApplicationFormCount;
        state.SettedReceivableAccountApplicationFormCount=params.result.verifiedBrandCertificationApplicationFormCount;
    }
}