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
                                <div class="applyNumber apply clearBox">
                                     <div><span>申请单号:</span></div>
                                     <div>{{getInformationSubmitteIdList.number}}</div>
                                </div>
                                <div class="applyName apply clearBox">
                                      <div><span>品牌名称:</span></div>
                                      <div>{{getInformationSubmitteIdList.brandName}}</div>
                                </div>
                                <div class="submitName apply clearBox">
                                      <div><span>提交人:</span></div>
                                      <div>{{getInformationSubmitteIdList.informationSubmittedUsername}}</div>

                                </div>
                                <div class="shopImg apply clearBox">
                                        <div><span>*</span><span>门店照片:</span></div>
                                        <div class="showImg">
                                                <div  class="getImg">
                                                    <img :src="imgdata?imgdata:getInformationSubmitteIdList.shopPhoto" alt="" id="imgshopPhoto" @click="handleToShowImgShow">
                                                </div>
                                                <div class="reupload">
                                                        <span class="iconfont icon-tupian"></span>
                                                        <span>重新上传</span>
                                                        <input type="file" accept="image/jpg,image/png,image/jpeg,image/gif" @change="handelReupload($event)">
                                                </div>
                                               
                                        </div>
                                       
                                </div>

                                <!-- 营业执照 -->
                                <div class="apply business-license clearBox">
                                        <div>营业执照:</div>
                                                <div class="showImgTwo" v-if="getInformationSubmitteIdList.businessLicensePhoto">
                                                    <img :src="imgdataTwo?imgdataTwo:getInformationSubmitteIdList.businessLicensePhoto" alt="" class="imgdataTwo" @click="handleToShowImgShowTwo">
                                                    <div class="reupload">
                                                            <span class="iconfont icon-tupian"></span>
                                                            <span>重新上传</span>
                                                            <input type="file" accept="image/jpg,image/png,image/jpeg,image/gif"   @change="handelReuploadTwo($event)">
                                                    </div>
                                                </div>
                                                <div class="showImgTwoAgin" v-else>
                                                     <div class="getImg" v-if="addbusinessLicensePhoto">
                                                        <img :src="imgdataTwo" alt="" class="imgdataTwo" @click="handleToShowImgShowTwo">
                                                        <div class="imgdelTwo" @click="handleDelUpload"><span class="iconfont icon-shanchu"></span><span>删除</span></div>
                                                    </div>
                                                    <div class="addchuan" v-show="uploadTwo">
                                                            <span id="suppUpload">补充上传</span>
                                                            <input type="file" id="file" accept="image/jpg,image/png,image/jpeg,image/gif" @change="handeladdreupload($event)" @mouseover="handleMouseSuppUpload" @mouseout="handleMouseOutSuppload">
                                                    </div>
                                                   
                                                </div>
                                                
                                       
                                </div>
                                <!-- 提交页脚 -->
                                <div class="footer" clearBox>
                                        <button @click="handleTobrandCert">认证通过</button>
                                </div>
                        </div>
                </div> 

                  <!-- 门店大图 -->
                            <div class="imgShowBig" v-show="imgShowBig" id="imgShowBig">
                                    
                                    <img :src="imgdata?imgdata:getInformationSubmitteIdList.shopPhoto" alt="" id="imgShowBigMain"> 
                                    <div style="width:20px;height:20px;background:rgba(0,0,0,0.2);text-align:center;line-height:20px;" id="imgShowBigIcon" @click="handleTocloseimgShowBig"><span class="iconfont icon-chuyidong"></span></div>
                            </div> 

                    <!-- 营业执照大图 -->
                        <div class="imgShowBigTwo" v-show="imgShowBigTwo" id="imgShowBigTwo">
                                     <img :src="imgdataTwo?imgdataTwo:getInformationSubmitteIdList.businessLicensePhoto" alt="" id="imgShowBigTwoMain"> 
                                    <div style="width:20px;height:20px;background:rgba(0,0,0,0.2);text-align:center;line-height:20px;" id="imgShowBigTwoIcon" @click="handleTocloseimgShowBigTwo"><span class="iconfont icon-chuyidong"></span></div>
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
                 //门店大图
                imgShowBig:false,
                //营业执照大图
                imgShowBigTwo:false
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
                     //重新上传门店资料
                     replenishShopPhoto:"brandCert/replenishShopPhoto",
                     //补充上传营业执照
                     replenishBusinessLicensePhoto:"brandCert/replenishBusinessLicensePhoto",
                     //删除营业执照
                     deleteBusinessLicensePhoto:"brandCert/deleteBusinessLicensePhoto",
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
                        //重新上传门店照片
                        var param =JSON.stringify({
                            "id":_this.finishId,
                            "ShopPhoto":_this.imgdata,
                            "ShopPhotoMD5":md5(_this.imgdata),
                        })
                        _this.replenishShopPhoto(param)

                       
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
                        //重新上传再走上补充上传
                         var param =JSON.stringify({
                        "id":_this.finishId,
                        "BusinessLicensePhotoMD5":md5(_this.imgdataTwo),
                        "BusinessLicensePhoto":_this.imgdataTwo
                    })
                     _this.replenishBusinessLicensePhoto(param);

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
                     var param =JSON.stringify({
                        "id":_this.finishId,
                        "BusinessLicensePhotoMD5":md5(_this.imgdataTwo),
                        "BusinessLicensePhoto":_this.imgdataTwo
                    })
                     _this.replenishBusinessLicensePhoto(param);  
                    }

                
                  

        },
        
         //删除错误上传
         handleDelUpload(){
               var file = document.getElementById('file');
               var param ={
                   "id":this.finishId
               }
               this.deleteBusinessLicensePhoto(param);
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
         },
         //鼠标滑过
         handleMouseSuppUpload($event){
                var  suppUpload = document.getElementById('suppUpload');
                suppUpload.style.textDecoration="underline";
                $event.target.style.cursor="pointer"; 
                 console.log($event.target.style.cursor);
         },
         handleMouseOutSuppload($event){
              var  suppUpload = document.getElementById('suppUpload');
                suppUpload.style.textDecoration="none";
                $event.target.style.cursor="pointer";
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
.clearBox:after{
   content:".";
   display:block;
   clear:both;
   height:0; 
   overflow:hidden; 
   visibility:hidden;
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
    font-size: 16px;

}
.apply>div:nth-of-type(1){
    width: 101px;
    text-align: left;
}
.apply>div:nth-of-type(2){
    margin-left:41px;
}
.shopImg{
   
}
.shopImg>div:nth-of-type(1){
    margin-left:-16px;
    width:117px;
    
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
.showImg:hover{
    cursor: pointer;
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
.reupload>input:hover{
cursor: pointer;
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
.showImgTwo:hover{
    cursor: pointer;
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
.addchuan>input:hover{
    cursor: pointer;
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
.footer>button:hover{
    cursor: pointer;
}
.footer>button:active{
    background: #6da4ff;
}
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
    /* overflow: hidden; */
    margin-left:33px;
    margin-bottom:14px;
}
.clearBox:after{
   content:".";
   display:block;
   clear:both;
   height:0; 
   overflow:hidden; 
   visibility:hidden;
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
    text-align: left;
}
.apply>div:nth-of-type(2){
    margin-left:30px;
}
.shopImg{

}
.shopImg>div:nth-of-type(1){
    margin-left: -14px;
    width: 88px;
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
.showImg:hover{
    cursor: pointer;
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
.reupload>input:hover{
    cursor: pointer;
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
.showImgTwo:hover{
    cursor: pointer;
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
    background:rgba(0,0,0,0.3);
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
.addchuan>input:hover{
    cursor: pointer;
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
.footer>button:hover{
    cursor: pointer;
}
.footer>button:active{
    background: #6da4ff;
}
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