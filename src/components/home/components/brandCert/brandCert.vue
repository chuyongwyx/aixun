<template>
     <div class="brandCert">
            <div class="CertInfo-tit">
                <h2>品牌认证</h2>
                <div class="cert-btn" @click="handleToBrandCertModel" v-show="finishId==''?false:true">去认证</div>
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
                            <tr class="trhover" v-for="(item,index) in getInformationSubmittedApplicationForms" @click="handleToCert($event,item)" >
                                <td>{{item.creationTime.substring(0,10)}}</td>
                                <td>{{item.number}}</td>
                                <td>{{item.projectNumber}}</td>
                                <td>{{item.projectName}}</td>
                                <td>{{item.brandName}}</td>
                                <td>{{item.creatorUsername}}</td>
                                <td>{{item.informationSubmittedUsername}}</td>
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
                                     <div>{{getInformationSubmitteIdList.number}}</div>
                                </div>
                                <div class="applyName apply">
                                      <div><span>品牌名称:</span></div>
                                      <div>{{getInformationSubmitteIdList.brandName}}</div>
                                </div>
                                <div class="submitName apply">
                                      <div><span>提交人:</span></div>
                                      <div>{{getInformationSubmitteIdList.informationSubmittedUsername}}</div>

                                </div>
                                <div class="shopImg apply">
                                        <div><span>*</span><span>门店照片:</span></div>
                                        <div class="showImg">
                                                <div  class="getImg">
                                                    <img :src="imgdata?imgdata:getInformationSubmitteIdList.shopPhoto" alt="" id="imgshopPhoto">
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
                                                <div class="showImgTwo" v-if="getInformationSubmitteIdList.businessLicensePhoto">
                                                    <img :src="imgdataTwo?imgdataTwo:getInformationSubmitteIdList.businessLicensePhoto" alt="" class="imgdataTwo">
                                                    <div class="reupload">
                                                            <span class="iconfont icon-tupian"></span>
                                                            <span>重新上传</span>
                                                            <input type="file" accept="image/jpg,image/png,image/jpeg,image/gif"   @change="handelReuploadTwo($event)">
                                                    </div>
                                                </div>
                                                <div class="showImgTwoAgin" v-else>
                                                     <div class="getImg" v-if="addbusinessLicensePhoto">
                                                        <img :src="imgdataTwo" alt="" class="imgdataTwo">
                                                        <div class="imgdelTwo" @click="handleDelUpload"><span class="iconfont icon-shanchu"></span><span>删除</span></div>
                                                    </div>
                                                    <div class="addchuan" v-show="uploadTwo">
                                                            <span>补充上传</span>
                                                            <input type="file" id="file" accept="image/jpg,image/png,image/jpeg,image/gif" @change="handeladdreupload($event)">
                                                    </div>
                                                   
                                                </div>
                                                
                                       
                                </div>
                                <!-- 提交页脚 -->
                                <div class="footer">
                                        <button @click="handleTobrandCert">认证通过</button>
                                </div>
                        </div>
                </div> 
            </div>
     </div>
</template>
<script>
import Vuex from 'vuex';
import md5 from 'js-md5'
export default {
        name:"brandCert",
        data() {
            return {
                model:false,
                imgdata:"",
                imgdataTwo:"",
                imgshow:false,
                uploadTwo:true,
                finishId:"",
                addbusinessLicensePhoto:false,
                // ToBrandCert:false
            }
        },
        watch: {

        },
        computed:{
            ...Vuex.mapState({
                //获取已提交资料的申请单
                getInformationSubmittedApplicationForms:state=>state.brandCert.getInformationSubmittedApplicationForms,
                //获取根据id传回来的数据
                getInformationSubmitteIdList:state=>state.brandCert.getInformationSubmitteIdList,
                
            })
        },
        created(){
                this.getInformationForms();
        },
        methods: {
                
                ...Vuex.mapActions({
                     getInformationForms:"brandCert/getInformationSubmittedApplicationForms",
                     //根据id获取认证资料
                     getInformationSubmittedApplicationFormByID:"brandCert/getInformationSubmittedApplicationFormByID",
                     //补充上传资料
                     replenishApplicationFormInformation:"brandCert/replenishApplicationFormInformation",
                     //认证通过
                     verifyApplicationFormInformation:"brandCert/verifyApplicationFormInformation"

                }),
                //选择需要认证的数据    
                handleToCert($event,param){
                    this.ToBrandCert=true;
                    var  trs = document.getElementsByClassName('trhover');
                    var len = trs.length;
                    for(var i=0;i<len;i++){
                        trs[i].style.background = '';
                    }
                    $event.target.parentNode.style.background = '#EDEEEF';
                    this.finishId = param.id;
                },
                handleToBrandCertModel(){
                    if(this.finishId !==""){
                            this.model=true;
                            //根据id来获取资料
                            this.getInformationSubmittedApplicationFormByID(this.finishId); 
                            
                    }
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
            //这是营业执照的重新上传
            handelReuploadTwo($event){
                        var _this = this;
                        var file =$event.target.files[0];
                        var reader = new FileReader();
                        reader.readAsDataURL(file);       
                        reader.onload = function(e) {
                        // 图片base64化
                        var newUrl = this.result;
                        _this.imgdataTwo=newUrl;
                    }
            },
            //营业执照的补充上传
            handeladdreupload($event){
                        var _this = this;
                        var file =$event.target.files[0];
                        var reader = new FileReader();
                        reader.readAsDataURL(file);       
                        reader.onload = function(e) {
                        // 图片base64化
                        var newUrl = this.result;
                        _this.imgdataTwo=newUrl;
                        _this.addbusinessLicensePhoto=true;
                        _this.uploadTwo=false;

                    var imgshopPhoto =document.getElementById('imgshopPhoto');
                    _this.imgdata =imgshopPhoto.src;
                     var param =JSON.stringify({
                        "id":_this.finishId,
                        "ShopPhoto":_this.imgdata,
                        "ShopPhotoMD5":md5(_this.imgdata),
                        "BusinessLicensePhotoMD5":md5(_this.imgdataTwo),
                        "BusinessLicensePhoto":_this.imgdataTwo
                    })
                    _this.replenishApplicationFormInformation(param);  
                    }

                
                  

        },
        
         //删除错误上传
         handleDelUpload(){
               var file = document.getElementById('file')
               file.value='';
               this.imgdataTwo="";
               this.addbusinessLicensePhoto=false;
               this.uploadTwo=true;
   
         },
         
         //关闭模态框
         handleCloseModel(){
             this.model= false;
             this.imgdata="";
             this.imgdataTwo="";
         },
         //认证
         handleTobrandCert(){
            var paramTwo ={
                "id":this.finishId
            }
            if(this.finishId!==""){
            this.verifyApplicationFormInformation(paramTwo);
                this.finishId=""
                this.model= false;
                this.imgdata="";
                this.imgdataTwo="";
                 var  trs = document.getElementsByClassName('trhover');
                var len = trs.length;
                for(var i=0;i<len;i++){
                        trs[i].style.background = '';
                }
            }
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
.trhover:hover{
    background:#EDEEEF;
    cursor: pointer;
}
.CertInfo-tit {
  margin-top: 80px;
  overflow: hidden;
  height: 36px;
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
    left: 0;
    width:100%;
    height:34px;
    background:rgba(0,0,0,0.3);
    text-align: center;
    line-height: 34px;
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
  width: 100%;
    height:34px;
}

/* 营业执照 */
.showImgTwoAgin{
    position: relative;
}
.showImgTwoAgin>input{
    opacity:0;
    position:absolute;
    top: 0;
    left: 0;

}
.showImgTwoAgin>span{
    color: #5897FF;
}
.showImgTwoAgin>input:hover{
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
    height: 34px;
    font-size:14px;
    line-height: 34px;
    bottom:0;
    left:0;
    color:#fff;
    text-align: center;  
    background:rgba(0,0,0,0.3);
}
.imgdelTwo:hover{
    cursor: pointer;
}
.addchuan{
     width:180px;
    position: relative;
}
.addchuan>input{
  opacity:0;
  position:absolute;
  top:0;
  left:0;
  width: 100%;
  height:34px;
}
.addchuan>span{
   color: #5897FF; 
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
.cert-btn:hover{
    cursor: pointer;
}
.cert-btn:active{
    background:#6da4ff;

}
.trhover:hover{
    background:#EDEEEF;
    cursor: pointer;
}
.CertInfo-tit {
  margin-top: 58px;
  height: 26px;
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
  float: right;
  font-size: 12px;
  line-height: 26px;
  text-align: center;
  margin-right: 170px;
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
    left:0;
    width: 100%;
    background:rgba(0,0,0,0.3);
    text-align: center;
    line-height: 25px;
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
    width: 100%;
    height:25px;
}

/* 营业执照 */
.showImgTwoAgin{
    position: relative;
}
.showImgTwoAgin>input{
    opacity:0;
    position:absolute;
    top: 0;
    left: 0;

}
.showImgTwoAgin>span{
    color: #5897FF;
}
.showImgTwoAgin>input:hover{
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
.addchuan{
     width:131px;
    position: relative;
}
.addchuan>input{
  opacity:0;
  position:absolute;
  top:0;
  left:0;
  width: 100%;
  height:25px;
}
.addchuan>span{
   color: #5897FF; 
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