<template>
  <div class="summaryCloud">
    <div class="summaryCloud-head">
      <h2>申请云支付功能总表</h2>
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
          class="date-iview">
          <a
            href="javascript:void(0)"
            @click="handleClickDateStart"
            class="date-href">
            <template>
              <span
                class="iconfont icon-xiala icon-iview"></span>
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
         
         class="date-iview"
        >
          <a
            href="javascript:void(0)"
            @click="handleClickDateEnd"
            class="date-href"
          >
            <template>
              <span
                class="iconfont icon-xiala icon-iview"
               
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
            <span class="opation" data-id="1">未受理</span>
          </div>
          <div>
            <span class="opation" data-id="2">已受理</span>
          </div> 
          <div>
            <span class="opation" data-id="3">完成</span>
          </div> 
          <div>
            <span class="opation" data-id="4">强制关闭</span>
          </div>
        </div>
      </div>
      <div class="search-btn">
        <button @click="handleToSearchForm">查询</button>
      </div>
      <div class="btns">
        <button class="btn-replace" v-if="finishedRemark" @click="handleToFinishedRemark">修改完成时备注</button>
        <button class="upClos" v-if="forcedClos" @click="handleForcedClos">强制关闭</button>
      </div>

      <div class style="clear:both; width:100%;"></div>
    </div>

    <div class="appCloudeForm"  @mouseover="handleTipMaxWidth">
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td>申请日期</td>
          <td>申请单号</td>
          <td>申请类型</td>
          <td>项目编号</td>
          <td>项目名称</td>
          <td>联系人</td>
          <td>联系电话</td>
          <td>备注</td>
          <td>受理人</td>
          <td>状态</td>
        </tr>
        <tr class="trhover"  @click="handlToTrsSelect($event,item,index)"  v-for="(item,index) in dataList">
          <td>{{item.creationTime.substring(0,10)}}</td>
          <td>{{item.number}}</td>
          <td>{{item.type==1?'云单据':'云条码'}}</td>
          <td>{{item.projectNumber}}</td>
          <td>{{item.projectName}}</td>
          <td>{{item.linkman}}</td>
          <td>{{item.phoneNumber}}</td>
          <td>
            <Poptip placement="bottom-start" trigger="hover" word-wrap class="tip-iview">
              <span class="tip-iview-span">{{item.remark}}</span>
              <div class="api" slot="content">
                <p>{{item.remark}}</p>
              </div>
            </Poptip>
          </td>
          <td>{{item.acceptedUsername}}</td>
          <td :data-id="item.status">{{item.status==1?'未受理':item.status==2?'已受理':item.status==3?'完成':'强制关闭'}}</td>
        </tr>

      </table>
       <Page :total="count" :page-size="MaxResultCount" class="page" :current="page" @on-change="handleToDatalist" v-show="count<=11?false:true"/>
    </div>
    
        <div class="ClouPayModel" v-if="ClouPayModel">
              <!-- 请备注你的申请单模态框 -->
                 <div class="accept-content3" v-if="importModel">
                        <div class="accept-head">
                                <span>修改完成时的备注</span>
                                <span class="iconfont icon-chuyidong" @click="handleToClosImportModel"></span>
                        </div>
                        <div class="btn-href">
                                <span @click="handleClearContent">清空</span>
                                <span @click="handleToImport">引用</span>
                        </div>
                        <div class="remarks" id="remarkValue">
                          <div v-for="(item,index) in RemarkData">
                          <div><span>【{{item.brandName}}】:</span></div>
                          <div><span> {{item.type}}</span><span>申请单号：</span><span>{{item.number}}</span></div>
                        </div>
                       </div>
                        <div class="footer">
                                <button @click="handleRemarked">保存</button>
                        </div>
                </div>

              <!-- 关闭的原因备注 -->
              <div class="closeReason" v-if="closeReasonModel">
                      <div class="accept-head">
                                <span>关闭原因</span>
                                <span class="iconfont icon-chuyidong" @click="handleToCloseReason"></span>
                      </div>
                      <div class="closeRemark">
                            <textarea name="" id="" cols="30" rows="10" v-model=" closeRemark"  :style="tipText" @focus="handleTofocus"></textarea>
                      </div>
                      <div class="closeRemarkBtn"> 
                         <button class="closeBtn" @click="handleToCloseReason">取消</button>
                         <button class="sureBtn" @click="handleTocloseRemark">确定</button>
                      </div>

              </div>

               <!-- 引用单号 -->
          <div class="accept-guide" v-if="referenceSingleNumber">
            <div class="accept-head">
              <span>引用申请单号</span>
              <span class="iconfont icon-chuyidong" @click="handleCloseImport"></span>
            </div>
            <div class="guide-form">
              <div>
                <ul class="guide-nav">
                  <li></li>
                  <li>申请单号</li>
                  <li>申请单类型</li>
                  <li>品牌名称</li>
                  <li>开户行</li>
                  <li>提交人</li>
                </ul>
              </div>
              <table cellpadding="0" cellspacing="0">
                     <tr v-for="(item,index) in importList"  @click="handleClickSelectedPro($event,item,index)" class="importTrsHover">
                      <td>
                        <span class="iconfont icon-fuxuankuang_weixuanzhong icon" style="color:#5897FF;"></span>
                      </td>
                      <td>{{item.number}}</td>
                      <td>{{item.type}}</td>
                      <td>{{item.brandName}}</td>
                      <td>{{item.bankName}}</td>
                      <td :title="item.creatorUsername">{{item.creatorUsername}}</td>
                    </tr>
              </table>
              <div class="footer guide-footer">
                <button @click="handleToAcceptRemark">引用</button>
              </div>
            </div>
          </div>
        </div>

     
  </div>
</template>
<script>
import Vuex from  "vuex";
export default {
  name:"summaryCloudPayments",
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
      //强制关闭
      forcedClos:false,
      //修改完成时备注
      finishedRemark:false,
      //项目编号
      projectNumber:"",
      id:"",
      //修改备注
      remark:"",
      //提示文字颜色
      tipText:"color:#c5c8ce;",
      //关闭原因
      closeRemark:"请输入原因...",
      //备注框中需要需要引用的数据
      RemarkData:[],
      //模态框
      ClouPayModel:false,
      //引用框中
      importModel:false,
      //关闭原因框
      closeReasonModel:false,
      //引用数据框
      referenceSingleNumber:false,

    };
  },
  created(){
      
  },
  mounted(){
      var today = new Date();
      today.setTime(today.getTime());
      var year= today.getFullYear();
      var month =parseInt(today.getMonth()+1)<10?'0'+parseInt(today.getMonth()+1):today.getMonth()+1;
      var day = parseInt(today.getDate())<10?'0'+parseInt(today.getDate()):today.getDate();  
      var end =year +"-" +month + "-" +day;
      this.dateEnd =end;
     
      // //七天之前
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
  computed:{
      ...Vuex.mapState({
          //总行数
          count:state=>state.summaryCloudPayment.count,
          //渲染的数据行数
          dataList:state=>state.summaryCloudPayment.dataList,
          //引入的申请单
          importList:state=>state.summaryCloudPayment.importList,
          
      })
  },
  methods: {
    ...Vuex.mapActions({
          //根据对应条件查找数据
          getApplicationForms:"summaryCloudPayment/getApplicationForms",
          //获取引用申请单
          getRefferenceApplicationForms:"summaryCloudPayment/getRefferenceApplicationForms",
          //修改备注
          modifyRemark:"summaryCloudPayment/modifyRemark",
          //强制关闭
          closeApplicationForm:"summaryCloudPayment/closeApplicationForm"
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
    handleClickOpations($event){
      if ($event.target.className === "opation") {
        this.selected = $event.target.innerText;
        this.selectedId = parseInt($event.target.getAttribute('data-id'));
        this.selectShow = false;
      }
    },

    //查询对应的数据
    handleToSearchForm(){
        //清空选中栏
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
         this.getApplicationForms(param);
      }
      //强制关闭
      this.forcedClos=false;
      //修改完成时备注
      this.finishedRemark=false;
     
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
                this.projectNumber=param.projectNumber
                if(param.status==1||param.status==2){
                    this.forcedClos = true;
                    this.finishedRemark= false;
                }else if(param.status==3){
                    this.finishedRemark= true;
                    this.forcedClos=false;
                }else{
                     this.finishedRemark= false;
                    this.forcedClos=false;
                }

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
          //强制关闭
            this.forcedClos=false;
          //修改完成时备注
          this.finishedRemark=false;
  },
   //文本域得焦时
    handleTofocus(){
                 if(this.closeRemark=='请输入原因...'){
                     this.closeRemark=""
                 }
                 this.tipText ="color:#515A6E;"
    },

  //强制关闭按钮点击出现模态框
  handleForcedClos(){
        this.ClouPayModel = true;
        this.importModel=false;
        this.closeReasonModel= true;
        this.referenceSingleNumber=false;
  },
  //取消强制关闭按钮模态框
  handleToCloseReason(){
        this.ClouPayModel = false;
        this.importModel=false;
        this.closeReasonModel= false;
        this.referenceSingleNumber=false;
        this.closeRemark='请输入原因...';
        this.tipText="color:#c5c8ce;";
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
            this.ClouPayModel = false;
            this.importModel=false;
            this.closeReasonModel= false;
            this.referenceSingleNumber=false;
      }
  },
  //修改完成时的备注按钮点击
  handleToFinishedRemark(){ 
      this.ClouPayModel = true;
      this.importModel=true;
      this.referenceSingleNumber=false;
      this.closeReasonModel= false;
  },
   //关闭引用模态框
    handleCloseImport(){
      this.ClouPayModel = true;
      this.importModel=true;
      this.referenceSingleNumber=false;
      this.closeReasonModel= false;
      this.RemarkData=[];
    },
   
     //清空文本框中的数据
    handleClearContent() {
     
       this.RemarkData=[];
    },

     //引用申请单
    handleToImport(){
      var param =JSON.stringify({
        "ProjectNumber":this.projectNumber
      })
      this.getRefferenceApplicationForms(param);
       //模态框
      this.ClouPayModel=true;
      //引用框中
      this.importModel=false;
      //关闭原因框
      this.closeReasonModel=false;
      //引用数据框
      this.referenceSingleNumber=true;
    
    },


     //引用数据操作
    handleClickSelectedPro($event,items,index){
      var param ={
          "brandName":items.brandName,
          "type":items.type,
          "number":items.number
      }
      var trs = document.getElementsByClassName('importTrsHover');
    

      if(trs[index].firstElementChild.firstElementChild.className.indexOf('icon-fuxuankuang_weixuanzhong')!==-1){
          trs[index].firstElementChild.firstElementChild.classList.remove('icon-fuxuankuang_weixuanzhong');
          trs[index].firstElementChild.firstElementChild.classList.remove('icon');
          trs[index].firstElementChild.firstElementChild.classList.add('icon-fuxuankuang_xuanzhong');
          trs[index].firstElementChild.firstElementChild.classList.add('icon1');
          this.RemarkData.push(param);

      }else{
          trs[index].firstElementChild.firstElementChild.classList.remove('icon-fuxuankuang_xuanzhong');
          trs[index].firstElementChild.firstElementChild.classList.remove('icon1');
          trs[index].firstElementChild.firstElementChild.classList.add('icon-fuxuankuang_weixuanzhong');
          trs[index].firstElementChild.firstElementChild.classList.add('icon');
          var RemarkDataIndex =''
          this.RemarkData.map((item,index)=>{
               if(item.brandName===param.brandName){
                     RemarkDataIndex=index;
               }
          })
          this.RemarkData.splice(RemarkDataIndex,1);

      }
    },
     //引用数据操作完毕此时改变完成了引用单号回到备注框
    handleToAcceptRemark(){
       if(this.RemarkData.length==0){
          
         }else{
            //模态框
            this.ClouPayModel=true;
            //引用框中
             this.importModel=true;
            //关闭原因框
            this.closeReasonModel=false;
            //引用数据框
            this.referenceSingleNumber=false;
         }
     
    },

     //关闭引用模态框
    handleToClosImportModel(){
      this.ClouPayModel = false;
      this.importModel=false;
      this.referenceSingleNumber=false;
      this.closeReasonModel= false;
      this.RemarkData=[];
    },
    //备注完成
    handleRemarked(){
       var remarkString ='';
       this.RemarkData.map((item,index)=>{
          remarkString +=item.brandName;
          remarkString +=item.type;
          remarkString +='申请单号：';
          remarkString +=item.number;
       }) 
       if(remarkString!==''){
        var param ={
            "id":this.id,
            "Remark":remarkString,
        };
        this.modifyRemark(param);
        this.RemarkData =[];
        this.ClouPayModel = false;
        this.importModel=false;
        this.referenceSingleNumber=false;
        this.closeReasonModel= false;
       }
    },
    handleTipMaxWidth(){
        //  var tips =document.getElementsByClassName('ivu-poptip-popper');
        //     var len = tips.length;
        //     for(var i=0;i<len;i++){
        //       tips[i].style.maxWidth ="200px";
        //      }  
    }

  }
}
</script>
<style scoped>
@media screen and (min-width:1400px){
  
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
  margin-left: 68px;
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
  width: 95px;
  height: 28px;
}
.opations {
  position: absolute;
  top: 28;
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
  width:106px;
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
  margin-right: 14px;
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
/* 日期插件 */
.date-iview{
   width:140px;
   height:28px;
   line-height:28px;
}
.date-href{
  color:#333333;
  padding-left:13px;
}
.icon-iview{
  float:right;
  font-size:16px;
  margin-right:12px;
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
.btns > button:active{
  background: #6da4ff;
}
.appCloudeForm {
  margin-top: 25px;
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
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  color: #888888;
}
.tip-iview{
  width:100%;
}
.tip-iview-span{
  text-align:center;
  
  display: block;
  height: 30px;
  padding-top: 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width:50px;
  margin: 0 auto;
 line-height: 30px;
}
.api{
  width:190px;
}
.appCloudeForm > table > tr:nth-of-type(1) > td {
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  background: rgba(241, 243, 246, 1);
  color: #888888;
}

.appCloudeForm>table > tr > td:nth-of-type(1){
    width: 130px;
}
.appCloudeForm>table > tr > td:nth-of-type(2){
    width: 220px;
}
.appCloudeForm>table > tr > td:nth-of-type(3){
    width: 100px;
}
.appCloudeForm>table > tr > td:nth-of-type(4){
    width: 140px;
}
.appCloudeForm>table > tr > td:nth-of-type(5){
    width:120px;
}
.appCloudeForm>table > tr > td:nth-of-type(6){
    width: 110px;
}
.appCloudeForm>table > tr > td:nth-of-type(7){
    width:150px;
}
.appCloudeForm>table > tr > td:nth-of-type(8){
    width:100px;
}
.appCloudeForm>table > tr > td:nth-of-type(9){
   width: 100px;
}
.appCloudeForm>table > tr > td:nth-of-type(10){
  width:110px;
}
.trhover:hover {
  cursor: pointer;
  background: #edeeef;
}
.btn-replace:hover{
  cursor: pointer;
}
.btn-replace:active{
   background: #6da4ff;
}
.upClos:hover{
  cursor: pointer;
}
.upClos:active{
   background: #6da4ff;
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
  position: fixed;
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
  position: fixed;
  top: 275px;
  left: 50%;
  z-index: 11;
  margin-left: -300px;
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
 .accept-content3 > .remarks {
    width: 520px;
    height: 223px;
    margin-left: 40px;
    margin-top: 17px;
    border: 1px solid #EEEEEE;
    box-sizing: border-box;
    padding: 22px;
    font-size: 14px;
  }
  .accept-content3 > .remarks>div{
    margin-bottom: 10px;
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
.btn-href>span:hover{
  cursor: pointer;
}
 
.accept-content3> .footer{
    margin-top: 29px;
    float:right;
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
.accept-content3> .footer>button:hover{
  cursor: pointer;
}
.accept-content3> .footer>button:active{
  background: #6da4ff;
}

/* 关闭的原因备注 */
.closeReason{
   width:460px;
   height: 320px;
   position: fixed;
   top: 50%;
   left: 50%;
   margin-left:-230px;
   margin-top:-160px;
   background:#fff;
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
.closeRemarkBtn .closeBtn:hover{
  cursor: pointer;
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
.closeRemarkBtn .sureBtn:hover{
  cursor: pointer;
}
.closeRemarkBtn .sureBtn:active{
  background: #6da4ff;
}

/* 引用单号 */
  .accept-guide {
    width: 800px;
    height: 460px;
    background: #fff;
    position: fixed;
    top: 210px;
    left: 50%;
    margin-left: -400px;
  }
  .accept-guide .accept-head {
    margin: 30px 0;
    overflow: hidden;
  }
  .accept-guide .accept-head > span:nth-of-type(1) {
    float: left;
    margin-left: 329px;
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .accept-guide .accept-head > span:nth-of-type(2) {
    float: right;
    font-size: 20px;
    margin-right: 20px;
    color: #d2d2d2;
  }
  .accept-guide .guide-form {
    margin-left: 36px;
    position: relative;
  }
  .guide-footer {
    position: absolute;
    top: 300px;
    left: 50%;
    margin-left: -70px;
  }
  .guide-nav{
    width: 729px;
    height:30px;
    line-height: 30px;
    text-align: left;
    text-indent: 15px;
    font-size: 14px;
    background: rgba(241, 243, 246, 1);
    color: #888888;
    overflow: hidden;
    border-top: 1px  solid #e7e7e7;
    border-left:1px  solid #e7e7e7;
  }
  .guide-nav>li{
    float: left;
    border-right: 1px solid #e7e7e7;
  }
  .guide-nav>li:nth-of-type(1){
     width: 43px;
     height: 30px;
  }
  .guide-nav>li:nth-of-type(2){
     width: 178px;
     height: 30px;
  }
  .guide-nav>li:nth-of-type(3){
     width: 129px;
     height: 30px;
  }
  .guide-nav>li:nth-of-type(4){
     width: 140px;
     height: 30px;
  }
   .guide-nav>li:nth-of-type(5){
     width: 106px;
     height: 30px;
  }
   .guide-nav>li:nth-of-type(6){
     width: 132px;
     height: 30px;
   }
  .accept-guide .guide-form > table {
    width: 729px;
    height:249px;
    table-layout: fixed;
    display: block;
    overflow: auto;
    border-top: 1px solid #e7e7e7;
    border-left: 1px solid #e7e7e7;
  }
  .accept-guide .guide-form > table > tr:nth-of-type(1) {
  }
  .accept-guide .guide-form > table > tr > td {
    border-bottom: 1px solid #e7e7e7;
    border-right: 1px solid #e7e7e7;
    line-height: 30px;
    text-align: left;
    text-indent: 15px;
    font-size: 14px;
    color: #888888;
  }
  .accept-guide .guide-form > table > tr:nth-of-type(1) > td {
   
  }
  .accept-guide .guide-form > table > tr > td:nth-of-type(1) {
    width: 44px;
    height: 30px;
  }
  .accept-guide .guide-form > table > tr > td:nth-of-type(2) {
    width: 180px;
    height: 30px;
  }
  .accept-guide .guide-form > table > tr > td:nth-of-type(3) {
    width: 135px;
    height: 30px;
  }
  .accept-guide .guide-form > table > tr > td:nth-of-type(4) {
    width: 145px;
    height: 30px;
  }
  .accept-guide .guide-form > table > tr > td:nth-of-type(5) {
    width: 110px;
    height: 30px;
  }
  .accept-guide .guide-form > table > tr > td:nth-of-type(6) {
    width: 120px;
    height: 30px;
  }
  .importTrsHover:hover{
    background:rgb(237, 238, 239)
  }
 .footer {
    width: 140px;
    height: 36px;
  }
  .footer > button {
    background: #5897ff;
    border: 0;
    color: #fff;
    outline: none;
    float: left;
    width: 100%;
    height: 100%;
    font-size: 16px;
    border-radius: 4px;
  }
  .footer > button:hover{
    cursor: pointer;
  }
  .footer > button:active{
    background:#6da4ff;
  }



}

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
  margin-top: 23px;
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
  width: 75px;
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
  margin-left: 7px;
  display: block;
  width: 100%;
  height: 100%;
}
.selected {
  height: 20px;
  width: 85px;
  background: rgba(241, 243, 246, 1);
  border-radius: 4px;
}
.selected > span {
  font-size: 12px;
}
.selected > span:nth-of-type(1) {
  margin-left: 7px;
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
   background:#6da4ff;
}
/* 日期插件 */
.date-iview{
   width:102px;
   height:20px;
   line-height:20px;
}
.date-href{
  color:#333333;
  padding-left:9px;
}
.icon-iview{
  float:right;
  font-size:12px;
  margin-right:8px;
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
.btns > button:hover{
  cursor: pointer;
}
.btns > button:active{
  background: #6da4ff;
}
.appCloudeForm {
  margin-top: 36px;
  width: 100%;
  padding-right: 47px;
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
  line-height: 22px;
  text-align: center;
  font-size: 12px;
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
  height: 18px;
  padding-top: 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width:50px;
  margin: 0 auto;
 line-height: 18px;

}
.api{
  width:138px;
}
.appCloudeForm > table > tr:nth-of-type(1) > td {
  line-height:30px;
  height:30px;
  text-align: center;
  font-size: 12px;
  background: rgba(241, 243, 246, 1);
  color: #888888;
 
}

.appCloudeForm>table > tr > td:nth-of-type(1){
    width: 94px;
}
.appCloudeForm>table > tr > td:nth-of-type(2){
    width: 160px;
}
.appCloudeForm>table > tr > td:nth-of-type(3){
    width: 73px;
}
.appCloudeForm>table > tr > td:nth-of-type(4){
    width: 102px;
}
.appCloudeForm>table > tr > td:nth-of-type(5){
    width:87px;
}
.appCloudeForm>table > tr > td:nth-of-type(6){
    width: 80px;
}
.appCloudeForm>table > tr > td:nth-of-type(7){
    width:109px;
}
.appCloudeForm>table > tr > td:nth-of-type(8){
    width:73px;
    height: 22px;

}
.appCloudeForm>table > tr > td:nth-of-type(9){
   width: 73px;
}
.appCloudeForm>table > tr > td:nth-of-type(10){
  width:80px;
}
.trhover:hover {
  cursor: pointer;
  background: #edeeef;
}
.btn-replace:hover{
  cursor: pointer;
}
.btn-replace:active{
   background: #6da4ff;
}
.upClos:hover{
  cursor: pointer;
}
.upClose:active{
   background: #6da4ff;
}
.page > .ivu-page-item a {
  
}

/* 模态框的显示隐藏 */
.ClouPayModel {
  position: fixed;
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
  position: fixed;
  top: 201px;
  left: 50%;
  z-index: 11;
  margin-left: -219px;
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
  margin-right: 15px;
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
.btn-href>span:hover{
  cursor: pointer;
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
.accept-content3> .footer>button:hover{
  cursor: pointer;
}
.accept-content3>.footer>button:active{
  background: #6da4ff;
}
.accept-content3 > .remarks {
    width: 379px;
    height: 162px;
    margin-left: 29px;
    margin-top: 12px;
    border: 1px solid #EEEEEE;
    box-sizing: border-box;
    padding: 16px;
    font-size: 12px;
  }
  .accept-content3 > .remarks>div{
    margin-bottom: 7px;
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
/* 关闭的原因备注 */
.closeReason{
   width:336px;
   height: 234px;
   position: fixed;
   top: 50%;
   left: 50%;
   margin-left:-168px;
   margin-top:-117px;
   background:#fff;
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
.closeRemarkBtn .closeBtn:hover{
  cursor: pointer;
}
.closeRemarkBtn .closeBtn:active{
   background: #6da4ff;
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
.closeRemarkBtn .sureBtn:hover{
  cursor: pointer;
}
.closeRemarkBtn .sureBtn:active{
   background: #6da4ff;
}


/* 引用单号 */
  .accept-guide {
    width: 584px;
    height: 335px;
    background: #fff;
    position: fixed;
    z-index: 11;
    top: 153px;
    left: 50%;
    margin-left: -292px;
  }
  .accept-guide .accept-head {
    margin: 22px 0;
    overflow: hidden;
  }
  .accept-guide .accept-head > span:nth-of-type(1) {
    float: left;
    margin-left: 240px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .accept-guide .accept-head > span:nth-of-type(2) {
    float: right;
    font-size: 16px;
    margin-right: 14px;
    color: #d2d2d2;
  }
  .accept-guide .guide-form {
    margin-left: 26px;
    position: relative;
  }
  .guide-footer {
    position: absolute;
    top: 200px;
    left: 50%;
    margin-left: -60px;
  }
  .accept-guide .guide-form > table {
    width: 532px;
    height: 173px;
    table-layout: fixed;
    border-top: 1px solid #e7e7e7;
    border-left: 1px solid #e7e7e7;
    display: block;
    overflow: auto;
  }
 .guide-nav{
   width: 532px;
    height:22px;
   line-height: 22px;
    text-align: left;
    text-indent: 15px;
    font-size: 12px;
    background: rgba(241, 243, 246, 1);
    color: #888888;
    overflow: hidden;
    border-top: 1px  solid #e7e7e7;
    border-left:1px  solid #e7e7e7;
  }
  .guide-nav>li{
    float: left;
    border-right: 1px solid #e7e7e7;
  }
  .guide-nav>li:nth-of-type(1){
     width: 30px;
     height: 22px;
  }
  .guide-nav>li:nth-of-type(2){
     width: 131px;
     height: 22px;
  }
  .guide-nav>li:nth-of-type(3){
     width: 93px;
     height: 22px;
  }
  .guide-nav>li:nth-of-type(4){
     width: 102px;
     height: 22px;
  }
   .guide-nav>li:nth-of-type(5){
     width: 77px;
     height: 22px;
  }
   .guide-nav>li:nth-of-type(6){
     width: 98px;
     height: 22px;
   }



  .accept-guide .guide-form > table > tr {
  }
  .accept-guide .guide-form > table > tr > td {
    border-bottom: 1px solid #e7e7e7;
    border-right: 1px solid #e7e7e7;
    line-height: 22px;
    text-align: left;
    text-indent: 15px;
    font-size: 12px;
    color: #888888;
  }
  .accept-guide .guide-form > table > tr > td:nth-of-type(1) {
    text-indent: 0;
    text-align: center;
  }
  .accept-guide .guide-form > table > tr:nth-of-type(1) > td {
    
  }
  .accept-guide .guide-form > table > tr > td:nth-of-type(1) {
    width: 32px;
    height: 22px;
  }
  .accept-guide .guide-form > table > tr > td:nth-of-type(2) {
    width: 131px;
    height: 22px;
  }
  .accept-guide .guide-form > table > tr > td:nth-of-type(3) {
    width: 98px;
    height: 22px;
  }
  .accept-guide .guide-form > table > tr > td:nth-of-type(4) {
    width: 106px;
    height: 22px;
  }
  .accept-guide .guide-form > table > tr > td:nth-of-type(5) {
    width: 80px;
    height: 22px;
  }
  .accept-guide .guide-form > table > tr > td:nth-of-type(6) {
    width: 87px;
    height: 22px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .importTrsHover:hover{
    background:rgb(237, 238, 239)
  }
  .footer {
   
    margin-top: 17px;
    float: right;
  }
  .footer > button {
    background: #5897ff;
    border: 0;
    color: #fff;
    outline: none;
    
     width: 102px;
    height: 26px;;
    font-size: 12px;
    border-radius: 4px;
  }
 .footer > button:hover{
   cursor: pointer;
 }
.footer > button:active{
  background:#6da4ff;
}
}
</style>
