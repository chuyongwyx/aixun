export default{
      //对银行办理人员的划分
      getBuildBankManager(state,params){
        state.buildBankManager =[];
        state.buildBankDeal=[];
           
           for(var i=0,len =params.result.length;i<len;i++){
               if(params.result[i].roleName === "TrainingInstitution.Charger"){
                   if(params.result[i].status === 1){
                       params.result[i].status = '待审核'
                   }else if(params.result[i].status === 2){
                       params.result[i].status ='已审核'
                   }else if(params.result[i].status === 3){
                       params.result[i].status ='已拒绝'  
                   }
                   state.buildBankManager.push(params.result[i])
               }else if( params.result[i].roleName==="TrainingInstitution.Dealer"){
                   if(params.result[i].status === 1){
                       params.result[i].status = '待审核'
                   }else if(params.result[i].status === 2){
                       params.result[i].status ='已审核'
                   }else if(params.result[i].status === 3){
                       params.result[i].status ='已拒绝'  
                   }
                   state.buildBankDeal.push(params.result[i])
               }
           }
       

      
   },

   //添加负责人的返回的二维码照片
   getbuildBankManagerDataWxEr(state,params){
           state.buildBankWxEr =params.result;    
   },
  //获取单个信息
  getBankUserInfo(state,params){
           state.buidlUserInfo =params.result;
           
  },
   //查看办理人员附件
handleToWorkingCar(state,param){
    state.findWorkingCard = param.result.workingCard;
   //  console.log(param.result);
}
}