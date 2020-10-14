<template>
    <div class="abnormalAccount">
        <div class="abnormalAccount-head">
                <h2>账套余额异常</h2>
        </div>
         <div class="daytime">
                <div :class="{'daytime-active':yestData}" @click="handleToYestData">
                    <span>昨天</span>
                    
                </div>
                <div :class="{'daytime-active':beforeYest}" @click="handleToBeforeYest">
                    <span>前天</span>
                </div>
        </div>

        <!-- 昨天 -->
         <div class="from-table" v-if="yestData">
                <div class="yest-form">
                    <div class="day"><span>2019-07-22</span><span>日期：</span></div>
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                        <td>项目编号</td>
                        <td>项目名称</td>
                        <td>品牌名称</td>
                        <td>云支付账户名称</td>
                        <td>收款银行</td>
                        <td>绑定账套</td>
                        <td>账户余额</td>
                        </tr>
                        <tr>
                        <td rowspan="2">004533</td>
                        <td rowspan="2">淘淘纺织</td>
                        <td><span>建行-1234</span><span>(未结算)</span></td>
                        <td>32131546456</td>
                        <td>建行</td>
                        <td>账套1</td>
                        <td>200</td>
                        </tr>
                        <tr>
                        <td><span>建行-1234</span><span>(未结算)</span></td>
                        <td>32131546456</td>
                        <td>建行</td>
                        <td>账套1</td>
                        <td>200</td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- 前天 -->
               <div class="from-table" v-if="beforeYest">
                <div class="yest-form">
                    <div class="day"><span>2019-07-21</span><span>日期：</span></div>
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                        <td>项目编号</td>
                        <td>项目名称</td>
                        <td>品牌名称</td>
                        <td>云支付账户名称</td>
                        <td>收款银行</td>
                        <td>绑定账套</td>
                        <td>账户余额</td>
                        </tr>
                        <tr>
                        <td rowspan="2">004533</td>
                        <td rowspan="2">淘淘纺织</td>
                        <td><span>建行-1234</span><span>(未结算)</span></td>
                        <td>32131546456</td>
                        <td>建行</td>
                        <td>账套1</td>
                        <td>200</td>
                        </tr>
                        <tr>
                        <td><span>建行-1234</span><span>(未结算)</span></td>
                        <td>32131546456</td>
                        <td>建行</td>
                        <td>账套1</td>
                        <td>200</td>
                        </tr>
                    </table>
                </div>
            </div>
    </div>
</template>
<script>
export default {
        name:"abnormalAccountBalance",
        data(){
            return{
                "yestData":true,
                "beforeYest":false
            }
        },
        methods:{
            handleToYestData(){
                this.yestData=true;
                this.beforeYest=false;
            },
            handleToBeforeYest(){
                this.yestData=false;
                this.beforeYest=true;
            }

        }
}
</script>

<style scoped>
@media screen and (min-width:1400px){
     .abnormalAccount{
        width: 1400px;
        margin:0 auto;
        box-sizing: border-box;
        padding-left: 89px;
   } 
   .abnormalAccount-head {
        margin-top:80px;
        margin-bottom:48px;
        overflow: hidden;
    } 
  
    .abnormalAccount-head h2 {
        font-size: 24px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 1;
        float:left;
    }
    .abnormalAccount-head>div{
        float: left;
        margin-left: 30px;
        line-height: 26px;
        height: 26px;
         color: #5897FF;
    }
    .abnormalAccount-head>div>span:nth-of-type(1){
        font-size: 14px;
        margin-right: 5px;
        line-height: 26px;
        color: #5897FF;

    }
    .daytime{
    overflow: hidden;
    
    }
    .daytime > div {
    float: left;
    width: 191px;
    height: 41px;
    box-sizing: border-box;
    border: 1px solid #e7e7e7;
    background: #f1f3f6;
    line-height: 41px;
    text-align: center;
    font-size: 14px;
    }
    .daytime > div:hover {
    cursor: pointer;
    }
    .daytime .daytime-active {
    background: #e8eaec;
    }
    .from-table{
        overflow: hidden;
        
    }
    .yest-form > table {
    width: 100%;
    border-top: 1px solid #e7e7e7;
    border-left: 1px solid #e7e7e7;
    }
    .day{
        width: 100%;
        overflow: hidden;
        margin-bottom:10px;
        
    }
    .day>span{
        float: right;
    }
   
    .yest-form > table > tr > td {
    border-bottom: 1px solid #e7e7e7;
    border-right: 1px solid #e7e7e7;
    line-height: 30px;
    text-align: center;
   padding:0 20px;
    font-size: 14px;
    color: #888888;
    }
    .yest-form > table > tr:nth-of-type(1) > td {
    line-height: 41px;
    text-align: center;
    padding:0 20px;
   
    font-size: 14px;
    background: rgba(241, 243, 246, 1);
    color: #888888;
    }
}
  @media screen  and (max-width:1400px){
   .abnormalAccount{
        width: 1024px;
        margin:0 auto;
        box-sizing: border-box;
        padding-left: 65px;
   } 
   .abnormalAccount-head {
        margin-top: 58px;
        margin-bottom: 35px;
        overflow: hidden;
    } 
  
    .abnormalAccount-head h2 {
        font-size: 19px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 1;
        float:left;
    }
    .abnormalAccount-head>div{
        float: left;
        margin-left: 22px;
        line-height: 19px;
        height: 19px;
         color: #5897FF;
    }
    .abnormalAccount-head>div>span:nth-of-type(1){
        font-size: 13px;
        margin-right: 4px;
        line-height: 19px;
        color: #5897FF;

    }
    .daytime{
    overflow: hidden;
    
    }
    .daytime > div {
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
    .daytime > div:hover {
    cursor: pointer;
    }
    .daytime .daytime-active {
    background: #e8eaec;
    }
    .from-table{
        overflow: hidden;
        
    }
    .yest-form > table {
    width: 100%;
    border-top: 1px solid #e7e7e7;
    border-left: 1px solid #e7e7e7;
    }
    .day{
        width: 100%;
        overflow: hidden;
        margin-bottom:7px;
        
    }
    .day>span{
        float: right;
    }
   
    .yest-form > table > tr > td {
    border-bottom: 1px solid #e7e7e7;
    border-right: 1px solid #e7e7e7;
    line-height: 30px;
    text-align: center;
   padding:0 15px;
    font-size: 12px;
    color: #888888;
    }
    .yest-form > table > tr:nth-of-type(1) > td {
    line-height: 30px;
    text-align: center;
    padding:0 15px;
   
    font-size: 12px;
    background: rgba(241, 243, 246, 1);
    color: #888888;
    }
    
}
    
</style>
