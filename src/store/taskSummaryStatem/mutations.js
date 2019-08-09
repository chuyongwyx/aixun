export default{
    //获取查询信息
    handleToSearchDataList(state,param){
        state.count = param.result.totalCount 
        state.dataList =param.result.items
    },
}