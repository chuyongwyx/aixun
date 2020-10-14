<template>
        <div class="main">
            <div class="header-all">
                <div class="header clearBox">
                    <div class="header-logo">
                        <div><img src="../../assets/aixun.png" alt=""></div>
                        <div><h2 class="">爱迅内部系统</h2></div>
                    </div>
                    <!-- 导航栏部分 -->
                
                         <div class="mockNav wrapper" id="mockNav" ref="main" style="position:relative;">
                           <div class="content mockNavCon" style="width:max-content;">
                          
                         </div> 

                       </div>
                    <!-- 用户登录头像 -->
                    <div class="userCard" v-if="userCard">
                        <div @click="handleClickUserInfo" class="userOpear" @mouseenter="handleMouseover">
                            <div><img src="../../assets/userInfo.png" alt=""></div>
                            <div v-show="userInfoShow" ><img src="../../assets/xia.png" alt=""></div>
                            <div v-show="userInfoHide" ><img src="../../assets/shang.png" alt=""></div>
                        </div>
                        <div class="userCardInfo" v-show="userInfoHide"  @mouseleave="handleMouseOut">
                            <div><span>{{userName}}</span></div>
                            <div><span>{{email}}</span></div>
                            <div @click="handleToUpdatePsw"><img src="../../assets/mima.png" alt=""><span>修改密码</span></div>
                            <div @click="handleToLoginOut"><img src="../../assets/out.png" alt=""><span>退出登录</span></div>
                        </div>
                    </div>

                    <!-- 修改密码 -->
                    <div class="updatePswModel" v-show="updatePswModel">
                          <div  class="updatePsw">
                                <div class="updateHead"><span>修改密码</span><span class="iconfont icon-chuyidong" @click="handleCloseUpdateModle"></span></div>
                                <div class="updatepsw"><span>原密码:</span> <input type="password" placeholder="请输入原密码..." v-model="beforePsw"  @focus="handleBeforePswFocus" @blur="handleBeforePswBlur"></div>
                                <div class="updatepsw"><span>新密码:</span><input type="password"  placeholder="请输入新密码..."  v-model="newPsw"  @focus="handleNewPswFocus" @blur="handleNewPswBlur"></div>
                                <div class="updatepsw"><span>确认新密码:</span><input type="password" placeholder="请再次输入密码..." v-model="sureNewPsw"  @focus="handleSureNewPswFocus" @blur="handleSureNewPswBlur"></div>
                                <div class="updateFooter"><button @click="handleSaveUpdatePsw"><span v-show="updatePswBtn==false?true:false">保存</span><span v-show="updatePswBtn==false?false:true">保存中...</span></button></div>
                          </div>
                    </div>
                </div>
            </div>
            <div class="wrap">
                    <keep-alive>
                             <router-view></router-view>
                    </keep-alive>        
            </div>
        </div>
</template>

<script>
import Vuex from "vuex";
import Bscroll from 'better-scroll';
import Cookies from 'js-cookie';
 const sha256 = require("js-sha256").sha256;
export default {
  data() {
    return {
            userName:"",
            email:"",
            userInfoShow:true,
            userInfoHide:false,
            updatePswModel:false,
            beforePsw:"",
            newPsw:"",
            sureNewPsw:"",
            beforePlaceHoldColor:"#CDCDCD",
            newPlaceHoldColor:"#CDCDCD",
            surePlaceHoldColor:"#CDCDCD",
            // updatePswBtn:false,
            timers:null,
            userCard:false,

    }; 
  },
  
  computed: {
    ...Vuex.mapState({
      // routerArray: state => state.home.routerArray,
      // keepAlive: state => state.home.keepAlive,
      // routerActive:state=>state.home.routerActive,
      //修改密码成功跳转
      success:state=>state.home.success,
      updatePswBtn:state=>state.home.updatePswBtn
    })
  },
 watch: {
      success(newValue,oldValue){
        if(newValue ==true){
          alert('密码修改成功');
            //  Cookies.remove('name');
            //   Cookies.remove('email');
            //   Cookies.remove('token');
            //   //清除当前所有活跃的按钮
            //   this.handleClearAllRouter();
              this.updatePswModel=false;
              this.beforePsw="";
              this.newPsw="";
              this.sureNewPsw="";
            //   this.$router.push('/login');
        }
      }
  },
  created(){
      this.userName = Cookies.get('name');
      this.email =Cookies.get('email');
  },
 mounted(){
     this.$nextTick(() =>{              
				this.scroll = new Bscroll(this.$refs.main, {
					click: true,
					scrollX:true,
					scrollbar:false,
					mouseWheel:true })
            })

       if(this.$route.name=='welcomehome'||this.$route.name=='payItem'||this.$route.name=="payQuery"||this.$route.name=="abnormalMonitoring"||this.$route.name=="intManage"){
          this.userCard =true;
       }
  },
  methods: {
    ...Vuex.mapActions({
      //修改密码
      handleModifyPassword:"home/modifyPassword"

    }),
    // handleToWeclome() {
    //   if(this.$route.name=="home"){
    //     this.$router.push("/payItem");
    //   }
    // },
  
  //显示用户登录信息
  handleClickUserInfo(){
      if(this.userInfoHide==true){
             this.userInfoHide=false;
             this.userInfoShow=true;
      }else{
            this.userInfoHide=true;
             this.userInfoShow=false;
      }

  },
  //修改密码
  handleToUpdatePsw(){
      this.updatePswModel=true;
  },
  handleCloseUpdateModle(){
      this.updatePswModel=false;
      this.beforePsw="";
      this.newPsw="";
      this.sureNewPsw="";


  },
  //得焦
  handleBeforePswFocus(){
    // if(this.beforePsw == "请输入原密码..."){
    //     this.beforePsw="";
    // }
    //   this.beforePlaceHoldColor="#333333";
  },
  handleNewPswFocus(){
      // if(this.newPsw=="请输入新密码..."){
      //   this.newPsw="";
      // }
      //  this.newPlaceHoldColor ="#333333";

  },
  handleSureNewPswFocus(){
    // if(this.sureNewPsw=="请再次输入新密码..."){
    //   this.sureNewPsw="";
    // }
    // this.surePlaceHoldColor="#333333";
  },
  //失焦
  handleBeforePswBlur(){
    // if(this.beforePsw ==""){
    //    this.beforePsw="请输入原密码...";
    //    this.beforePlaceHoldColor="#CDCDCD";
    // }
  },
  handleNewPswBlur(){
    //   if(this.newPsw ==""){
    //    this.newPsw="请输入新密码...";
    //    this.newPlaceHoldColor="#CDCDCD";
    // }
  },
  handleSureNewPswBlur(){
      // if(this.sureNewPsw==""){
      //   this.sureNewPsw="请再次输入新密码...";
      //   this.surePlaceHoldColor="#CDCDCD";
      // }
  },
  //修改密码
  handleSaveUpdatePsw(){
      if(this.newPsw==""&&this.beforePsw!==""&&this.sureNewPsw!==""){
        alert('新密码不能为空');
      }else if(this.beforePsw==""&&this.newPsw!==""&&this.sureNewPsw!==""){
        alert('请输入原密码');

      }else if(this.sureNewPsw==""&&this.newPsw!==""&&this.beforePsw!==""){
        alert('请再次输入新密码');
      }else if(this.newPsw!==""&&this.newPsw!=="请输入新密码..."&&this.beforePsw!==""&&this.beforePsw!=="请输入原密码..."&&this.sureNewPsw!==""&&this.sureNewPsw!=="请再次输入新密码..."){
          if(this.newPsw!==this.sureNewPsw){
              alert('两次输入新密码不一致')
            }else{
              var _this =this;
            
              if(this.timers){
                  clearTimeout(this.timers);
                
              }
              this.timers =setTimeout(()=>{
                   var param =JSON.stringify({
                    "UsernameOrEmailAddress":Cookies.get('name')!=""?Cookies.get('name'):Cookies.get('email'),
                    "NewPassword":sha256(_this.newPsw).toLocaleUpperCase(),
                    "OldPassword": sha256(_this.beforePsw).toLocaleUpperCase()
                })
               
              _this.handleModifyPassword(param);

              },300)
            }
      }else{
           alert('请填写表单在操作');
      }   
  },
  handleMouseover(){
             this.userInfoHide=true;
             this.userInfoShow=false;
  },
  handleMouseOut(){
          this.userInfoHide=false;
           this.userInfoShow=true;
  },
  //退出登录
  handleToLoginOut(){
    Cookies.remove('name');
    Cookies.remove('email');
    Cookies.remove('token');
    this.$router.push('/login');
  }
  }
};
</script>
<style lang="" scoped>
.main {
  width: 100%;
  height: 100%;
}
@media screen and (min-width: 1400px) {
  .header {
    height: 56px;
    margin: 0 auto;
  }
  .header > .header-logo {
   float: left;
    width: 15%;
    height: 56px;
    align-items: center;
    
  }
  .navMenu{
    cursor: pointer;
  }
  .header > .header-logo>div{
     float: left;
   }
  .header-all {
    width: 100%;
    background: linear-gradient(
      90deg,
      rgba(62, 137, 255, 1) 0%,
      rgba(130, 80, 255, 1) 100%
    );
  }
  /* .header > .header-logo > div:nth-of-type(1) {
    width: 18px;
    height: 16px;
    margin-left: 24px;
    line-height: 16px;
    margin-top: 20px;
  
  } */
  /* .header > .header-logo > div:nth-of-type(1) span {
    font-size: 16px;
    color: #fff;
  }
  .border-mock {
    height: 16px;
    margin: 0 16px;
    margin-top:20px;
    border-left: 1px solid #7aacff;

  } */
  .header > .header-logo > div:nth-of-type(1) {
    width: 22px;
    height: 22px;
    margin-top: 17px;
    margin-left:24px;
  }
  .header > .header-logo > div:nth-of-type(1) > img {
    width: 100%;
    height: 100%;
  }
  .header > .header-logo > div:nth-of-type(2) {
    margin-left: 10px;
    margin-top: 20px;
  }
  .header > .header-logo > div:nth-of-type(2) > h2 {
    color: #fff;
    font-size: 16px;
    line-height:1;
    font-family: "PingFang SC";
  }
  .wrap {
    height: 100%;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    font-size: 14px;
  }
  /* 模拟的各级导航 */
  .mockNav {
    width: 75%;
    float: left;
    height:56px;
    box-sizing: border-box;
    overflow: hidden;
     /* color: #818181;*/
    color: #5f626b;

  }
 .mockNav:hover{
     cursor: pointer;
 }
 .mockNavCon{
    background:rgba(185,202,255,1);
    border-radius:6px 6px 0px 0px;
    overflow: hidden;
    height: 34px;
    margin-top: 23px;
  
 }

  .nav-tag {
    float: left;
    line-height: 33px;
    font-size: 12px;
    position: relative;
   
  }
  .tagName{
    max-width: 48px;
    height: 33px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .nav-tag-kind {
    position: relative;
    text-align: center;
    z-index: 3;
    padding-left: 4px;
   
  }
  .active{
        color: #333333;
        height: 34px;
        background:#F1F4FF;
        border-radius:8px 8px 0px 0px;
        position: relative;
        z-index: 5;
        padding-left:5px;
        padding-right:0px;
}
.active>.border{
      display: none;
}
.active .tagName{
       max-width: max-content;
       height: 33px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
     
  }
.nav-tag-kind>div{
      float: left;
}
.nav-tag-kind>div:nth-of-type(1){
      margin-left: 3px;
}
.nav-tag-kind>div:nth-of-type(2){
  }
.border{
        width: 0;
        height: 15px;
        border-right: 1px solid #333333;
        margin-top: 8px;
        margin-right:5px;
 }
.iconSpan {
    font-size: 16px;
    line-height: 1;
    display: block;
    margin-top: 10px;
  }
.iconSpan:last-of-type{
    margin-right: 4px;
}
.nav-tag:nth-of-type(1)>.nav-tag-kind>.border{
    display: none;
}
.nav-tag-kind> .tagName{
    margin-left: 4px;
}

/* userInfo样式 */
.userCard{
  width: 10%;
  box-sizing: border-box;
  float: left;
  height: 55px;
  padding-left: 82px;
  position: relative;
  
  
}
.userCard>div{
  float:right;
  margin-right: 24px;
}
.userCard>div>div{
  float: left;
}
.userCard>div:nth-of-type(1)>div:nth-of-type(1){
  width: 28px;
  height: 28px;
  margin-top: 15px;
}
.userCard>div:nth-of-type(1)>div:nth-of-type(1) img{
  width: 100%;
  height: 100%;

}
.userCard>div:nth-of-type(1)>div:nth-of-type(2){
  width: 12px;
  height: 9px;
  margin-top: 20px;
  margin-left: 7px;
}
.userCard>div:nth-of-type(1)>div:nth-of-type(2) img{
  width: 100%;
  height: 100%;
}

.userCard>div:nth-of-type(1)>div:nth-of-type(3){
  width: 12px;
  height: 9px;
  margin-top: 20px;
  margin-left: 7px;
}
.userCard>div:nth-of-type(1)>div:nth-of-type(3) img{
  width: 100%;
  height: 100%;
}
.userCardInfo{
  position: absolute;
  width: 157px;
  height: 160px;
  box-shadow:0px 1px 8px 0px rgba(152,152,152,0.2);
  top: 55px;
  padding:0 15px;
  left:0;
  z-index:5;
}
.userCardInfo>div{
  width: 100%;
}
.userCardInfo>div:nth-of-type(1){
  margin-top: 10px;
}
.userCardInfo>div:nth-of-type(2){
  margin-bottom:10px;
  color: #C0C1C5;
  margin-top: 7px;
}
.userCardInfo>div:nth-of-type(3){
  border-top: 1px solid #F2F2F2;
  border-bottom:1px solid #F2F2F2;
}
.userCardInfo>div:nth-of-type(3) span{
  float: left;
  display:block;
  line-height: 47px;
}
.userCardInfo>div:nth-of-type(3) img{
  width: 15px;
  height: 15px;
  float: left;
  margin-top: 13px;
}
.userCardInfo>div:nth-of-type(3) span:nth-of-type(1){
  margin-left:8px;
  color: #666666;
}
.userCardInfo>div:nth-of-type(3):hover{
  cursor: pointer;
}
.userCardInfo>div:nth-of-type(4){
  line-height: 42px;
}

.userCardInfo>div:nth-of-type(4) img{
  width: 15px;
  height: 15px;
  float: left;
  margin-top: 13px;
}
.userCardInfo>div:nth-of-type(4) span{
  margin-left:8px;
  color: #666666;
}

.userCardInfo>div:nth-of-type(4):hover{
  cursor: pointer;
}


/* 修改密码 */
.updatePswModel{
  position: absolute;
  left:0;
  top:0;
  width: 100%;
  height:100%;
  background:rgba(0,0,0,0.2);
  z-index: 11;
}
.updatePsw{
  width:500px;
  height: 360px;
  background: #fff;
  position:absolute;
  top: 50%;
  left: 50%;
  margin-top: -180px;
  margin-left:-250px;
}
.updateHead{
  margin-top: 30px;
  margin-bottom:40px;
  overflow: hidden;
}
.updateHead span:nth-of-type(1){
  float:left;
  margin-left: 203px;
  font-size:20px;
}
.updateHead span:nth-of-type(2){
  float:right;
  margin-right: 30px;
  font-size: 22px;
  color:#9A9A9A;
}
.updatepsw{
  height: 38px;
  overflow: hidden;
  margin-top: 20px;
}

.updatepsw>span{
  display: block;
  width: 138px;
  text-align: right;
  float:left;
  font-size: 14px;
  line-height: 38px;
  
}
.updatepsw>input{
  width:270px;
  height: 38px;
  font-size: 14px;
  outline: none;
  border: 1px solid #E8EBF0;
  margin-left: 27px;
  text-indent: 13px;
}
.updateFooter{
    text-align: center;
    margin-top: 34px;
}
.updateFooter>button{
   background:#5897FF;
   height:48px;
   width:185px;
   border: 0;
   border-radius: 4px;
   font-size: 14px;
   color: #fff;
  
}
}
/*device-width:1024-1400px*/
/* 以1024为标准 */
@media screen and (max-width: 1400px) {
  .header {
    height: 40px;
    margin: 0 auto;
  }
  .header > .header-logo {
   float: left;
    width: 15%;
    height: 40px;
    align-items: center;
    float: left;
  }
  .header-all {
    width: 100%;
    background: linear-gradient(
      90deg,
      rgba(62, 137, 255, 1) 0%,
      rgba(130, 80, 255, 1) 100%
    );
  }
  .navMenu{
    cursor: pointer;
  }
   .header > .header-logo>div{
     float: left;
   }
  
  .header > .header-logo > div:nth-of-type(1) {
    width: 16px;
    height: 16px;
    margin-top: 12px;
    margin-left:17px;
  }
  .header > .header-logo > div:nth-of-type(1) > img {
    width: 100%;
    height: 100%;
  }
  .header > .header-logo > div:nth-of-type(2) {
    margin-left: 7px;
    margin-top: 14px;
  }
  .header > .header-logo > div:nth-of-type(2) > h2 {
    color: #fff;
    font-size: 12px;
    line-height: 1;
    font-family: "PingFang SC";
  }
  .wrap {
    height: 100%;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    /* position: relative; */
    font-size: 12px;
  }
  /* 模拟的各级导航 */
  .mockNav {
    width: 75%;
    float: left;
    height:41px;
    box-sizing: border-box;
    padding-left: 30px; 
    overflow: hidden;
    color: #818181;
  }
 .mockNav:hover{
     cursor: pointer;
 }
  .mockNavCon{
    background:rgba(185,202,255,1);
    border-radius:6px 6px 0px 0px;
    overflow: hidden;
    height: 24px;
    margin-top:17px;
 }
 .tagName{
    max-width: 48px;
    height: 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .nav-tag {
    float: left;
    line-height: 24px;
    font-size: 12px;
    position: relative;
  }
  
  .nav-tag-kind {
    position: relative;
    text-align: center;
    z-index: 3;
   
  }
  .active{
        color: #333333;
        height: 34px;
        background:#F1F4FF;
        border-radius:6px 6px 0px 0px;
        position: relative;
        z-index: 5;
        padding-left:8px;
        padding-right:0px;
}
.active>.border{
      display: none;
}
.active .tagName{
       max-width: max-content;
       height: 33px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
  }
  .nav-tag-kind>div{
      float: left;
  }
  .nav-tag-kind>div:nth-of-type(1){
      margin-left: 2px;
  }
  .nav-tag-kind>div:nth-of-type(2){
  }
 .border{
        width: 0;
        height: 10px;
        border-right: 1px solid #333333;
        margin-top: 8px;
        margin-right:5px;
    }
  .iconSpan {
    font-size: 14px;
    line-height: 1;
    display: block;
    margin-top: 6px;
  }
  .iconSpan:last-of-type{
    margin-right: 2px;
}
.nav-tag:nth-of-type(1)>.nav-tag-kind>.border{
    display: none;
}
.nav-tag:nth-of-type(1)>.nav-tag-kind>div:nth-of-type(2){
    margin-left: 5px;
}
.active{
        color: #333333;
}
/* userInfo样式 */
.userCard{
  width: 10%;
  box-sizing: border-box;
  float: left;
  height: 40px;
  padding-left: 60px;
  position: relative;
  
  
}
.userCard>div{
  float: right;
  margin-right: 17px;
}
.userCard>div>div{
  float: left;
}
.userCard>div:nth-of-type(1)>div:nth-of-type(1){
  width: 28px;
  height: 28px;
  margin-top: 6px;
}
.userCard>div:nth-of-type(1)>div:nth-of-type(1) img{
  width: 100%;
  height: 100%;

}
.userCard>div:nth-of-type(1)>div:nth-of-type(2){
  width: 12px;
  height: 8px;
  margin-top: 13px;
  margin-left: 5px;
}
.userCard>div:nth-of-type(1)>div:nth-of-type(2) img{
  width: 100%;
  height: 100%;
}
.userCard>div:nth-of-type(1)>div:nth-of-type(3){
  width: 12px;
  height: 8px;
  margin-top: 13px;
  margin-left: 5px;
}
.userCard>div:nth-of-type(1)>div:nth-of-type(3) img{
  width: 100%;
  height: 100%;
}


.userCardInfo{
  position: absolute;
  width: 150px;
  height: 117px;
  box-shadow:0px 1px 8px 0px rgba(152,152,152,0.2);
  top: 40px;
  padding:0 11px;
  left:0;
  z-index:5;
}
.userCardInfo>div{
  width: 100%;
}
.userCardInfo>div:nth-of-type(1){
  margin-top: 7px;
}
.userCardInfo>div:nth-of-type(2){
  margin-bottom:7px;
  color: #C0C1C5;
  margin-top: 5px;
}
.userCardInfo>div:nth-of-type(3){
  border-top: 1px solid #F2F2F2;
  border-bottom:1px solid #F2F2F2;
}
.userCardInfo>div:nth-of-type(3) span{
  float: left;
  display:block;
  line-height: 34px;
}
.userCardInfo>div:nth-of-type(3) img{
  width: 11px;
  height: 11px;
  float: left;
  margin-top: 11px;
}
.userCardInfo>div:nth-of-type(3) span:nth-of-type(1){
  margin-left:6px;
  color: #666666;
}
.userCardInfo>div:nth-of-type(3):hover{
  cursor: pointer;
}
.userCardInfo>div:nth-of-type(4){
  line-height: 29px;
}

.userCardInfo>div:nth-of-type(4) img{
  width: 11px;
  height: 11px;
  float: left;
  margin-top: 11px;
}
.userCardInfo>div:nth-of-type(4) span{
  margin-left:6px;
  color: #666666;
}
.userOpear:hover{
  cursor: pointer;
}
/* 修改密码 */
.updatePswModel{
  position: absolute;
  left:0;
  top:0;
  width: 100%;
  height:100%;
  background:rgba(0,0,0,0.2);
  z-index: 11;
}
.updatePsw{
  width:365px;
  height: 263px;
  background: #fff;
  position:absolute;
  top: 50%;
  left: 50%;
  margin-top: -131px;
  margin-left:-183px;
}
.updateHead{
  margin-top: 22px;
  margin-bottom:22px;
  overflow: hidden;
}
.updateHead span:nth-of-type(1){
  float:left;
  margin-left:148px;
  font-size:18px;
}
.updateHead span:nth-of-type(2){
  float:right;
  margin-right: 22px;
  font-size: 18px;
  color:#9A9A9A;
}
.updatepsw{
  height: 28px;
  overflow: hidden;
  margin-top: 15px;
}

.updatepsw>span{
  display: block;
  width: 105px;
  text-align: right;
  float:left;
  font-size: 12px;
  line-height: 28px;
  
}
.updatepsw>input{
  width:197px;
  height: 28px;
  font-size: 12px;
  outline: none;
  border: 1px solid #E8EBF0;
  margin-left: 20px;
  text-indent: 13px;
}
.updateFooter{
    text-align: center;
    margin-top: 25px;
}
.updateFooter>button{
   background:#5897FF;
   height:35px;
   width:135px;
   border: 0;
   border-radius: 4px;
   font-size: 12px;
   color: #fff;
  
}

}
</style>