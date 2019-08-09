export default{
    //查询品牌认证申请跟进总表
    handleSearchForm(state,param){
        state.count = param.result.totalCount 
        state.dataList =param.result.items
    },
    //查看认证资料
    handleBrandCert(state,param){
        state.dataBrandCert =param.result;
    }
}    


