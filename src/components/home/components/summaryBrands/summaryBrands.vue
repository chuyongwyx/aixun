<template>
         <div class="itemCount">
                <div class="itemCount-head">
                        <h2>项目品牌总表</h2>
                </div>
                <div class="search">
                        <span>项目编号:</span>
                        <input type="text" v-model="ProjectNumber">
                        <button @click="handleTosearch">查询</button>
                </div>
                <div class="itemCount-form">
                                <ul class="itemCountNav">
                                <li>项目编号</li>
                                <li>项目名称</li>
                                <li>品牌名称</li>
                                <li>状态</li>
                                <li>云单据</li>
                                <li>云支付</li>
                                </ul>

                        <div class=" wrapper itemCountTable" ref="main" style="position:relative;">
                                <div class="content itemCountTableCont">
                                       <table cellpadding="0" cellspacing="0">
                                        <tr v-for="(item,index) in  DataList">
                                                <td>{{item.projectNumber}}</td>
                                                <td>{{item.projectName}}</td>
                                                <td>{{item.name}}</td>
                                                <td>{{item.brandStatus==2?'已开通':'未开通'}}</td>
                                                <td>{{item.openedCloudOrder?'已开通':'未启用'}}</td>
                                                <td>{{item.openedCloudPay?'已开通':'未启用'}}</td>
                                        </tr>

                                        <!-- <tr>
                                                <td rowspan="2">0046665</td>
                                                <td rowspan="2">淘淘纺织</td>
                                                <td>0</td>
                                                <td>淘淘纺织</td>
                                                <td>运单据</td>
                                                <td>未启用</td>
                                        </tr>
                                        <tr>
                                                <td>0</td>
                                                <td>淘淘纺织</td>
                                                <td>运单据</td>
                                                <td>未启用</td>
                                        </tr> -->
                                
                                        </table>                
                                </div>
                        </div>
                       
                </div>
     </div>
</template>
<script>
import Vuex  from "vuex";
import  Bscroll  from 'better-scroll';
export default {
    name:"summaryBrands",       
    data(){ 
        return{
                "ProjectNumber":""
        }
    },
    mounted(){
           
             this.$nextTick(() =>{
		this.scroll = new Bscroll(this.$refs.main,{
			click: true,
			scrollY:true,
			scrollbar:{
                                fade: false,
                                interactive: false, // 1.8.0 新增
                        },
			mouseWheel:true
                })
                //改变滚动条颜色
                document.getElementsByClassName('bscroll-indicator')[0].style.background="rgba(0,0,0,0.2)";
            })
   },
    computed:{
            ...Vuex.mapState({
                    DataList: state=>state.summaryBrands.DataList
            })
    },
    methods:{
            ...Vuex.mapActions({
                    //项目品牌总表查询
                    getProjectBrands:"summaryBrands/getProjectBrands",
            }),
            handleTosearch(){
                    var param =JSON.stringify({
                            "ProjectNumber":this.ProjectNumber
                    })
                    this.getProjectBrands(param);

            }
    }
}
</script>
<style scoped>
@media screen  and (min-width:1400px){

.itemCount{
        width:1400px;
        margin: 0 auto;
}
.itemCount-head{
    margin-left:90px;
    margin-top:80px;
} 
.itemCount-head>h2{
    font-size: 24px;
    font-weight:500;
    margin-bottom: 32px;

}
.search{
        margin-left: 112px;
        font-size: 14px;
        margin-bottom:26px;
}
.search>span:nth-of-type(1){
        margin-right: 8px;
}
.search>input{
        width: 140px;
        height: 28px;
        border: 0;
       background:rgba(241,243,246,1);
       outline: none;
       text-indent:8px;
       color: #333333;
}
.search > button{
        width:90px;
        height: 36px;
        border:0;
        background:#5897FF;
        color: #fff;
        font-size: 14px;
        margin-left: 30px;
        border-radius: 4px;
        outline: none;
}

.search > button:active{
        background:#6da4ff;
}
.itemCount-form{
    margin-left: 90px;
}
.itemCountTable{
   height:385px;
   width: 746px;
   overflow: hidden;
}
.itemCountTableCont{
height: max-content;
}
.itemCountTableCont>table{
  width:746px;
  border-top: 1px solid #E7E7E7;
  border-left:1px solid #E7E7E7;
  table-layout: fixed;
  
}
.itemCountNav{  
  width:746px;
  line-height: 42px;
  text-align: center;
  font-size: 14px;
  background:rgba(241,243,246,1);
  height: 42px;
  color: #888888;
  border-top: 1px solid #E7E7E7;
  border-left:1px solid #E7E7E7;
  border-right: 1px solid #E7E7E7;
overflow: hidden;
}
.itemCountNav>li{
   float: left;
   border-right:1px solid #E7E7E7;
   height: 42px; 
}
.itemCountNav>li:nth-of-type(1){
    width:104px;
        
}
.itemCountNav>li:nth-of-type(2){
    width: 145px;    

}
.itemCountNav>li:nth-of-type(3){
   width: 186px;
}
.itemCountNav>li:nth-of-type(4){
   width: 104px;
}
.itemCountNav>li:nth-of-type(5){
   width: 103px;
}
.itemCountNav>li:nth-of-type(6){
   width: 101px;
  border-right: 0;
}
.itemCountTableCont>table>tr{

}
.itemCountTableCont>table>tr>td{
   border-bottom:1px solid #E7E7E7;
  border-right: 1px solid #E7E7E7;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  color: #888888;
}

.itemCountTableCont>table>tr>td:nth-of-type(1){
  width:100px;
  height: 42px;
}
.itemCountTableCont>table>tr>td:nth-of-type(2){
  width:140px;
 height: 42px;
  
}
.itemCountTableCont>table>tr>td:nth-of-type(3){
  width: 180px;
 height: 42px;
 
}
.itemCountTableCont>table>tr>td:nth-of-type(4){
    width:100px;
    height: 42px;
}
.itemCountTableCont>table>tr>td:nth-of-type(5){
    width:100px;
    height: 42px;
}
.itemCountTableCont>table>tr>td:nth-of-type(6){
    width:100px;
    height: 42px;
}
.bscroll-indicator{
        /* background:rgba(0,0,0,0) !important; */
}

}

@media screen and (max-width:1400px){
  .itemCount{
        width:1024px;
        margin: 0 auto;
}
.itemCount-head{
    margin-left:66px;
    margin-top:58px;
}
.itemCount-head>h2{
    font-size: 19px;
    font-weight:500;
    margin-bottom: 23px;

}
.search{
        margin-left: 81px;
        font-size: 12px;
        margin-bottom:19px;
}
.search>span:nth-of-type(1){
        margin-right: 6px;
}
.search>input{
        width: 102px;
        height: 20px;
        border: 0;
       background:rgba(241,243,246,1);
       outline: none;
       text-indent:8px;
       color: #333333;
}
.search > button{
        width:66px;
        height: 26px;
        border:0;
        background:#5897FF;
        color: #fff;
        font-size: 12px;
        margin-left: 22px;
        border-radius: 4px;
}
.itemCount-form{
    margin-left: 66px;
}

.itemCountTable{
   height:281px;
   width: 544px;
   overflow: hidden;
}
.itemCountTableCont{
height: max-content;
}
.itemCountTableCont>table{
  width:544px;
  border-top: 1px solid #E7E7E7;
  border-left:1px solid #E7E7E7;
  table-layout: fixed;
  
}
.itemCountNav{  
  width:544px;
  line-height: 30px;
  text-align: center;
  font-size: 12px;
  background:rgba(241,243,246,1);
  height: 30px;
  color: #888888;
  border-top: 1px solid #E7E7E7;
  border-left:1px solid #E7E7E7;
  border-right: 1px solid #E7E7E7;
overflow: hidden;
}
.itemCountNav>li{
   float: left;
   border-right:1px solid #E7E7E7;
   height: 30px; 
}
.itemCountNav>li:nth-of-type(1){
    width:76px;
        
}
.itemCountNav>li:nth-of-type(2){
    width: 106px;    

}
.itemCountNav>li:nth-of-type(3){
   width: 135px;
}
.itemCountNav>li:nth-of-type(4){
   width: 76px;
}
.itemCountNav>li:nth-of-type(5){
   width: 75px;
}
.itemCountNav>li:nth-of-type(6){
   width: 73px;
  border-right: 0;
}
.itemCountTableCont>table>tr{

}
.itemCountTableCont>table>tr>td{
   border-bottom:1px solid #E7E7E7;
  border-right: 1px solid #E7E7E7;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  color: #888888;
  height: 30px;
}

.itemCountTableCont>table>tr>td:nth-of-type(1){
  width:74px;
 
}
.itemCountTableCont>table>tr>td:nth-of-type(2){
  width:102px;
 
  
}
.itemCountTableCont>table>tr>td:nth-of-type(3){
  width: 131px;
 
 
}
.itemCountTableCont>table>tr>td:nth-of-type(4){
    width:73px;
}
.itemCountTableCont>table>tr>td:nth-of-type(5){
    width:73px;
}
.itemCountTableCont>table>tr>td:nth-of-type(6){
    width:73px;
    height:30px;
}
}
</style>
