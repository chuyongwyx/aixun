<template>
     <div class="cloudDoc">
            <div class="cloudDoc-head">
                    <h2>开通云单据</h2>
            </div>
            <div class="cloudDoc-form">
                 <table cellpadding="0" cellspacing="0">
                     <tr>
                        <td></td>
                        <td>品牌名称</td>
                        <td>项目编号</td>
                        <td>项目名称</td>
                     </tr>
                     <tr v-for="(item,index) in GetVerifiedBrands"  class="trhover">
                       <td><span class="iconfont icon-fuxuankuang_weixuanzhong icon" @click="handleSelectedOpenCloudDoc($event,item)" ></span></td>
                       <td>{{item.name}}</td>
                       <td>{{item.projectNumber}}</td>
                       <td>{{item.projectName}}</td>
                     </tr>
                  </table>
            </div>
            <div class="footer">
                    <button @click="handleToFinished">开通</button>
            </div>
     </div>
</template>

<script>
import Vuex  from 'vuex'
export default {
    name:"openCloudDoc",
    data() {
      return {
           dataId:""
      }
    },
    computed:{
        ...Vuex.mapState({
            "GetVerifiedBrands":state=>state.openCloudDoc.GetVerifiedBrands
        })
    },
    methods: {
        ...Vuex.mapActions({
              //获取未开通云单据的数据
              getVerifiedBrands:"openCloudDoc/getVerifiedBrands",
              //开通云单据
              openCloudOrder:"openCloudDoc/openCloudOrder"
          }),
          //选中需要开通的云单据 
          handleSelectedOpenCloudDoc($event,param){
            //清空其他的复选框颜色
            
            var trs =document.getElementsByClassName('trhover');
            var len =trs.length;
            for(var i=0;i<len;i++){
              trs[i].firstElementChild.firstElementChild.classList.add('icon-fuxuankuang_weixuanzhong');
              trs[i].firstElementChild.firstElementChild.classList.add('icon');   
                   trs[i].firstElementChild.firstElementChild.classList.remove('icon-fuxuankuang_xuanzhong');
                   trs[i].firstElementChild.firstElementChild.classList.remove('icon1');

            }
            if($event.target.className.indexOf('icon-fuxuankuang_weixuanzhong') !==-1){
                $event.target.classList.remove('icon-fuxuankuang_weixuanzhong');
                $event.target.classList.remove('icon');
                $event.target.classList.add('icon-fuxuankuang_xuanzhong');
                $event.target.classList.add('icon1');
                 this.dataId =param.id;
            }else{
                $event.target.classList.add('icon-fuxuankuang_weixuanzhong');
                $event.target.classList.add('icon');
                $event.target.classList.remove('icon-fuxuankuang_xuanzhong');
                $event.target.classList.remove('icon1');
                 this.dataId =""
            }
        },
        //开通云单据
        handleToFinished(){
            var param = {
                "id":this.dataId
            }
            this.openCloudOrder(param);
        }
    },
    created(){
      this.getVerifiedBrands();
    }
}

</script>
<style scoped>
@media screen  and (min-width: 1400px){

.cloudDoc{
   width:1400px;
   margin: 0 auto;
}
.cloudDoc-head{
    margin-left:90px;
    margin-top:80px;
}
.cloudDoc-head>h2{
    font-size: 24px;
    font-weight:500;
    margin-bottom: 48px;

}
.cloudDoc-form{
    margin-left: 90px;
}

.cloudDoc-form>table{
  table-layout:fixed;
  border-top: 1px solid #E7E7E7;
  border-left:1px solid #E7E7E7;
  
}
.cloudDoc-form>table>tr{

}
.cloudDoc-form>table>tr>td{
   border-bottom:1px solid #E7E7E7;
  border-right: 1px solid #E7E7E7;
  line-height: 42px;
  text-align: left;
  text-indent: 15px;
  font-size: 14px;
  color: #888888;
}
.cloudDoc-form>table>tr:nth-of-type(1)>td{
  line-height: 30px;
  text-align: left;
  text-indent: 15px;
  font-size: 14px;
  background:rgba(241,243,246,1);
  color: #888888;
}
.cloudDoc-form>table>tr>td:nth-of-type(1){
  width:44px;
  height: 42px;
  text-align: center;
  text-indent: 0;
}
.cloudDoc-form>table>tr>td:nth-of-type(2){
  width:200px;
 height: 42px;
  
}
.cloudDoc-form>table>tr>td:nth-of-type(3){
  width: 180px;
 height: 42px;
 
}
.cloudDoc-form>table>tr>td:nth-of-type(4){
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
.icon{
  color: #D4D4D4;
}
.icon1{
  color: #5897FF;
}
}
@media screen  and (max-width:1400px){
  .cloudDoc{
   width:1024px;
   margin: 0 auto;
}
.cloudDoc-head{
    margin-left:66px;
    margin-top:58px;
}
.cloudDoc-head>h2{
    font-size: 19px;
    font-weight:500;
    margin-bottom: 35px;

}
.cloudDoc-form{
    margin-left: 65px;
}

.cloudDoc-form>table{
  table-layout:fixed;
  border-top: 1px solid #E7E7E7;
  border-left:1px solid #E7E7E7;
  
}
.cloudDoc-form>table>tr{

}
.cloudDoc-form>table>tr>td{
   border-bottom:1px solid #E7E7E7;
  border-right: 1px solid #E7E7E7;
  line-height: 30px;
  text-align: left;
  text-indent: 15px;
  font-size: 12px;
  color: #888888;
}
.cloudDoc-form>table>tr:nth-of-type(1)>td{
  line-height: 22px;
  text-align: left;
  text-indent: 15px;
  font-size: 12px;
  background:rgba(241,243,246,1);
  color: #888888;
}
.cloudDoc-form>table>tr>td:nth-of-type(1){
  width:32px;
  height: 30px;
  text-align: center;
  text-indent: 0;
}
.cloudDoc-form>table>tr>td:nth-of-type(2){
  width:146px;
 height: 30px;
  
}
.cloudDoc-form>table>tr>td:nth-of-type(3){
  width: 131px;
 height: 30px;
 
}
.cloudDoc-form>table>tr>td:nth-of-type(4){
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
.footer>button:active{
  background: #6da4ff;
}
.icon{
  color: #D4D4D4;
}
.icon1{
  color: #5897FF;
}
}
</style>
