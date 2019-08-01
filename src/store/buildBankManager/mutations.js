export default{
    //对银行办理人员的划分
    getBuildBankManager(state,params){
         state.buildBankManager =[];
         state.buildBankDeal=[];

            for(var i=0,len =params.result.length;i<len;i++){
                if(params.result[i].userType === 1){
                    if(params.result[i].status === 1){
                        params.result[i].status = '待审核'
                    }else if(params.result[i].status === 2){
                        params.result[i].status ='已审核'
                    }else if(params.result[i].status === 3){
                        params.result[i].status ='已拒绝'  
                    }
                    state.buildBankManager.push(params.result[i])
                }else{
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
            state.buildBankWxEr ="data:image/*;base64,"+params.result;    
    },
   //获取单个信息
   getBankUserInfo(state,params){
            state.buidlUserInfo =params.result;
          
   }
}