export default{
    //初始化云单据收款账号申请单-1.1初始化新建数据
    handleDataList(state,param){
            state.projects = param.result.projects;
            state.banks=[];
           
            for(var i=0,len=param.result.banks.length;i<len;i++){
                param.result.banks[i].label=param.result.banks[i].name;
                param.result.banks[i].value =param.result.banks[i].id+':'+new Date().getTime();
                state.banks.push(param.result.banks[i])
            }
           
           
    },
    //根据项目编号获取品牌名称
    handleBrandsData(state,param){
             state.brands=[];
            for(var i=0,len=param.result.brands.length;i<len;i++){
                 param.result.brands[i].label=param.result.brands[i].name;
                 param.result.brands[i].value =param.result.brands[i].id+','+new Date().getTime();
                 state.brands.push(param.result.brands[i])
             }
    }
}