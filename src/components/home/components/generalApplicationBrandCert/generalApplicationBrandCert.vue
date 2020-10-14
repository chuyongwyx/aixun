<template>
  <div class="summaryCloud">
    <div class="summaryCloud-head">
      <h2>申请品牌认证总表</h2>
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
          class="datepicker">
          <a
            href="javascript:void(0)"
            @click="handleClickDateStart"
            class="datepicker-href"
          >
            <template>
              <span
                class="iconfont icon-xiala date-icon"></span>
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
          class="datepicker"
        >
          <a
            href="javascript:void(0)"
            @click="handleClickDateEnd"
           class="datepicker-href"
          >
            <template>
              <span
                class="iconfont icon-xiala date-icon"
                
              ></span>
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
             <span class="opation" data-id="all">全部</span>
          </div>
          <div>
            <span class="opation" data-id="1">申请中</span>
          </div>
          <div>
            <span class="opation" data-id="2">待认证</span>
          </div>
          <div>
            <span class="opation" data-id="3">已认证</span>
          </div>
          <div>
            <span class="opation" data-id="4">强制关闭</span>
          </div>
        </div>
      </div>
      <div class="search-btn">
        <button @click="handleToSearchForm">查询</button>
      </div>
      <div class="btns" v-show="BtnHideaOrShow">
        <button class="btn-replace" @click="handleClickShowMeans" v-show="findInfo">查看认证资料</button>
        <button class="upClos" @click="handleClickClose" v-show="forceClose">强制关闭</button>
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
          <td>申请人</td>
          <td>提交人</td>
          <td>认证人</td>
          <td>状态</td>
        </tr>
        <tr class="trhover" @click="handlToTrsSelect($event,item,index)" v-for="(item,index) in dataList">
          <td>{{item.creationTime.substring(0,10)}}</td>
          <td>{{item.number}}</td>
          <td>{{item.projectNumber}}</td>
          <td>{{item.projectName}}</td>
          <td>{{item.brandName}}</td>
          <td>{{item.creatorUsername}}</td>
          <td>{{item.informationSubmittedUsername}}</td>
          <td>{{item.verifyUsername}}</td>
          <td>{{item.status==1?'申请中':item.status==2?'待认证':item.status==3?'已认证':'强制关闭'}}</td>
        </tr>
        
      </table>
         <Page :total="count" :page-size="MaxResultCount" class="page" :current="page" @on-change="handleToDatalist" v-show="count<=11?false:true"/>
    </div>
    <!-- 请备注你的申请单模态框 -->
            <div class="CertModel" v-show="model">
                    <div class="data">
                        <div class="data-head">
                            <span>认证资料</span>
                            <span class="iconfont icon-chuyidong" @click="handleCloseModel"></span>
                        </div>
                        <div class="data-body">
                                <div class="applyNumber apply clearBox">
                                     <div><span>申请单号:</span></div> 
                                     <div>{{dataBrandCert.number}}</div>
                                </div>
                                <div class="applyName apply clearBox">
                                      <div><span>品牌名称:</span></div>
                                      <div>{{dataBrandCert.brandName}}</div>
                                </div>
                                <div class="submitName apply clearBox">
                                      <div><span>提交人:</span></div>
                                      <div>{{dataBrandCert.informationSubmittedUsername}}</div>

                                </div>
                                <div class="shopImg apply clearBox">
                                        <div><span>门店照片:</span></div>
                                        <div class="showImg">
                                                <div  class="getImg">
                                                    <img :src="dataBrandCert.shopPhoto" alt="" @click="handleToShowImgShow">
                                                </div>
                                        </div>
                                       
                                </div>

                                <!-- 营业执照 -->
                                <div class="apply business-license clearBox">
                                        <div>营业执照:</div>
                                                <div class="getImg">
                                                    <img :src="dataBrandCert.businessLicensePhoto" alt="" @click="handleToShowImgShowTwo">
                                                </div>
                                       
                                </div>
                        </div>
                </div>

                <!-- 门店大图 -->
                <div class="imgShowBig" v-show="imgShowBig" id="imgShowBig">
                                    
                        <img :src="dataBrandCert.shopPhoto" alt="" id="imgShowBigMain"> 
                        <div style="width:20px;height:20px;background:rgba(0,0,0,0.2);text-align:center;line-height:20px;" id="imgShowBigIcon" @click="handleTocloseimgShowBig"><span class="iconfont icon-chuyidong"></span></div>
                </div> 

                    <!-- 营业执照大图 -->
                <div class="imgShowBigTwo" v-show="imgShowBigTwo" id="imgShowBigTwo">
                        <img :src="dataBrandCert.businessLicensePhoto" alt="" id="imgShowBigTwoMain"> 
                      <div style="width:20px;height:20px;background:rgba(0,0,0,0.2);text-align:center;line-height:20px;" id="imgShowBigTwoIcon" @click="handleTocloseimgShowBigTwo"><span class="iconfont icon-chuyidong"></span></div>
                </div>



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
import Vuex from "vuex";
export default { 
  name:"generalApplicationBrandCert", 
  data() {
    return {
      openStart: false,
      dateStart: "",
      openEnd: false,
      dateEnd: "",
      selectShow: false,
      selected: "全部",
      selectedId:"all",
      MaxResultCount:11,
      page:1,
      model:false,
      closeModel:false,
      //查看
      findInfo:false,
      //强制关闭
      forceClose:false,
      //提示文字颜色
      tipText:"color:#c5c8ce;",
      //关闭原因
      closeRemark:"请输入原因...",
      //传递的id
      id:"",
      //按钮显示与隐藏
      BtnHideaOrShow:false,
      imgShowBig:false,
      //营业执照大图
      imgShowBigTwo:false
    };
  },
  mounted(){
      var today = new Date();
      today.setTime(today.getTime());
      var year= today.getFullYear();
      var month =parseInt(today.getMonth()+1)<10?'0'+parseInt(today.getMonth()+1):today.getMonth()+1;
      var day = parseInt(today.getDate())<10?'0'+parseInt(today.getDate()):today.getDate();  
      var end =year +"-" +month + "-" +day;
      this.dateEnd =end;
     
      //七天之前
      // var sevenAgo = new Date(today);
      //  sevenAgo.setDate(today.getDate()-7);
      //  var year2 =sevenAgo.getFullYear();
      //  var month2 =parseInt(sevenAgo.getMonth()+1)<10?'0'+parseInt(sevenAgo.getMonth()+1):sevenAgo.getMonth()+1;
      //  var day2 = parseInt(sevenAgo.getDate())<10?'0'+parseInt(sevenAgo.getDate()):sevenAgo.getDate();
        this.dateStart =year +"-"+month+"-"+ day ;

       var param = JSON.stringify({
          "MaxResultCount":this.MaxResultCount,
          "SkipCount":0,
          "Sorting":"",
          "StartDate":this.dateStart,
          "EndDate":this.dateEnd,
          "Status":""
      })
      this.getApplicationForms(param);


  },
  computed: {
      ...Vuex.mapState({
          //总行数
          count:state=>state.generalApplicationBrandCert.count,
          //渲染的数据行数
          dataList:state=>state.generalApplicationBrandCert.dataList,
          //查看的认证资料
          dataBrandCert:state=>state.generalApplicationBrandCert.dataBrandCert,
          
      }) 
  },
  methods: {
    ...Vuex.mapActions({
          //查询品牌认证申请跟进总表
          getApplicationForms:"generalApplicationBrandCert/getApplicationForms",
          //查看认证资料
          getApplicationFormByID:"generalApplicationBrandCert/getApplicationFormByID",
          //强制关闭申请单
          closeApplicationForm:"generalApplicationBrandCert/closeApplicationForm",
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
    //查询对应的信息
    handleToSearchForm(){
        //清空状态栏
         var trs = document.getElementsByClassName('trhover');
          var len =trs.length;
          for(var i=0;i<len;i++){
                    trs[i].style.background="";
            }

        if(this.selectedId=="all"){
             var param = JSON.stringify({
          "MaxResultCount":this.MaxResultCount,
          "SkipCount":0, 
          "Sorting":"",
          "StartDate":this.dateStart,
          "EndDate":this.dateEnd,
          "Status":""
        })
        this.BtnHideaOrShow=false;
        this.getApplicationForms(param);

        }else{
          var param = JSON.stringify({
          "MaxResultCount":this.MaxResultCount,
          "SkipCount":0, 
          "Sorting":"",
          "StartDate":this.dateStart,
          "EndDate":this.dateEnd,
          "Status":this.selectedId
        })
        this.BtnHideaOrShow=false;
        this.getApplicationForms(param);
       
       }

        
    },

    //选中表格中对应的数据
   handlToTrsSelect($event,param,index){
          var trs = document.getElementsByClassName('trhover');
          var len =trs.length;
          for(var i=0;i<len;i++){
                    trs[i].style.background="";
            }
           trs[index].style.background="rgba(237,238,239,1)";
            this.id =param.id;
            this.BtnHideaOrShow=true;
              if(param.status==1||param.status==2){
                      this.findInfo =true;
                    //强制关闭
                    this.forceClose =true;
                    
                }else if(param.status==3){
                     this.findInfo =true;
                    //强制关闭
                    this.forceClose =false;
                }else{
                     
                    this.findInfo=false;
                    this.forceClose=false;
                }



  },
    // 关闭模态框
    handleCloseModel(){
        this.model = false;
        this.closeModel=false;
    },
    //查看认证资料
    handleClickShowMeans(){
        this.getApplicationFormByID(this.id)
        this.model=true;
        this.closeModel=false;
    },
    //强制关闭按钮点击
    handleClickClose(){
      this.closeModel =true;
      this.model=false;
    },
    //关闭强制关闭的模态框
    handelCloseCloseModel(){
      this.closeModel=false;
      this.model = false;
    },
    //取消强制关闭按钮模态框
    handleToCloseReason(){
        this.model=false;
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
    //分页
    handleToDatalist(page){
          this.page = page;
           var trs = document.getElementsByClassName('trhover');
          var len =trs.length;
          for(var i=0;i<len;i++){
                    trs[i].style.background="";
            }
          if(this.selectedId=="all"){
              var param = JSON.stringify({
                "MaxResultCount":this.MaxResultCount,
                "SkipCount":(this.page-1)*this.MaxResultCount,
                "Sorting":"",
                "StartDate":this.dateStart,
                "EndDate":this.dateEnd,
                "Status":""
            })
           this.getApplicationForms(param);
          }else{
              var param = JSON.stringify({
                "MaxResultCount":this.MaxResultCount,
                "SkipCount":(this.page-1)*this.MaxResultCount,
                "Sorting":"",
                "StartDate":this.dateStart,
                "EndDate":this.dateEnd,
                "Status":this.selectedId
            })
           this.getApplicationForms(param);
          }
           this.BtnHideaOrShow=false;
         
    },
    //确定向后台发送关闭的备注
    handleTocloseRemark(){
       if(this.closeRemark=='请输入原因...'||this.closeRemark==""){
          alert('请输入关闭原因');
      }
      if(this.closeRemark.length>100){
          alert('请输入少于100字');
      }

      if(this.closeRemark!=='请输入原因...'&&this.closeRemark!==""&&this.closeRemark.length<=100){
            var param = {
                "id":this.id,
                "CloseRemark":this.closeRemark
            } 
            //强制关闭
            this.closeApplicationForm(param);
            this.closeRemark='请输入原因...';
            this.tipText="color:#c5c8ce;";
            this.model=false;
            this.closeModel=false;
            
      }
  },
     //显示大图
         handleToShowImgShow(){
               var imgShowBig = document.getElementById('imgShowBig');
               var imgShowBigMain = document.getElementById('imgShowBigMain');
               var imgShowBigIcon = document.getElementById('imgShowBigIcon');

               this.imgShowBig=true;
               var w= document.documentElement.clientWidth*0.6 ;
               var h = document.documentElement.clientHeight*0.8;
                imgShowBig.style.width=w+'px';
                imgShowBig.style.height =h+'px';
                imgShowBig.style.top = document.documentElement.clientHeight*0.5 - h*0.5 +'px';
                imgShowBig.style.left =document.documentElement.clientWidth*0.5-w*0.5 +'px';
                //图片的最大高度宽度不超过
                imgShowBigMain.style.maxWidth =w+'px';
                imgShowBigMain.style.maxHeight=h+'px';
                imgShowBigMain.style.top =h*0.5-imgShowBigMain.height*0.5+"px";
                imgShowBigMain.style.left =w*0.5-imgShowBigMain.width*0.5+'px';
                //字体图标
                imgShowBigIcon.style.color='#fff';
                imgShowBigIcon.style.position="absolute";
                imgShowBigIcon.style.top =h*0.5-imgShowBigMain.height*0.5+20+"px";
                imgShowBigIcon.style.left =w*0.5-imgShowBigMain.width*0.5+imgShowBigMain.width*0.9+'px';
         },

         //关闭大图
         handleTocloseimgShowBig(){
              this.imgShowBig=false;
         },

          handleToShowImgShowTwo(){
               var imgShowBig = document.getElementById('imgShowBigTwo');
               var imgShowBigMain = document.getElementById('imgShowBigTwoMain');
               var imgShowBigIcon = document.getElementById('imgShowBigTwoIcon');
               this.imgShowBigTwo=true;
               var w= document.documentElement.clientWidth*0.6 ;
               var h = document.documentElement.clientHeight*0.8;
                imgShowBig.style.width=w+'px';
                imgShowBig.style.height =h+'px';
                imgShowBig.style.top = document.documentElement.clientHeight*0.5 - h*0.5 +'px';
                imgShowBig.style.left =document.documentElement.clientWidth*0.5-w*0.5 +'px';
                //图片的最大高度宽度不超过
                imgShowBigMain.style.maxWidth =w+'px';
                imgShowBigMain.style.maxHeight=h+'px';
                imgShowBigMain.style.top =h*0.5-imgShowBigMain.height*0.5+"px";
                imgShowBigMain.style.left =w*0.5-imgShowBigMain.width*0.5+'px';
                //字体图标
                imgShowBigIcon.style.color='#fff';
                imgShowBigIcon.style.position="absolute";
                imgShowBigIcon.style.top =h*0.5-imgShowBigMain.height*0.5+20+"px";
                imgShowBigIcon.style.left =w*0.5-imgShowBigMain.width*0.5+imgShowBigMain.width*0.9+'px';
         },
         handleTocloseimgShowBigTwo(){
              this.imgShowBigTwo=false;
         }
  }
};
</script>
<style scoped>
@media screen and (min-width:1400px) {

.summaryCloud {
   width: 1400px;
  margin: 0 auto;
  height: max-content;
  box-sizing: border-box;
  padding-right: 63px;
  position: relative;
  height: 100%;
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
 .datepicker{
 width:140px;
 height:28px;
 line-height:28px;
}
  .datepicker .datepicker-href{
  color:#333333;
  padding-left:13px;
}
 .date-icon{
  float:right;
  font-size:14px;
  margin-right:12px;
}
.date-start {
  width: 140px;
  height: 28px;
  background: rgba(241, 243, 246, 1);
  box-sizing: border-box;
  margin-right: 13px;
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
.search-btn > button:active{
 background: #6da4ff;
}
.search .btns {
  float: right;
  margin-top: -5px;
}
.btns > button {
  font-size: 14px;
  border-radius: 4px;
  padding-left: 14px;
  padding-right: 15px;
  line-height: 36px;
   outline: none;
}
.upClos{
   background: #5897ff;
   color: #fff;
    border: 0;
   
}
.btn-replace{
  margin-right:20px;
  border: 1px solid #5897ff;
  color: #5897ff;
  background: #fff;
 
}
.appCloudeForm {
  margin-top: 25px;
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
  line-height: 39px;
  text-align: center;

  font-size: 14px;
  color: #888888;
}
.appCloudeForm > table > tr:nth-of-type(1) > td {
  line-height: 39px;
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
.CertModel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
}
.data{
    width: 700px;
    height: 630px;
     position: fixed;
    left:50%;
    top:50%;
    margin-top:-315px;
    margin-left: -350px;
    background: #fff;
}
.data-head{
  margin: 23px 0;
  overflow: hidden;
}
.data-head > span:nth-of-type(1){
  float: left;
  margin-left: 302px;
  font-size: 18px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
 .data-head > span:nth-of-type(2)
 {
  float: right;
  font-size: 18px;
  margin-right: 20px;
  color: #d2d2d2;
}
.data-body{

}
.apply{
    /* overflow: hidden; */
    margin-left:46px;
    margin-bottom:20px;
}
.submitName{
    border-bottom:1px solid #F8F8F8;
    margin-right:56px;
    padding-bottom: 20px;
}
.apply>div{
    float:left;
    font-size: 14px;

}
.apply>div:nth-of-type(1){
    width: 101px;
    text-align: left;
    margin-left: 40px;
}
.apply>div:nth-of-type(2){
    margin-left:20px;
}
.clearBox:after{
   content:".";
   display:block;
   clear:both;
   height:0; 
   overflow:hidden; 
   visibility:hidden;
}
.shopImg{

}

.showImg{
    width:180px;
    height:160px;
    border-radius:4px;
    position:relative;

}
.getImg{
    width:180px;
    height:160px;
}
.getImg:hover{
  cursor: pointer;
}
.getImg>img{
    width:100%;
    height:100%;
}
.reupload{
    position:absolute;
    bottom:0;
    left:46px;
    width:100px;
    height:34px;
}
.reupload>span{
    color: #fff;
    font-size:14px;
}
.reupload>input{
    opacity:0;
    position:absolute;
    top:0;
    left:0;
    width:72px;
    height:34px;
}

/* 营业执照 */
.addreupload{
    position: relative;
}
.addreupload>input{
    opacity:0;
    position:absolute;
    top: 0;
    left: 0;

}
.addreupload>span{
    color: #5897FF;
}
.addreupload>input:hover{
    cursor: pointer;
}
.showImgTwo{
    width:180px;
    height:160px;
    border-radius:4px;
    position: relative;
}
.showImgTwo>img{
    width:100%;
    height:100%;
}
.imgdelTwo{
    position:absolute;
    width:180px;
    font-size:14px;
    bottom:0;
    left:0;
    color:#fff;
    text-align: center;  
}
.imgdelTwo:hover{
    cursor: pointer;
}
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
img[src=""],img:not([src]){opacity:0;}
/* 显示门店大图 */
.imgShowBig{
    position: absolute;
    z-index: 12;    
}
.imgShowBig>img{
    position: absolute;
}
.imgShowBigTwo{
    position: absolute;
    z-index: 12;
   
    
}
.imgShowBigTwo>img{
    position: absolute;
}

}
/* 1024为标准 */
@media screen and (max-width:1400px) {
  .summaryCloud {
  width: 1024px;
  margin: 0 auto;
  height: max-content;
  box-sizing: border-box;
  padding-right: 16px;
  position: relative;
  height: 100%;
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
  margin-left: 49px;
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
.datepicker{
 width:102px;
 height:20px;
 line-height:20px;
}
  .datepicker .datepicker-href{
  color:#333333;
  padding-left:9px;
}
 .date-icon{
  float:right;
  font-size:12px;
  margin-right:9px;
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
  line-height: 26px;
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
.search-btn > button:active{
 background: #6da4ff;
}
.search .btns {
  float: right;
  margin-top: -4px;
}
.btns > button {
  font-size: 12px;
  border-radius: 4px;
  outline: none;
 
  padding-left: 10px;
  padding-right: 11px;
  line-height: 26px;
}
.upClos{
 background: #5897ff;
  color: #fff;
   border: 0;
}
.btn-replace{
  margin-right:15px;
  border: 1px solid #5897ff;
  color: #5897ff;
  background: #fff;
}
.appCloudeForm {
  margin-top: 36px;
  width: 100%;
  padding-right: 47px;
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
  line-height: 24px;
  text-align: center;

  font-size: 12px;
  color: #888888;
}
.appCloudeForm > table > tr:nth-of-type(1) > td {
  line-height: 24px;
  height:24px;
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
.ivu-page {
    text-align: center;
    
  }
.page{
    position: absolute;
    left: 0;
    right: 0;
    bottom:50px;
}
/* 模态框的显示隐藏 */
.CertModel {
  position:fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
}
.data{
    width: 511px;
    /* height: 630px; */
    position: fixed;
    left:50%;
    top:50%;
    z-index: 11;
    margin-top:-230px;
    margin-left: -255px;
    background: #fff;
}
.data-head{
  margin: 17px 0;
  overflow: hidden;
}
.data-head > span:nth-of-type(1){
  float: left;
  margin-left: 221px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
 .data-head > span:nth-of-type(2)
 {
  float: right;
  font-size: 16px;
  margin-right: 15px;
  color: #d2d2d2;
}
.data-body{

}
.apply{
    /* overflow: hidden; */
    margin-left:33px;
    margin-bottom:15px;
}
.submitName{
    border-bottom:1px solid #F8F8F8;
    margin-right:41px;
    padding-bottom: 15px;
}
.clearBox:after{
   content:".";
   display:block;
   clear:both;
   height:0; 
   overflow:hidden; 
   visibility:hidden;
}
.apply>div{
    float:left;
    font-size: 14px;

}
.apply>div:nth-of-type(1){
    width: 74px;
    text-align: left;
}
.apply>div:nth-of-type(2){
    margin-left:30px;
}
.shopImg{

}

.showImg{
    width:131px;
    height:117px;
    border-radius:4px;
    position:relative;

}
.getImg{
    width:131px;
    height:117px;
}
.getImg:hover{
  cursor: pointer;
}
.getImg>img{
    width:100%;
    height:100%;
}
.reupload{
    position:absolute;
    bottom:0;
    left:33px;
    width:73px;
    height:25px;
}
.reupload>span{
    color: #fff;
    font-size:12px;
}
.reupload>input{
    opacity:0;
    position:absolute;
    top:0;
    left:0;
    width:52px;
    height:25px;
}

/* 营业执照 */
.addreupload{
    position: relative;
}
.addreupload>input{
    opacity:0;
    position:absolute;
    top: 0;
    left: 0;

}
.addreupload>span{
    color: #5897FF;
}
.addreupload>input:hover{
    cursor: pointer;
}
.showImgTwo{
    width:131px;
    height:117px;
    border-radius:4px;
    position: relative;
}
.showImgTwo>img{
    width:100%;
    height:100%;
}
.imgdelTwo{
    position:absolute;
    width:131px;
    font-size:12px;
    bottom:0;
    left:0;
    color:#fff;
    text-align: center;  
}
.imgdelTwo:hover{
    cursor: pointer;
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
img[src=""],img:not([src]){opacity:0;}
/* 显示门店大图 */
.imgShowBig{
    position: absolute;
    z-index: 12;
   
    
}
.imgShowBig>img{
    position: absolute;
}
.imgShowBigTwo{
    position: absolute;
    z-index: 12;
   
    
}
.imgShowBigTwo>img{
    position: absolute;
 
}

}
</style>
