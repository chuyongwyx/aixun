import axios from "axios";
// import Cookies  from 'js-cookie';
const Cookies = require('js-cookie');
//import qs from "qs";
const http = axios.create({
    //baseURL:"XXXX",
    timeout:30000,
})

//请求拦截
http.interceptors.request.use((config)=>{
    config.headers.Authorization =Cookies.get('token');
    config.headers["Content-Type"]= 'application/json';
    return config;
},(err)=>{
    return Promise.reject(err);
})



//响应拦截
http.interceptors.response.use((res)=>{
        return res.data; 
},(err)=>{
    //提取状态值
    if(err.response.data.error.details){
        alert(err.response.data.error.details)
    }else{
        alert(err.response.data.error.message);
    }
   
    return err.response.data;
       
})


export default (method,url,data=null)=>{
    if(method == "post"){
        return http.post(url,data);
    }else if(method == "get"){
        return http.get(url,{params:data});
    }else if(method =='put'){
        return http.put(url,data);
    }else if(method =="delete"){
        return http.delete(url,{param:data});
    }
}