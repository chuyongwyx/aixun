<template>
  <div class="summaryCloud">
    <div class="summaryCloud-head">
      <h2>申请云支付账号总表</h2>
    </div>
    <div class="search">
      <div>
        <span>做账日期:</span>
      </div>
      <div class="date-start">
        <DatePicker
          :open="openStart"
          :value="dateStart"
          type="date"
          @on-change="handleChangeDateStart"
         class="datepicker-iview" >
          <a
            href="javascript:void(0)"
            @click="handleClickDateStart" class="datepicker-iview-href">
            <template>
              <span
                class="iconfont icon-xiala datepicker-iview-span"
               
              ></span> 
            </template>
            <template>{{dateStart}}</template>
          </a>
        </DatePicker>
      </div>
      <div class="to">
        <span>至</span>
      </div>
      <div class="date-end">
        <DatePicker
          :open=" openEnd"
          :value="dateEnd"
          type="date"
          @on-change="handleChangeDateEnd"
         class="datepicker-iview">
          <a
            href="javascript:void(0)"
            @click="handleClickDateEnd"
           class="datepicker-iview-href"
          >
            <template>
              <span
                class="iconfont icon-xiala datepicker-iview-span"></span>
            </template>
            <template>{{dateEnd}}</template>
          </a>
        </DatePicker>
      </div>

      <div class="status">
        <span>状态:</span>
      </div>
      <div class="select">
        <div class="selected">
          <span>{{selected}}</span>
          <span class="iconfont icon-xiala" @click="handleClickSelected"></span>
        </div>
        <div class="opations" v-show="selectShow" @click="handleClickOpations($event)">
          <div>
            <span class="opation" data-id="1">未受理</span>
          </div>
          <div>
            <span class="opation" data-id="2">已受理</span>
          </div>
          <div>
            <span class="opation" data-id="3">完成</span>
          </div>
          <div>
            <span class="opation" data-id="4">关闭</span>
          </div>
        </div>
      </div>
      <div class="search-btn">
        <button @click="handleToSearchForm">查询</button>
      </div>
      <div class="btns">
        <button class="upClos" @click="handleClickClose" v-show="btnForce">强制关闭</button>
      </div>

      <div class style="clear:both; width:100%;"></div>
    </div>

    <div class="appCloudeForm">
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td>申请日期</td>
          <td>申请单号</td>
          <td>项目编号</td>
          <td>项目名称</td>
          <td>品牌名称</td>
          <td>云支付收款账号</td>
          <td>收款银行</td>
          <td>当前环节</td>
          <td>状态</td>
          <td>进度</td>
        </tr> 
        <tr class="trhover" v-for="(item,index) in dataList" @click="handleTrSelect($event,item,index)">
          <td>{{item.creationTime.substring(0,10)}}</td>
          <td>{{item.number}}</td>
          <td>{{item.projectNumber}}</td>
          <td>{{item.projectName}}</td>
          <td>{{item.brandName}}</td>
          <td>{{item.receivableAccountNumber}}</td>
          <td>{{item.bankName}}</td>
          <td>
              <Poptip placement="bottom-start" trigger="hover" word-wrap class="tip-iview">
              <span class="tip-iview-span">{{item.progress==1?"银行负责人收到任务并分配任务到网点":item.progress==2?"网点办理人员接收任务,上门收资料":item.progress==3?"银行负责人确认开通云支付成功,填写商户信息":item.progress==4?"网点办理人员上门帮商户设置":item.progress==5?"爱迅安排培训机构":item.progress==6?"培训机构负责人收到任务并分配任务到培训人员":item.progress==7?"培训人员接受任务,上门培训":"-"}}</span>
              <div class="api" slot="content">
                <p>{{item.progress==1?"银行负责人收到任务并分配任务到网点":item.progress==2?"网点办理人员接收任务,上门收资料":item.progress==3?"银行负责人确认开通云支付成功,填写商户信息":item.progress==4?"网点办理人员上门帮商户设置":item.progress==5?"爱迅安排培训机构":item.progress==6?"培训机构负责人收到任务并分配任务到培训人员":item.progress==7?"培训人员接受任务,上门培训":"-"}}</p>
              </div>
              </Poptip>
            
          </td>
          <td :data-id="item.status">{{item.status==1?'申请中':item.status==2?'待认证':item.status==3?'已认证':'强制关闭'}}</td>
          <td>{{item.progress}}/{{item.totalProgress}}</td>
        </tr>
      </table>
        <Page :total="count" :page-size="MaxResultCount" class="page" :current="page" @on-change="handleToDatalist" v-show="count<=14?false:true"/>
    </div>

      <!-- 关闭的原因备注 -->
       <div class="closeReasonMain" v-if="closeModel">  
        <div class="closeReason">
                  <div class="accept-head">
                                <span>关闭原因</span>
                                <span class="iconfont icon-chuyidong" @click="handleToCloseReason"></span>
                  </div>
                  <div class="closeRemark">
                            <textarea name="" id="" cols="30" rows="10" v-model="closeRemark"  :style="tipText" @focus="handleTofocus"></textarea>
                  </div>
                  <div class="closeRemarkBtn"> 
                         <button class="closeBtn" @click="handleToCloseReason">取消</button>
                         <button class="sureBtn" @click="handleTocloseRemark">确定</button>
                   </div>

          </div>
      </div>
  </div>
</template>
<script>
import Vuex from 'vuex';
export default {
  name:"taskSummaryStatem",
  data() {
    return {
      openStart: false,
      dateStart: "",
      openEnd: false,
      dateEnd: "",
      selectShow: false,
      selected: "未受理",
      closeModel:false,
      //强制关闭的按钮
      btnForce:false,
      //关闭的理由
      closeRemark:"请输入原因...",
       //提示文字颜色
      tipText:"color:#c5c8ce;",
      selectedId:1,
      MaxResultCount:14,
      page:1,
    };
  },
  computed: {
    ...Vuex.mapState({
          //总条数
          count:state=>state.taskSummaryStatem.count,
          //渲染的数据
          dataList:state=>state.taskSummaryStatem.dataList
    })
  },   
  methods: {
    ...Vuex.mapActions({
          //查询品牌认证申请跟进总表
          getApplicationForms:"taskSummaryStatem/getApplicationForms",
          //强制关闭
          closeApplicationForm:"taskSummaryStatem/closeApplicationForm"
    }),
    //日期生成器
    handleClickDateStart() {
      this.openStart = !this.openStart;
    },
    handleChangeDateStart(date) {
      // var data = date.replace(/-/g, "/");
      this.dateStart = date;
      this.openStart = false;
    },
    handleClickDateEnd() {
      this.openEnd = !this.openEnd;
    },
    handleChangeDateEnd(date) {
      // var data = date.replace(/-/g, "/");
      this.dateEnd = date;
      this.openEnd = false;
    },
    //下拉选择器
    handleClickSelected() {
      this.selectShow = !this.selectShow;
    },
    //选中操作
    handleClickOpations($event) {
      if ($event.target.className === "opation") {
        this.selected = $event.target.innerText;
        this.selectedId = parseInt($event.target.getAttribute('data-id'));
        this.selectShow = false;
      }
    },
    //选中表单中对应的状态
    handleTrSelect($event,item,index){
          var trs = document.getElementsByClassName('trhover');
          var len =trs.length;
          for(var i=0;i<len;i++){
                    trs[i].style.background="";
            }
           trs[index].style.background="rgba(237,238,239,1)";
          this.id =param.id;
          if(item.progress==0 ||item.progress==8){
             this.btnForce= false;
          }else{
             this.btnForce=true;
          }  
    },

    //强制关闭
    handleClickClose(){
      this.closeModel =true;
    },
    //关闭强制关闭的模态框
    handelCloseCloseModel(){
      this.closeModel=false;
    },
    //取消强制关闭按钮模态框
    handleToCloseReason(){
        this.closeModel=false;
        this.closeRemark='请输入原因...';
        this.tipText="color:#c5c8ce;";
    },
    //文本域得焦时
    handleTofocus(){
        if(this.closeRemark=='请输入原因...'){
              this.closeRemark="";
          }
        this.tipText ="color:#515A6E;"
    },
    //查询对应的信息
    handleToSearchForm(){
        var param = JSON.stringify({
          "MaxResultCount":this.MaxResultCount,
          "SkipCount":0, 
          "Sorting":"",
          "StartDate":this.dateStart,
          "EndDate":this.dateEnd,
          "Status":this.selectedId
      })
      this.getApplicationForms(param);
    },
    //分页
    handleToDatalist(page){
          this.page = page;
          var param = JSON.stringify({
            "MaxResultCount":this.MaxResultCount,
            "SkipCount":(this.page-1)*this.MaxResultCount,
            "Sorting":"",
            "StartDate":this.dateStart,
            "EndDate":this.dateEnd,
            "Status":this.selectedId
        })
        this.getApplicationForms(param);
    },
   //确定向后台发送关闭的备注
    handleTocloseRemark(){
      if(this.closeRemark!=='请输入原因...'){
            var param = {
                "id":this.id,
                "CloseRemark":this.closeRemark
            } 
            //强制关闭
            this.closeApplicationForm(param);
            this.closeRemark='请输入原因...';
            this.tipText="color:#c5c8ce;";
            this.closeModel=false;
            
      }
  },


  }
};
</script>
<style scoped>
@media screen  and (min-width:1400px){
 .summaryCloud {
  width: 1400px;
  margin: 0 auto;  
  height: max-content;
  box-sizing: border-box;
  padding-right: 63px;
  position: relative;
  height:100%;
}
.summaryCloud-head {
  margin-top: 81px;
  margin-left: 67px;
}
.summaryCloud-head > h2 {
  font-size: 24px;
  font-weight: 500;
}
.search {
  margin-left: 67px;
  margin-top: 31px;
  height: 41px;
}
.search > div {
  float: left;
}
.search > div {
  line-height: 28px;
}
.search > div:nth-of-type(1) {
  font-size: 14px;
  margin-right: 10px;
}
.date-start {
  width: 140px;
  height: 28px;
  background: rgba(241, 243, 246, 1);
  box-sizing: border-box;
  margin-right: 13px;
}
.datepicker-iview{
   width:140px;
   height:28px;
   line-height:28px;
}
.datepicker-iview-href{
   color:#333333;
   padding-left:13px;
}
.datepicker-iview-span{
   float:right;
   font-size:14px;
   margin-right:12px;
}
.to {
  margin-right: 13px;
  font-size: 14px;
}
.date-end {
  width: 140px;
  height: 28px;
  background: rgba(241, 243, 246, 1);
  box-sizing: border-box;
  margin-right: 13px;
}
.status {
  font-size: 14px;
  margin-left: 29px;
}
.select {
  position: relative;
}
.opations {
  position: absolute;
  top: 28px;
  left: 0;
  font-size: 14px;
  width: 100%;
  background: #fff;
  z-index: 5;
}
.opations > div {
}
.opations > div:hover {
  cursor: pointer;
  background: rgba(241, 243, 246, 1);
}
.opations > div > span {
  margin-left: 11px;
  display: block;
  width: 100%;
  height: 100%;
}
.selected {
  height: 28px;
  width:110px;
  background: rgba(241, 243, 246, 1);
  border-radius: 4px;
}
.selected > span {
  font-size: 14px;
}
.selected > span:nth-of-type(1) {
  margin-left: 11px;
  float: left;
  margin-right: 10px;
}
.selected > span:nth-of-type(2) {
  margin-right: 10px;
  float: right;
}
.search-btn {
  width: 90px;
  height: 36px;
  margin-left: 30px;
  line-height: 36px;
  margin-top: -5px;
}
.search-btn > button {
  background: #5897ff;
  color: #fff;
  font-size: 14px;
  border: 0;
  border-radius: 4px;
  line-height: 36px;
  width: 90px;
  height: 36px;
  outline: 0;
}
.search-btn > button:hover{
  cursor: pointer;
}
.search-btn > button:active{
  background: #6da4ff;
}
.search .btns {
  float: right;
  margin-top: -5px;
}
.btns > button {
  font-size: 14px;
  background: #5897ff;
  color: #fff;
  border-radius: 4px;
  outline: none;
  border: 0;
  padding-left: 14px;
  padding-right: 15px;
  line-height: 36px;
}
.appCloudeForm {
  margin-top: 49px;
  width: 100%;
  padding-right: 64px;
  margin-left: 67px;
}
.appCloudeForm > table {
  table-layout: fixed;
  width: 100%;
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
}
.appCloudeForm > table > tr > td {
  border-bottom: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  line-height: 42px;
  text-align: center;

  font-size: 14px;
  color: #888888;
}
.appCloudeForm > table > tr:nth-of-type(1) > td {
  line-height: 42px;
  text-align: center;
  font-size: 14px;
  background: rgba(241, 243, 246, 1);
  color: #888888;
}
.tip-iview{
  width:100%;
}
.tip-iview-span{
  text-align:center;
  
  display: block;
  height: 30px;
  padding-top: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width:80px;
  margin: 0 auto;
 line-height:30px;
}
.accept-tabel>table > tr > td:nth-of-type(1){
    width: 130px;
}
.accept-tabel>table > tr > td:nth-of-type(2){
    width: 200px;
}
.accept-tabel>table > tr > td:nth-of-type(3){
    width: 120px;
}
.accept-tabel>table > tr > td:nth-of-type(4){
    width: 140px;
}
.accept-tabel>table > tr > td:nth-of-type(5){
    width:120px;
}
.accept-tabel>table > tr > td:nth-of-type(6){
    width: 110px;
}
.accept-tabel>table > tr > td:nth-of-type(7){
    width:150px;
}
.accept-tabel>table > tr > td:nth-of-type(8){
    width:100px;
}
.accept-tabel>table > tr > td:nth-of-type(9){
   width: 100px;
}
.accept-tabel>table > tr > td:nth-of-type(10){
  width:108px;
}
.trhover:hover {
  cursor: pointer;
  background: #edeeef;
}
.ivu-page {
    text-align: center;
    
  }
.page{
    position: absolute;
    left: 0;
    right: 0;
    bottom:200px;
}

/* 模态框的显示隐藏 */
.ClouPayModel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
}
.accept-content3{
  width: 600px;
  height: 440px;
  background: #fff;
  position: absolute;
  top: 275px;
  left: 50%;
  margin-left: -250px;
}
.accept-content3 .accept-head{
  margin: 23px 0;
  overflow: hidden;
}
.accept-content3 .accept-head > span:nth-of-type(1){
  float: left;
  margin-left: 204px;
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
} 
.accept-content3 .accept-head > span:nth-of-type(2)
 {
  float: right;
  font-size: 20px;
  margin-right: 20px;
  color: #d2d2d2;
}
.accept-content3 >.btn-href{
        width:100%;
        text-align: right;
 
}
.accept-content3 >.btn-href>span:nth-of-type(2){
    margin-right:40px;
    color:#5897FF;
    font-size: 14px;
}
.accept-content3 >.btn-href>span:nth-of-type(1){
    font-size: 14px;
    color: #5897FF;
    margin-right:53px;
    
}
.accept-content3>.remarks{
    width:520px;
    height:223px;
    margin-left:40px;
    margin-top: 17px;
}
.accept-content3> .remarks > textarea{
    width:100%;
    height:100%;
    resize: none;
    outline: none;
    text-indent: 1em;
}
.accept-content3> .footer{
    margin-top: 29px;
    overflow: hidden;
}
.accept-content3> .footer>button{
    width: 140px;
    height:36px;
    background:#5897FF;
    border:0;
    outline: none;
    color: #fff;
    font-size: 14px;
    float: right;
    margin-right: 40px;
    border-radius:4px;
}
/* 强制关闭模态框 */
.closeReasonMain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
}
.closeReason{
   width:460px;
   height: 320px;
   position: fixed;
   top: 50%;
   left: 50%;
   margin-left:-230px;
   margin-top:-160px;
   background:#fff;
   z-index:11;
}
.closeReason >.accept-head{
  margin: 20px 0;
  overflow: hidden;
}
.closeReason >.accept-head>span:nth-of-type(1){
  float: left;
  font-size: 20px;
  margin-left:184px;
  line-height: 1;
  line-height: 32px;
}
.closeReason >.accept-head>span:nth-of-type(2){
  float:right;
  margin-right: 34px;
  font-size: 22px;
  color: #C7C6C6;

}
.closeRemark{
  width: 380px;
  height: 140px;
  border: 1px solid #E8EBF0;
  margin: 0 auto;
  padding: 6px;
}
.closeRemark >textarea{
    width:100%;
    height:100%;
    resize: none;
    outline: none;
    border: 0;
}
.closeRemarkBtn{
  padding:0 50px;
  margin-top:24px; 
}
.closeRemarkBtn .closeBtn{
   width:155px;
   height: 40px;
   border:1px solid #5897FF;
   color: #5897FF;
   background: #fff;
   outline: none;
   border-radius: 4px;
   margin-right:20px;
}
.closeRemarkBtn .sureBtn{
   width:155px;
   height: 40px;
   border:0;
   color: #fff;
   background: #5897FF;
   outline: none;
   border-radius: 4px;
   margin-left: 20px;
}
}

@media screen and (max-width:1400px){
  .summaryCloud {
  width: 1024px;
  margin: 0 auto;  
  height: max-content;
  box-sizing: border-box;
  padding-right: 46px;
  position: relative;
  height:100%;
  overflow: hidden;
}
.summaryCloud-head {
  margin-top: 59px;
  margin-left: 49px;
}
.summaryCloud-head > h2 {
  font-size: 19px;
  font-weight: 500;
}
.search {
  margin-left:49px;
  margin-top: 22px;
  height: 30px;
}
.search > div {
  float: left;
}
.search > div {
  line-height: 20px;
}
.search > div:nth-of-type(1) {
  font-size: 12px;
  margin-right: 7px;
}
.date-start {
  width: 102px;
  height: 20px;
  background: rgba(241, 243, 246, 1);
  box-sizing: border-box;
  margin-right: 9px;
}
.datepicker-iview{
   width:102px;
   height:20px;
   line-height:20px;
}
.datepicker-iview-href{
   color:#333333;
   padding-left:9px;
}
.datepicker-iview-span{
   float:right;
   font-size:12px;
   margin-right:8px;
}
.to {
  margin-right: 9px;
  font-size: 12px;
}
.date-end {
  width: 102px;
  height: 20px;
  background: rgba(241, 243, 246, 1);
  box-sizing: border-box;
  margin-right: 9px;
}
.status {
  font-size: 12px;
  margin-left: 21px;
}
.select {
  position: relative;
}
.opations {
  position: absolute;
  top: 20px;
  left: 0;
  font-size: 12px;
  width: 100%;
  background: #fff;
  z-index: 5;
}
.opations > div {
}
.opations > div:hover {
  cursor: pointer;
  background: rgba(241, 243, 246, 1);
}
.opations > div > span {
  margin-left: 8px;
  display: block;
  width: 100%;
  height: 100%;
}
.selected {
  height: 20px;
  width: 90px;
  background: rgba(241, 243, 246, 1);
  border-radius: 4px;
}
.selected > span {
  font-size: 12px;
}
.selected > span:nth-of-type(1) {
  margin-left: 8px;
  margin-right: 7px;
  float: left;
}
.selected > span:nth-of-type(2) {
  margin-right: 10px;
  float: right;
}
.search-btn {
  width: 66px;
  height: 26px;
  margin-left: 22px;
  line-height: 22px;
  margin-top: -4px;
}
.search-btn > button {
  background: #5897ff;
  color: #fff;
  font-size: 12px;
  border: 0;
  border-radius: 4px;
  line-height: 26px;
  width: 66px;
  height: 26px;
  outline: 0;
}
.search-btn > button:hover{
  cursor: pointer;
}
.search-btn > button:active{
  background: #6da4ff;
}
.search .btns {
  float: right;
  margin-top: -4px;
}
.btns > button {
  font-size: 12px;
  background: #5897ff;
  color: #fff;
  border-radius: 4px;
  outline: none;
  border: 0;
  padding-left: 10px;
  padding-right: 11px;
  line-height: 26px;
}

.appCloudeForm {
  margin-top: 36px;
  width: 100%;
  padding-right: 39px;
  margin-left: 49px;
}
.appCloudeForm > table {
  table-layout: fixed;
  width: 100%;
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
}
.appCloudeForm > table > tr > td {
  border-bottom: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  line-height: 30px;
  text-align: center;

  font-size: 12px;
  color: #888888;
}
.appCloudeForm > table > tr:nth-of-type(1) > td {
  line-height: 30px;
  text-align: center;
  font-size: 12px;
  background: rgba(241, 243, 246, 1);
  color: #888888;
}
.tip-iview{
  width:100%;
}
.ivu-poptip-rel{
 
}
.tip-iview-span{
  text-align:center;
  display: block;
  height: 22px;
  padding-top:6px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width:50px;
  margin: 0 auto;
 line-height: 22px;

}
 .accept-tabel>table > tr > td:nth-of-type(1){
    width: 95px;
}
.accept-tabel>table > tr > td:nth-of-type(2){
    width: 146px;
}
.accept-tabel>table > tr > td:nth-of-type(3){
    width: 88px;
}
.accept-tabel>table > tr > td:nth-of-type(4){
    width: 102px;
}
.accept-tabel>table > tr > td:nth-of-type(5){
    width:88px;
}
.accept-tabel>table > tr > td:nth-of-type(6){
    width: 80px;
}
.accept-tabel>table > tr > td:nth-of-type(7){
    width:109px;
}
.accept-tabel>table > tr > td:nth-of-type(8){
    width:73px;
}
.accept-tabel>table > tr > td:nth-of-type(9){
   width: 73px;
}
.accept-tabel>table > tr > td:nth-of-type(10){
  width:80px;
} 
.trhover:hover {
  cursor: pointer;
  background: #edeeef;
}
.ivu-page {
    text-align: center;
    
  }
.page{
    position: absolute;
    left: 0;
    right: 0;
    bottom:100px;
}
/* 模态框的显示隐藏 */
.ClouPayModel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
}
.accept-content3{
  width: 438px;
  height: 321px;
  background: #fff;
  position: absolute;
  top: 200px;
  left: 50%;
  margin-left: -182px;
}
.accept-content3 .accept-head{
  margin: 17px 0;
  overflow: hidden;
}
.accept-content3 .accept-head > span:nth-of-type(1){
  float: left;
  margin-left: 149px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
} 
.accept-content3 .accept-head > span:nth-of-type(2)
 {
  float: right;
  font-size: 16px;
  margin-right: 14.6px;
  color: #d2d2d2;
}
.accept-content3 >.btn-href{
        width:100%;
        text-align: right;
 
}
.accept-content3 >.btn-href>span:nth-of-type(2){
    margin-right:29px;
    color:#5897FF;
    font-size: 12px;
}
.accept-content3 >.btn-href>span:nth-of-type(1){
    font-size: 12px;
    color: #5897FF;
    margin-right:38px;
    
}
.accept-content3>.remarks{
    width:379px;
    height:163px;
    margin-left:29px;
    margin-top: 12px;
}
.accept-content3> .remarks > textarea{
    width:100%;
    height:100%;
    resize: none;
    outline: none;
    text-indent: 1em;
}
.accept-content3> .footer{
    margin-top: 21px;
    overflow: hidden;
}
.accept-content3> .footer>button{
    width: 102px;
    height:26px;
    background:#5897FF;
    border:0;
    outline: none;
    color: #fff;
    font-size: 12px;
    float: right;
    margin-right: 29px;
    border-radius:4px;
}
/* 强制关闭模态框 */
/* 关闭的原因备注 */
.closeReasonMain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
}
.closeReason{
   width:336px;
   height: 234px;
   position: fixed;
   top: 50%;
   left: 50%;
   margin-left:-168px;
   margin-top:-117px;
   background:#fff;
   z-index: 11;
}
.closeReason >.accept-head{
  margin: 15px 0;
  overflow: hidden;
}
.closeReason >.accept-head>span:nth-of-type(1){
  float: left;
  font-size: 16px;
  margin-left:134px;
  line-height: 1;
  line-height: 23px;
}
.closeReason >.accept-head>span:nth-of-type(2){
  float:right;
  margin-right: 25px;
  font-size: 16px;
  color: #C7C6C6;

}
.closeRemark{
  width: 277px;
  height: 102px;
  border: 1px solid #E8EBF0;
  margin: 0 auto;
  padding: 4px;
}
.closeRemark >textarea{
    width:100%;
    height:100%;
    resize: none;
    outline: none;
    border: 0;
}
.closeRemarkBtn{
  padding:0 36px;
  margin-top:17px; 
}
.closeRemarkBtn .closeBtn{
   width:113px;
   height: 29px;
   border:1px solid #5897FF;
   color: #5897FF;
   background: #fff;
   outline: none;
   border-radius: 4px;
   margin-right:15px;
}
.closeRemarkBtn .sureBtn{
   width:113px;
   height: 29px;
   border:0;
   color: #fff;
   background: #5897FF;
   outline: none;
   border-radius: 4px;
   margin-left: 15px;
}

}

</style>
