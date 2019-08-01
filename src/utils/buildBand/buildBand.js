const Mock = require('mockjs');
const queryString  = require('querystring');
var Random = Mock.Random;
Random.extend({
    status: function(){
        var status = [1,2,3];
                  return this.pick(status);
    },
    userType: function(){
        var userType =[1,2];
            return this.pick(userType);
    }
})

Random.status();
Random.userType();
Mock.mock('@STATUS');
Mock.mock('@USERTYPE');
let data = Mock.mock({
    "result|8":[
        {   
            "Id|+1":0,
            "name":'@cname',
            "bankOutletName":'广州',
            "mobile":'13155465464',
            "status":'@STATUS',
            "userType":"@USERTYPE",
        
        }
    ]
})


function filterData(page,limit) { 
let arr =  data.result.filter((item,index)=>{
    return  index<=page*limit-1  &&  index>=(page-1)*limit
})

return {
    data:arr,
    count:data.result.length
}
}

function buildBankInfo(options){
let {page,limit} = queryString.parse(options.url.split("?")[1]);

return filterData(page,limit);
}

function buildBankinfoModify(options){
    let {newData,oldData,page,limit} = JSON.parse(options.body);
    for(var i=0;i<data.data.length;i++){
        if(data.result[i].Id == oldData.Id){
            data.result[i] = newData;
            break;
        }
    }

    return filterData(page,limit);

}



function buildBankinfoDel(options){
let {screenId,page,limit} = JSON.parse(options.body);
let index;

for(var i=0;i<data.result.length;i++){
    if(data.result[i] && data.result[i].Id == Id){
        index = i;
        break;
    }
}

data.data.splice(index,1);
return filterData(page,limit)
}

export default{
    buildBankInfo,
    buildBankinfoModify,
    buildBankinfoDel
}