<template>
  <div class="accept">
    <div class="accept-tit">
      <h2>受理&完成申请单</h2>
      <div v-if="btnOne" class="btnOne-head" @click="handleToAccept">受理该申请</div>
      <div class="btnTwo-head" v-if="btnTwo">
        <button @click="handleCancelAcceptModel">取消受理</button>
        <button @click="handleFinishedAcceptModel">完成该申请</button>
      </div>
    </div>
    <div class="accept-tabel">
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
          <td>状态</td>
          <td>受理人</td>
        </tr>

        <tr class="trhover" v-for="(item,index) in dataList"  @click="handleToModel($event,item,index)">
          <td>{{item.creationTime.substring(0,10)}}</td>
          <td>{{item.number}}</td>
          <td :data-id="item.type">{{item.type==1?'云单据':'云条码'}}</td>
          <td>{{item.projectNumber}}</td>
          <td>{{item.projectName}}</td>
          <td>{{item.linkman}}</td>
          <td>{{item.phoneNumber}}</td>
          <!-- <td>{{item.remark}}</td> -->
          <td> 
              <Poptip placement="bottom-start" trigger="hover" word-wrap class="tip-iview">
              <span class="tip-iview-span">{{item.remark}}</span>
              <div class="api" slot="content">
                <p>{{item.remark}}</p>
              </div>
            </Poptip>
          </td> 
          <td :data-id="item.status">{{item.status==1?'未受理':item.status==2?'已受理':item.status==3?'完成':'关闭'}}</td>
          <td>{{item.acceptedUsername}}</td>
        </tr>
      </table>
      <Page :total="count" :page-size="MaxResultCount" class="page" :current="page" @on-change="handleToDatalist" v-show="count<=12?false:true"/>
    </div>

    <div class="accept-model" v-show="acceptModel">
      <!-- 受理&完成申请单-申请单 -->
      <div class="accept-content1" v-if="acceptFinished">
        <div class="accept-head">
          <span>申请单</span>
          <span class="iconfont icon-chuyidong" @click="handleCloseApply"></span>
        </div>
        <div class="accept-body">
          <div>
            <div>
              <span>申请单号</span>
            </div>
            <div>
              <span>{{acceptNumber}}</span>
            </div>
          </div>
          <div>
            <div>
              <span>项目编号</span>
            </div>
            <div>
              <span>{{acceptProjectNumber}}</span>
              <span @click="handleToItemInfo" class="itemInfo">项目情况</span>
            </div>
          </div>
          <div>
            <div>
              <span>项目名称</span>
            </div>
            <div>
              <span>{{acceptProjectName}}</span>
            </div>
          </div>
          <div>
            <div>
              <span>联系人</span>
            </div>
            <div>
              <span>{{acceptLinkman}}</span>
            </div>
          </div>
          <div>
            <div>
              <span>备注</span>
            </div>
            <div>
              <span>{{acceptRemarkText}}</span>
            </div>
          </div>
        </div>
        <div class="accept-footer">
          <button v-if="acceptFinishedBtn" @click="handleToAcceptFinished">受理</button>
          <button v-if="acceptFinishedUnBtn" @click="handleToUnAcceptFinished">取消受理</button>
        </div>
      </div>
      <!-- accep-content2 -->
      <!-- 请备注申请单 -->
      <div class="accept-content3" v-if="acceptRemark">
        <div class="accept-head">
          <span>请备注你的申请单</span>
          <span class="iconfont icon-chuyidong" @click="handleCloseAcceptRemark"></span>
        </div>
        <div class="btn-href">
          <span class @click="handleClearContent">清空</span>
          <span @click="handleToImport">引用</span>
        </div>
        <div class="remarks" id="remarkValue">
              <div v-for="(item,index) in RemarkData">
                  <div><span>【{{item.brandName}}】:</span></div>
                  <div><span> {{item.type}}</span><span>申请单号：</span><span>{{item.number}}</span></div>
              </div>
        </div>
        <div class="footer">
          <button class="finished" @click="handleRemarked">完成</button>
        </div>
      </div>
      <!-- 项目情况 -->
      <div class="accept-content4" v-if="projectStatus">
        <div class="accept-head">
          <span>项目情况</span>
          <span class="iconfont icon-chuyidong" @click="handleCloseProjectStatus"></span>
        </div>
        <div class="item-new">
          <div>
            <span>已认证的品牌</span>
            <span :title="projectSituation.verifiedBrandName">{{projectSituation.verifiedBrandName}}</span>
          </div>
          <div>
            <span>认证中的品牌</span>
            <span :title="projectSituation.verifingBrandName">{{projectSituation.verifingBrandName}}</span>
          </div>
          <div>
            <span>已开通的支付</span>
            <span :title="projectSituation.openedReceivableAccount">{{projectSituation.openedReceivableAccount}}</span>
          </div>
          <div>
            <span>开通中的支付</span>
            <span :title="projectSituation.openningReceivableAccount">{{projectSituation.openningReceivableAccount}}</span>
          </div>
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
                     <tr v-for="(item,index) in importForms">
                      <td>
                        <span class="iconfont icon-fuxuankuang_weixuanzhong icon" @click="handleClickSelected($event,item)" style="color:#5897FF;"></span>
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
import Vuex from "vuex";
export default {
  name: "requestFormFinished",
  data() {
    return {
      //这个是主页面表格数据
      acceptModel: false,
      //头部按钮的显示
      btnOne: false,
      btnTwo: false,
      //受理&完成申请单-申请单受理未受理
      acceptFinished: false,
      //使用表格里面的数据进行判断
      acceptFinishedBtn: false,
      acceptFinishedUnBtn: false,
      //备注申请单
      acceptRemark: false,
      //项目情况
      projectStatus: false,
      //引用单号
      referenceSingleNumber: false,
      //点击受理时要向后端发送id
      id: "",
      //受理框中需要展示的数据
      acceptNumber: "",
      acceptProjectNumber: "",
      acceptProjectName: "",
      acceptLinkman: "",
      acceptRemarkText: "",
      //备注框中需要需要引用的数据
      RemarkData:[],
      //操作的那条数据的下标
      index:"",
      //获取的申请单页数
      page: 1,
      MaxResultCount: 12,
      Sorting: ""
    };
  },
  created() {
    var param = JSON.stringify({
      SkipCount: 0,
      MaxResultCount: this.MaxResultCount,
      Sorting: this.Sorting
    });
    this.handleGetRequestForms(param);
  },
  watch: {},
  computed: {
    ...Vuex.mapState({
      //总条数数
      count: state => state.requestFormFinished.count,
      //渲染的数据
      dataList: state => state.requestFormFinished.dataList,
      //项目情况
      projectSituation: state => state.requestFormFinished.projectSituation,
      //引用申请单的数据
      importForms: state=>state.requestFormFinished.importForms
    })
  },
  methods: {
    ...Vuex.mapActions({
      handleGetRequestForms: "requestFormFinished/handleGetRequestForms",
      //受理申请单
      handleToAcceptRequestForms:
        "requestFormFinished/handleToAcceptRequestForms",
      //项目情况
      GetProjectSituationByNumber:
        "requestFormFinished/getProjectSituationByNumber",
      //取消受理
      CancelAcceptCloudApplicationForm:
        "requestFormFinished/CancelAcceptCloudApplicationForm",
      //引用申请单
      GetRefferenceApplicationForms:"requestFormFinished/getRefferenceApplicationForms",
      //完成申请单
      FinishCloudApplicationForm: "requestFormFinished/finishCloudApplicationForm"
    }),
    //项目情况
    handleToItemInfo() {
      //点击受理框中的项目情况需要项目编号
      this.acceptFinished = false;
      this.acceptRemark = false;
      this.projectStatus = true;
      this.referenceSingleNumber = false;
      this.GetProjectSituationByNumber(this.acceptProjectNumber);
    },
    //关闭项目情况模态框
    handleCloseProjectStatus() {
      this.acceptModel = true;
      this.acceptFinished = true;
      this.acceptRemark = false;
      this.projectStatus = false;
      this.referenceSingleNumber = false;
    },
    //点击表格的状态决定显示那种类型模态框
    handleToModel($event, param,index) {
      this.acceptNumber = param.number;
      this.acceptProjectNumber = param.projectNumber;
      this.acceptProjectName = param.projectName;
      this.acceptLinkman = param.linkman;
      this.acceptRemarkText = param.remark;
      this.id = param.id;
      this.index=index;
      if (param.status === 1) {
        this.btnOne = true;
        this.btnTwo = false;
      } else if (param.status === 2) {
        this.btnTwo = true;
        this.btnOne = false;
      }else if (param.status===3){
         this.btnTwo = false;
        this.btnOne = false;
      }
      var trs = document.getElementsByClassName('trhover');
                var len =trs.length;
                for(var i=0;i<len;i++){
                    trs[i].style.background="";
                }
      trs[index].style.background="rgba(237,238,239,1)";
    
    },
    //点击模态框中的受理按钮向后端发送受理
    handleToAcceptFinished() {
      var param ={
        id: this.id,
        index:this.index
      }
      this.handleToAcceptRequestForms(param);
      this.acceptModel = false;
      this.acceptFinished = false;
      this.acceptRemark = false;
      this.projectStatus = false;
      this.referenceSingleNumber = false;
      this.btnOne = false;
    },
    //关闭受理框
    handleCloseApply() {
      this.acceptModel = false;
      this.acceptFinished = false;
      this.acceptRemark = false;
      this.projectStatus = false;
      this.referenceSingleNumber = false;
    },
    //受理状态下点击
    handleToAccept() {
      this.acceptModel = true;
      this.acceptFinished = true;
      this.acceptRemark = false;
      this.projectStatus = false;
      this.referenceSingleNumber = false;
      this.acceptFinishedBtn = true;
      this.acceptFinishedUnBtn = false;
    },

    //已受理的情况下点击取消受理
    handleCancelAcceptModel() {
      this.acceptModel = true;
      this.acceptFinished = true;
      this.acceptRemark = false;
      this.projectStatus = false;
      this.referenceSingleNumber = false;
      this.acceptFinishedBtn = false;
      this.acceptFinishedUnBtn = true;
    },
    //取消受理的模态框中点击取消受理
    handleToUnAcceptFinished() {
      var param ={
        "id": this.id,
        "index":this.index
      };
      this.CancelAcceptCloudApplicationForm(param);
      this.acceptModel = false;
      this.acceptFinished = false;
      this.acceptRemark = false;
      this.projectStatus = false;
      this.referenceSingleNumber = false;
      this.btnTwo=false;
     
    },
    //完成受理
    handleFinishedAcceptModel() {
      this.acceptModel = true;
      this.acceptRemark = true;
      this.projectStatus = false;
      this.referenceSingleNumber = false;
    },
    //关闭完成受理模态框
    handleCloseAcceptRemark() {
      this.acceptModel = false;
      this.acceptRemark = false;
      this.projectStatus = false;
      this.referenceSingleNumber = false;
    },
    //清空文本框中的数据
    handleClearContent() {
      var id = document.getElementById("remarkValue");
       this.RemarkData=[];
    },
    //引用申请单
    handleToImport(){
      var param =JSON.stringify({
        "ProjectNumber":this.acceptProjectNumber
      })
      this.GetRefferenceApplicationForms(param);
      this.acceptModel = true;
      this.acceptRemark = false;
      this.projectStatus = false;
      this.referenceSingleNumber = true;
    },
    //引用数据操作
    handleClickSelected($event,items){
      var param ={
          "brandName":items.brandName,
          "type":items.type,
          "number":items.number
      }
      if($event.target.className.indexOf('icon-fuxuankuang_weixuanzhong')!==-1){
          $event.target.classList.remove('icon-fuxuankuang_weixuanzhong');
          $event.target.classList.remove('icon');
          $event.target.classList.add('icon-fuxuankuang_xuanzhong');
          $event.target.classList.add('icon1');
          this.RemarkData.push(param);

      }else{
          $event.target.classList.remove('icon-fuxuankuang_xuanzhong');
          $event.target.classList.remove('icon1');
          $event.target.classList.add('icon-fuxuankuang_weixuanzhong');
          $event.target.classList.add('icon');
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
            this.acceptModel = true;
            this.acceptRemark = true;
            this.projectStatus = false;
            this.referenceSingleNumber = false;
         }
    },
    //关闭引用模态框
    handleCloseImport(){
      this.acceptModel = true;
      this.acceptRemark = true;
      this.projectStatus = false;
      this.referenceSingleNumber = false;
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
        var param ={
            "id":this.id,
            "Remark":remarkString,
            "index":this.index
        };
        this.FinishCloudApplicationForm(param);
      this.acceptModel = false;
      this.acceptRemark = false;
      this.projectStatus = false;
      this.referenceSingleNumber = false;
      this.btnTwo=false;
    },
  
  //分页
  handleToDatalist(page){
    this.page = page;
     var param = JSON.stringify({
      SkipCount: (this.page-1)*this.MaxResultCount,
      MaxResultCount: this.MaxResultCount,
      Sorting: this.Sorting
    });
    this.handleGetRequestForms(param);
  }
  }
};

</script>
<style lang="" scoped>
@media screen and (min-width: 1400px) {
  .accept {
    width: 1400px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 64px;
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .accept .accept-tit {
    margin-top: 80px;
    overflow: hidden;
    height: 37px;
  }
  .accept-tit > h2 {
    font-size: 24px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    float: left;
  }
  .accept-tit > div:hover {
    cursor: pointer;
  }
  .accept-tit > .btnOne-head {
    width: 122px;
    height: 36px;
    background: rgba(88, 151, 255, 1);
    border-radius: 4px;
    color: #fff;
    float: right;
    line-height: 36px;
    text-align: center;
    /* margin-right: 64px; */
  }
  .accept-tit > .btnOne-head:active{
    background:#6da4ff;
  }
  .accept-tit > .btnTwo-head {
    float: right;
    line-height: 36px;
    text-align: center;
    /* margin-right: 64px; */
  }
  .accept-tit > .btnTwo-head > button {
    width: 122px;
    height: 36px;
    border-radius: 4px;
    border: 1px solid rgba(88, 151, 255, 1);
    outline: none;
  }
  .accept-tit > .btnTwo-head > button:nth-of-type(1) {
    color: rgba(88, 151, 255, 1);
    background: #fff;
    margin-right: 20px;
  }
  .accept-tit > .btnTwo-head > button:nth-of-type(2) {
    color: #fff;
    background: rgba(88, 151, 255, 1);
  }
  .accept-tabel {
    margin-top: 30px;
    width: 100%;
    padding-right: 64px;
  }
  .accept-tabel > table {
   table-layout: fixed;
    width: 100%;
    border-top: 1px solid #e7e7e7;
    border-left: 1px solid #e7e7e7;
  }
  .accept-tabel > table > tr > td {
    border-bottom: 1px solid #e7e7e7;
    border-right: 1px solid #e7e7e7;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #888888;
  }
  .accept-tabel > table > tr:nth-of-type(1) > td {
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    background: rgba(241, 243, 246, 1);
    color: #888888;
  }
 .accept-tabel > table > tr:nth-of-type(1) > td {
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  background: rgba(241, 243, 246, 1);
  color: #888888;
}
.tip-iview{
  width:100%;
}
.ivu-poptip-rel{
  width: 100%;
}
.tip-iview-span{
  text-align:left;
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
 .accept-tabel>table > tr > td:nth-of-type(1){
    width: 130px;
}
 .accept-tabel>table > tr > td:nth-of-type(2){
    width: 220px;
}
 .accept-tabel>table > tr > td:nth-of-type(3){
    width: 100px;
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
  width:100px;
}
 
  .trhover:hover {
    cursor: pointer;
    background: #edeeef;
  }
  .ivu-page {
    text-align: center;
    margin-top: 71px;
  }
  /* 受理单的显示与隐藏 */
  .accept-model {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
  }
  .accept-content1,
  .accept-content2,
  .accept-content4 {
    width: 500px;
    height: 330px;
    background: #fff;
    position: fixed;
    top: 275px;
    left: 50%;
    margin-left: -250px;
    z-index: 11;
  }
  .accept-content3 {
    width: 600px;
    height: 440px;
    background: #fff;
    position: fixed;
    top: 275px;
    left: 50%;
    margin-left: -250px;
    z-index: 11;
  }

  .accept-content1 .accept-head,
  .accept-content2 .accept-head,
  .accept-content3 .accept-head,
  .accept-content4 .accept-head {
    margin: 23px 0;
    overflow: hidden;
  }
  .accept-content1 .accept-head > span:nth-of-type(1),
  .accept-content2 .accept-head > span:nth-of-type(1),
  .accept-content4 .accept-head > span:nth-of-type(1) {
    float: left;
    margin-left: 228px;
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .accept-content3 .accept-head > span:nth-of-type(1) {
    float: left;
    margin-left: 204px;
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .accept-content1 .accept-head > span:nth-of-type(2),
  .accept-content2 .accept-head > span:nth-of-type(2),
  .accept-content3 .accept-head > span:nth-of-type(2),
  .accept-content4 .accept-head > span:nth-of-type(2) {
    float: right;
    font-size: 20px;
    margin-right: 20px;
    color: #d2d2d2;
  }

  .accept-body {
    margin-left: 55px;
  }
  .accept-body > div {
    overflow: hidden;
  }
  .accept-body > div > div:nth-of-type(1) {
    float: left;
    font-size: 14px;
    margin-bottom: 15px;
  }
  .accept-body > div > div:nth-of-type(2) {
    float: right;
    width: 332px;
  }
  .accept-body > div > div:nth-of-type(2) > span:nth-of-type(1) {
    text-align: left;
    font-size: 14px;
  }
  .accept-body > div > div:nth-of-type(2) > span:nth-of-type(2) {
    float: right;
    margin-right: 22px;
    font-size: 14px;
    color: #5897ff;
  }
  .accept-footer {
    margin-left: 55px;
  }
  .accept-footer > button {
    border: 0;
    outline: none;
    width: 140px;
    height: 36px;
    background: rgba(88, 151, 255, 1);
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    float: right;
    margin-right: 29px;
  }
  .accept-footer > button:active{
    background:#6da4ff;
  }
  button {
    float: none;
  }
  .itemInfo:hover {
    cursor: pointer;
  }
  /* 请备注申请单 */
  .accept-content3 > .btn-href {
    width: 100%;
    text-align: right;
  }
  .accept-content3 > .btn-href > span:nth-of-type(2) {
    margin-right: 40px;
    color: #5897ff;
    font-size: 14px;
  }
  .accept-content3 > .btn-href > span:nth-of-type(1) {
    font-size: 14px;
    color: #5897ff;
    margin-right: 53px;
  }
  .btn-href:hover {
    cursor: pointer;
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
    overflow:auto;
  }
  .accept-content3 > .remarks>div{
    margin-bottom: 10px;
  }
  .accept-content3 > .footer {
    margin-top: 29px;
    overflow: hidden;
    float: right;
    margin-right: 40px;
  }
  .accept-content3 > .footer > button {
    width: 140px;
    height: 36px;
    background: #5897ff;
    border: 0;
    outline: none;
    color: #fff;
    font-size: 14px;

    border-radius: 4px;
  }
 .accept-content3 > .footer > button:active{
   background:#6da4ff;
 }
  /* 项目情况 */
  .item-new {
    width: 420px;
    height: 170px;
    margin-left: 40px;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    padding-left: 34px;
  }
  .item-new > div {
    line-height: 1;
    margin-bottom: 19px;
    overflow: hidden;
  }
  .item-new > div:nth-of-type(1) {
    margin-top: 27px;
  }
  .item-new > div > span:nth-of-type(1) {
    font-size: 14px;
    color: #c3c4c6;
    float:left;
  }
  .item-new > div > span:nth-of-type(2) {
    margin-left: 35px;
    font-size: 14px;
    color: #5b5b5b;
    float: left;
    width: 260px;
    text-overflow:ellipsis;
    white-space: nowrap;
    height:14px;
    line-height: 1; 
    overflow: hidden;
  }
  .item-new > div > span:nth-of-type(2):hover{
    cursor: pointer;
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
  .footer > button:active{
    background:#6da4ff;
  }

  .icon {
    color: #d4d4d4;
  }
  .icon1 {
    color: #5897ff;
  }
  .page {
    position: absolute;
    top: 650px;
    left: 0;
    right: 0;
  }
}

@media screen and (max-width: 1400px) {
  .accept {
    width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 46px;
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .accept .accept-tit {
    margin-top: 58px;
    overflow: hidden;
  }
  .accept-tit > h2 {
    font-size: 19px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    float: left;
  }
  .accept-tit > div:hover {
    cursor: pointer;
  }
  .accept-tit > .btnOne-head {
    width: 89px;
    height: 26px;
    background: rgba(88, 151, 255, 1);
    border-radius: 4px;
    color: #fff;
    float: right;
    line-height: 26px;
    text-align: center;
    /* margin-right: 46px; */
  }
  .accept-tit > .btnOne-head:active{
    background:#6da4ff;
  }
  .accept-tit > .btnTwo-head {
    float: right;
    line-height: 26px;
    text-align: center;
    /* margin-right: 47px; */
  }

  .accept-tit > .btnTwo-head > button {
    width: 89px;
    height: 26px;
    border-radius: 4px;
    border: 1px solid rgba(88, 151, 255, 1);
    outline: none;
  }
  .accept-tit > .btnTwo-head > button:nth-of-type(1) {
    color: rgba(88, 151, 255, 1);
    background: #fff;
    margin-right: 15px;
  }
  .accept-tit > .btnTwo-head > button:nth-of-type(2) {
    color: #fff;
    background: rgba(88, 151, 255, 1);
  }

  .accept-tabel {
    margin-top: 36px;
    width: 100%;
    /* padding-right: 46px; */
  }
  .accept-tabel > table {
    table-layout: fixed;
    width: 100%;
    border-top: 1px solid #e7e7e7;
    border-left: 1px solid #e7e7e7;
  }
  .accept-tabel > table > tr > td {
    border-bottom: 1px solid #e7e7e7;
    border-right: 1px solid #e7e7e7;
    line-height: 22px;
    text-align: center;
    font-size: 12px;
    color: #888888;
  }

  .tip-iview-span{
  text-align:left;
  display: block;
  height: 22px;
  padding-top: 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width:50px;
  margin: 0 auto;
 line-height: 22px;

}

.accept-tabel > table > tr:nth-of-type(1) > td {
  line-height: 30px;
  text-align: center;
  font-size: 12px;
  background: rgba(241, 243, 246, 1);
  color: #888888;
 
}

.accept-tabel>table > tr > td:nth-of-type(1){
    width: 94px;
}
.accept-tabel>table > tr > td:nth-of-type(2){
    width: 160px;
}
.accept-tabel>table > tr > td:nth-of-type(3){
    width: 73px;
}
.accept-tabel>table > tr > td:nth-of-type(4){
    width: 102px;
}
.accept-tabel>table > tr > td:nth-of-type(5){
    width:87px;
}
.accept-tabel>table > tr > td:nth-of-type(6){
    width: 80px;
}
.accept-tabel>table > tr > td:nth-of-type(7){
    width:109px;
}
.accept-tabel>table > tr > td:nth-of-type(8){
    width:73px;
    height: 22px;

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
    margin-top: 52px;
  }
  /* 受理单的显示与隐藏 */
  .accept-model {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
  }
  .accept-content1,
  .accept-content2,
  .accept-content4 {
    width: 365px;
    height: 260px;
    background: #fff;
    position: absolute;
    top: 200px;
    left: 50%;
    margin-left: -182px;
    z-index: 11;
  }
  .accept-content3 {
    width: 438px;
    height: 321px;
    background: #fff;
    position: absolute;
    top: 200px;
    left: 50%;
    margin-left: -182px;
    z-index: 11;
  }

  .accept-content1 .accept-head,
  .accept-content2 .accept-head,
  .accept-content3 .accept-head,
  .accept-content4 .accept-head {
    margin: 17px 0;
    overflow: hidden;
  }
  .accept-content1 .accept-head > span:nth-of-type(1),
  .accept-content2 .accept-head > span:nth-of-type(1),
  .accept-content4 .accept-head > span:nth-of-type(1) {
    float: left;
    margin-left: 166px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .accept-content3 .accept-head > span:nth-of-type(1) {
    float: left;
    margin-left: 149px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .accept-content1 .accept-head > span:nth-of-type(2),
  .accept-content2 .accept-head > span:nth-of-type(2),
  .accept-content3 .accept-head > span:nth-of-type(2),
  .accept-content4 .accept-head > span:nth-of-type(2) {
    float: right;
    font-size: 16px;
    margin-right: 15px;
    color: #d2d2d2;
  }

  .accept-body {
    margin-left: 40px;
  }
  .accept-body > div {
    overflow: hidden;
  }
  .accept-body > div > div:nth-of-type(1) {
    float: left;
    font-size: 12px;
    margin-bottom: 15px;
  }
  .accept-body > div > div:nth-of-type(2) {
    float: right;
    width: 242px;
  }
  .accept-body > div > div:nth-of-type(2) > span:nth-of-type(1) {
    text-align: left;
    font-size: 12px;
  }
  .accept-body > div > div:nth-of-type(2) > span:nth-of-type(2) {
    float: right;
    margin-right: 16px;
    font-size: 12px;
    color: #5897ff;
  }
  .accept-footer {
    margin-left: 40px;
  }
  .accept-footer > button {
    border: 0;
    outline: none;
    width: 102px;
    height: 26px;
    background: rgba(88, 151, 255, 1);
    border-radius: 4px;
    color: #fff;
    font-size: 12px;
    float: right;
    margin-right: 21px;
  }
  .accept-footer > button:active{
    background:#6da4ff;
  }
  .itemInfo:hover {
    cursor: pointer;
  }
  /* 请备注申请单 */
  .accept-content3 > .btn-href {
    width: 100%;
    text-align: right;
  }
  .accept-content3 > .btn-href > span:nth-of-type(2) {
    margin-right: 29px;
    color: #5897ff;
    font-size: 12px;
  }
  .accept-content3 > .btn-href > span:nth-of-type(1) {
    font-size: 12px;
    color: #5897ff;
    margin-right: 38px;
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
    overflow: auto;
  }
  .accept-content3 > .remarks>div{
    margin-bottom: 7px;
  }
  .accept-content3 > .footer {
    float: right;
    margin-top: 21px;
    overflow: hidden;
    margin-right: 29px;
  }
  .accept-content3 > .footer > button {
    width: 102px;
    height: 26px;
    background: #5897ff;
    border: 0;
    outline: none;
    color: #fff;
    font-size: 12px;

    border-radius: 4px;
  }
  .accept-content3 > .footer > button:active{
    background:#6da4ff;
  }
  /* 项目情况 */
  .item-new {
    width: 306px;
    height: 153px;
    margin-left: 29px;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    padding-left: 25px;
  }
  .item-new > div {
    line-height: 1;
    margin-bottom: 14px;
    overflow: hidden;
  }
  .item-new > div:nth-of-type(1) {
    margin-top: 19px;
  }
  .item-new > div > span:nth-of-type(1) {
    font-size: 12px;
    color: #c3c4c6;
    float: left;
  }
  .item-new > div > span:nth-of-type(2) {
    float:left;
    margin-left: 25px;
    font-size: 12px;
    color: #5b5b5b;
    width:180px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 12px;
    line-height: 1;
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
  .footer {
    width: 102px;
    height: 26px;
    margin-top: 17px;
  }
  .footer > button {
    background: #5897ff;
    border: 0;
    color: #fff;
    outline: none;
    float: left;
    width: 100%;
    height: 100%;
    font-size: 12px;
    border-radius: 4px;
  }
.footer > button:active{
  background:#6da4ff;
}
  .page {
    position: absolute;
    position: absolute;
    top: 474px;
    left: 0;
    right: 0;
  }
  .icon {
    color: #d4d4d4;
  }
  .icon1 {
    color: #5897ff;
  }
}
</style>