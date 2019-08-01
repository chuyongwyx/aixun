const Mock = require('mockjs');
const queryString  = require('querystring');
var Random = Mock.Random;
Random.extend({
    DepartmentName: function(){
        var DepartmentName = ['研发部','产品部','销售部'];
                  return this.pick(DepartmentName);
    },
    IsActive:function(){
        var IsActive =[true,false];
           return  this.pick(IsActive);
    }
})

Random.DepartmentName();
Random.IsActive();
Mock.mock('@DEPARTMENTNAME');
Mock.mock('@ISACTIVE');
let data = Mock.mock({
    "result|8":[
        {   
            "Id|+1":0,
            "name":'@cname',
            "Username":'@cname',
            "PhoneNumber":'13155465464',
            "EmailAddress":'@1383838438@163.com',
            "DepartmentName":"@DEPARTMENTNAME",
            "IsActive":"@ISACTIVE" 
        
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

function userInfo(options){
let {page,limit} = queryString.parse(options.url.split("?")[1]);

return filterData(page,limit);
}

function userinfoModify(options){
    let {newData,oldData,page,limit} = JSON.parse(options.body);
    for(var i=0;i<data.data.length;i++){
        if(data.result[i].Id == oldData.Id){
            data.result[i] = newData;
            break;
        }
    }

    return filterData(page,limit);

}



function userinfoDel(options){
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
    userInfo,
    userinfoModify,
    userinfoDel
}