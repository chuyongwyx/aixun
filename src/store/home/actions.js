import {ModifyPassword} from "../../apis/login"
export default{
      //导向路由缓存
      //  handlePushRouter({commit,state},param){
      //       state.routerActive="";
      //       state.routerActive = param.name;
      //                   var num = false;
      //                   var keepNum = false;
      //                   var routerName ='';
      //             if(state.routerArray.length ===0){
      //                   state.routerArray.push(param);
      //                   state.keepAlive.map((item,index)=>{
      //                         if(item===param.name){
      //                               keepNum = true;
      //                         }
      //                   })
      //                   if(keepNum){

      //                   }else{
      //                         state.keepAlive.push(param.name) 
      //                   }

      //             }else{
      //                   for(var i=0,len=state.routerArray.length;i<len;i++){
      //                         if(state.routerArray[i].name ===param.name){
      //                               num =true;
      //                               routerName = param.name
      //                         }    
      //                   }
      //                   if(num){
      //                         alert('实例已经存在');
      //                         state.routerActive = param.name;
      //                         state.keepAlive.map((item,index)=>{
      //                               if(item===param.name){
      //                                     keepNum = true;
      //                               }
      //                         })
      //                         if(keepNum){
      
      //                         }else{
      //                               state.keepAlive.push(param.name)
      //                         }
      //                   }else{
      //                         state.keepAlive.map((item,index)=>{
      //                               if(item===param.name){
      //                                     keepNum = true;
      //                               }
      //                         })
      //                         if(keepNum){
      
      //                         }else{
      //                               state.keepAlive.push(param.name)
      //                         }
      //                         state.routerArray.push(param);
                                  
      //                   }
      //             }

      // },
      // //控制路由活跃状态
      // handleToRouterActive({commit,state},param){
      //       state.routerActive =param;
      // },
      // //清除路由缓存
      // handleClearRouter({commit,state},param){

      //       if(state.routerActive ===param.delName){
      //             state.routerActive ='';
      //       }
      //       state.routerArray.splice(param.delIndex,1);
      //      var delkeep =''; 
      //      state.keepAlive.map((item,index)=>{
      //                   if(item === param.delName){
      //                       delkeep = index;
      //                   }
      //       })
      //       state.keepAlive.splice(delkeep,1);
           
      // },
      // //关闭页面清除指定的路由缓存
      // handleCloseRouter({commit,state},param){
      //             //删除的tag
      //             var indexRemovetag ='';
      //             //清除的路由缓存
      //             var indexClearRouter ='';
      //       state.routerArray.map((item,index)=>{
      //             if(item.name ===param){
      //                   indexRemovetag = index;
      //             }
      //       })
      //       state.keepAlive.map((item,index)=>{
      //             if(item === param){
      //                   indexClearRouter=index
      //             }
      //       })
      //       state.routerArray.splice(indexRemovetag,1);
      //       state.keepAlive.splice(indexClearRouter,1);

      // },
     
      // //用户退出时关闭所有活跃的按钮
      // handleClearAllRouter({commit,state}){
      //       state.routerArray=[];  
      // },


      //修改密码

      async modifyPassword({commit,state},param){
            state.success=false;
            state.updatePswBtn=true;
            let dataInfo = await ModifyPassword(param)
            if(dataInfo.success){
                   state.updatePswBtn=false;                       
                  state.success=true;
            }else{
                  state.updatePswBtn=false;
                  state.success=false;
            } 
      }


}