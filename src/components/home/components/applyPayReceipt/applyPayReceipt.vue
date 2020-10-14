<template>
  <div class="new-request-form">
    <div>
      <h2>申请云支付收款账号</h2>
    </div>
    <div style="overflow:hidden;">
      <div class="item-select">
        <div>
          <span>项目编号：</span>
          <div>{{projectsNum}}</div>
        </div>
        <div>
          <span>项目名称:</span>
          <div>{{projectsName}}</div>
        </div>
        <div @click="handelSearchShow">
          <span class="iconfont icon-sousuo"></span>
          <div>
            <span>选择项目</span>
          </div> 
        </div>
      </div>
    </div>
    <!-- 这是搜索模态框 -->

    <div class="search-model" v-show="searchModel" @keydown="handleEnterToSearch">
      <div class="search-content">
        <div class="search-tit">
          <span>搜索</span>
          <span class="iconfont icon-chuyidong" @click="handleSearchHide"></span>
        </div>
        <div class="search-input">
          <div>
            <input type="text" placeholder="请输入项目编号/项目名称"  v-model="searchVal" />
          </div>
          <div>
            <button @click="handleToSearch" >搜索</button>
          </div>
        </div>
        <div class="search-form">
          <div>
            <span>项目编号</span>
            <span>项目名称</span>
          </div>
          <!-- 下面是获取到的项目信息 -->
          <div class="projects-content">
                 <div class="search-item" v-for="(item,index) in searchProjects"  @click="handleClickProject($event,item)"><span>{{item.name}}</span><span>{{item.projectNumber}}</span></div>
                 <div class="searchNot" v-show="searchNot">搜索不到该项目编号/名称,请重新搜索</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最后提示模态框 -->

    <div class="tipModel" v-show="tipModel">
      <div class="tip">
        <div class="tip-head">
          <span>提示</span>
          <span class="iconfont icon-chuyidong" @click="handleCloseTipModel"></span>
        </div>
        <div class="tip-body">
          <img src="../../../../assets/yinhang.png" alt />
          <div>
            <p>请确认收款银行是否为</p>
            <p>{{bankName}}</p>
          </div>
        </div>
        <div class="tip-footer">
          <div @click="handelSelectTip">
            <span class="iconfont icon icon-xuanzhong2"  id="iconTip"></span>
            <span>我已经确认无误</span>
          </div>
          <div>
            <button @click="handleApply" :style="tipBtn">确定</button>
          </div>
        </div>
      </div>
    </div>

    <div class="request-form">
      <div>
        <span>品牌名称：</span>
        <div>
          <Select v-model="modelType" class="select-iview"  clearable @on-change="handleType" size="large">
            <Option
              v-for="item in brands"
              :value="item.value"
              :key="item.value"
              class="select-opation"
            >{{ item.label }}</Option>
          </Select>
        </div>
        <div class="brandNameTip" v-show="brandsNameTip">*请选择品牌</div>
      </div>
      <div>
        <span>收款银行:</span>
        <div class="bankName">
          <Select v-model="modelBankType" clearable class="select-iview" :label-in-value="true" @on-change="handleTypeBank" size="large">
            <Option
              v-for="item in banks"
              :value="item.value"
              :key="item.value"
              class="select-opation"
            >{{ item.label }}</Option>
          </Select>
        </div>
        <div class="bankNameTip" v-show="banksNameTip">*请选择收款银行</div>
      </div>
      <div>
        <span>联系人:</span>
        <div class="form-info linkManName">
          <input type="text" v-model="Linkman"   @focus="handleLinkManName"/>
        </div>
        <div class="linkManNameTip" v-show="LinkManNameTip">*请输入联系人</div>
      </div>
      <div>
        <span>联系电话:</span>
        <div class="form-info linkPhoneNum">
          <input type="text" v-model="phoneNumber" @focus="handlePhoneNumber"/>
        </div>
        <div class="linkPhoneNumTip" v-show="LinkPhoneTip">*请输入联系电话</div>
      </div>
      <div>
        <span>地址：</span>
        <div>
          <textarea name id cols="30" rows="10"  v-model="Address" :style="tipText" @focus="handleTofocus"></textarea>
        </div>
      </div>
    </div>
    <div class="save-btn">
      <button @click="handelTip" :style="saveBtn"><span v-show="saveLoading==false?true:false">保存</span><span v-show="saveLoading==false?false:true">保存中...</span></button>
    </div>
     <div class="save-success" v-show="saveSuccessTip"><img src="../../../../assets/saveSuccess.png" alt=""></div>
  </div>
</template>
<script>
import Vuex from "vuex";
export default {
  name: "applyPayReceipt",
  data() {
    return {
      //品牌类型
      modelType: "",
      //银行
      modelBankType:"",
      //银行名称
      bankName:"",
      searchModel: false,
      tipModel: false,
      projectsNum: "",
      projectsName: "",
      paymentBank:"",
      Linkman:"",
      phoneNumber:"",
      Address:"请输入地址...",
      brandsId:"",
      banksId:"",
      searchVal:"",
      sure:false,
      //文本框提示文字
      tipText:"color:#c5c8ce;",
      //提示按钮灰色
      tipBtn:"color:#B7B8BA;background:rgba(243,244,245,1);",
      //按钮颜色
      saveBtn:"color:#B7B8BA;background:rgba(243,244,245,1);",
      //保存的loading操作
      // saveLoding:false,
      //函数防抖
      timer:null,
      //输入框漏选
      brandsNameTip:false,
      banksNameTip:false,
      LinkManNameTip:false,
      LinkPhoneTip:false,
      //保存成功提示
      saveSuccessTip:false
    };
  },
  watch: {
        saveSuccess(newValue,oldValue){
            if(newValue){
                  this.projectsNum="";
                  this.projectsName="";
                 //品牌类型
                  this.modelType= "";
                  //银行
                  this.modelBankType="";
                  this.Linkman="";
                  this.phoneNumber="";
                  this.Address="请输入地址...";
                  this.tipText="color:#c5c8ce;"
                  this.saveSuccessTip=true;
                  var _this=this;
                  var timerTwo = setTimeout(()=>{
                     _this.saveSuccessTip=false;
                     clearTimeout(timerTwo)
                  },1000)
            }
        },
        modelType(newValue,oldValue){
                  this.saveBtn="background:#5897FF;color: #fff;";
        },
        modelBankType(newValue,oldValue){
                  this.saveBtn="background:#5897FF;color: #fff;";
        },
        linkman(newValue,oldValue){
                     this.saveBtn="background:#5897FF;color: #fff;";
                }, 
        phoneNumber(newValue,oldValue){
                    this.saveBtn="background:#5897FF;color: #fff;";
                },
        Address(newValue,oldValue){
                    this.saveBtn="background:#5897FF;color: #fff;";
                }
  },
  computed: {
    ...Vuex.mapState({
      //初始化项目列表
      projects: state => state.applyPayReceipt.projects,
      //品牌
      brands : state=>state.applyPayReceipt.brands,
      //银行
      banks:state=>state.applyPayReceipt.banks,
      //模糊查询出来的数据
      searchProjects:state=>state.applyPayReceipt.searchProjects,
      //查不到
      searchNot:state=>state.applyPayReceipt.searchNot,
      //loading状态
      saveLoading:state=>state.applyPayReceipt.saveLoading,
      //保存的状态
      saveSuccess:state=>state.applyPayReceipt.saveSuccess

     
    })
  },
  methods: {
    ...Vuex.mapActions({
      initialAddDatas: "applyPayReceipt/initialAddDatas",
      //根据项目编号获取品牌名称
      getBrandByProjectNumber:"applyPayReceipt/getBrandByProjectNumber",
      //新建申请单
      addApplicationForm:"applyPayReceipt/addApplicationForm",
      //模糊查询
      getSearchVal:"applyPayReceipt/getSearchVal",
      //清除查询到的数据
      handleclickClearSearchData:"applyPayReceipt/handleclickClearSearchData",
    }),
    //搜索模态框的显示与隐藏
    handelSearchShow() {
      this.initialAddDatas();
      this.searchModel = true;
    },
    handleSearchHide() {
      this.searchModel = false;
      //清除搜索到的东西
      this.handleclickClearSearchData();
      this.searchVal="";
    },
    //项目选中操作
    handleClickProject($event, item) {
      this.projectsNum = item.projectNumber;
      this.projectsName = item.name;
      //根据项目编号获取品牌名称
      this.getBrandByProjectNumber(this.projectsNum); 

      this.searchModel = false;
      //清除搜索到的东西
      this.handleclickClearSearchData();
      this.searchVal="";
    },
    //选中品牌类型
    handleType(value){ 
      this.brandsId =parseInt(value.substring(0,value.indexOf(',')));
      this.brandsNameTip=false;
    },
    //选中的银行id
    handleTypeBank(param){
      this.banksId = parseInt(param.value.substring(0,param.value.indexOf(':')));
      this.bankName =param.label;
      this.banksNameTip=false;
    },

    //提示模态框的显示隐藏
    handelTip(){
      //品牌没填
      if(this.brandsId==""){
          this.brandsNameTip=true;
      }
      //银行没选
      if(this.banksId==""){
           this.banksNameTip=true;
      }
      //联系人没填
      if(this.Linkman==""){
          this.LinkManNameTip=true;
      }
      //联系电话没填
      if(this.phoneNumber==""){
         this.LinkPhoneTip=true; 
      }
      //项目没有选择
      if(this.projectsNum==""){
        alert('请选择项目');
      }
      if(this.banksId!=="" && this.brandsId!=="" && this.Linkman!=="" &&this.phoneNumber!==""&&this.projectsNum!==""){
          this.tipModel = true;
      }
      
    },
    handleCloseTipModel(){
      this.tipModel =false;
    },
    //提示框中的选中
    handelSelectTip($event){
        var iconTip = document.getElementById('iconTip');

        if(iconTip.className.indexOf('icon-xuanzhong2')===-1){
             iconTip.classList.remove('icon-selected');
             iconTip.classList.add('icon-xuanzhong2');
             this.sure=false;
              this.tipBtn="color:#B7B8BA;background:rgba(243,244,245,1);"
            
        }else{
          iconTip.classList.remove('icon-xuanzhong2')
          iconTip.classList.add('icon-selected');
          this.sure = true;
           this.tipBtn="background:#5897FF;color:#fff;"
        }
    },
     //模糊查询
    handleToSearch(){
                 if(this.searchVal!==''){
                     this.getSearchVal(this.searchVal);
                 }
                   
    },
    //enter点击查询
     handleEnterToSearch($event){
          if($event.keyCode===13){
                     if(this.searchVal!==''){
                     this.getSearchVal(this.searchVal);
                    }
                 }
     },
    //申请云支付收款账号
    handleApply(){
        var address ="" ;
        var _this = this; 
        if(this.sure){
            if(this.Address=="请输入地址..."){
              address=""
            }else{
              address = this.Address;
            }
        if(this.timer){
          clearTimeout(this.timer);
          // this.saveLoding=false;
        }
          this.timer=setTimeout(() => {
              // _this.saveLoding=true;
               var param =JSON.stringify({
                "ProjectNumber":_this.projectsNum,
                "BrandID":_this.brandsId,
                "BankID":_this.banksId,
                "Linkman":_this.Linkman,
                "PhoneNumber":_this.phoneNumber,
                "Address":address
            })
            _this.addApplicationForm(param)
          }, 300);

           
            this.sure=false;
            var iconTip = document.getElementById('iconTip');
             iconTip.classList.remove('icon-selected');
             iconTip.classList.add('icon-xuanzhong2');
             this.sure=false;
            this.tipModel=false;
        }
    },
    //文本域得焦时
    handleTofocus(){
        if(this.Address=='请输入地址...'){
                     this.Address=""
            }
            this.tipText ="color:#515A6E;"
        },
    //以下所有输入框得焦对应操作
  handleLinkManName(){
      this.LinkManNameTip=false;
  },
  handlePhoneNumber(){
     this.LinkPhoneTip = false;
  }
    
  },
  created() {
    
  }
};
</script>
<style lang="" scoped>
@media screen and (min-width: 1400px) {
  .new-request-form{
            padding-left:89px;
            width:1400px;
            margin: 0 auto;
            box-sizing: border-box;
            height: 100%;
    }
    .new-request-form>div:nth-of-type(1){
            margin-top:80px;
            margin-bottom: 56px;
    }
     .new-request-form>div>h2{
         font-weight: 500;
         font-size: 24px;
         color: #333;
         line-height: 1;
     }
    
     .select-option{
         font-size:14px;
     }
     .item-select{
         float: left;
         padding-bottom: 26px;
         border-bottom:1px solid rgba(232,235,240,1); 
     }
     .item-select>div{
            float: left;
     }
      .item-select>div:nth-of-type(1){
          margin-right: 59px;
      }
       .item-select>div:nth-of-type(2){
           margin-right: 140px;
       }
     .item-select>div>span{
         float: left;
         font-size: 14px;
         line-height: 34px;
         margin-right: 30px;
     }
      .item-select>div:nth-of-type(1) div{
          float: left;
          width:180px;
          height: 34px;
          background:rgba(227,229,232,1);
          border-radius:2px;
          line-height: 34px;
          text-align: center;
          font-size: 14px;
          color:#c5c8ce;

      }
      .item-select>div:nth-of-type(2) div{
           float: left;
          width:180px;
          height: 34px;
          background:rgba(227,229,232,1);
          border-radius:2px;
          line-height: 34px;
          text-align: center;
          font-size: 14px;
          color:#c5c8ce;

      }
      .item-select>div:nth-of-type(3){
          color: #5897FF;
          font-size: 14px;
      }
       .item-select>div:nth-of-type(3)>span{
           font-size: 16px;
           margin-right: 5px;
       }
       .item-select>div:nth-of-type(3)>div{
           float: left;
           line-height: 34px;
       }
      .item-select>div:nth-of-type(3):hover{
          cursor: pointer;
      }
     .search-form > .projects-content:hover{
          cursor: pointer;
      }
      .request-form{

      }
      .request-form >div{
          margin-top: 14px;
          overflow: hidden;
          width: 100%;

      }
       .request-form >div span{
           font-size: 14px;
           float:left;
           display: block;
           width:100px;
           line-height: 34px;
       }
       .request-form >div>div:nth-of-type(1){
           float:left;
           width:300px;
       }
       .request-form >div>div:nth-of-type(2){
         float: left;
         height:34px;
         line-height:34px;
         color:red;
         margin-left: 15px;
       }
       .form-info{
             border:1px solid rgba(232,235,240,1);
             border-radius:2px;
             height: 36px;
       }
       .request-form .form-info>span{
            float:none;
        }
      .ivu-select-selected-value{
           font-size: 14px !important;
       }
       .request-form .form-info>input{
           width: 100%;
           height:100%;
           border: 0;
           outline: none;
           text-indent: 7px;
           font-size: 14px;
           color:#515A6E ;
       }
       .request-form >div>span{
           float: left;
           line-height: 30px;
       }
        .request-form>div:nth-of-type(1) , .request-form>div:nth-of-type(2),  .request-form>div:nth-of-type(3) ,.request-form>div:nth-of-type(4){
            /* width: 396px; */
        }
        .request-form >div:nth-of-type(5){
            /* width: 818px; */
        }
         .request-form >div:nth-of-type(5)>div{
             width: 720px;
            height: 128px;
         }
          .request-form >div:nth-of-type(5)>div>span{
              line-height: 1;
          }
        .request-form >div:nth-of-type(5)>div>textarea{
           width: 720px;
            height: 128px;
            font-size:14px;
            resize:none; 
            outline: none;
            padding-top: 7px;
            padding-left: 8px;
            color:#515A6E ;
             border:1px solid rgba(232,235,240,1);
        }   
        .save-btn{
                width:140px;
                height:48px;
                float:left;
                margin-left: 630px;
                margin-top: 141px;
        }
         .save-btn>button{
                width:100%;
                height:100%;
                outline: none;
                background:#5897FF;
                color: #fff;
                border: 0;
                border-radius: 4px;
         }
          .save-btn>button:hover{
            cursor: pointer;
          }
         .save-btn>button:active{
             background: #6da4ff;

         }
  /* 选择项目中的模态框的显示与隐藏 */
  .search-model {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  .search-model .search-content {
    width: 500px;
    height: 300px;
    background: #fff;
    position: absolute;
    top: 275px;
    left: 50%;
    margin-left: -250px;
  }
  .search-model .search-content .search-tit {
    margin: 23px 0;
    overflow: hidden;
  }
  .search-model .search-content .search-tit > span:nth-of-type(1) {
    float: left;
    margin-left: 228px;
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .search-model .search-content .search-tit > span:nth-of-type(2) {
    float: right;
    font-size: 20px;
    margin-right: 20px;
    color: #d2d2d2;
  }
  .search-model .search-content .search-input {
    margin-left: 51px;
    overflow: hidden;
  }
  .search-model .search-content .search-input > div:nth-of-type(1) {
    width: 300px;
    height: 34px;
    background: #e7e7e7;
    border-radius: 2px;
    float: left;
  }
  .search-model .search-content .search-input > div:nth-of-type(1) > input {
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    background: #f1f3f6;
    text-indent: 19px;
    font-size: 14px;
  }
  .search-model .search-content .search-input > div:nth-of-type(2) {
    float: left;
    width: 80px;
    height: 34px;
    margin-left: 18px;
    border-radius: 2px;
  }
  .search-model .search-content .search-input > div:nth-of-type(2) > button{
    border: 0;
    outline: none;
    width: 100%;
    height: 100%;
    background: rgba(88, 151, 255, 1);
    color: #fff;
    border-radius: 4px;
  }
  .search-model .search-content .search-input > div:nth-of-type(2) > button:hover{
    cursor: pointer;
  }
  .search-model .search-content .search-input > div:nth-of-type(2) > button:active{
    background: #6da4ff;
  }
  .search-form {
    margin-top: 20px;
    margin-left: 51px;
  }
  .search-form > div:nth-of-type(1) {
    overflow: hidden;
  }
  .search-form > div:nth-of-type(1) > span {
    float: left;
    display: block;
    width: 120px;
    height: 30px;
    background: #f1f3f6;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    border: 1px solid rgba(231, 231, 231, 1);
  }
  .search-item {
    overflow: hidden;
  }
  .search-item > span {
    float: left;
    display: block;
    width: 120px;
    height: 30px;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    border: 1px solid rgba(231, 231, 231, 1);
  }

  /* 最后提示框 */
  .tipModel {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
  }
  .tipModel > .tip {
    width: 420px;
    height: 230px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -210px;
    margin-top: -130px;
  }

  .tip-head {
    margin: 23px 0;
    overflow: hidden;
  }
  .tipModel .tip .tip-head > span:nth-of-type(1) {
    float: left;
    margin-left: 187px;
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .tipModel .tip .tip-head > span:nth-of-type(2) {
    float: right;
    font-size: 20px;
    margin-right: 20px;
    color: #d2d2d2;
  }
  .tip-body {
    padding-left: 98px;
    overflow: hidden;
  }
  .tip-body > img {
    width: 54px;
    height: 54px;
    float: left;
  }
  .tip-body > div {
    float: left;
    margin-left: 21px;
    margin-top: 10px;
  }
  .tip-body > div > p:nth-of-type(1) {
    font-size: 14px;
  }
  .tip-body > div > p:nth-of-type(2) {
    font-size: 16px;
  }
  .tip-footer {
    margin-left: 53px;
    margin-top: 44px;
  }
  .tip-footer > div:nth-of-type(1) {
    float: left;
    margin-top: 6px;
  }
  .tip-footer > div:nth-of-type(1):hover{
    cursor:pointer;
  }
  .tip-footer > div:nth-of-type(1) > span:nth-of-type(1) {
    font-size: 16px;
    margin-left: 9px;
  }
  .tip-footer > div:nth-of-type(1) > span:nth-of-type(2) {
    font-size: 14px;
  }

  .tip-footer > div:nth-of-type(2) {
    float: right;
    margin-right: 31px;
    width: 80px;
    height: 34px;
  }
  .tip-footer > div:nth-of-type(2) > button {
    width: 100%;
    height: 100%;
    background: #5897ff;
    border: 0;
    color: #fff;
    font-size: 14px;
    outline: none;
  }
  .icon{
    color: #5897ff;
  }
  .searchNot{
             background:rgba(0,0,0,0.3);
             font-size: 14px;
             position: absolute;
             left: 50%;
             margin-left: -110px;
             color: #fff;
             font-size: 12px;
             padding: 6px;
             width: 220px;
             top:200px;
             border-radius: 2px;
             text-align: center;
        }
          .save-success{
            position:fixed;
            top: 50%;
            left:50%;
            width:200px;
            height:50px;
            margin-left:-100px;
            margin-top:-25px;
        }
        .save-success>img{
            width:100%;
            height:100%;
        }
 
}

@media screen and (max-width: 1400px) {
   .new-request-form{
            padding-left:65px;
            width:1024px;
            margin: 0 auto;
            box-sizing: border-box;
            height: 100%;
    }
    .new-request-form>div:nth-of-type(1){
            margin-top:58px;
            margin-bottom:41px;
    }
     .new-request-form>div>h2{
         font-weight: 500;
         font-size: 19px;
         color: #333;
         line-height: 1;
     }
     .item-select{
         float: left;
         padding-bottom: 19px;
         border-bottom:1px solid rgba(232,235,240,1); 
     }
     .select-option{
         font-size:12px;
     }
     .item-select>div{
            float: left;
     }
      .item-select>div:nth-of-type(1){
          margin-right: 43px;
      }
       .item-select>div:nth-of-type(2){
           margin-right: 102px;
       }
     .item-select>div>span{
         float: left;
         font-size: 12px;
         line-height: 34px;
         margin-right: 14px;
     }
      .item-select>div:nth-of-type(1) div{
          float: left;
          width:131px;
          height: 34px;
          background:rgba(227,229,232,1);
          border-radius:2px;
          line-height: 34px;
          text-align: center;
          font-size: 12px;
          color:#c5c8ce;

      }
      .item-select>div:nth-of-type(2) div{
           float: left;
          width:131px;
          height: 34px;
          background:rgba(227,229,232,1);
          border-radius:2px;
          line-height: 34px;
          text-align: center;
          font-size: 12px;
          color:#c5c8ce;

      }
      .item-select>div:nth-of-type(3){
          color: #5897FF;
          font-size: 12px;
      }
       .item-select>div:nth-of-type(3)>span{
           font-size: 14px;
           margin-right: 4px;
       }
       .item-select>div:nth-of-type(3)>div{
           float: left;
           line-height: 34px;
       }
      .item-select>div:nth-of-type(3):hover{
          cursor: pointer;
      }
      .request-form{

      }
      .request-form >div{
          margin-top: 12px;
          overflow: hidden;
        
      }
       .request-form >div span{
           font-size: 12px;
           float:left;
           display: block;
           width: 73px;
       }
       .request-form >div>div:nth-of-type(1){
           float: left;
           width:219px;
       }
      .request-form >div>div:nth-of-type(2){
         float: left;
         height:34px;
         line-height:34px;
         color:red;
         margin-left: 15px;
       }
       .form-info{
             border:1px solid rgba(232,235,240,1);
             border-radius:2px;
             height: 34px;
       }
      .ivu-select-selected-value{
           font-size: 12px !important;
       }
       .request-form .form-info>input{
           width: 100%;
           height:100%;
           border: 0;
           outline: none;
           text-indent: 7px;
           font-size: 14px;
            color:#515A6E ;
           
       }
       .request-form >div>span{
           float: left;
           line-height: 34px;
           display: block;
           width: 73px;
       }
        .request-form>div:nth-of-type(1) , .request-form>div:nth-of-type(2),  .request-form>div:nth-of-type(3),.request-form>div:nth-of-type(4){
            /* width: 289px; */
        }
        .request-form >div:nth-of-type(5){
            /* width: 597px; */
        }
         .request-form >div:nth-of-type(5)>div{
             width: 525px;
            height: 93px;
         }
        .request-form >div:nth-of-type(5)>div>textarea{
           width: 525px;
            height: 93px;
            font-size:14px;
            resize:none; 
            padding-left: 8px;
            padding-top: 5px;
            color:#515A6E ;
            outline: none;
            border:1px solid rgba(232,235,240,1);
        }   
        .save-btn{
                width:102px;
                height:35px;
                float:left;
                margin-left: 459px;
                margin-top: 50px;
        }
         .save-btn>button{
                width:100%;
                height:100%;
                outline: none;
                background:#5897FF;
                color: #fff;
                border: 0;
                border-radius: 4px;
         }
        .save-btn>button:active{
             background: #6da4ff;

         }
  /* 选择项目中的模态框的显示与隐藏 */
  .search-model {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  .search-model .search-content {
    width: 365px;
    height: 219px;
    background: #fff;
    position: absolute;
    top: 200px;
    left: 50%;
    margin-left: -182px;
  }
  .search-model .search-content .search-tit {
    margin: 16px 0;
    overflow: hidden;
  }
  .search-model .search-content .search-tit > span:nth-of-type(1) {
    float: left;
    margin-left: 166px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .search-model .search-content .search-tit > span:nth-of-type(2) {
    float: right;
    font-size: 16px;
    margin-right: 14px;
    color: #d2d2d2;
  }
  .search-model .search-content .search-input {
    margin-left: 37px;
    overflow: hidden;
  }
  .search-model .search-content .search-input > div:nth-of-type(1) {
    width: 219px;
    height: 25px;
    background: #e7e7e7;
    border-radius: 2px;
    float: left;
  }
  .search-model .search-content .search-input > div:nth-of-type(1) > input {
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    background: #f1f3f6;
    text-indent: 14px;
    font-size: 12px;
  }
  .search-model .search-content .search-input > div:nth-of-type(2) {
    float: left;
    width: 58px;
    height: 25px;
    margin-left: 13px;
    border-radius: 2px;
  }
  .search-model .search-content .search-input > div:nth-of-type(2) > button {
    border: 0;
    outline: none;
    width: 100%;
    height: 100%;
    background: rgba(88, 151, 255, 1);
    color: #fff;
    border-radius: 4px;
  }
  .search-model .search-content .search-input > div:nth-of-type(2) > button:active{
    background: #6da4ff;
  }
  .search-form {
    margin-top: 14px;
    margin-left: 37px;
  }
  .search-form > div:nth-of-type(1) {
    overflow: hidden;
  }
  .search-form > div:nth-of-type(1) > span {
    float: left;
    display: block;
    width: 87px;
    height: 22px;
    background: #f1f3f6;
    font-size: 12px;
    text-align: center;
    line-height: 22px;
    border: 1px solid rgba(231, 231, 231, 1);
  }
  .search-item {
    overflow: hidden;
  }
  .search-item > span {
    float: left;
    display: block;
    width: 87px;
    height: 22px;
    font-size: 12px;
    text-align: center;
    line-height: 22px;
    border: 1px solid rgba(231, 231, 231, 1);
  }

  /* 最后提示框 */
  .tipModel {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
  }
  .tipModel > .tip {
    width: 306px;
    height: 189px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -153px;
    margin-top: -95px;
  }

  .tip-head {
    margin: 17px 0;
    overflow: hidden;
  }
  .tipModel .tip .tip-head > span:nth-of-type(1) {
    float: left;
    margin-left: 136px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .tipModel .tip .tip-head > span:nth-of-type(2) {
    float: right;
    font-size: 16px;
    margin-right: 14px;
    color: #d2d2d2;
  }
  .tip-body {
    padding-left: 60px;
    overflow: hidden;
  }
  .tip-body > img {
    width: 39px;
    height: 39px;
    float: left;
  }
  .tip-body > div {
    float: left;
    margin-left: 15px;
    margin-top: 7px;
  }
  .tip-body > div > p:nth-of-type(1) {
    font-size: 12px;
  }
  .tip-body > div > p:nth-of-type(2) {
    font-size: 14px;
  }
  .tip-footer {
    margin-left: 38px;
    margin-top: 32px;
  }
  .tip-footer > div:nth-of-type(1) {
    float: left;
    margin-top: 3px;
  }
  .tip-footer > div:nth-of-type(1):hover{
    cursor: pointer;
  }
  .tip-footer > div:nth-of-type(1) > span:nth-of-type(1) {
    font-size: 13px;
    margin-left: 6px;
  }
  .tip-footer > div:nth-of-type(1) > span:nth-of-type(2) {
    font-size: 12px;
  }

  .tip-footer > div:nth-of-type(2) {
    float: right;
    margin-right: 22px;
    width: 58px;
    height: 25px;
  }
  .tip-footer > div:nth-of-type(2) > button {
    width: 100%;
    height: 100%;
    background: #5897ff;
    border: 0;
    color: #fff;
    font-size: 12px;
  }
  .icon{
    color: #5897ff;
  }
 .searchNot{
             background:rgba(0,0,0,0.3);
             font-size: 14px;
             position: absolute;
             left: 50%;
             margin-left: -110px;
             color: #fff;
             font-size: 12px;
             padding: 6px;
             width: 220px;
             top:146px;
             border-radius: 2px;
             text-align: center;
  }
.search-model .search-content .search-input > div:nth-of-type(2) > button:hover{
    cursor: pointer;
  }
  .save-success{
            position:fixed;
            top: 50%;
            left:50%;
            width:160px;
            height:40px;
            margin-left:-80px;
            margin-top:-20px;
        }
        .save-success>img{
            width:100%;
            height:100%;
        }

}
</style>