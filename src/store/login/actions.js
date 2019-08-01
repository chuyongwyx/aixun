import {userLoginWxEr} from '../../apis/login.js';

export default{
        //获取二维码
        async getUserLoginWxEr({commit,state}){
            let LoginWxEr = await userLoginWxEr();
            console.log(LoginWxEr)
            commit("getUserLoginWxEr",LoginWxEr)
        }

      
}