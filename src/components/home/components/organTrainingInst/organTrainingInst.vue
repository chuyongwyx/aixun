<template>
    <div class="training">
            <div class="training-head">
                <h2>安排培训机构</h2>
            </div>
            <div class="training-content">
                    <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>申请日期</td>
                                <td>申请单号</td>
                                <td>项目编号</td>
                                <td>项目名称</td>
                                <td>品牌名称</td>
                                <td>云支付收款账号</td>
                                <td>收款银行</td>
                            </tr>
                            <tr class="trhover" @click="handleDealItem($event,item,index)" v-for="(item,index) in dataList">
                                <td>{{item.creationTime.substring(0,10)}}</td>
                                <td>{{item.number}}</td>
                                <td>{{item.projectNumber}}</td>
                                <td>{{item.projectName}}</td>
                                <td>{{item.brandName}}</td>
                                <td>{{item.receivableAccountNumber}}</td>
                                <td>{{item.bankName}}</td>
                            </tr>
                            
                    </table> 
        </div>
        <!-- 安排培训机构模态框 -->
       
        <div class="traningModel" v-show="dealItemModel">
                <div class="traning-content">
                    <div class="traning-head">
                            <span>指定任务</span>
                            <span class="iconfont icon-chuyidong" @click="handleCloseDealItemModel"></span>
                    </div>
                    <div class="traning-body">
                            <div class="traning-radio">
                                    <div @click="handleClickNeedDeal" id="needDeal"><span class="iconfont icon-danxuankuangxuanzhong"></span><span>需要安排培训机构</span></div>
                                    <div @click="handleClickUnNeedDeal" id="unNeedDeal"><span class="iconfont icon-radio"></span><span>无需安排培训机构</span></div>
                            </div>
                            <div v-if="training" class="traning-name">
                                  <div>培训机构名称:</div>
                                   <div class="selected">
                                        <span class="selected-options" id="selected-options"></span>
                                        <span class="iconfont icon-xiala1 icon" id="selected-icon" @click="handleSelectShow"></span>
                                            <div class="select-options" v-if="selectModify">
                                                <div v-for="(item,index) in traningKinds" :data-id="item.id" @click="handelToSelectOption($event,item)">
                                                    <span>{{item.name}}</span>
                                                </div>
                                            </div>
                                </div>
                            </div>
                            <div class="traning-footer">
                                    <button @click="handleClickSave">保存</button>
                            </div>
                    </div>
                   
                </div>
        </div>
    </div>
</template>
<script>
import Vuex from 'vuex';
export default {
    name:"organTrainingInst",
     data(){
         return{
              selectModify:false,
              dealItemModel:false,
              NeedTraining:true,
              training:true,
              //申请单Id
              id:"",
              //培训机构id
              trainingInstitutionID:"",
         }
     }, 
     created(){
            this.getSettedApplicationForms();
     },
    computed: {
        ...Vuex.mapState({
                //页面的初始化数据
                dataList:state=>state.organTrainingInst.dataList,
                //培训机构种类
                traningKinds:state=>state.organTrainingInst.traningKinds
        }),  
    },
    methods:{ 
         ...Vuex.mapActions({
             //获取已有培训机构信息
            getSettedApplicationForms:"organTrainingInst/getSettedApplicationForms",
                //培训机构的信息
              getOrgnTrainingInstInfo:"organTrainingInst/getOrgnTrainingInstInfo",
              //安排培训机构
              putArrangeTrainingInstitution :"organTrainingInst/putArrangeTrainingInstitution"
         }),
          //点击显示下拉修改框
            handleSelectShow($event){
                if( this.selectModify==true){
                    this.selectModify=false;
                    $event.target.classList.add('icon-xiala1');
                    $event.target.classList.remove('icon-shangla');
                }else{
                    this.selectModify=true;
                    $event.target.classList.remove('icon-xiala1');
                    $event.target.classList.add('icon-shangla');
                }

                
            },
         //部门选中
            handelToSelectOption($event,item){
                var options =document.getElementById('selected-options');
                options.innerText=$event.target.innerText;
                this.trainingInstitutionID = item.id;
                var opation =document.getElementById('selected-icon')
                opation.classList.add('icon-xiala1');
                opation.classList.remove('icon-shangla');
                this.selectModify = false;
                
            },
        //指定任务
            handleDealItem($event,param,index){
                 var trs = document.getElementsByClassName('trhover');
                var len =trs.length;
                for(var i=0;i<len;i++){
                            trs[i].style.background="";
                    }
                trs[index].style.background="rgba(237,238,239,1)";
                    this.id =param.id;
                    this.BtnHideaOrShow=true;
                // this.dealItemModel=true;
            },
        //关闭模态框
         handleCloseDealItemModel(){
                this.dealItemModel=false;
         },
        //需要安排培训机构
        handleClickNeedDeal($event){
           var  idNeed =document.getElementById('needDeal');
            var idUnNeed =document.getElementById('unNeedDeal');
            var tar = idNeed.firstElementChild;
            var other = idUnNeed.firstElementChild;
            tar.classList.remove('icon-radio');
            tar.classList.add('icon-danxuankuangxuanzhong');
            other.classList.remove('icon-danxuankuangxuanzhong');
            other.classList.add('icon-radio');
            this.NeedTraining=true;
            this.training=true;

        },
        //不需要安排培训机构
        handleClickUnNeedDeal($event){
            var  idNeed =document.getElementById('needDeal');
            var idUnNeed =document.getElementById('unNeedDeal');
            var tar = idUnNeed.firstElementChild;
            var other = idNeed.firstElementChild;
            tar.classList.remove('icon-radio');
            tar.classList.add('icon-danxuankuangxuanzhong');
            other.classList.remove('icon-danxuankuangxuanzhong');
            other.classList.add('icon-radio');
            this.NeedTraining=false;
            this.trainingInstitutionID="";
            this.training=false;
        },
      //存储安排的培训机构
      handleClickSave(){
          //没有获取到数据只能假设 培训机构的id为1 申请单id为1
          var param =JSON.stringify({
              //申请单Id
              "id":this.id,
              //是否安排培训
              "NeedTraining":this. NeedTraining,
              //培训机构Id
              "TrainingInstitutionID":this.trainingInstitutionID
          })

          //向后端发送请求
          this.putArrangeTrainingInstitution(param);
        
      }


     }
}
</script>
<style lang="" scoped>
@media screen and (min-width: 1400px){
.training{
     width:1400px;
    margin: 0 auto;
}
 .training-head{
     margin-top: 80px;
     margin-bottom: 49px;
     margin-left: 90px;
 }
 .training-head>h2{
     font-size: 24px;
     font-weight: 500;
 }
.training-content{
    margin-left:90px;
}
 .training-content>table {
  table-layout: fixed;
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
}
 .training-content>table > tr > td {
  border-bottom: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  line-height: 30px;
  text-align: center;
  text-indent: 15px;
  font-size: 14px;
  color: #888888;
}
.training-content>table > tr:nth-of-type(1) > td {
  line-height: 30px;
   text-align: center;
  text-indent: 15px;
  font-size: 14px;
  background: rgba(241,243,246,1);
  color: #888888;
}
.training-content>table > tr > td:nth-of-type(1){
    width: 150px;
}
.training-content>table > tr > td:nth-of-type(2){
    width: 220px;
}
.training-content>table > tr > td:nth-of-type(3){
    width: 140px;
}
.training-content>table > tr > td:nth-of-type(4){
    width: 140px;
}
.training-content>table > tr > td:nth-of-type(5){
    width:170px;
}
.training-content>table > tr > td:nth-of-type(6){
    width: 280px;
}
.training-content>table > tr > td:nth-of-type(7){
    width:110px;
}
.trhover:hover{
    cursor: pointer;
    background: #EDEEEF;
}
/* 安排培训机构的模态框 */
.traningModel{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.3);
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
}
.traning-content{
    width:500px;
    height:300px;
    background:#fff;
    position: absolute;
    z-index: 11;
    top: 50%;
    left: 50%;
    margin-left:-250px;
    margin-top:-150px;
}
.traning-head{
  margin: 23px 0;
  overflow: hidden;
}
.traning-head > span:nth-of-type(1){
  float: left;
  margin-left: 202px;
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
 .traning-head > span:nth-of-type(2)
 {
  float: right;
  font-size: 20px;
  margin-right: 20px;
  color: #d2d2d2;
}
.traning-radio{
    overflow: hidden;
    margin-left: 56px;
}
.traning-radio>div{
    float:left;
    margin-bottom: 29px;
}
.traning-radio>div:hover{
    cursor: pointer;
}
.traning-radio>div:nth-of-type(1){
    margin-right:90px;
}
.traning-radio>div>span:nth-of-type(1){
    color: #5897FF;
    margin-right: 5px;
    font-size: 16px;
}
.traning-radio>div>span:nth-of-type(2){
    font-size: 14px;
    color: #333;
}
.traning-name{
    margin-left: 55px;
}
.traning-name>div{
    float: left;
}
.traning-name>div:nth-of-type(1){
    line-height: 38px;
    font-size: 14px;
    margin-right: 19px;
}
.traning-footer{
    width: 185px;
    height:48px;
    position: absolute;
    left: 158px;
    bottom: 29px;
}
.traning-footer>button{
    width:100%;
    height: 100%;
    background: #5897FF;
    font-size: 14px;
    border: 0;
    outline: none;
    color: #fff;
    border-radius:4px;
}


/* 下拉框 */
.selected {
  width: 250px;
  height: 38px;
  background: #f1f3f6;
  position: relative;
}
.selected-options{
  line-height:38px;
  font-size:14px;
  margin-left:15px;
}
.select-options {
  width: 250px;
  position: absolute;
  top: 38px;
  left: 0;
  background: #fff;
  z-index:1000;
}

.select-options>div {
  width: 250px;
  line-height: 38px;
  font-size: 14px;
  text-indent: 15px;
}
.select-options > div:hover {
  background: #f1f3f6;
}
.icon {
  float: right;
  font-size: 20px;
  line-height: 38px;
  margin-right: 15px;
}
}

@media screen and (max-width:1400px) {
.training{
     width:1024px;
    margin: 0 auto;
}
 .training-head{
     margin-top: 58px;
     margin-bottom: 35px;
     margin-left: 65px;
 }
 .training-head>h2{
     font-size: 19px;
     font-weight: 500;
 }
.training-content{
    margin-left:65px;
}
 .training-content>table {
  table-layout: fixed;
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
}
 .training-content>table > tr > td {
  border-bottom: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  line-height: 22px;
  text-align: center;
  text-indent: 15px;
  font-size: 12px;
  color: #888888;
}
.training-content>table > tr:nth-of-type(1) > td {
  line-height: 22px;
   text-align: center;
  text-indent: 15px;
  font-size: 12px;
  background: rgba(241,243,246,1);
  color: #888888;
}
.training-content>table > tr > td:nth-of-type(1){
    width: 109px;
}
.training-content>table > tr > td:nth-of-type(2){
    width: 160px;
}
.training-content>table > tr > td:nth-of-type(3){
    width: 102px;
}
.training-content>table > tr > td:nth-of-type(4){
    width: 102px;
}
.training-content>table > tr > td:nth-of-type(5){
    width:124px;
}
.training-content>table > tr > td:nth-of-type(6){
    width: 204px;
}
.training-content>table > tr > td:nth-of-type(7){
    width:80px;
}
.trhover:hover{
    cursor: pointer;
    background: #EDEEEF;
}
/* 安排培训机构的模态框 */
.traningModel{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.3);
    position: absolute;
    top: 0;
    left: 0;
}
.traning-content{
    width:365px;
    height:241px;
    background:#fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left:-182px;
    margin-top:-120px;
}
.traning-head{
  margin: 17px 0;
  overflow: hidden;
}
.traning-head > span:nth-of-type(1){
  float: left;
  margin-left: 147px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
 .traning-head > span:nth-of-type(2)
 {
  float: right;
  font-size: 16px;
  margin-right: 15px;
  color: #d2d2d2;
}
.traning-radio{
    overflow: hidden;
    margin-left: 41px;
}
.traning-radio>div{
    float:left;
    margin-bottom: 21px;
}
.traning-radio>div:hover{
    cursor: pointer;
}
.traning-radio>div:nth-of-type(1){
    margin-right:65px;
}
.traning-radio>div>span:nth-of-type(1){
    color: #5897FF;
    margin-right: 4px;
    font-size: 14px;
}
.traning-radio>div>span:nth-of-type(2){
    font-size: 12px;
    color: #333;
}
.traning-name{
    margin-left: 40px;
}
.traning-name>div{
    float: left;
}
.traning-name>div:nth-of-type(1){
    line-height: 28px;
    font-size: 12px;
    margin-right: 14px;
}
.traning-footer{
    width: 135px;
    height:35px;
    position: absolute;
    left: 115px;
    bottom: 21px;
}
.traning-footer>button{
    width:100%;
    height: 100%;
    background: #5897FF;
    font-size: 12px;
    border: 0;
    outline: none;
    color: #fff;
    border-radius:4px;
}


/* 下拉框 */
.selected {
  width: 182px;
  height: 28px;
  background: #f1f3f6;
  position: relative;
}
.select-options {
  width: 182px;
  position: absolute;
  top: 22px;
  left: 0;
  background: #fff;
  z-index:10;
}
.selected-options{
  line-height:28px;
  font-size:12px;
  margin-left:11px;
}

.select-options>div {
  width: 182px;
  line-height: 28px;
  font-size: 12px;
  text-indent: 15px;
}
.select-options > div:hover {
  background: #f1f3f6;
}
.icon {
  float: right;
  font-size: 16px;
  line-height: 28px;
  margin-right: 15px;
}
}
</style>