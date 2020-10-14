<template>
    <div class="login">
        <div class="login-content">
            <!-- <span class="iconfont icon-UserSettings"></span> -->
            <div class="login-form">
                <div class="login-head">
                     <div :class="{'login-actived':userLogin}"  @click="handleUserLogin">账号登录</div>
                     <div :class="{'login-actived':wxLogin}"  @click="handleWxLogin">微信登录</div>
                </div> 
              
                <div class="login-user" v-show="userLogin" @keydown="handleToLoginKeyDown">
                        <div><span class="iconfont icon-UserSettings"></span><input type="text" placeholder="用户名或邮箱地址" v-model="Username" id="userName" @focus="handleUserFocus" autocomplete="off" @input="handleUserInput"></div>
                        <div><span class="iconfont icon-mima"></span><input type="password" placeholder="登录密码" v-model="UserPassword" @focus="handlePswFocus" autocomplete="off"></div>
                        <p class=login-test>
                            <span v-show="loginAllError">*用户名或密码输入错误,请重新输入</span>
                            <span v-show="loginForgetUsername">*请输入用户名或者邮箱</span>
                            <span v-show="loginForgetPsw">*请输入密码</span>
                            <span v-show="loginForgetAll">*请输入用户名或者邮箱</span>
                        </p>
                        
                        
                        <button @click="handelLogin"><span v-show="logining==false?true:false">登录</span><span v-show="logining==false?false:true">登录中...</span></button>
                </div>
                <div class="login-wx" v-show="wxLogin">
                        <div>扫一扫</div>
                        <div id="login_container">
                            <!-- 获取二维码信息 -->
                            <!-- <img :src="" alt=""> -->
                        </div>
                </div>
               
            </div>
        </div>
    </div>
</template>
<script>
    import Vuex from 'vuex';
    import Cookies from 'js-cookie';
    const sha256 = require("js-sha256").sha256;
    import axios from 'axios';
export default {
        data(){
            return{
                    "userLogin":true,
                    "wxLogin":false,
                    "Username":"",
                    "UserPassword":"",
                    "loginError":true,
                    "wxEr":'',
                    "logining":false,
                    //用户名邮箱忘记
                    "loginForgetUsername":false,
                    //密码忘记
                    "loginForgetPsw":false,
                    //都忘记了
                    "loginForgetAll":false,
                    //登录错误
                    "loginAllError":false
                    
            }
        },
        methods:{
            ...Vuex.mapActions({
                    // getLoginWxEr :"loginWxEr/getUserLoginWxEr",
            }),
            handleUserLogin(){
                this.wxLogin=false;
                this.userLogin =true;
                document.getElementById('userName').focus();
            },
            handleWxLogin(){
                // this.getLoginWxEr();
                this.wxLogin=true;
                this.userLogin=false;
               
            },
            handleUserFocus(){
                  //都忘记了
                  this.loginForgetAll=false;
                  //登录错误
                  this.loginAllError =false;
                 this.loginForgetUsername=false;
            },

            //用户框中输入密码
            handleUserInput(){
                this.UserPassword="";
            },

            handlePswFocus(){
                  this.loginForgetPsw =false;
                    //都忘记了
                    this.loginForgetAll=false;
                    //登录错误
                    this.loginAllError =false;
            },
            handelLogin(){
                if(this.Username==""&&this.UserPassword!==""){
                    
                    this.loginForgetPsw =false;
                    //都忘记了
                    this.loginForgetAll=false;
                    //登录错误
                    this.loginAllError =false;
                    this.loginForgetUsername=true;
                }    
            if(this.Username!==""&&this.UserPassword==""){
                   
                    this.loginForgetPsw =true;
                    //都忘记了
                    this.loginForgetAll=false;
                    //登录错误
                    this.loginAllError =false;
                    this.loginForgetUsername=false;
            }
            if(this.Username==""&&this.UserPassword==""){
                    this.loginForgetPsw =false;
                    //都忘记了
                    this.loginForgetAll=true;
                    //登录错误
                    this.loginAllError =false;
                    this.loginForgetUsername=false;
            }

                if(this.Username!==""&&this.UserPassword!==""){
                var UsernameOrEmailAddress = this.Username;
                var Password = sha256(this.UserPassword).toLocaleUpperCase();
                this.logining=true;
                var param =JSON.stringify({
                    "usernameOrEmailAddress":UsernameOrEmailAddress,
                    "password":Password
                })
                var _this = this;
                axios({
                    method:"post",
                    url:"http://is-test.aserweb.com:50102/api/Account/Authenticate",
                     headers: {
                            'Content-Type':'application/json'
                    },
                    data:param,
                    
                }).then(function(data){                    
                           var Token = 'Bearer'+' '+data.data.result.accessToken;
                           var RefreshToken = data.data.result.refreshToken;
                           Cookies.set('name',data.data.result.name,{expires:new Date(new Date().getTime() +data.data.result.expiresIn *1000)});
                           Cookies.set('email',data.data.result.emailAddress,{expires:new Date(new Date().getTime() +data.data.result.expiresIn *1000)});
                            Cookies.set("token",Token,{expires:new Date(new Date().getTime() +data.data.result.expiresIn *1000)});
                            Cookies.set("RefreshToken",RefreshToken,{expires:new Date(new Date().getTime() +data.data.result.expiresIn *1000)});
                             _this.$router.push('/home');
                             _this.logining=false;
                }).catch(function(err){
                         _this.logining=false;
                        if(err.response.data.error.details ==='用户名或密码无效'){
                                _this.loginForgetPsw =false;
                                //都忘记了
                                _this.loginForgetAll=false;
                                //登录错误
                                _this.loginAllError =true;
                                _this.loginForgetUsername=false;
                               
                        }else{
                            alert(err.response.data.error.message);
                        }
                        
                    
                })
           
            }
            },


            //回车键登录
            handleToLoginKeyDown($event){
                if($event.keyCode===13){
                      if(this.Username==""&&this.UserPassword!==""){
                    
                    this.loginForgetPsw =false;
                    //都忘记了
                    this.loginForgetAll=false;
                    //登录错误
                    this.loginAllError =false;
                    this.loginForgetUsername=true;
                }    
            if(this.Username!==""&&this.UserPassword==""){
                   
                    this.loginForgetPsw =true;
                    //都忘记了
                    this.loginForgetAll=false;
                    //登录错误
                    this.loginAllError =false;
                    this.loginForgetUsername=false;
            }
            if(this.Username==""&&this.UserPassword==""){
                    this.loginForgetPsw =false;
                    //都忘记了
                    this.loginForgetAll=true;
                    //登录错误
                    this.loginAllError =false;
                    this.loginForgetUsername=false;
            }

                if(this.Username!==""&&this.UserPassword!==""){
                var UsernameOrEmailAddress = this.Username;
                var Password = sha256(this.UserPassword).toLocaleUpperCase();
                this.logining=true;
                var param =JSON.stringify({
                    "usernameOrEmailAddress":UsernameOrEmailAddress,
                    "password":Password
                })
                var _this = this;
                axios({
                    method:"post",
                    url:"http://is-test.aserweb.com:50102/api/Account/Authenticate",
                     headers: {
                            'Content-Type':'application/json'
                    },
                    data:param,
                    
                }).then(function(data){                    
                           var Token = 'Bearer'+' '+data.data.result.accessToken;
                           var RefreshToken = data.data.result.refreshToken;
                           Cookies.set('name',data.data.result.name,{expires:new Date(new Date().getTime() +data.data.result.expiresIn *1000)});
                           Cookies.set('email',data.data.result.emailAddress,{expires:new Date(new Date().getTime() +data.data.result.expiresIn *1000)});
                            Cookies.set("token",Token,{expires:new Date(new Date().getTime() +data.data.result.expiresIn *1000)});
                            Cookies.set("RefreshToken",RefreshToken,{expires:new Date(new Date().getTime() +data.data.result.expiresIn *1000)});
                             _this.$router.push('/home');
                             _this.logining=false;
                }).catch(function(err){
                         _this.logining=false;
                        if(err.response.data.error.details ==='用户名或密码无效'){
                                _this.loginForgetPsw =false;
                                //都忘记了
                                _this.loginForgetAll=false;
                                //登录错误
                                _this.loginAllError =true;
                                _this.loginForgetUsername=false;
                               
                        }else{
                            alert(err.response.data.error.message);
                        }
                        
                    
                })
           
            }

             };
            }
            
        },

        computed: {
            ...Vuex.mapState({
               userInfo:state =>state.login,
            })
        },
        created(){
            
            // if(Cookies.get('token')){
            //     this.$router.push('/home');
            // }
        },
        mounted(){
           document.getElementById('userName').focus();
        }

}
</script>

<style lang="" scoped>
@media screen and (min-width: 1400px){
        /* 去除input框的登录底色 */
    
input:-webkit-autofill { 
	-webkit-box-shadow: 0 0 0 1000px white inset !important;
}

 .login{
            width:100%;
            height:100%;
            background: url('../../assets/login-background.png') no-repeat;
            background-size:cover;
            position: relative;
    }

    .login>.login-content{
            width:1303px;
            height:659px;
            position: absolute;
            top:50%;
            left:50%;
            margin-left:-652px;
            margin-top:-330px;
            background:url('../../assets/login.png') no-repeat;
            background-size:cover;
    }
     .login>.login-content>.login-form{
          width:438px;
          float:right;
          margin-top:124px;
          margin-right:82px;
          font-size: 16px;
          overflow: hidden;
     }
     .login>.login-content>.login-form>.login-head{
         width:438px;
         box-sizing: border-box;
         padding-left: 56px;
         overflow: hidden;
     }
     .login>.login-content>.login-form>.login-head>div{
         float:left;
         width: 162px;
         height:44px;
         border:1px solid #ECECEC;
         color: #333333;
         line-height: 44px;
         text-align: center;
        
     }
     .login>.login-content>.login-form>.login-head>div:nth-of-type(1){
         border-radius:3px  0px   0px  3px;
     }
     .login>.login-content>.login-form>.login-head>div:nth-of-type(2){
        border-radius:0px  3px   3px  0px;
     }
      .login>.login-content>.login-form>.login-head>div:hover{
          cursor: pointer;
      }
     .login>.login-content>.login-form>.login-head>.login-actived{
          border:1px solid #7AACFF;
          color: #7AACFF;
     }
     .login-user{
           
            margin-top: 66px;
            overflow: hidden;
     }
     .login-user>div{
            width:438px;
            height:68px;
            box-sizing: border-box;
            border:1px solid #F3F3F3;
            border-radius: 4px;
            overflow: hidden;
     }
     .login-user>div>span{
         float: left;
         font-size: 24px;
         line-height: 68px;
         color: #A4A4A4;
         margin-left:16px;
     }
      .login-user>div>input{
            border:0;
            height:28px;
            width:392px;
            float: left;
            margin-top:21px;
            outline: 0;
            text-indent: 1em;
            font-size: 14px;
            
            
      }
       .login-user>div:nth-of-type(2){
           margin-top: 26px;
       }
       .login-user>p{
           font-size: 14px;
           color:#F33333;
           margin-top: 20px;
           margin-left:17px;
           margin-bottom:28px;
       }
       .login-test{
           height:21px;
       }
      .login-user>button{
            width:438px;
            height: 75px;
            border: 0;
            font-size: 18px;
            color: #fff;
            /* margin-top: 63px; */
            background:#7AACFF;
            outline:none;
        }
    .login-user>button:active{
          background:#6da4ff;

    }
        .login-wx{
                width:250px;
                font-size: 20px;
                margin-top:48px;
                float:right;
                margin-right:85px;
        }
         .login-wx>div:nth-of-type(1){
                width:250px;
                text-align: center;
                margin-bottom: 26px;
         }  
         .login-wx>div:nth-of-type(2){
                width:250px;
                height:250px;
         }
          .login-wx>div:nth-of-type(2)>img{
                width:100%;
                height:100%;
          }
          .login-user>button:hover{
               cursor: pointer;
          }
}
/*笔记本最小统一1024 */
@media screen and (max-width: 1400px){
        input:-webkit-autofill { 
	    -webkit-box-shadow: 0 0 0 1000px white inset !important;
        }
    .login{
            width:100%;
            height:100%;
            background: url('../../assets/login-background.png') no-repeat;
             background-size:cover;
            position: relative;
    }

    .login>.login-content{
            width:695px;
            height:350px;
            position: absolute;
            top:50%;
            left:50%;
            margin-left:-347px;
            margin-top:-176px;
            background:url('../../assets/login.png') no-repeat;
             background-size:cover;
    }
     .login>.login-content>.login-form{
          width:233px;
          float:right;
          margin-top:66px;
          margin-right:43px;
          font-size: 14px;
          overflow: hidden;
     }
     .login>.login-content>.login-form>.login-head{
         width:233px;
         box-sizing: border-box;
         padding-left: 30px;
         overflow: hidden;
     }
     .login>.login-content>.login-form>.login-head>div{
         float:left;
         width: 86px;
         height:23px;
         border:1px solid #ECECEC;
         color: #333333;
         line-height: 23px;
         text-align: center;
        
     }
     .login>.login-content>.login-form>.login-head>div:nth-of-type(1){
         border-radius:3px  0px   0px  3px;
     }
     .login>.login-content>.login-form>.login-head>div:nth-of-type(2){
        border-radius:0px  3px   3px  0px;
     }
      .login>.login-content>.login-form>.login-head>div:hover{
          cursor: pointer;
      }
     .login>.login-content>.login-form>.login-head>.login-actived{
          border:1px solid #7AACFF;
          color: #7AACFF;
     }
     .login-user{
           
            margin-top: 35px;
            overflow: hidden;
     }
     .login-user>div{
            width:233px;
            height:36px;
            box-sizing: border-box;
            border:1px solid #F3F3F3;
            border-radius: 4px;
            overflow: hidden;
     }
     .login-user>div>span{
         float: left;
         font-size: 15px;
         line-height: 36px;
         color: #A4A4A4;
         margin-left:9px;
     }
      .login-user>div>input{
            border:0;
            height:15px;
            width:207px;
            float: left;
            margin-top:11px;
            outline: 0;
            text-indent: 1em;
            
            
      }
       .login-user>div:nth-of-type(2){
           margin-top: 14px;
       }
       .login-user>p{
           font-size: 12px;
           color:#F33333;
           margin-top: 11px;
           margin-left:9px;
           margin-bottom:15px;
       }
       .login-test{
          height:15px;
       }
      .login-user>button{
            width:233px;
            height: 40px;
            border: 0;
            font-size: 13px;
            color: #fff;
            /* margin-top: 63px; */
            background:#7AACFF;
            outline:none;
        }
    .login-user>button:active{
          background:#6da4ff;
     }
     .login-wx{
                width:133px;
                font-size: 16px;
                margin-top:26px;
                float:right;
                margin-right:45px;
        }
    .login-wx>div:nth-of-type(1){
                width:133px;
                text-align: center;
                margin-bottom: 14px;
     }  
    .login-wx>div:nth-of-type(2){
                width:133px;
                height:133px;
    }
    .login-wx>div:nth-of-type(2)>img{
                width:100%;
                height:100%;
    }
    .login-user>button:hover{
               cursor: pointer;
    }

}
</style>
    