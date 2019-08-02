<template>
        <div class="submitCertInfo">
            <div class="submitCertInfo-tit">
                <h2>提交认证资料</h2>
                <div class="submit-head" @click="handleSubmitData">提交资料</div>
            </div>
            <div class="submitCertInfo-content">
                    <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>申请日期</td>
                                <td>申请单号</td>
                                <td>项目编号</td>
                                <td>项目名称</td>
                                <td>品牌名称</td>
                                <td>申请人</td>
                            </tr>
                            <tr class="trhover" v-for="(item,index) in getApplyingApplicationForms" @click="handleToSubmitDataModel($event,item)">
                                <td>{{item.creationTime.substring(0,10)}}</td>
                                <td>{{item.number}}</td>
                                <td>{{item.projectNumber}}</td>
                                <td>{{item.projectName}}</td>
                                <td>{{item.brandName}}</td>
                                <td>{{item.creatorUsername}}</td>
                            </tr>
                           
                    </table>
            </div>

            <!-- 提交资料模态框 -->
            <div class="submitData" v-show="submitDataModel">
                    <div class="data">
                        <div class="data-head">
                            <span>提交资料</span>
                            <span class="iconfont icon-chuyidong" @click="handleDataModelHide"></span>
                        </div>
                        <div class="data-body">
                                <div class="applyNumber apply">
                                     <div><span>申请单号:</span></div>
                                     <div>{{applyNumber}}</div>
                                </div>
                                <div class="applyName apply">
                                      <div><span>品牌名称:</span></div>
                                      <div>{{applyBrandName}}</div>
                                </div>
                                <div class="shopImg apply">
                                        <div><span>*</span><span>门店照片:</span></div>
                                        <div class="showImg">
                                             <div class="fileshang" v-show="upload">
                                	            <input type="file" class="file" id="file" accept="image/jpg,image/png,image/jpeg,image/gif" @change="handleLoad($event)">
                                                <div class="fileMock"><span class="iconfont icon-tupian"></span><span>点击上传</span></div>
                                             </div>
                                            <div v-if="imgshow" class="dataImg">
                                                    <img :src="imgdata"  class="img">
                                                   <div @click="handelDelImg" class="imgdel"><span class="iconfont icon-shanchu"></span><span>删除</span></div>
                                            </div>
                                        </div>   
                                </div>

                                <!-- 营业执照 -->
                                <div class="apply business-license">
                                        <div>营业执照</div>
                                         <div class="showImgTwo">
                                             <div class="fileshangTwo" v-show="uploadTwo">
                                	            <input type="file" class="fileTwo" id="fileTwo" accept="image/jpg,image/png,image/jpeg,image/gif" @change="handleLoadBusiness($event)">
                                                <div class="fileMockTwo"><span class="iconfont icon-tupian"></span><span>点击上传</span></div>
                                             </div>
                                            <div v-if="imgshowTwo" class="dataImgTwo">
                                                    <img :src="imgdataTwo"  class="img">
                                                   <div @click="handelDelBusinessImg" class="imgdelTwo"><span class="iconfont icon-shanchu"></span><span>删除</span></div>
                                            </div>
                                        </div>   
                                </div>
                                <!-- 提交页脚 -->
                                <div class="footer">
                                        <button @click="handleToSubmitFormInfo">提交</button>
                                </div>
                        </div>
                    </div>
            </div>
        </div>
</template> 
<script>
import Vuex  from "vuex";
import md5 from 'js-md5';
export default {
        name:"submitCertInfo",
        data(){
            return{
                submitDataModel:false,
                imgdata:"",
                imgshow:false,
                upload:true,
                imgdataTwo:"",
                imgshowTwo:false,
                uploadTwo:true,
                //申请单号
                applyId:"",
                applyNumber:"",
                applyBrandName:"",


            }
        },
        computed:{
            ...Vuex.mapState({
                    getApplyingApplicationForms:state=>state.submitCertInfo.getApplyingApplicationForms,
            })
        },
        created(){
          
         },
         methods:{
             ...Vuex.mapActions({
                 uploadApplicationFormInformation:"submitCertInfo/uploadApplicationFormInformation"
             }),
            //选中申请的数据
             handleToSubmitDataModel($event,param){
                 this.applyId=param.id;
                 this.applyNumber =param.number;
                 this.applyBrandName = param.brandName;
                 var target =$event.target.parentNode;
                 var trs = document.getElementsByClassName('trhover');
                var len =trs.length;
                for(var i=0;i<len;i++){
                    trs[i].style.background="";
                }
                 target.style.background="rgba(237,238,239,1)";
             },
            //打开模态框
            handleSubmitData(){
                if(this.applyId!==""){
                    this.submitDataModel=true;
                }
                
            },
             //上传门店照片
            handleLoad($event){
                var _this = this;
                var file =$event.target.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);       
                reader.onload = function(e) {
                        // 图片base64化
                        var newUrl = this.result;
                        _this.imgdata=newUrl;
                        _this.upload=false;
                        _this.imgshow=true;
                };
                
             },
            
             //清除门店图片
             handelDelImg(){
                 this.imgshow = false;
                 this. upload=true;
                 var file =  document.getElementById('file')
                 file.value='';
             },
            //  上传营业执照
            handleLoadBusiness($event){
                     var _this = this;
                    var file =$event.target.files[0];
                    var reader = new FileReader();
                    reader.readAsDataURL(file);       
                    reader.onload = function(e) {
                            // 图片base64化
                            var newUrl = this.result;
                            _this.imgdataTwo=newUrl;
                            _this.uploadTwo=false;
                            _this.imgshowTwo=true;
                    };
            },
            //删除营业执照
            handelDelBusinessImg($event){
                     this.imgshowTwo = false;
                     this. uploadTwo=true;
                    var file =  document.getElementById('fileTwo')
                    file.value='';
            },
            // 隐藏模态框
            handleDataModelHide(){
                 this.submitDataModel =false;
            },
            //提交申请资料
            handleToSubmitFormInfo(){
                // id	int	申请单ID
                // ShopPhoto	string	门店照片（base64）
                // ShopPhotoMD5	string	门店照片MD5码
                // ShopPhotoFormat	string	门店照片图片格式（目前支持jpg、jpeg、png、gif)
                // BusinessLicensePhoto	string	营业执照照片（base64）
                // BusinessLicensePhotoMD5	string	营业执照照片MD5码
                // BusinessLicensePhotoFormat	string	营业执照图片格式（目前支持jpg、jpeg、png、gif)
                var param = {
                     "id":this.applyId,
                     "ShopPhoto":this.imgdata,
                     "ShopPhotoMD5":md5(this.imgdata),
                     "BusinessLicensePhoto":this.imgdataTwo,
                     "BusinessLicensePhotoMD5":md5(this.imgdataTwo),
                } 
                if(this.imgdata!==""){
                    this.uploadApplicationFormInformation(param);
                    this.imgdata="";
                    this.imgshow=false;
                    this.upload=true;
                    this.imgdataTwo="";
                    this.imgshowTwo=false;
                    this.uploadTwo=true;
                    // //申请单号
                    this.applyId="";
                    this.applyNumber="";
                    this.applyBrandName="";
                    var file =  document.getElementById('file')
                    file.value='';
                    var fileTwo = document.getElementById('fileTwo');
                    fileTwo ='';
                    this.submitDataModel=false;

            }
         } 
}
}
</script>
<style scoped>
@media screen and (min-width: 1400px){
.submit-head:hover{
    cursor: pointer;
}
.submit-head:active{
    background:#6da4ff;

}
.submitCertInfo {
  width:1400px;
  margin:0 auto;
  box-sizing: border-box;
  padding: 0 64px;
}
.submitCertInfo .submitCertInfo-tit {
  margin-top: 80px;
  overflow: hidden;
}
.submitCertInfo-tit > h2 {
  font-size: 24px;
  font-family: PingFangSC-Medium;
  line-height: 36px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  float: left;
}
.submitCertInfo-tit>div {
  width: 122px;
  height: 36px;
  background: rgba(88, 151, 255, 1);
  border-radius: 4px;
  color: #fff;
  float: right;
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  margin-right:340px; 
}
.submitCertInfo-content{
    margin-top: 38px;
}
.submitCertInfo-content>table {
  table-layout: fixed;
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
}
 .submitCertInfo-content>table > tr > td {
  border-bottom: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  line-height: 30px;
  text-align: center;
  text-indent: 15px;
  font-size: 14px;
  color: #888888;
}
.submitCertInfo-content>table > tr:nth-of-type(1) > td {
  line-height: 30px;
   text-align: center;
  text-indent: 15px;
  font-size: 14px;
  background: rgba(241, 243, 246, 1);
  color: #888888;
}
.submitCertInfo-content>table > tr > td:nth-of-type(1){
    width: 150px;
}
.submitCertInfo-content>table > tr > td:nth-of-type(2){
    width: 220px;
}
.submitCertInfo-content>table > tr > td:nth-of-type(3){
    width: 140px;
}
.submitCertInfo-content>table > tr > td:nth-of-type(4){
    width: 140px;
}
.submitCertInfo-content>table > tr > td:nth-of-type(5){
    width:170px;
}
.submitCertInfo-content>table > tr > td:nth-of-type(6){
    width: 110px;
}
.trhover:hover{
    cursor: pointer;
    background: #EDEEEF;
}

/* 提交提交资料模态框 */
.submitData{
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
.apply>div{
    float:left;
    font-size: 16px;

}
.applyName{
    border-bottom:1px solid #F8F8F8;
    margin-right:56px;
    padding-bottom: 20px;
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
    border:1px dashed rgba(207,210,214,1);
    border-radius:4px;
}
.file{
    position: absolute;
    top:0;
    left:0;
    opacity: 0;
    width:60px;
    height:64px;

}
.fileshang{
    position: relative;
    margin-top: 50px;
    margin-left:60px;
}
.fileMock{
    width:60px;
    text-align: center;
    
}
.fileMock>span{
    display: block;
    color:#CFD2D6;

}
.fileMock>span:nth-of-type(2){
    font-size: 14px;
    text-align: center;
}
.fileMock>span:nth-of-type(1){
    font-size:24px;
}

.dataImg{
    width: 178px;
    height:158px;
    position: relative;
}
.dataImg>img{
    width: 100%;
    height:100%;
}
.imgdel{
    position: absolute;
    bottom:0;
    left:0;
    width:100%;
    text-align: center;
    background:rgba(0,0,0,0.5);
}
.imgdel>span:nth-of-type(1){
    font-size: 16px;
    color:#fff;
    margin-right:5px;
}
.imgdel>span:nth-of-type(2){
    font-size: 14px;
    color:#fff;
}
.imgdel>span{
    cursor: pointer;
}

/* 营业执照 */

.showImgTwo{
    width:180px;
    height:160px;
    border:1px dashed rgba(207,210,214,1);
    border-radius:4px;
}
.fileTwo{
    position: absolute;
    top:0;
    left:0;
    opacity: 0;
    width:60px;
    height:64px;

}
.fileshangTwo{
    position: relative;
    margin-top: 50px;
    margin-left:60px;
}
.fileMockTwo{
    width:60px;
    text-align: center;
    
    
}
.fileMockTwo>span{
    display: block;
    color:#CFD2D6;

}
.fileMockTwo>span:nth-of-type(2){
    font-size: 14px;
    text-align: center;
}
.fileMockTwo>span:nth-of-type(1){
    font-size:24px;
}

.dataImgTwo{
    width: 178px;
    height:158px;
    position: relative;
}
.dataImgTwo>img{
    width: 100%;
    height:100%;
}
.imgdelTwo{
    position: absolute;
    bottom:0;
    left:0;
    width:100%;
    text-align: center;
    background:rgba(0,0,0,0.5);
}
.imgdelTwo>span:nth-of-type(1){
    font-size: 16px;
    color:#fff;
    margin-right:5px;
}
.imgdelTwo>span:nth-of-type(2){
    font-size: 14px;
    color:#fff;
}
.imgdelTwo>span{
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
.footer>button:active{
    background: #6da4ff;
}
}

@media screen and (max-width: 1400px){
.submit-head:hover{
    cursor: pointer;
}
.submitCertInfo {
  width:1024px;
  margin:0 auto;
  box-sizing: border-box;
  padding: 0 47px;
}
.submitCertInfo .submitCertInfo-tit {
  margin-top: 58px;
  overflow: hidden;
}
.submitCertInfo-tit > h2 {
  font-size: 19px;
  font-family: PingFangSC-Medium;
  line-height: 26px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  float: left;
}
.submitCertInfo-tit>div {
  width: 89px;
  height: 26px;
  background: rgba(88, 151, 255, 1);
  border-radius: 4px;
  color: #fff;
  float: right;
  font-size: 12px;
  line-height: 26px;
  text-align: center;
  margin-right: 250px;
}
.submitCertInfo-content{
    margin-top: 28px;
}
.submitCertInfo-content>table {
  table-layout: fixed;
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
}
 .submitCertInfo-content>table > tr > td {
  border-bottom: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  line-height: 22px;
  text-align: center;
  text-indent: 15px;
  font-size: 12px;
  color: #888888;
}
.submitCertInfo-content>table > tr:nth-of-type(1) > td {
  line-height: 22px;
   text-align: center;
  text-indent: 15px;
  font-size: 12px;
  background: rgba(241, 243, 246, 1);
  color: #888888;
}
.submitCertInfo-content>table > tr > td:nth-of-type(1){
    width: 109px;
}
.submitCertInfo-content>table > tr > td:nth-of-type(2){
    width: 160px;
}
.submitCertInfo-content>table > tr > td:nth-of-type(3){
    width: 102px;
}
.submitCertInfo-content>table > tr > td:nth-of-type(4){
    width: 102px;
}
.submitCertInfo-content>table > tr > td:nth-of-type(5){
    width:124px;
}
.submitCertInfo-content>table > tr > td:nth-of-type(6){
    width: 80px;
}
.trhover:hover{
    cursor: pointer;
    background: #EDEEEF;
}

/* 提交提交资料模态框 */
.submitData{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.3);
    z-index: 5;
}
.data{
    width: 525px;
    /* height: 630px; */
    position: absolute;
    left:50%;
    top:50%;
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
    margin-bottom:15px;
}
.apply>div{
    float:left;
    font-size: 13px;

}
.applyName{
    border-bottom:1px solid #F8F8F8;
    margin-right:41px;
    padding-bottom: 15px;
}
.apply>div:nth-of-type(1){
    width: 73px;
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
    height:116px;
    border:1px dashed rgba(207,210,214,1);
    border-radius:4px;
}
.file{
    position: absolute;
    top:0;
    left:0;
    opacity: 0;
    width:44px;
    height:47px;

}
.fileshang{
    position: relative;
    margin-top: 36px;
    margin-left:44px;
}
.fileMock{
    width:44px;
    text-align: center;
    
}
.fileMock>span{
    display: block;
    color:#CFD2D6;

}
.fileMock>span:nth-of-type(2){
    font-size: 12px;
    text-align: center;
}
.fileMock>span:nth-of-type(1){
    font-size:19px;
}

.dataImg{
    width: 130px;
    height:115px;
    position: relative;
}
.dataImg>img{
    width: 100%;
    height:100%;
}
.imgdel{
    position: absolute;
    bottom:0;
    left:0;
    width:100%;
    text-align: center;
    background:rgba(0,0,0,0.5);
}
.imgdel>span:nth-of-type(1){
    font-size:14px;
    color:#fff;
    margin-right:4px;
}
.imgdel>span:nth-of-type(2){
    font-size: 12px;
    color:#fff;
}
.imgdel>span{
    cursor: pointer;
}

/* 营业执照 */

.showImgTwo{
    width:131px;
    height:117px;
    border:1px dashed rgba(207,210,214,1);
    border-radius:4px;
}
.fileTwo{
    position: absolute;
    top:0;
    left:0;
    opacity: 0;
    width:44px;
    height:46px;

}
.fileshangTwo{
    position: relative;
    margin-top: 36px;
    margin-left:44px;
}
.fileMockTwo{
    width:44px;
    text-align: center;
    
}
.fileMockTwo>span{
    display: block;
    color:#CFD2D6;

}
.fileMockTwo>span:nth-of-type(2){
    font-size: 12px;
    text-align: center;
}
.fileMockTwo>span:nth-of-type(1){
    font-size:19px;
}

.dataImgTwo{
    width: 130px;
    height:115px;
    position: relative;
}
.dataImgTwo>img{
    width: 100%;
    height:100%;
}
.imgdelTwo{
    position: absolute;
    bottom:0;
    left:0;
    width:100%;
    text-align: center;
     background:rgba(0,0,0,0.5);
}
.imgdelTwo>span:nth-of-type(1){
    font-size: 14px;
    color:#fff;
    margin-right:4px;
}
.imgdelTwo>span:nth-of-type(2){
    font-size: 12px;
    color:#fff;
}
.imgdelTwo>span{
    cursor: pointer;
}
.footer{
    width:103px;
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
