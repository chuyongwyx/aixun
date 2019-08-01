import {payItemMessage} from '../../apis/payItem'
export default{
     async hanlePayItemMessage ({commit,state}){
         let data = await payItemMessage();
         commit("getPayItemMessage",data);
     }
}