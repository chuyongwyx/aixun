<template>
  <div class="buildBank">
    <div class="buildBank-head">
      <h2>兴业</h2>
    </div>
    <div class="buildBankManage">
      <div :class="{'build-active':ManagerShow}" @click="handelToManager">
        <span>银行负责人</span>
        <span>({{ buildBankManager.length}})</span>
      </div>
      <div :class="{'build-active':DealShow}" @click="handelToDeal">
        <span>银行办理人员</span>
        <span>({{buildBankDeal.length}})</span>
      </div>
    </div>
    <!-- 银行负责人 --> 
    <div class="buildBank-form buildBankManager" v-if="ManagerShow">
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td>姓名</td>
          <td>手机号码</td>
          <td>状态</td>
        </tr>
        <tr v-for="(item,index) in buildBankManager ">
          <td>{{item.name}}</td>
          <td>{{item.mobile}}</td>
          <td @click="handelBankMangerShow" class="status" :data-id="item.id" style="color:rgb(88, 151, 255);">{{item.status}}</td>
        </tr>
      </table>
      <div class="footer">
        <button @click="handelToAddManager">添加负责人</button>
      </div>
    </div>

    <!-- 银行办理人 -->
    <div class="buildBank-form buildBankDeal" v-if="DealShow">
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td>网点</td>
          <td>姓名</td>
          <td>手机号码</td>
          <td>工作证</td>
          <td>状态</td>
        </tr>
        <tr v-for="(item) in this.buildBankDeal ">
          <td>{{item.bankOutletName}}</td>
          <td>{{item.name}}</td>
          <td>{{item.mobile}}</td>
          <td :style="workCard" class="findCard" @click="handleTofindCard($event,item)" >查看附件</td>
          <td class="status" :data-id="item.id">{{item.status}}</td>
        </tr>
      </table>
    </div>

    <!-- buildbank页面模态框 -->
  
      <div class="buildBankWx-model" v-if="BuildBandShow">
        <!-- 邀请加入微信扫一扫 -->

        <div class="wx">
          <div class="wx-head">
            <span>邀请加入</span>
            <span class="iconfont icon-chuyidong" @click="handelToAddHide"></span>
          </div>
          <div class="wx-tit">
            <p>扫一扫成为兴业负责人</p>
          </div>
          <div class="wx-er">
            <img :src="buildBankWxER" alt />
          </div>
        </div>
      </div>
   
   
      <div class="buildBankManger-model" v-if="BuildBandManager">
        <!-- 银行负责人信息       -->
        <div class="bankManagerInfo">
          <div class="bankManager-head">
            <span>银行负责人</span>
            <span class="iconfont icon-chuyidong" @click="handelBankMangerHide"></span>
          </div>
          <div class="bankManager-content">
                <div>
                    <div>姓名：</div>
                    <div>{{buildUserInfo.name}}</div>
                </div>
                <div>
                    <div>手机号码：</div>
                    <div>{{buildUserInfo.mobile}}</div>
                </div>
                <div>
                    <div>工作证：</div>
                    <div class="workCard">
                        <img :src="buildUserInfo.workingCard" alt />
                    </div>
                </div>
               
          </div>
          
           <div class="bankManager-footer footerModel" v-if="buildUserInfo.status===1?true:false">
                <div  @click="handleClickUnpass" :data-id="buildUserInfo.id" :class="{'examine-active':footerMangerUnPass}">审核不通过</div>
                <div  @click="handleClickExaminePass" :data-id="buildUserInfo.id" :class="{'examine-active':footerMangerPass}">审核通过</div>
           </div>
            <div class="bankManager-footer2 footerModel" v-if="buildUserInfo.status===2?true:false">
                <div @click="handleClickRevoke" :data-id="buildUserInfo.id">撤销负责人资格</div>
           </div>
            <div class="bankManager-footer2 footerModel" v-if="buildUserInfo.status===3?true:false"></div>
          
            <div class="opeationTip" v-if="opeationTip">
                 <div class="opeationTip-head"><span>提示</span><span class="iconfont icon-chuyidong" @click="handleToCloseOpeationTip"></span></div>
                 <div class="opeationTip-body">
                        <p>是否确认撤销办理人资格，确认撤销后，</p>
                        <p>该人员后续将无法注册成为其他办理人</p>
                 </div>
                 <div class="opeationTip-footer">
                        <button @click="handleToCloseOpeationTip">取消</button>
                        <button @click="handleClickRevokeSure">确定</button>
                 </div>
            </div>

            <div class="opeationTip" v-if="opeationTipFail">
                 <div class="opeationTip-head"><span>提示</span><span class="iconfont icon-chuyidong" @click="handleToCloseOpeationFailTip"></span></div>
                 <div class="opeationTip-body">
                        <p>确认失败</p>
                 </div>
                 <div class="opeationTip-footer">
                        <button @click="handleToCloseOpeationFailTip">取消</button>
                        <button @click="handleClickUnpassSure">确定</button>
                 </div>
            </div>

        </div>
      </div>
  
    <!-- 查看办理人员附件 -->
          <div class="findDealCard" v-if="WorkingCarById">
                <div class="findDealCardConent">
                     <div><span>工作证</span><span class="iconfont icon-chuyidong" @click="handleColseFindDealCardConent"></span>  </div>
                     <div class="CardImg">
                          <img :src="findWorkingCard" alt="">
                     </div>
                </div>
          </div>
  </div>
</template>
<script>
import Vuex from "vuex";
import Cookies from "js-cookie";
import axios from 'axios';
let Base64 = require("js-base64").Base64;
export default {
  name:"industrialBank",
  data() {
    return {
      ManagerShow: true,
      DealShow: false,
      BuildBandShow: false,
      BuildBandManager:false,
      //操作后提示
      opeationTip:false,
      //审核失败提示
      opeationTipFail:false,
      //
      // BuildBandDeal:false,
      footerExamine:false,
      //办理人员附件
      WorkingCarById:false,
      footerCancel:false,
      //负责人审核按钮颜色
      footerMangerUnPass:false,
      footerMangerPass:true,
      //处理人审核按钮颜色
      footerDealUnPass:false,
      footerDealPass:true,
      workCard: "color:#5897FF",
      param:5,
      userId:''
    };
  },
  computed:{
    ...Vuex.mapState({
      buildBankManager: state => state.industrialBank.buildBankManager,
      buildBankDeal: state => state.industrialBank.buildBankDeal,
      buildBankWxER: state => state.industrialBank.buildBankWxEr, 
      //单个用户信息
      buildUserInfo: state=>state.industrialBank.buidlUserInfo,
      //查看办理人员附件
      findWorkingCard:state=>state.industrialBank.findWorkingCard
  })
  },
  methods: {
    ...Vuex.mapActions({
      getbuildManagerWxEr: "industrialBank/getbuildManagerWxEr",
      getBuildUserInfo: "industrialBank/getBankUserInfo",
      //获取建行用户信息
      getBuildBankManager: 'industrialBank/getBuildBankManager',
      // 审核建行用户信息
      putExaminePass:"industrialBank/putExaminePass",
      //审核不通过
      refuseUserUnpass:"industrialBank/refuseUserInfo",
      //撤销建行负责人
      revokeBuidlManager:"industrialBank/revokeBuidlManager",
      //查看办理人员附件
      getWorkingCardByID:"industrialBank/getWorkingCardByID",
    }),
    //银行负责人切换
    handelToManager() {
        this.ManagerShow = true;
        this.DealShow = false;
    },
    //银行处理人切换
    handelToDeal(){
        this.ManagerShow = false;
        this.DealShow = true;
    },
    //添加负责人扫描二维码
    handelToAddManager(){
      this.getbuildManagerWxEr(this.param);
          this.BuildBandShow = true;
    },
    handelToAddHide() {
      this.BuildBandShow = false;
    },
    //查看负责人的状态信息
    handelBankMangerShow($event){
        //传递当前id获取用户信息
        var paramId = $event.target.getAttribute('data-id');
        this.getBuildUserInfo(paramId);
        this.BuildBandManager=true;
    },
    //查看办理人员的状态信息
    // handelBankDealShow($event){
    //   //传递当前id获取用户信息
    //     var paramId = $event.target.getAttribute('data-id');
    //     this.getBuildUserInfo(paramId);
    //     this.BuildBandDeal=true;
    // },

    //隐藏建行负责人模态框
     handelBankMangerHide(){
         this.BuildBandManager=false;
     },
     //隐藏建行处理人状态信息
    handelBankDealHide(){
        this.BuildBandDeal =false;
    },
     //撤销建行负责人资格
     handleClickRevoke($event){
          this.opeationTip =true;
          this.userId =$event.target.getAttribute('data-id');
         
     },
     handleClickRevokeSure(){
          var param =JSON.stringify({
            "id":this.userId
          })
         
          this.revokeBuidlManager(param);
          this.getBuildBankManager();
          this.opeationTip=false;
           this.opeationTipFail=false;
          this.BuildBandManager=false;
     },
     //审核不通过
     handleClickUnpass($event){
        this.userId =$event.target.getAttribute('data-id');
         this.opeationTipFail=true;
        
      
     },
     handleClickUnpassSure(){
       var param =JSON.stringify({
         "id":this.userId
       }) 
        this.refuseUserUnpass(param);
        this.getBuildBankManager();
        this.BuildBandManager=false;
        this.opeationTip=false;
        this.opeationTipFail=false;
     },
     //审核通过
     handleClickExaminePass($event){
       var userId =$event.target.getAttribute('data-id');
       var param =JSON.stringify({
         "id":userId
       })
        this.putExaminePass(param)
        this.getBuildBankManager();
         this.BuildBandManager=false;   
        this.opeationTip=false;
        this.opeationTipFail=false;
     },
     //查看办理人员附件
     handleTofindCard($event,param){
        this.getWorkingCardByID(param.id);
        this.WorkingCarById=true;
     },
     //关闭办理人员附件
     handleColseFindDealCardConent(){
        this.WorkingCarById=false;
     },
     //关闭提示框
     handleToCloseOpeationTip(){
       this.opeationTip =false;
     },
     //关闭失败提示框
     handleToCloseOpeationFailTip(){
       this.opeationTipFail=false;
     }


  },
  created() {
      //获取建行用户信息
       this.getBuildBankManager();
  },
  mounted() {
   
  },
  beforeUpdate() {},
  updated(){
  }
};
</script>
<style lang="" scoped>
@media screen and (min-width:1400px){

.buildBank {
  width: 1400px;
  margin:0 auto;
  box-sizing: border-box;
  padding-left: 90px;
}
.buildBank-head {
  margin-top: 80px;
  margin-bottom: 49px;
}
.buildBank-head h2 {
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 1;
}
.buildBank-form > table {
  width: 700px;
  table-layout: fixed;
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
}
.buildBank-form > table > tr > td {
  border-bottom: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  line-height: 30px;
  text-align: left;
  text-indent: 15px;
  font-size: 14px;
  color: #888888;
}
.buildBank-form > table > tr:nth-of-type(1) > td {
  line-height: 30px;
  text-align: left;
  text-indent: 15px;
  font-size: 14px;
  background: rgba(241, 243, 246, 1);
  color: #888888;
}
.status:hover{
    cursor: pointer;
}
.buildBankManage {
  overflow: hidden;
  margin-bottom: 41px;
}
.buildBankManage > div {
  float: left;
  width: 192px;
  height: 42px;
  box-sizing: border-box;
  border: 1px solid #e7e7e7;
  background: #f1f3f6;
  line-height: 42px;
  text-align: center;
  font-size: 14px;
}
.buildBankManage > div:hover {
  cursor: pointer;
}
.buildBankManage .build-active {
  background: #e8eaec;
}
.findCard:hover{
  cursor: pointer;
}
.footer {
  width: 122px;
  height: 36px;
  margin-top: 50px;
}
.footer > button {
  width: 100%;
  height: 100%;
  outline: none;
  border: 0;
  color: #fff;
  background: #5897ff;
  font-size: 14px;
  border-radius: 4px;
}
/* 建行模态框 */
.buildBankWx-model,
.buildBankManger-model {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: rgba(0, 0, 0, 0.3);
}
/* 邀请加入微信 */
.wx {
  width: 450px;
  height: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -225px;
  margin-top: -240px;
  background: #fff;
}
.wx-head {
  text-align: center;
  margin-top: 30px;
  overflow: hidden;
}
.wx-head > span:nth-of-type(1) {
  font-size: 20px;
  float: left;
  margin-left: 178px;
}
.wx-head > span:nth-of-type(2) {
  float: right;
  margin-right: 29px;
  font-size: 20px;
  color: #9a9a9a;
}
.wx-tit {
  margin-top: 33px;
  margin-bottom: 38px;
  text-align: center;
  font-size: 14px;
}
.wx-er {
  width: 278px;
  height: 278px;
  margin: 0 auto;
  
}
.wx-er > img {
  width: 100%;
  height: 100%;
}

/* 银行负责人 */
.bankManagerInfo {
  width: 600px;
  height: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -300px;
  margin-top: -240px;
  background: #fff;
}
.bankManager-head {
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 43px;
}
.bankManager-head > span:nth-of-type(1) {
  float: left;
  margin-left: 240px;
  font-size: 20px;
}
.bankManager-head > span:nth-of-type(2) {
  float: right;
  margin-right: 30px;
  font-size: 20px;
}
.bankManagerInfo > .bankManager-content {
  margin-left: 64px;
}
.bankManagerInfo > .bankManager-content>div{
    overflow: hidden;
}
.bankManagerInfo > .bankManager-content>div>div{
    float:left;
}
.bankManagerInfo > .bankManager-content>div>div:nth-of-type(1){
    width:126px;
    text-align: left;
    font-size: 16px;
    margin-bottom:20px;
    font-family:PingFangSC-Regular;
}
.bankManagerInfo > .bankManager-content>div>div:nth-of-type(2){
    text-align: left;
    font-size: 16px;
}
.bankManager-footer{
    margin-top: 62px;
    margin-left:140px;
}
.bankManager-footer>div{
    width:140px;
    height:36px;
    border:1px solid #5897FF;
    border-radius:4px;
    float:left;
    line-height: 36px;
    font-size: 14px;
    text-align: center;
    color:#5897FF;
    
}
.bankManager-footer>div:nth-of-type(1){
    margin-right:40px;
}
.bankManager-active{
    background:#5897FF;
    color: #fff;
}
.workCard{
        width:180px;
        height:160px;

}
.workCard>img{
      width: 100%;
      height:100%;
}

.bankManagerInfo .examine-active{
  color:#fff;
  background:#5897FF;
}

/* 撤销负责人资格 */
.bankManager-footer2{
     margin-top: 62px;
    
}
.bankManager-footer2>div{
     width:170px;
    height:36px;
    border:1px solid #5897FF;
    border-radius:4px;
    line-height: 36px;
    font-size: 14px;
    text-align: center;
    margin: 0 auto;
    background:#5897FF;
    color: #fff;
}
.footerModel>div:hover{
  cursor: pointer;
}
/* 查看办理人员附件 */
.findDealCard{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index:5;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
}
.findDealCardConent{
   width: 450px;
   height: 450px;
   position: absolute;
   top:50%;
   left:50%;
   z-index:6;
   background: #fff;
   margin-left: -225px;
   margin-top: -240px;
   font-size: 20px;
}
.findDealCardConent>div:nth-of-type(1){
  overflow: hidden;
}
.findDealCardConent>div:nth-of-type(1)>span:nth-of-type(1){
  margin-left: 200px;
  float: left;
  margin-top: 30px;
}
.findDealCardConent>div:nth-of-type(1)>span:nth-of-type(2){
  margin-top: 30px;
  float: right;
  font-size: 20px;
  margin-right:30px;
  color: #9A9A9A; 
}
.CardImg{
  width: 278px;
  height: 278px;
  margin: 0 auto;
  margin-top: 60px;
}
.CardImg>img{
  width: 100%;
  height: 100%;
}

/* 操作提示框 */
.opeationTip{
  position: absolute;
  top:50%;
  left:50%;
  z-index: 5;
  width:420px;
  height:220px;
  margin-left:-210px;
  margin-top: -80px;
  background:rgba(255,255,255,1);
  box-shadow:0px 4px 21px 0px rgba(199, 198, 198, 0.35);
}
.opeationTip-head{
  overflow: hidden;
  margin-top:31px;
}
.opeationTip-head>span:nth-of-type(1){
  float:left;
  margin-left: 187px;
  font-size: 20px;
}
.opeationTip-head>span:nth-of-type(2){
  float:right;
  margin-right:30px;
  color: #D2D2D2;
  font-size: 20px;
}
.opeationTip-body{
   text-align: center;
   font-size: 14px;
   margin-top: 30px;
}
.opeationTip-footer{
  margin-top: 26px;
}
.opeationTip-footer>button{
    width: 160px;
    height:40px;
    float:left;
    outline: none;
}
.opeationTip-footer>button:nth-of-type(1){
  border:1px solid #5897FF;
  background:#fff;
  color: #5897FF;
  border-radius:4px;
  margin-left:40px;
  margin-right:20px;
}
.opeationTip-footer>button:nth-of-type(2){
  border:0;
  background:#5897FF;
  color: #FFFEFEFE;
  border-radius:4px;
}

}

@media screen  and (max-width: 1400px){
  .buildBank {
  width: 1024px;
  margin:0 auto;
  box-sizing: border-box;
  padding-left: 65px;
}
.buildBank-head {
  margin-top: 58px;
  margin-bottom: 35px;
}
.buildBank-head h2 {
  font-size: 19px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 1;
}
.buildBank-form > table {
  width: 430px;
  table-layout: fixed;
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
}
.buildBank-form > table > tr > td {
  border-bottom: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  line-height: 22px;
  text-align: left;
  text-indent: 15px;
  font-size: 12px;
  color: #888888;
}
.buildBank-form > table > tr:nth-of-type(1) > td {
  line-height: 22px;
  text-align: left;
  text-indent: 15px;
  font-size: 12px;
  background: rgba(241, 243, 246, 1);
  color: #888888;
}
.status:hover{
    cursor: pointer;
}
.buildBankManage {
  overflow: hidden;
  margin-bottom: 30px;
}
.buildBankManage > div {
  float: left;
  width: 140px;
  height: 30px;
  box-sizing: border-box;
  border: 1px solid #e7e7e7;
  background: #f1f3f6;
  line-height: 30px;
  text-align: center;
  font-size: 12px;
}
.buildBankManage > div:hover {
  cursor: pointer;
}
.buildBankManage .build-active {
  background: #e8eaec;
}
.findCard:hover{
  cursor: pointer;
}
.footer {
  width: 89px;
  height: 26px;
  margin-top: 36px;
}
.footer > button {
  width: 100%;
  height: 100%;
  outline: none;
  border: 0;
  color: #fff;
  background: #5897ff;
  font-size: 12px;
  border-radius: 4px;
}
/* 建行模态框 */
.buildBankWx-model,
.buildBankManger-model {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: rgba(0, 0, 0, 0.3);
}
/* 邀请加入微信 */
.wx {
  width: 328px;
  height: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 5;
  margin-left: -164px;
  margin-top: -175px;
  background: #fff;
}
.wx-head {
  text-align: center;
  margin-top: 22px;
  overflow: hidden;
}
.wx-head > span:nth-of-type(1) {
  font-size: 16px;
  float: left;
  margin-left: 130px;
}
.wx-head > span:nth-of-type(2) {
  float: right;
  margin-right: 21px;
  font-size: 16px;
  color: #9a9a9a;
}
.wx-tit {
  margin-top: 24px;
  margin-bottom: 28px;
  text-align: center;
  font-size: 12px;
}
.wx-er {
  width: 203px;
  height: 203px;
  margin: 0 auto;
  
}
.wx-er > img {
  width: 100%;
  height: 100%;
}

/* 银行负责人 */
.bankManagerInfo {
  width: 438px;
  height: 350px;
  position: absolute;
  z-index: 5;
  top: 50%;
  left: 50%;
  margin-left: -219px;
  margin-top: -175px;
  background: #fff;
}
.bankManager-head {
  overflow: hidden;
  margin-top: 22px;
  margin-bottom: 31px;
}
.bankManager-head > span:nth-of-type(1) {
  float: left;
  margin-left: 175px;
  font-size: 16px;
}
.bankManager-head > span:nth-of-type(2) {
  float: right;
  margin-right: 22px;
  font-size: 16px;
}
.bankManagerInfo > .bankManager-content {
  margin-left: 47px;
}
.bankManagerInfo > .bankManager-content>div{
    overflow: hidden;
}
.bankManagerInfo > .bankManager-content>div>div{
    float:left;
}
.bankManagerInfo > .bankManager-content>div>div:nth-of-type(1){
    width:92px;
    text-align: left;
    font-size: 13px;
    margin-bottom:15px;
    font-family:PingFangSC-Regular;
}
.bankManagerInfo > .bankManager-content>div>div:nth-of-type(2){
    text-align: left;
    font-size: 14px;
}
.bankManager-footer{
    margin-top: 45px;
    margin-left:102px;
}
.bankManager-footer>div{
    width:102px;
    height:26px;
    border:1px solid #5897FF;
    border-radius:4px;
    float:left;
    line-height: 26px;
    font-size: 12px;
    text-align: center;
    color:#5897FF;
    
}
.bankManager-footer>div:nth-of-type(1){
    margin-right:29px;
}
.bankManager-active{
    background:#5897FF;
    color: #fff;
}
.workCard{
        width:131px;
        height:116px;

}
.workCard >img{
        width: 100%;
        height: 100%;
}

.bankManagerInfo .examine-active{
  color:#fff;
  background:#5897FF;
}

/* 撤销负责人资格 */
.bankManager-footer2{
     margin-top: 45px;
    
}
.bankManager-footer2>div{
     width:124px;
    height:26px;
    border:1px solid #5897FF;
    border-radius:4px;
    line-height: 26px;
    font-size: 12px;
    text-align: center;
    margin: 0 auto;
    background:#5897FF;
    color: #fff;
}
.footerModel>div:hover{
  cursor: pointer;
}
/* 查看办理人员附件 */
.findDealCard{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
}
.findDealCardConent{
   width: 328px;
   height: 328px;
   position: absolute;
   top:50%;
   left:50%;
   z-index:6;
   background: #fff;
   margin-left: -164px;
   margin-top: -164px;
   font-size: 16px;
}
.findDealCardConent>div:nth-of-type(1){
  overflow: hidden;
}
.findDealCardConent>div:nth-of-type(1)>span:nth-of-type(1){
  margin-left: 146px;
  float: left;
  margin-top: 22px;
}
.findDealCardConent>div:nth-of-type(1)>span:nth-of-type(2){
  margin-top: 22px;
  float: right;
  font-size: 14px;
  margin-right:22px;
  color: #9A9A9A; 
}
.CardImg{
  width: 203px;
  height: 203px;
  margin: 0 auto;
  margin-top: 44px;
}
.CardImg>img{
  width: 100%;
  height: 100%;
}

/* 操作提示框 */
.opeationTip{
  position: absolute;
  top:50%;
  left:50%;
  z-index: 5;
  width:306px;
  height:160px;
  margin-left:-153px;
  margin-top: -58px;
  background:rgba(255,255,255,1);
  box-shadow:0px 4px 21px 0px rgba(199, 198, 198, 0.35);
}
.opeationTip-head{
  overflow: hidden;
  margin-top:23px;
}
.opeationTip-head>span:nth-of-type(1){
  float:left;
  margin-left: 136px;
  font-size: 15px;
}
.opeationTip-head>span:nth-of-type(2){
  float:right;
  margin-right:22px;
  color: #D2D2D2;
  font-size: 15px;
}
.opeationTip-body{
   text-align: center;
   font-size: 12px;
   margin-top: 22px;
}
.opeationTip-footer{
  margin-top: 19px;
}
.opeationTip-footer>button{
    width: 117px;
    height:29px;
    float:left;
    outline: none;
}
.opeationTip-footer>button:nth-of-type(1){
  border:1px solid #5897FF;
  background:#fff;
  color: #5897FF;
  border-radius:4px;
  margin-left:29px;
  margin-right:15px;
}
.opeationTip-footer>button:nth-of-type(2){
  border:0;
  background:#5897FF;
  color: #FFFEFEFE;
  border-radius:4px;
}

}
</style>