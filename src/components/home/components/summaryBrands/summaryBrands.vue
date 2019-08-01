<template>
         <div class="itemCount">
                <div class="itemCount-head">
                        <h2>项目品牌总表</h2>
                </div>
                <div class="search">
                        <span>项目编号:</span>
                        <input type="text">
                        <button>查询</button>
                </div>
                <div class="itemCount-form">
                        <table cellpadding="0" cellspacing="0">
                        <tr>
                                <td>项目编号</td>
                                <td>项目名称</td>
                                <td>品牌名称</td>
                                <td>状态</td>
                                <td>运单据</td>
                                <td>云支付</td>
                        </tr>
                        <tbody>
                        <tr>
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
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
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
                        </tr>
                        </tbody>
                        </table>
                </div>
     </div>
</template>
<script>
export default {
    name:"summaryBrands"
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
}
.itemCount-form{
    margin-left: 90px;
}

.itemCount-form>table{
  width:746px;
  border-top: 1px solid #E7E7E7;
  border-left:1px solid #E7E7E7;
  
}
.itemCount-form>table>tbody>tr{

}
.itemCount-form>table>tbody>tr>td{
   border-bottom:1px solid #E7E7E7;
  border-right: 1px solid #E7E7E7;
  line-height: 42px;
  text-align: center;
  font-size: 14px;
  color: #888888;
}
.itemCount-form>table>tr:nth-of-type(1)>td{
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  background:rgba(241,243,246,1);
  height: 42px;
  color: #888888;
}
/* .itemCount-form>table>tr>td:nth-of-type(1){
  width:44px;
  height: 42px;
}
.itemCount-form>table>tr>td:nth-of-type(2){
  width:200px;
 height: 42px;
  
}
.cloudDoc-form>table>tr>td:nth-of-type(3){
  width: 180px;
 height: 42px;
 
}
.itemCount-form>table>tr>td:nth-of-type(4){
    width:180px;
    height: 42px;
} */
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

.itemCount-form>table{
  width:746px;
  border-top: 1px solid #E7E7E7;
  border-left:1px solid #E7E7E7;
  
}
.itemCount-form>table>tbody>tr{

}
.itemCount-form>table>tbody>tr>td{
   border-bottom:1px solid #E7E7E7;
  border-right: 1px solid #E7E7E7;
  line-height: 42px;
  text-align: center;
  font-size: 14px;
  color: #888888;
}
.itemCount-form>table>tr:nth-of-type(1)>td{
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  background:rgba(241,243,246,1);
  height: 42px;
  color: #888888;
}
/* .itemCount-form>table>tr>td:nth-of-type(1){
  width:44px;
  height: 42px;
}
.itemCount-form>table>tr>td:nth-of-type(2){
  width:200px;
 height: 42px;
  
}
.cloudDoc-form>table>tr>td:nth-of-type(3){
  width: 180px;
 height: 42px;
 
}
.itemCount-form>table>tr>td:nth-of-type(4){
    width:180px;
    height: 42px;
} */      
}
</style>
