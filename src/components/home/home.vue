<template>
        <div class="main">
            <div class="header-all">
                <div class="header clearBox">
                    <div class="header-logo">
                        <div @click="handleToWeclome"><span class="iconfont icon-hanbaocaidanzhedie"></span></div>
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
                    <div>

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

export default {
  data() {
    return {};
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
      handleToRouterActive:"home/handleToRouterActive"
    }),
    handleToWeclome() {
      this.$router.push("/home");
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
      if (confirm("是否关闭")) {
        var index = $event.target.getAttribute("data-id");
        var name = $event.target.getAttribute("clear-name");
        var param = {
          delIndex: index,
          delName: name
        };

        this.handleClearRouter(param);
        if (this.$route.name === name) {
          this.$router.push("/home");
        }
      }
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
    margin: 0 auto;
    overflow: hidden;
    font-size: 14px;
  }
  /* 模拟的各级导航 */
  .mockNav {
    width: 75%;
    /* float: left; */
    height:56px;
    box-sizing: border-box;
    overflow: hidden;
     color: #818181;
  }
 .mockNav:hover{
     cursor: pointer;
 }
 .mockNavCon{
   margin-left:41px;
 }
  .nav-tag {
    float: left;
    height: 33px;
    margin-top: 23px;
    line-height: 33px;
    font-size: 14px;
    position: relative;
    background: #DBE6FF;
  }
  .nav-tag:before,
  .nav-tag:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    background-color: #DBE6FF;
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
  }

  .nav-tag:before {
    left: 0;
    transform: skew(-45deg);
    -webkit-transform: skew(45deg);
  }

  .nav-tag:after {
    right: 0;
    transform: skew(45deg);
    -webkit-transform: skew(-45deg);
  }
  .nav-tag-kind {
    position: relative;
    text-align: center;
    z-index: 3;
   
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
        height: 19px;
        border-right: 1px solid #333333;
        margin-top: 5px;
        margin-right:7px;
    }
  .iconSpan {
    font-size: 16px;
    line-height: 1;
  }
.nav-tag:nth-of-type(1)>.nav-tag-kind>.border{
    display: none;
}
.nav-tag:nth-of-type(1)>.nav-tag-kind>div:nth-of-type(2){
    margin-left: 4px;
}
.active{
        color: #333333;
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
    margin: 0 auto;
    overflow: hidden;
    /* position: relative; */
    font-size: 12px;
  }
  /* 模拟的各级导航 */
  .mockNav {
    width: 75%;
    /* float: left; */
    height:41px;
    box-sizing: border-box;
     padding-left: 30px; 
    overflow: hidden;
     color: #818181;
  }
 .mockNav:hover{
     cursor: pointer;
 }
  .nav-tag {
    float: left;
    height: 24px;
    margin-top: 17px;
    line-height: 24px;
    font-size: 12px;
    position: relative;
  }
  .nav-tag:before,
  .nav-tag:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    background-color: #DBE6FF;
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
  }

  .nav-tag:before {
    left: 0;
    transform: skew(-45deg);
    -webkit-transform: skew(45deg);
  }

  .nav-tag:after {
    right: 0;
    transform: skew(45deg);
    -webkit-transform: skew(-45deg);
  }
  .nav-tag-kind {
    position: relative;
    text-align: center;
    z-index: 3;
   
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
        height: 14px;
        border-right: 1px solid #333333;
        margin-top: 4px;
        margin-right:5px;
    }
  .iconSpan {
    font-size: 14px;
    line-height: 1;
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
}
</style>