<template>
    <div class="capitalFlow">
        <div class="capitalFlowChild"  v-if="capitalFlowChild">
                 <div class="capitalFlow-head">
                  <h2>资金流水核对异常</h2>
         </div>
         <!-- 使用better插件实现滚动 -->
         <div class="capitalFlow-main wrapper" ref="main" style="position:relative;">
                <div class="content capitalFlow-content">
                        <div class="capitalTable">
                             <div class="capitalTitle">
                                 <span class="iconfont icon-jiantou"></span>
                                 <span>2019-07-22</span>
                                 <span>2个云支付收款账号14条异常</span>
                            </div> 
                            <div class="capitalConent">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                <td>项目编号</td>
                                <td>项目名称</td>
                                <td>品牌名称</td>
                                <td>品牌名称</td>
                                <td>云支付收款账号</td>
                                <td>收款银行</td>
                                <td>云平台对不上</td>
                                <td>银行对账单对不上</td>
                                <td>合计</td>
                               
                                </tr>
                                <tr>
                                <td>0004533</td>
                                <td>淘淘纺织</td>
                                <td>淘淘1</td>
                                <td>12315464698798</td>
                                <td>建行</td>
                                <td>5</td>
                                <td>2</td>
                                <td>7</td>
                                <td>查看详情</td>
                            </tr>
                            </table>
                            </div>
                        </div>

                         <div class="capitalTable">
                             <div class="capitalTitle">
                                 <span class="iconfont icon-jiantou"></span>
                                 <span>2019-07-22</span>
                                 <span>2个云支付收款账号14条异常</span>
                            </div> 
                            <div class="capitalConent">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                <td>项目编号</td>
                                <td>项目名称</td>
                                <td>品牌名称</td>
                                <td>品牌名称</td>
                                <td>云支付收款账号</td>
                                <td>收款银行</td>
                                <td>云平台对不上</td>
                                <td>银行对账单对不上</td>
                                <td>合计</td>
                               
                                </tr>
                                <tr>
                                <td>0004533</td>
                                <td>淘淘纺织</td>
                                <td>淘淘1</td>
                                <td>12315464698798</td>
                                <td>建行</td>
                                <td>5</td>
                                <td>2</td>
                                <td>7</td>
                                <td>查看详情</td>
                            </tr>
                            </table>
                            </div>
                        </div>
                        
                       
                        
                        
                </div>
         </div>

        </div>
        <!-- 详情页面 -->
        <div class="details" v-if="detail">
             <div class="details-head">
                 <div>
                     <span>云支付收款账号:</span>
                     <span>123456789564645</span>
                 </div>
             </div>
             <!-- 云平台 -->
            <div class="cloud">
                <div>云平台</div>
                <div class="cloudForm">
                     <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td></td>
                                <td>制单时间</td>
                                <td>云支付订单号</td>
                                <td>订单金额</td>
                                <td>订单状态</td>   
                            </tr>
                                <tr>
                                <td>1</td>
                                <td title="2019-05-16 12:40">2019-05-16 12:40</td>
                                <td title="564654645645464646546456jhg">564654645645464646546456jhg</td>
                                <td>￥3，001.00</td>
                                <td>未支付</td>
                            </tr>
                    </table>
                </div>
            </div>
            <!--银行对账单 -->
            <div class="bank">
                    <div>银行对帐单</div>
                    <div class="bankForm">
                         <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td></td>
                                <td>交易时间</td>
                                <td>订单号</td>
                                <td>交易金额</td>
                                <td>订单状态</td>   
                            </tr>
                                <tr>
                                <td>1</td>
                                <td>2019-05-16 12:40</td>
                                <td>564654645645464646546456jhg</td>
                                <td>￥3，001.00</td>
                                <td>成功</td>
                            </tr>
                        </table>
                    </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import  Bscroll  from 'better-scroll'
export default {
        name:"abnormalCapitalFlow",
        data(){
            return{
                "capitalFlowChild":true,
                "detail":false
            }
        },
        mounted(){
            if(this.capitalFlowChild){
             this.$nextTick(() =>{
               
				this.scroll = new Bscroll(this.$refs.main, {
					click: true,
					scrollY:true,
					scrollbar:true,
					mouseWheel:true
                })
         
				
            })
            }
        },
}
</script>
<style scoped>
@media screen and (min-width:1400px){
    .capitalFlow{
            width:1400px;
            margin: 0 auto;
        }
        .capitalFlow-head {
            margin-top: 79px;
            overflow: hidden;
        } 
      .capitalFlow-head h2 {
        font-size: 24px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 1;
        float:left;
        }
     .capitalFlow-main{
         height:704px;
         overflow: hidden;
         margin-top: 40px;
     }
     .capitalFlow-content{
        max-height: max-content;
     }
     .capitalTable{
         margin-top: 33px;
     }
     .capitalTitle{  
       margin-bottom: 19px;
     }
     .capitalTitle >span:nth-of-type(1){
         font-size: 14px;
         color:#444444;
         margin-right: 7px;
     }
    .capitalTitle>span:nth-of-type(2){
          font-size: 14px;
          color: #171717;
          margin-right: 7px;
      }
     .capitalTitle>span:nth-of-type(3){
         font-size: 14px;
         color: #BFBFBF;
         margin-right: 7px;
     }
     .capitalConent{

     }
    .capitalConent > table > tr > td {
    border-bottom: 1px solid #e7e7e7;
    border-right: 1px solid #e7e7e7;
    line-height: 41px;
    padding:0 20px;
    text-align: center;
    font-size: 14px;
    color: #888888;
    }
     .capitalConent > table > tr > td:nth-of-type(9){
         color: #5897FF;
     }
    .capitalConent > table > tr:nth-of-type(1) > td {
    line-height: 41px;
   text-align: center;
    text-indent: 15px;
    font-size: 14px;
    background: rgba(241, 243, 246, 1);
    color: #888888;
    }

    /* 云支付收款账号详情页 */
    .details{

    }
    .details-head{
        margin-top:81px;
        margin-bottom:40px;
        font-size:24px; 
        font-weight: 500;
    }
    .cloud{
         float: left;
    }
   .cloud>div:nth-of-type(1){
       color: #5C5C5C;
       margin-bottom: 14px;
   }
    .cloudForm > table{
         table-layout: fixed;
         width: 684px;
     }
    .cloudForm > table > tr > td {
        border-bottom: 1px solid #e7e7e7;
        border-right: 1px solid #e7e7e7;
        line-height: 41px;
        padding:0 20px;
        text-align: center;
        font-size: 14px;
        color: #888888;
    }
     .cloudForm > table > tr > td:nth-of-type(1){
        width:27px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .cloudForm > table > tr > td:nth-of-type(2){
        width:140px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .cloudForm > table > tr > td:nth-of-type(3){
        width:191px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing: border-box;
    }
    .cloudForm > table > tr > td:nth-of-type(4){
        width:137px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .cloudForm > table > tr:nth-of-type(1) > td {
        line-height: 41px;
        text-align: center;
        text-indent: 15px;
        font-size: 14px;
        background: rgba(241, 243, 246, 1);
        color: #888888;
    }

    /* 银行流水 */
    .bank{
        float: left;
        margin-left: 20px;
    }
    .bank>div:nth-of-type(1){
        color:#5C5C5C;
        margin-bottom: 14px;
    }
    .bankForm > table{
         table-layout: fixed;
         width: 685px;
     }
     .bankForm > table > tr > td {
        border-bottom: 1px solid #e7e7e7;
        border-right: 1px solid #e7e7e7;
        line-height: 41px;
        padding:0 15px;
        text-align: center;
        font-size: 14px;
        color: #888888;
    }
     .bankForm > table > tr > td:nth-of-type(9){
         color: #5897FF;
     }
    .bankForm > table > tr:nth-of-type(1) > td {
        line-height: 41px;
        text-align: center;
        text-indent: 15px;
        font-size: 14px;
        background: rgba(241, 243, 246, 1);
        color: #888888;
    }
     .bankForm > table > tr > td:nth-of-type(1){
        width:27px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .bankForm > table > tr > td:nth-of-type(2){
        width:140px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .bankForm > table > tr > td:nth-of-type(3){
        width:191px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing: border-box;
    }
    .bankForm > table > tr > td:nth-of-type(4){
        width:137px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
@media screen  and (max-width:1400px){
        .capitalFlow{
            width:1024px;
            margin: 0 auto;
        }
        .capitalFlow-head {
            margin-top: 58px;
            overflow: hidden;
        } 
      .capitalFlow-head h2 {
        font-size: 19px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 1;
        float:left;
        }
     .capitalFlow-main{
         height:514px;
         margin-top: 29px;
         overflow: hidden;
     }
     .capitalFlow-content{
       max-height: max-content;
     }
     .capitalTable{
         margin-top: 24px;
     }
     .capitalTitle{  
       margin-bottom: 14px;
     }
     .capitalTitle >span:nth-of-type(1){
         font-size: 14px;
         color:#444444;
         margin-right: 5px;
     }
    .capitalTitle>span:nth-of-type(2){
          font-size: 12px;
          color: #171717;
          margin-right: 5px;
      }
     .capitalTitle>span:nth-of-type(3){
         font-size: 12px;
         color: #BFBFBF;
         margin-right: 5px;
     }
     .capitalConent{

     }
    .capitalConent > table > tr > td {
    border-bottom: 1px solid #e7e7e7;
    border-right: 1px solid #e7e7e7;
    line-height: 30px;
    padding:0 15px;
    text-align: center;
    font-size: 12px;
    color: #888888;
    }
     .capitalConent > table > tr > td:nth-of-type(9){
         color: #5897FF;
     }
    .capitalConent > table > tr:nth-of-type(1) > td {
    line-height: 30px;
   text-align: center;
    text-indent: 15px;
    font-size: 12px;
    background: rgba(241, 243, 246, 1);
    color: #888888;
    }

    /* 云支付收款账号详情页 */
    .details{

    }
    .details-head{
        margin-top:59px;
        margin-bottom:29px;
        font-size:19px; 
        font-weight: 500;
    }
    .cloud{
         float: left;
    }
   .cloud>div:nth-of-type(1){
       color: #5C5C5C;
       margin-bottom: 10px;
   }
    .cloudForm > table{
         table-layout: fixed;
         width: 500px;
     }
    .cloudForm > table > tr > td {
        border-bottom: 1px solid #e7e7e7;
        border-right: 1px solid #e7e7e7;
        line-height: 30px;
        padding:0 15px;
        text-align: center;
        font-size: 12px;
        color: #888888;
    }
     .cloudForm > table > tr > td:nth-of-type(1){
        width:20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .cloudForm > table > tr > td:nth-of-type(2){
        width:102px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .cloudForm > table > tr > td:nth-of-type(3){
        width:140px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing: border-box;
    }
    .cloudForm > table > tr > td:nth-of-type(4){
        width:100px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .cloudForm > table > tr:nth-of-type(1) > td {
        line-height: 30px;
        text-align: center;
        text-indent: 15px;
        font-size: 12px;
        background: rgba(241, 243, 246, 1);
        color: #888888;
    }

    /* 银行流水 */
    .bank{
        float: left;
        margin-left: 15px;
    }
    .bank>div:nth-of-type(1){
        color:#5C5C5C;
        margin-bottom: 10px;
    }
    .bankForm > table{
         table-layout: fixed;
         width: 500px;
     }
     .bankForm > table > tr > td {
        border-bottom: 1px solid #e7e7e7;
        border-right: 1px solid #e7e7e7;
        line-height: 30px;
        padding:0 15px;
        text-align: center;
        font-size: 12px;
        color: #888888;
    }
     .bankForm > table > tr > td:nth-of-type(9){
         color: #5897FF;
     }
    .bankForm > table > tr:nth-of-type(1) > td {
        line-height: 30px;
        text-align: center;
        text-indent: 15px;
        font-size: 12px;
        background: rgba(241, 243, 246, 1);
        color: #888888;
    }
     .bankForm > table > tr > td:nth-of-type(1){
        width:20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .bankForm > table > tr > td:nth-of-type(2){
        width:102px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .bankForm > table > tr > td:nth-of-type(3){
        width:140px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing: border-box;
    }
    .bankForm > table > tr > td:nth-of-type(4){
        width:100px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    }

</style>
