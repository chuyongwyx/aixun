<template>
    <div class="dataException">
            <div class="dataException-head">
                <h2>数据同步异常</h2>
                <div class="refresh"><span class="iconfont icon-shuaxin"></span><span>刷新</span></div>
            </div>
            <div class="exception">
                <div :class="{'exception-active':payColud}" @click="handleToPayColude">
                    <span>云支付订单</span>
                    <span>(4个)</span>
                </div>
                <div :class="{'exception-active':buildBill}" @click="handleToBuildBill">
                    <span>银行流水账单</span>
                    <span>(2)</span>
                </div>
            </div>
            <!-- 云支付订单 --> 
            <div class="from-table  payColudManager" v-if="payColud">
                <div class="payColud-form">
                    <div class="samllBtn"><button>同步</button></div>
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                        <td></td>
                        <td>云支付订单号</td>
                        <td>云支付收款账号</td>
                        <td>品牌名称</td>
                        <td>订单状态更新时间</td>
                        <td>账套制单情况</td>
                        </tr>
                        <tr>
                        <td><span class="iconfont icon-fuxuankuang_weixuanzhong
        "></span></td>
                        <td>25654516165465461365</td>
                        <td>6546464646546546</td>
                        <td>淘淘纺织</td>
                        <td><span>2019-05-16</span><span>12:40</span></td>
                        <td>制单失败</td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- 银行流水账单 -->
             <div class="from-table  payColudManager" v-if="buildBill">
                <div class="payColud-form">
                    <div class="samllBtn"><button>同步</button></div>
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                        <td></td>
                        <td>流水账单ID</td>
                        <td>云支付收款账号</td>
                        <td>收款银行</td>
                        <td>品牌名称</td>
                        <td>更新时间</td>
                        </tr>
                        <tr>
                        <td><span class="iconfont icon-fuxuankuang_weixuanzhong
        "></span></td>
                        <td>25654516165465461365</td>
                        <td>6546464646546546</td>
                        <td>建行</td>
                        <td>淘淘纺织</td>
                        <td><span>2019-5-16</span><span>12:40</span></td>
                        </tr>
                    </table>
                </div>
            </div>

    </div>
</template>
<script>
export default {
        name:"dataException",
        data(){
            return{
                payColud:true,
                buildBill:false
            }
        },
        methods:{
            handleToPayColude(){
                this.payColud = true;
                this.buildBill = false;
            },
            handleToBuildBill(){
                this.payColud = false;
                this.buildBill = true;
            }
        }
}
</script>

<style scoped>
@media screen and (min-width:1400px){
    .dataException{
        width: 1400px;
        margin:0 auto;
        box-sizing: border-box;
        padding-left: 89px;
   } 
   .dataException-head {
        margin-top: 79px;
        margin-bottom: 48px;
        overflow: hidden;
    } 
    .refresh:hover{
        cursor: pointer;
    }
    .dataException-head h2 {
        font-size: 24px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 1;
        float:left;
    }
    .dataException-head>div{
        float: left;
        margin-left: 30px;
        line-height: 24px;
        height: 24px;
         color: #5897FF;
    }
    .dataException-head>div>span:nth-of-type(1){
        font-size: 14px;
        margin-right: 4px;
        line-height: 24px;
        color: #5897FF;

    }
    .exception{
    overflow: hidden;
    
    }
    .exception > div {
    float: left;
    width: 191px;
    height: 41px;
    box-sizing: border-box;
    border: 1px solid #e7e7e7;
    background: #f1f3f6;
    line-height:41px;
    text-align: center;
    font-size: 14px;
    }
    .exception > div:hover {
    cursor: pointer;
    }
    .exception .exception-active {
    background: #e8eaec;
    }
    .from-table{
        overflow: hidden;
        
    }
    .payColud-form{
        float: left;
    }
    .payColud-form > table {
   
    border-top: 1px solid #e7e7e7;
    border-left: 1px solid #e7e7e7;
    }
    .samllBtn{
        width: 100%;
        overflow: hidden;
        margin-bottom:24px;
        
    }
    .samllBtn>button{
        width: 100px;
        height: 35px;
        float: right;
       
        border: 0;
        background: #E1E1E1;
        color: #fff;
        font-size: 14px;
        border-radius: 3px;
    }
    .samllBtnActive{
        background: #5897FF;
    }
    .payColud-form > table > tr > td {
    border-bottom: 1px solid #e7e7e7;
    border-right: 1px solid #e7e7e7;
    line-height: 41px;
    text-align: left;
    text-indent: 15px;
    padding-right: 56px;
    font-size: 14px;
    color: #888888;
    }
    .payColud-form > table > tr:nth-of-type(1) > td {
    line-height: 41px;
    text-align: left;
    text-indent: 15px;
    font-size: 14px;
    background: rgba(241, 243, 246, 1);
    color: #888888;
    }
}
@media screen  and (max-width:1400px){
   .dataException{
        width: 1024px;
        margin:0 auto;
        box-sizing: border-box;
        padding-left: 65px;
   } 
   .dataException-head {
        margin-top: 58px;
        margin-bottom: 35px;
        overflow: hidden;
    } 
    .refresh:hover{
        cursor: pointer;
    }
    .dataException-head h2 {
        font-size: 19px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 1;
        float:left;
    }
    .dataException-head>div{
        float: left;
        margin-left: 22px;
        line-height: 19px;
        height: 19px;
         color: #5897FF;
    }
    .dataException-head>div>span:nth-of-type(1){
        font-size: 13px;
        margin-right: 4px;
        line-height: 19px;
        color: #5897FF;

    }
    .exception{
    overflow: hidden;
    
    }
    .exception > div {
    float: left;
    width: 140px;
    height: 30px;
    box-sizing: border-box;
    border: 1px solid #e7e7e7;
    background: #f1f3f6;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    }
    .exception > div:hover {
    cursor: pointer;
    }
    .exception .exception-active {
    background: #e8eaec;
    }
    .from-table{
        overflow: hidden;
        
    }
    .payColud-form{
        float: left;
    }
    .payColud-form > table {
   
    border-top: 1px solid #e7e7e7;
    border-left: 1px solid #e7e7e7;
    }
    .samllBtn{
        width: 100%;
        overflow: hidden;
        margin-bottom:18px;
        
    }
    .samllBtn>button{
        width: 73px;
        height: 26px;
        float: right;
       
        border: 0;
        background: #E1E1E1;
        color: #fff;
        font-size: 12px;
        border-radius: 3px;
    }
    .samllBtnActive{
        background: #5897FF;
    }
    .payColud-form > table > tr > td {
    border-bottom: 1px solid #e7e7e7;
    border-right: 1px solid #e7e7e7;
    line-height: 30px;
    text-align: left;
    text-indent: 15px;
    padding-right: 41px;
    font-size: 12px;
    color: #888888;
    }
    .payColud-form > table > tr:nth-of-type(1) > td {
    line-height: 30px;
    text-align: left;
    text-indent: 15px;
    font-size: 12px;
    background: rgba(241, 243, 246, 1);
    color: #888888;
    }
    
}

</style>
