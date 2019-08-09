<template>
        <div class="main">
            <div class="header-all">
                <div class="header clearBox">
                    <div class="header-logo">
                        <div @click="handleToWeclome"><span class="iconfont icon-hanbaocaidanzhedie navMenu"></span></div>
                        <div class="border-mock"></div>
                        <div><img src="../../assets/aixun.png" alt=""></div>
                        <div><h2 class="">爱迅内部系统</h2></div>
                    </div>
                    <!-- 导航栏部分 -->
                
                         <div class="mockNav wrapper" id="mockNav" ref="main" style="position:relative;">
                           <div class="content mockNavCon" style="width:max-content;">
                            <div v-for="(item,index) in routerArray" class="nav-tag">
                                <div class="nav-tag-kind" :class='{"active": routerActive===item.name?true:false}'>
                                        <div class="border"></div>
                                        <div @click="handleToRouter" :data-id="item.path" :save-name="item.name" class="tagName">{{item.text}}</div>
                                        <div><span class="iconfont icon-del2 iconSpan" :data-id="index" @click="handleToClearRouter" :clear-name="item.name"></span></div>
                                </div>
                            </div>
                         </div> 

                       </div>

                 
                   
                    <!-- 用户登录头像 -->
                    <div class="userCard">
                        <div>
                            <div><img src="../../assets/userInfo.png" alt=""></div>
                            <div v-show="userInfoShow" @click="handleToUserInfoShow" class="userOpear"><img src="../../assets/xia.png" alt=""></div>
                            <div v-show="userInfoHide" @click="handleToUserInfoHide" class="userOpear"><img src="../../assets/shang.png" alt=""></div>
                        </div>
                        <div class="userCardInfo" v-show="userInfoHide">
                            <div><span>{{userName}}</span></div>
                            <div><span>{{email}}</span></div>
                            <div @click="handleToLoginOut"><img src="../../assets/out.png" alt=""><span>退出登录</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wrap">
                    <keep-alive :include="keepAlive">
                             <router-view></router-view>
                    </keep-alive>
                          
            </div>
        </div>
</template>

<script>
import Vuex from "vuex";
import Bscroll from 'better-scroll';
import Cookies from 'js-cookie';
export default {
  data() {
    return {
            userName:"",
            email:"",
            userInfoShow:true,
            userInfoHide:false
    };
  },
  
  computed: {
    ...Vuex.mapState({
      routerArray: state => state.home.routerArray,
      keepAlive: state => state.home.keepAlive,
      routerActive:state=>state.home.routerActive
    })
  },
 watch: {
   
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
  },
  methods: {
    ...Vuex.mapActions({
      //获取培训人员
      //   getTraningOrg:'trainingOrg/getBuildBankManager',
      //获取内部人员
      getUserAdmin: "userAdmin/getUserAdmininfo",
      handleClearRouter: "home/handleClearRouter",
      handlePushRouter:"home/handlePushRouter",
      handleToRouterActive:"home/handleToRouterActive",
      //退出申请品牌认证时将其vuex状态清除
      handleClickVuexApplyBrandCertData:"applyBrandCert/handleClickVuexApplyBrandCertData",
      //退出申请云支付功能总表时删除数据
      handleClearVuexSumCloudPayDataList:"summaryCloudPayment/handleClearDataList",
      //退出时申请品牌认证总表
      handleClearVuexGeneralApplicationBrandCert:"generalApplicationBrandCert/handleClearDatalist",
      //退出时项目品牌总表
      handleClearVuexSummaryBrands:"summaryBrands/handleClearDataList",
      //申请云支付账号总表
      handleClearVuexTaskSummaryStatem:"taskSummaryStatem/handleClearDataList"
    }),
    handleToWeclome() {
      this.$router.push("/payItem");
    },
    //跳转缓存路由
    handleToRouter($event) {
      var routerpath = $event.target.getAttribute("data-id");
      this.$router.push(routerpath);
      var name = $event.target.getAttribute("save-name");
      var list = document.getElementsByClassName('tagName');
      this.handleToRouterActive(name)
    },
    //删除路由缓存
    handleToClearRouter($event) {
      //提示删除confirm
      if (confirm("是否关闭")){
        var index = $event.target.getAttribute("data-id");
        var name = $event.target.getAttribute("clear-name");
        var param = {
          delIndex: index,
          delName: name
        };

        this.handleClearRouter(param);
        //判断是否申请品牌认证
        if(name==="applyBrandCert"){
            this.handleClickVuexApplyBrandCertData();
        }
        //判断是否为申请云支付功能总表
      
        if(name==="summaryCloudPayments"){
            this.handleClearVuexSumCloudPayDataList();
        }

        //判断是否为申请品牌认证总表
        if(name==="generalApplicationBrandCert"){
            this.handleClearVuexGeneralApplicationBrandCert();
        }
        //判断是否项目品牌总表
        if(name==="summaryBrands"){
            this.handleClearVuexSummaryBrands();
        }
        //判断是否为申请云支付账号总表
        if(name ==="taskSummaryStatem"){
            this.handleClearVuexTaskSummaryStatem();
        }
        if (this.$route.name === name) {
          this.$router.push("/payItem");
        }
      } 
    },
  //显示用户登录信息
  handleToUserInfoShow(){
      this.userInfoHide=true;
      this.userInfoShow=false;
  },
  //隐藏用户登录信息
  handleToUserInfoHide(){
      this.userInfoShow=true;
      this.userInfoHide=false;
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
  .header > .header-logo > div:nth-of-type(1) {
    width: 18px;
    height: 16px;
    margin-left: 24px;
    line-height: 16px;
    margin-top: 20px;
  
  }
  .header > .header-logo > div:nth-of-type(1) span {
    font-size: 16px;
    color: #fff;
  }
  .border-mock {
    height: 16px;
    margin: 0 16px;
    margin-top:20px;
    border-left: 1px solid #7aacff;

  }
  .header > .header-logo > div:nth-of-type(3) {
    width: 22px;
    height: 22px;
    margin-top: 17px;
  }
  .header > .header-logo > div:nth-of-type(3) > img {
    width: 100%;
    height: 100%;
  }
  .header > .header-logo > div:nth-of-type(4) {
    margin-left: 10px;
    margin-top: 20px;
  }
  .header > .header-logo > div:nth-of-type(4) > h2 {
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
  height: 118px;
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
  margin-top: 16px;
}
.userCardInfo>div:nth-of-type(2){
  margin-bottom:16px;
  color: #C0C1C5;
  margin-top: 7px;
}
.userCardInfo>div:nth-of-type(3){
  padding-top: 16px;
  border-top: 1px solid #F2F2F2;
}
.userCardInfo>div:nth-of-type(3):hover{
  cursor: pointer;
}
.userCardInfo>div:nth-of-type(3) img{
  width: 19px;
  height: 18px;
  float: left;
}
.userCardInfo>div:nth-of-type(3) span{
  float: left;
  margin-left: 8px;
}

.userOpear:hover{
  cursor: pointer;
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
    width: 14px;
    height: 12px;
    margin-left: 17px;
    line-height: 12px;
    margin-top: 14px;

  }
  .header > .header-logo > div:nth-of-type(1) span {
    font-size: 12px;
    color: #fff;
  }
  .border-mock {
    height: 12px;
    margin: 0 12px;
    margin-top: 14px;
    border-left: 1px solid #7aacff;
  }
  .header > .header-logo > div:nth-of-type(3) {
    width: 16px;
    height: 16px;
    margin-top: 12px;
  }
  .header > .header-logo > div:nth-of-type(3) > img {
    width: 100%;
    height: 100%;
  }
  .header > .header-logo > div:nth-of-type(4) {
    margin-left: 7px;
    margin-top: 14px;
  }
  .header > .header-logo > div:nth-of-type(4) > h2 {
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
  width: 115px;
  height: 100px;
  top: 40px;
  left:0;
  z-index:5;
  box-shadow:0px 1px 8px 0px rgba(152,152,152,0.2);
  padding: 0 8px;
}
.userCardInfo>div{
  width: 100%;
}
.userCardInfo>div:nth-of-type(1){
  margin-top: 12px;
}
.userCardInfo>div:nth-of-type(2){
  margin-bottom:12px;
  color: #C0C1C5;
  margin-top: 5px;
}
.userCardInfo>div:nth-of-type(3){
  padding-top: 12px;
  border-top: 1px solid #F2F2F2;
}
.userCardInfo>div:nth-of-type(3) img{
  width: 14px;
  height: 13px;
  float: left;
}
.userCardInfo>div:nth-of-type(3) span{
  margin-top: -2px;
  float: left;
}
.userOpear:hover{
  cursor: pointer;
}

}
</style>