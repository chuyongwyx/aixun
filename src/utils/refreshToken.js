//刷新RefreshToken重新设置过期时间一个小时刷新一次
import Cookies from 'js-cookie';
import axios  from 'axios';
setInterval(function(){
        
            var param = JSON.stringify({
                "RefreshToken" :Cookies.get('RefreshToken')
            });
            axios({
                method:"post",
                url:"/apis/api/Account/RefreshAccessToken",
                headers: {
                        'Content-Type':'application/json',
                },
                data:param
                
            }).then(function(data){
                            
                var Token = 'Bearer'+' '+data.data.result.accessToken;
                var RefreshToken = data.data.result.refreshToken;
                Cookies.set('name',data.data.result.name,{expires:new Date(new Date().getTime() +data.data.result.expiresIn *1000)});
                Cookies.set('email',data.data.result.emailAddress,{expires:new Date(new Date().getTime() +data.data.result.expiresIn *1000)});
                Cookies.set("token",Token,{expires:new Date(new Date().getTime() +data.data.result.expiresIn *1000)});
                Cookies.set("RefreshToken",RefreshToken,{expires:new Date(new Date().getTime() +data.data.result.expiresIn *1000)});
            })
},3600000);
