<template>
     <div class="brandCert">
            <div class="CertInfo-tit">
                <h2>品牌认证</h2>
                <div class="cert-btn">去认证</div>
            </div>
            <div class="CertInfo-content">
                    <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>申请日期</td>
                                <td>申请单号</td>
                                <td>项目编号</td>
                                <td>项目名称</td>
                                <td>品牌名称</td>
                                <td>申请人</td>
                                <td>提交人</td>
                            </tr>
                            <tr class="trhover" v-for="(item,index) in getInformationSubmittedApplicationForms" @click="handleToCert($event,item)">
                                <td>{{item.creationTime.substring(0,10)}}</td>
                                <td>{{item.number}}</td>
                                <td>{{item.projectNumber}}</td>
                                <td>{{item.projectName}}</td>
                                <td>{{item.BrandName}}</td>
                                <td>{{item.CreatorUsername}}</td>
                                <td>{{item.InformationSubmittedUsername}}</td>
                            </tr>
                            
                    </table>
            </div>

            <!-- 认证模态框 -->
            
            <div class="CertModel" v-show="model">
                    <div class="data">
                        <div class="data-head">
                            <span>认证资料</span>
                            <span class="iconfont icon-chuyidong" @click="handleCloseModel"></span>
                        </div>
                        <div class="data-body">
                                <div class="applyNumber apply">
                                     <div><span>申请单号:</span></div>
                                     <div>KT2019132132132</div>
                                </div>
                                <div class="applyName apply">
                                      <div><span>品牌名称:</span></div>
                                      <div>淘淘纺织3号店</div>
                                </div>
                                <div class="submitName apply">
                                      <div><span>提交人:</span></div>
                                      <div>建行-麦助理</div>

                                </div>
                                <div class="shopImg apply">
                                        <div><span>*</span><span>门店照片:</span></div>
                                        <div class="showImg">
                                                <div  class="getImg">
                                                    <img :src="imgdata" alt="">
                                                </div>
                                                <div class="reupload">
                                                        <span class="iconfont icon-tupian"></span>
                                                        <span>重新上传</span>
                                                        <input type="file" accept="image/jpg,image/png,image/jpeg,image/gif" @change="handelReupload($event)">
                                                </div>
                                               
                                        </div>
                                       
                                </div>

                                <!-- 营业执照 -->
                                <div class="apply business-license">
                                        <div>营业执照:</div>
                                                <div class="addreupload" v-if="uploadTwo">
                                                    <span>补充上传</span>
                                                    <input type="file" id="file" accept="image/jpg,image/png,image/jpeg,image/gif" @change="handeladdreupload($event)">
                                                </div>
                                                <div class="showImgTwo" v-if="imgshow">
                                                        <img :src="imgdataTwo" alt="">
                                                        <div class="imgdelTwo" @click="handleDelUpload"><span class="iconfont icon-shanchu"></span><span>删除</span></div>
                                                </div>
                                       
                                </div>
                                <!-- 提交页脚 -->
                                <div class="footer">
                                        <button>认证通过</button>
                                </div>
                        </div>
                </div>
            </div>
     </div>
</template>
<script>
import Vuex from 'vuex';
export default {
        name:"brandCert",
        data() {
            return {
                model:false,
                imgdata:"",
                imgdataTwo:"",
                imgshow:false,
                uploadTwo:true,
            }
        },
        computed:{
            ...Vuex.mapState({
                //获取已提交资料的申请单
                getInformationSubmittedApplicationForms:state=>state.brandCert.getInformationSubmittedApplicationForms
            })
        },
        created(){
                this.getInformationForms();
        },
        methods: {
                //操作认证按钮
                ...Vuex.mapActions({
                     getInformationForms:"brandCert/getInformationSubmittedApplicationForms"
                }),
                handleToCert($event,param){

                },
                //重新上传照片
                handelReupload($event){
                         var _this = this;
                        var file =$event.target.files[0];
                        var reader = new FileReader();
                        reader.readAsDataURL(file);       
                        reader.onload = function(e) {
                        // 图片base64化
                        var newUrl = this.result;
                        _this.imgdata=newUrl;
                    }
                },
            //补充上传
            handeladdreupload($event){
                  var _this = this;
                        var file =$event.target.files[0];
                        var reader = new FileReader();
                        reader.readAsDataURL(file);       
                        reader.onload = function(e) {
                        // 图片base64化
                        var newUrl = this.result;
                        _this.imgdataTwo=newUrl;
                        _this.imgshow = true;
                        _this.uploadTwo =false;
                }
            },
         //删除错误上传
         handleDelUpload(){
             this.imgshow = false;
                 this.uploadTwo=true;
               var file =  document.getElementById('file')
               file.value='';
         },
         
         //关闭模态框
         handleCloseModel(){
             this.model= false;
         }
        },
}
</script>

<style lang="" scoped>
@media screen and (min-width: 1400px) {
.brandCert{
 width:1400px;
 margin: 0 auto;
  box-sizing: border-box;
  padding: 0 64px;
}
.cert-btn:hover{
    cursor: pointer;
}
.cert-btn:active{
    background:#6da4ff;

}
.CertInfo-tit {
  margin-top: 80px;
  overflow: hidden;
}
.CertInfo-tit > h2 {
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  line-height: 36px;
  color: rgba(51, 51, 51, 1);
  float: left;
}
.CertInfo-tit>div {
  width: 122px;
  height: 36px;
  background: rgba(88, 151, 255, 1);
  border-radius: 4px;
  color: #fff;
  float: right;
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  margin-right: 233px;
}
.CertInfo-content{
    margin-top: 38px;
}
.CertInfo-content>table {
  table-layout: fixed;
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
}
 .CertInfo-content>table > tr > td {
  border-bottom: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  line-height: 30px;
  text-align: center;
  text-indent: 15px;
  font-size: 14px;
  color: #888888;
}
.CertInfo-content>table > tr:nth-of-type(1) > td {
  line-height: 30px;
   text-align: center;
  text-indent: 15px;
  font-size: 14px;
  background: rgba(241, 243, 246, 1);
  color: #888888;
}
.CertInfo-content>table > tr > td:nth-of-type(1){
    width: 150px;
}
.CertInfo-content>table > tr > td:nth-of-type(2){
    width: 220px;
}
.CertInfo-content>table > tr > td:nth-of-type(3){
    width: 140px;
}
.CertInfo-content>table > tr > td:nth-of-type(4){
    width: 140px;
}
.CertInfo-content>table > tr > td:nth-of-type(5){
    width:170px;
}
.CertInfo-content>table > tr > td:nth-of-type(6){
    width: 110px;
}
.CertInfo-content>table > tr > td:nth-of-type(7){
    width:110px;
}
.trhover:hover{
    cursor: pointer;
    background: #EDEEEF;
}

/* 认证模态框 */
.CertModel{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.3);
    z-index: 5;
}
.data{
    width: 700px;
    /* height: 630px; */
    position: absolute;
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
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
 .data-head > span:nth-of-type(2)
 {
  float: right;
  font-size: 20px;
  margin-right: 20px;
  color: #d2d2d2;
}
.data-body{

}
.apply{
    overflow: hidden;
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
    font-size: 16px;

}
.apply>div:nth-of-type(1){
    width: 101px;
    text-align: right;
}
.apply>div:nth-of-type(2){
    margin-left:41px;
}
.shopImg{

}
.shopImg>div:nth-of-type(1)>span:nth-of-type(1){
    color: red;
    margin-right:10px;
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


.footer{
    width:140px;
    height:36px;
    margin:0 auto;
    margin-top: 10px;
    margin-bottom: 39px;
}
.footer>button{
    width:100%;
    height:36px;
    color:#fff;
    background:#5897FF;
    outline: none;
    border:0;
    border-radius:4px;
    font-size: 14px;
}

}
/* 1024标准 */
@media screen and (max-width: 1400px) {
.brandCert{
 width:1024px;
 margin: 0 auto;
  box-sizing: border-box;
  padding: 0 47px;
}
.CertInfo-tit {
  margin-top: 58px;
  overflow: hidden;
}
.CertInfo-tit > h2 {
  font-size: 19px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  line-height: 26px;
  color: rgba(51, 51, 51, 1);
  float: left;
}
.CertInfo-tit>div {
  width: 89px;
  height: 26px;
  background: rgba(88, 151, 255, 1);
  border-radius: 4px;
  color: #fff;
  float: left;
  font-size: 12px;
  line-height: 26px;
  text-align: center;
  margin-left: 464px;
}
.CertInfo-content{
    margin-top: 28px;
}
.CertInfo-content>table {
  table-layout: fixed;
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
}
 .CertInfo-content>table > tr > td {
  border-bottom: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  line-height: 21px;
  text-align: center;
  text-indent: 11px;
  font-size: 10px;
  color: #888888;
}
.CertInfo-content>table > tr:nth-of-type(1) > td {
  line-height: 22px;
   text-align: center;
  text-indent: 15px;
  font-size: 12px;
  background: rgba(241, 243, 246, 1);
  color: #888888;
}
.CertInfo-content>table > tr > td:nth-of-type(1){
    width: 109px;
}
.CertInfo-content>table > tr > td:nth-of-type(2){
    width: 160px;
}
.CertInfo-content>table > tr > td:nth-of-type(3){
    width: 102px;
}
.CertInfo-content>table > tr > td:nth-of-type(4){
    width: 102px;
}
.CertInfo-content>table > tr > td:nth-of-type(5){
    width:124px;
}
.CertInfo-content>table > tr > td:nth-of-type(6){
    width: 80px;
}
.CertInfo-content>table > tr > td:nth-of-type(7){
    width:80px;
}
.trhover:hover{
    cursor: pointer;
    background: #EDEEEF;
}

/* 认证模态框 */
.CertModel{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.3);
    z-index: 5;
}
.data{
    width: 511px;
    /* height: 630px; */
    position: absolute;
    left:50%;
    top:50%;
    margin-top:-230px;
    margin-left: -255px;
    background: #fff;
}
.data-head{
  margin: 16px 0;
  overflow: hidden;
}
.data-head > span:nth-of-type(1){
  float: left;
  margin-left: 220px;
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
    overflow: hidden;
    margin-left:33px;
    margin-bottom:14px;
}
.submitName{
    border-bottom:1px solid #F8F8F8;
    margin-right:41px;
    padding-bottom: 14px;
}
.apply>div{
    float:left;
    font-size: 14px;

}
.apply>div:nth-of-type(1){
    width: 74px;
    text-align: right;
}
.apply>div:nth-of-type(2){
    margin-left:30px;
}
.shopImg{

}
.shopImg>div:nth-of-type(1)>span:nth-of-type(1){
    color: red;
    margin-right:7px;
}
.showImg{
    width:131px;
    height:117px;
    border-radius:4px;
    position:relative;

}
.getImg{
    width:131px;
    height:116px;
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
    font-size:14px;
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


.footer{
    width:102px;
    height:26px;
    margin:0 auto;
    margin-top: 7px;
    margin-bottom: 28px;
}
.footer>button{
    width:100%;
    height:26px;
    color:#fff;
    background:#5897FF;
    outline: none;
    border:0;
    border-radius:4px;
    font-size: 12px;
}
}
</style>    