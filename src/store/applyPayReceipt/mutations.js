export default{
    //初始化云单据收款账号申请单-1.1初始化新建数据
    handleDataList(state,param){
            state.projects = param.result.projects;
            state.banks = param.result.banks;  
            for(var i=0,len=param.result.brands.length;i<len;i++){
                param.result.brands[i].label=param.result.brands[i].name;
                param.result.brands[i].value =param.result.brands[i].id+','+new Date().getTime();
                state.brands.push(param.result.brands[i])
            }
    }
}