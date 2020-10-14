<template>
     <div class="cloudPay">
            <div class="cloudPay-head">
                    <h2>开通云支付</h2>
            </div>
            <div class="cloudPay-form">
                 <table cellpadding="0" cellspacing="0">
                     <tr>
                        <td></td>
                        <td>品牌名称</td>
                        <td>项目编号</td>
                        <td>项目名称</td>
                     </tr>
                     <tr v-for="(item,index) in GetOpenedCloudOrderBrands" class="trhover" @click="handleSelectedOpenCloudDoc($event,item,index)">
                       <td><span class="iconfont icon-fuxuankuang_weixuanzhong icon"></span></td>
                       <td>{{item.name}}</td>
                       <td>{{item.projectNumber}}</td>
                       <td>{{item.projectName}}</td>
                     </tr>
                  </table>
            </div>
            <div class="footer">
                    <button @click="handleToFinished" :class="{'Notselect':dataId.length==0?true:false}"><span v-show="openLoading==false?true:false">开通</span><span v-show="openLoading==false?false:true">开通中...</span></button> 

            </div>
              <div class="save-success" v-show="saveSuccessTip"><img src="../../../../assets/saveSuccess.png" alt=""></div>
     </div> 
</template> 
<script>
import  Vuex  from  'vuex';
export default {
    name:"openCloudPay",
    data(){
      return{
          dataId:[],
           //  没选中
          Notselect:"background:rgba(243,244,245,1);color:#B7B8BA;",

          //函数防抖
          timer:null,
          // openLoading:false
          //保存成功
          saveSuccessTip:false,
      }
    },
    methods:{
      ...Vuex.mapActions({
          getOpenedCloudOrderBrands:"openCloudPay/getOpenedCloudOrderBrands",
          //开通云单据
          openCloudPay:"openCloudPay/openCloudPay"
      }),
       //选中需要开通的云支付
          handleSelectedOpenCloudDoc($event,param,index){
           this.Notselect="background:rgba(88, 151, 255, 1);color:#fff";
            //清空其他的复选框颜色
            var trs =document.getElementsByClassName('trhover');
            var len =trs.length;
             if(trs[index].firstElementChild.firstElementChild.className.indexOf('icon-fuxuankuang_weixuanzhong') !==-1){
               trs[index].firstElementChild.firstElementChild.classList.remove('icon-fuxuankuang_weixuanzhong');
               trs[index].firstElementChild.firstElementChild.classList.remove('icon');
              trs[index].firstElementChild.firstElementChild.classList.add('icon-fuxuankuang_xuanzhong');
               trs[index].firstElementChild.firstElementChild.classList.add('icon1');
                 this.dataId.push(param.id);
            }else{
               trs[index].firstElementChild.firstElementChild.classList.remove('icon-fuxuankuang_xuanzhong'); 
               trs[index].firstElementChild.firstElementChild.classList.remove('icon1');
               trs[index].firstElementChild.firstElementChild.classList.add('icon-fuxuankuang_weixuanzhong');
               trs[index].firstElementChild.firstElementChild.classList.add('icon');
                 this.dataId.map((item,index)=>{
                    if(item==param.id){
                      this.dataId.splice(index,1);
                    }
                 })
            }   
        },
      //开通云支付
      handleToFinished(){
        var _this =this;
          if(this.timer){
            clearTimeout(this.timer);
            // this.openLoading=false;
          }
          if(this.dataId.length!==0){
            // this.openLoading=true;
            this.timer=setTimeout(()=>{
             var param = {
                "IDs":_this.dataId
              }
            _this.openCloudPay(param);
            },300)
           
        }
      }
    },
    watch: {
       success(newValue,oldValue){
             if(newValue==true){
            var trs =document.getElementsByClassName('trhover');
            var len =trs.length;
            for(var i=0;i<len;i++){
               trs[i].firstElementChild.firstElementChild.classList.remove('icon-fuxuankuang_xuanzhong','icon1');
               trs[i].firstElementChild.firstElementChild.classList.add('icon-fuxuankuang_weixuanzhong','icon');
            }
            this.dataId=[];
            this.saveSuccessTip=true;
            var _this=this;
            var timerTwo= setTimeout(()=>{
               _this.saveSuccessTip=false;
               clearTimeout(timerTwo);
            },1000)


            }
        }
    },
    computed:{
        ...Vuex.mapState({
            "GetOpenedCloudOrderBrands":state=>state.openCloudPay.GetOpenedCloudOrderBrands,
            "success":state=>state.openCloudPay.success,
            "openLoading":state=>state.openCloudPay.openLoading
        })
    },
   created(){
      this.getOpenedCloudOrderBrands();
   }
}

</script>
<style scoped>
@media screen and (min-width: 1400px){
  

.cloudPay{
   width:1400px;
   margin: 0 auto;
}
.cloudPay-head{
    margin-left:90px;
    margin-top:80px;
}
.cloudPay-head>h2{
    font-size: 24px;
    font-weight:500;
    margin-bottom: 48px;

}
.cloudPay-form{
    margin-left: 90px;
}

.cloudPay-form>table{
  table-layout:fixed;
  border-top: 1px solid #E7E7E7;
  border-left:1px solid #E7E7E7;
  
}
.cloudPay-form>table>tr{
}
.cloudPay-form>table>tr>td{
   border-bottom:1px solid #E7E7E7;
  border-right: 1px solid #E7E7E7;
  line-height: 42px;
  text-align: left;
  text-indent: 15px;
  font-size: 14px;
  color: #888888;
}
.cloudPay-form>table>tr:nth-of-type(1)>td{
  line-height: 30px;
  text-align: left;
  text-indent: 15px;
  font-size: 14px;
  background:rgba(241,243,246,1);
  color: #888888;
}
.cloudPay-form>table>tr>td:nth-of-type(1){
  width:44px;
  height: 42px;
}
.cloudPay-form>table>tr>td:nth-of-type(2){
  width:200px;
 height: 42px;
  
}
.cloudPay-form>table>tr>td:nth-of-type(3){
  width: 180px;
 height: 42px;
 
}
.cloudPay-form>table>tr>td:nth-of-type(4){
    width:180px;
    height: 42px;
}

.footer{
    width: 140px;
    height:48px;
    margin: 0 auto;
    position: absolute;
    bottom:100px;
    left:50%;
    margin-left: -70px;

}
.footer>button{
    width: 100%;
    height:100%;
    background:#5897FF;
    color:#fff;
    font-size: 14px;
    outline: none;
    border:0;
    border-radius: 4px;
}
.footer>button:hover{
  cursor: pointer;
}
.footer>button:active{
  background: #6da4ff;
}
.footer .Notselect{
    background:rgba(243,244,245,1);
    color:#B7B8BA;
  }
.footer .Notselect:active{
    background:rgba(243,244,245,1);
    color:#B7B8BA;
}
.icon{
  color: #D4D4D4;
}
.icon1{
  color: #5897FF;
}
.trhover:hover{
  background:#EDEEEF;
  cursor: pointer;
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

@media screen and (max-width:1400px) {
  .cloudPay{
   width:1024px;
   margin: 0 auto;
}
.cloudPay-head{
    margin-left:66px;
    margin-top:58px;
}
.cloudPay-head>h2{
    font-size: 19px;
    font-weight:500;
    margin-bottom: 35px;

}
.cloudPay-form{
    margin-left: 65px;
}

.cloudPay-form>table{
  table-layout:fixed;
  border-top: 1px solid #E7E7E7;
  border-left:1px solid #E7E7E7;
  
}
.cloudPay-form>table>tr{

}
.cloudPay-form>table>tr>td{
   border-bottom:1px solid #E7E7E7;
  border-right: 1px solid #E7E7E7;
  line-height: 30px;
  text-align: left;
  text-indent: 15px;
  font-size: 12px;
  color: #888888;
}
.cloudPay-form>table>tr:nth-of-type(1)>td{
  line-height: 22px;
  text-align: left;
  text-indent: 15px;
  font-size: 12px;
  background:rgba(241,243,246,1);
  color: #888888;
}
.cloudPay-form>table>tr>td:nth-of-type(1){
  width:32px;
  height: 30px;
  text-align: center;
  text-indent: 0;
}
.cloudPay-form>table>tr>td:nth-of-type(2){
  width:146px;
 height: 30px;
  
}
.cloudPay-form>table>tr>td:nth-of-type(3){
  width: 131px;
 height: 30px;
 
}
.cloudPay-form>table>tr>td:nth-of-type(4){
    width:131px;
    height: 30px;
}

.footer{
    width: 102px;
    height:35px;
    margin: 0 auto;
    position: absolute;
    bottom:70px;
    left:50%;
    margin-left: -51px;

}
.footer>button{
    width: 100%;
    height:100%;
    background:#5897FF;
    color:#fff;
    font-size: 12px;
    outline: none;
    border:0;
}
.footer .Notselect{
    background:rgba(243,244,245,1);
    color:#B7B8BA;
  }
.icon{
  color: #D4D4D4;
}
.icon1{
  color: #5897FF;
}
.trhover:hover{
  background:#EDEEEF;
  cursor: pointer;
}
.footer>button:hover{
  cursor: pointer;
}
.footer>button:active{
  background: #6da4ff;
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
