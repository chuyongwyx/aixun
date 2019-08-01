<template>
  <div class="summaryCloud">
    <div class="summaryCloud-head">
      <h2>任务跟进总表</h2>
    </div>
    <div class="search">
      <div>
        <span>做账日期:</span>
      </div>
      <div class="date-start">
        <DatePicker
          :open="openStart"
          :value="dateStart"
          confirm
          type="date"
          @on-change="handleChangeDateStart"
          @on-clear="handleClearDateStart"
          @on-ok="handleOkDateStart"
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
          confirm
          type="date"
          @on-change="handleChangeDateEnd"
          @on-clear="handleClearDateEnd"
          @on-ok="handleOkDateEnd"
         class="datepicker-iview"
        >
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
            <span class="opation">未受理</span>
          </div>
          <div>
            <span class="opation">已完成</span>
          </div>
          <div>
            <span class="opation">强制关闭</span>
          </div>
          <div>
            <span class="opation">已受理</span>
          </div>
        </div>
      </div>
      <div class="search-btn">
        <button>查询</button>
      </div>
      <div class="btns">
        <button class="upClos" @click="handleClickClose">强制关闭</button>
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
        <tr class="trhover">
          <td>2019/07/11</td>
          <td>Kt201909160001</td>
          <td>004001</td>
          <td>涛涛纺织</td>
          <td>淘淘纺织3号店</td>
          <td>45654654646543165465</td>
          <td>建行</td>
          <td>!爱讯协助商户生阿萨德加金坷垃世纪大厦接口连接三大</td>
          <td>进行中</td>
          <td>1/7</td>
        </tr>
      </table>
        <Page :total="100" />
    </div>
    <!-- 强制关掉 -->
        <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
        <div class="closeModel" v-if="closeModel">
                <div class="close-content">
                    <div class="close-head">
                        <span>提示</span>
                        <span class="iconfont icon-chuyidong" @click="handelCloseCloseModel"></span>
                    </div>
                    <div class="close-body">
                        是否强制关闭?
                    </div>
                    <div class="close-footer">
                        <button>取消</button>
                        <button>确定</button>
                    </div>
                </div>
        </div>
    </transition>
  </div>
</template>
<script>
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
    };
  },
  methods: {
    //日期生成器
    handleClickDateStart() {
      this.openStart = !this.openStart;
    },
    handleChangeDateStart(date) {
      var data = date.replace(/-/g, "/");
      this.dateStart = data;
    },
    handleClearDateStart() {
      this.openStart = false;
    },
    handleOkDateStart() {
      this.openStart = false;
    },
    handleClickDateEnd() {
      this.openEnd = !this.openEnd;
    },
    handleChangeDateEnd(date) {
      var data = date.replace(/-/g, "/");
      this.dateEnd = data;
    },
    handleClearDateEnd() {
      this.openEnd = false;
    },
    handleOkDateEnd() {
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
        this.selectShow = false;
      }
    },
    //强制关闭
    handleClickClose(){
      this.closeModel =true;
    },
    //关闭强制关闭的模态框
    handelCloseCloseModel(){
      this.closeModel=false;
    }
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
  margin-left: 104px;
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
  background: rgba(241, 243, 246, 1);
  border-radius: 4px;
}
.selected > span {
  font-size: 14px;
}
.selected > span:nth-of-type(1) {
  margin-left: 11px;
  margin-right: 10px;
}
.selected > span:nth-of-type(2) {
  margin-right: 14px;
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
  /* table-layout: fixed; */
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

/* .accept-tabel>table > tr > td:nth-of-type(1){
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
  width:110px;
} */
.trhover:hover {
  cursor: pointer;
  background: #edeeef;
}
.page > .ivu-page-item a {
  
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
.closeModel{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height:100%;
    background:rgba(0,0,0,0.3);
}
.close-content{
    position: absolute;
    top: 50%;
    left:50%;
    margin-left:-210px;
    margin-top:-130px;
    width:420px;
    /* height:260px; */
    background:#fff;
}
.close-head{
    margin-top: 29px;
    overflow: hidden;
}
.close-head > span:nth-of-type(1){
  float: left;
  margin-left: 187px;
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
 .close-head > span:nth-of-type(2)
 {
  float: right;
  font-size: 20px;
  margin-right: 20px;
  color: #d2d2d2;
}
.close-body{
    margin-top: 54px;
    margin-bottom: 68px;
    text-align: center;
    font-size: 16px;
}
.close-footer{
    margin-left:40px;
    margin-bottom:23px;
}
.close-footer>button:nth-of-type(1){
    width:160px;
    height:48px;
    font-size: 14px;
    outline: none;
    border:1px solid rgba(88,151,255,1);
    background:#fff;
    border-radius: 4px;
    color: #5897FF;
    margin-right:20px; 
}
.close-footer>button:nth-of-type(2){
    width:160px;
    height:48px;
    background:#5897FF;
    color:#fff;
    font-size: 14px;
    outline: none;
    border:1px solid #5897FF;
} 
}

@media screen and (max-width:1400px){
  .summaryCloud {
  width: 1024px;
  margin: 0 auto;  
  height: max-content;
  box-sizing: border-box;
  padding-right: 46px;
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
  margin-left: 76px;
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
  background: rgba(241, 243, 246, 1);
  border-radius: 4px;
}
.selected > span {
  font-size: 12px;
}
.selected > span:nth-of-type(1) {
  margin-left: 8px;
  margin-right: 7px;
}
.selected > span:nth-of-type(2) {
  margin-right: 10px;
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
  /* table-layout: fixed; */
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

/* .accept-tabel>table > tr > td:nth-of-type(1){
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
  width:110px;
} */
.trhover:hover {
  cursor: pointer;
  background: #edeeef;
}
.page > .ivu-page-item a {
  
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
.closeModel{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height:100%;
    background:rgba(0,0,0,0.3);
}
.close-content{
    position: absolute;
    top: 50%;
    left:50%;
    margin-left:-153px;
    margin-top:-95px;
    width:306px;
    /* height:260px; */
    background:#fff;
}
.close-head{
    margin-top: 21px;
    overflow: hidden;
}
.close-head > span:nth-of-type(1){
  float: left;
  margin-left: 136px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
 .close-head > span:nth-of-type(2)
 {
  float: right;
  font-size: 16px;
  margin-right: 15px;
  color: #d2d2d2;
}
.close-body{
    margin-top: 39px;
    margin-bottom: 49px;
    text-align: center;
    font-size: 14px;
}
.close-footer{
    margin-left:29px;
    margin-bottom:17px;
}
.close-footer>button:nth-of-type(1){
    width:117px;
    height:35px;
    font-size: 12px;
    outline: none;
    border:1px solid rgba(88,151,255,1);
    background:#fff;
    border-radius: 4px;
    color: #5897FF;
    margin-right:15px; 
}
.close-footer>button:nth-of-type(2){
    width:117px;
    height:35px;
    background:#5897FF;
    color:#fff;
    font-size: 12px;
    outline: none;
    border:1px solid #5897FF;
} 
}

</style>
