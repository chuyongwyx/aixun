<template>
        <div class="new-request-form">
                <div>
                    <h2>新建申请单</h2>
                </div>
                <div style="overflow:hidden;">
                        <div class="item-select">
                            <div>
                                <span>项目编号：</span>
                                <div>{{projectsNum}}</div>
                            </div>
                            <div>
                                <span>项目名称:</span>
                                <div>{{projectsName}}</div>
                            </div>
                            <div @click="handelSearchShow">
                                   <span class="iconfont icon-sousuo"></span> 
                                     <div><span>选择项目</span></div>   
                            </div>
                        </div>
                </div> 
                <!-- 这是搜索模态框 -->
              
                <div class="search-model" v-show="searchModel">
                        <div class="search-content">
                             <div class="search-tit"><span>搜索</span><span class="iconfont  icon-chuyidong" @click="handleSearchHide"></span></div>
                             <div class="search-input"><div><input type="text" placeholder="请输入项目编号/项目名称" v-model="searchVal"></div><div><button @click="handleToSearch">搜索</button></div></div>
                             <div class="search-form">
                                    <div><span>项目编号</span><span>项目名称</span></div>
                                    <!-- 下面是获取到的项目信息 -->
                                    <div class="projects-content">
                                             <div class="search-item" v-for="(item,index) in searchProjects"  @click="handleClickProject($event,item)"><span>{{item.name}}</span><span>{{item.projectNumber}}</span></div>
                                             <div class="searchNot" v-show="searchNot">搜索不到该项目编号/名称,请重新搜索</div>
                                    </div>
                                   
                             </div> 
                        </div>
                </div>
              
                <div class="request-form">
                        <div>
                            <span>申请类型：</span>
                                <div>
                                     <Select v-model="modelType" class="select-iview" @on-change="handleType" size="large">
                                        <Option v-for="item in requestType" :value="item.value" :key="item.value" class="select-option">{{ item.label }}</Option>
                                     </Select>
                                </div>
                                <div class="applyTip" v-show="applyTip">*请选择申请类型</div>
                        </div>
                        <div>
                            <span>联系人:</span>
                            <div class="form-info">
                                <input type="text" v-model="linkMan" @focus="handleToLinkMan">
                            </div>
                            <div class="linkManTip" v-show="linkManTip">*请输入联系人</div>
                        </div>
                        <div>
                            <span>联系电话:</span>
                            <div class="form-info">
                                <input type="text" v-model="linkTel" @focus="handleToLinkTel">
                            </div>
                            <div class="linkPhoneTip" v-show="linkPhoneTip">*请输入联系电话</div>
                        </div>
                         <div>
                            <span>邮箱地址:</span>
                            <div class="form-info">
                                <input type="text" v-model="linkEmail" @focus="handleToEmail">
                            </div>
                            <div class="linkEmailTip" v-show="linkEmailTip">*请输入邮箱地址</div>
                        </div>
                        <div>
                            <span>备注:</span>
                            <div>
                                <textarea name="" id="" cols="30" rows="10"  v-model="remark"  :style="tipText" @focus="handleTofocus"></textarea>
                            </div>
                            
                        </div>

                </div>
                <div class="save-btn">
                        <button @click="handleSave" :data-info="closeWindow" :style="saveBtn"><span v-show="saveLoading==false?true:false">保存</span><span v-show="saveLoading==false?false:true">保存中...</span></button>
                </div>
        </div>
</template>
<script>
import Vuex from "vuex"
export default {
        name:"newRequestForm",
         data(){
             return{
                  requestType:[
                      {
                          value:'1',
                          label:'云单据'
                      },
                      {
                          value:'2',
                          label:'云条码'
                      }
                  ],
                modelType:'',
                searchModel:false,
                projectsNum:"",
                projectsName:"",
                applyType:"",
                linkMan:"",
                linkTel:"",
                linkEmail:"",
                remark:"请输入备注...",
                searchVal:"",
                //提示文字颜色
                tipText:"color:#c5c8ce;",
                //按钮颜色
                saveBtn:"color:#B7B8BA;background:rgba(243,244,245,1);",
                //所有输入框漏选
                applyTip:false,
                linkManTip:false,
                linkPhoneTip:false,
                linkEmailTip:false,
                //保存的loading
                saveLoading:false,
                //函数防抖
                timer:null


             }
         },
         watch: {
                 closeWindow(newValue,oldValue){
                        if(newValue){
                            this.saveLoading=false;
                             this.handleCloseRouter(this.$route.name)
                             this.$router.push('/payItem');
                             this.handleNotCloseWindow();
                        }                  
                 },
                modelType(newValue,oldValue){
                    this.saveBtn="background:#5897FF;color: #fff;";
                },
                linkMan(newValue,oldValue){
                     this.saveBtn="background:#5897FF;color: #fff;";
                }, 
                linkEmail(newValue,oldValue){
                    this.saveBtn="background:#5897FF;color: #fff;";
                },
                remark(newValue,oldValue){
                    this.saveBtn="background:#5897FF;color: #fff;";
                }


         },
         computed:{
                ...Vuex.mapState({
                    projects : state =>state.newRequestForm.projects,
                    //是否关闭窗口
                    closeWindow:state=>state.newRequestForm.closeWindow,
                    //模糊查询出来的数据
                    searchProjects:state=>state.newRequestForm.searchProjects,
                    //查不到
                    searchNot:state=>state.newRequestForm.searchNot
                })
         },
         methods: {
             ...Vuex.mapActions({
                    //请求项目初始化信息
                    getInitialAddDatas:"newRequestForm/getInitialAddDatas",
                    //点击生成申请单
                    newRequestForm :"newRequestForm/newRequestForm",
                    //关闭当前页面
                    handleCloseRouter:"home/handleCloseRouter",
                    //不关闭
                    handleNotCloseWindow:"newRequestForm/handleCloseWindow",
                    //模糊查询
                    getSearchVal:"newRequestForm/getSearchVal",
                    //清除查询到的数据
                    handleclickClearSearchData:"newRequestForm/handleclickClearSearchData"

             }),
             //模态框的显示与隐藏
             handelSearchShow(){
                 //请求一次项目初始化信息
                 this.getInitialAddDatas();
                 this.searchModel=true;
             },
             handleSearchHide(){
                 this.searchModel=false;
                 //清除搜索到的东西
                this.handleclickClearSearchData();
                this.searchVal="";
             },
             //项目选中操作
             handleClickProject($event,item){
                 this.projectsNum = item.projectNumber;
                 this.projectsName =item.name;
                 this.searchModel=false;
                //清除搜索到的东西
                this.handleclickClearSearchData();
                this.searchVal="";
             },
             //选中申请单类型
             handleType(value){
                 this.applyType =value;
                 this.applyTip=false;
             },
             //模糊查询
             handleToSearch(){
                 if(this.searchVal!==''){
                     this.getSearchVal(this.searchVal);
                 }
                   
             },
             //点击保存则新建一张申请单
             handleSave($event){
                    var _this = this;
                  //申请类型没选
                    if(this.applyType==""){
                        this.applyTip=true;
                    }
                    //联系人没填
                    if(this.linkMan==""){
                        this.linkManTip=true;
                    }
                    //联系电话没填
                    if(this.linkTel==""){
                         this.linkPhoneTip=true;
                    }
                   //邮箱地址没填
                   if(this.linkEmail==""){
                       this.linkEmailTip=true;
                   }
                   if(this.applyType!==""&&this.linkMan!==""&&this.linkTel!==""&&this.linkEmail!==""){
                        this.saveLoading =true;
                        if(this.timer){
                            clearTimeout(this.timer);
                            this.saveLoading=false;
                        }
                        this.timer=setTimeout(function(){
                              var remark ="";   
                        if(_this.remark=="请输入备注..."){
                            remark =""
                        }else{
                            remark = _this.remark;
                        }
                        var ApplyType = parseInt(_this.applyType)
                        var param =JSON.stringify({
                            ProjectNumber:_this.projectsNum,
                            Type: ApplyType,
                            linkman:_this.linkMan,
                            PhoneNumber:_this.linkTel,
                            EmailAddress:_this.linkEmail,
                            Remark:remark
                        })
                        _this.newRequestForm(param);
                        },300)
                       
                        
                        

                   }
             },
             //文本域得焦时
             handleTofocus(){
                 if(this.remark=='请输入备注...'){
                     this.remark=""
                 }
                 this.tipText ="color:#515A6E;"
             },

             //得焦后操作
             handleToLinkMan(){
                 this.linkManTip=false;
             },
             handleToLinkTel(){
                this.linkPhoneTip=false;
             },
             handleToEmail(){
                  this.linkEmailTip=false;
             }

           
         }, 
         created(){
           
         },
         mounted() {
                    
         },
         destroyed() {
            
         },
       
}

</script>
<style lang="" scoped>
    @media screen and (min-width: 1400px) {
    .new-request-form{
            padding-left:89px;
            width:1400px;
            margin: 0 auto;
            box-sizing: border-box;
            height: 100%;
    }
    .new-request-form>div:nth-of-type(1){
            margin-top:80px;
            margin-bottom: 56px;
    }
     .new-request-form>div>h2{
         font-weight: 500;
         font-size: 24px;
         color: #333;
         line-height: 1;
     }
    
     .select-option{
         font-size:14px;
     }
     .item-select{
         float: left;
         padding-bottom: 26px;
         border-bottom:1px solid rgba(232,235,240,1); 
     }
     .item-select>div{
            float: left;
     }
      .item-select>div:nth-of-type(1){
          margin-right: 59px;
      }
       .item-select>div:nth-of-type(2){
           margin-right: 140px;
       }
     .item-select>div>span{
         float: left;
         font-size: 14px;
         line-height: 34px;
         margin-right: 10px;
     }
      .item-select>div:nth-of-type(1) div{
          float: left;
          width:180px;
          height: 34px;
          background:rgba(227,229,232,1);
          border-radius:2px;
          line-height: 34px;
          text-align: center;
          font-size: 14px;
          color:#c5c8ce;
      }
      .item-select>div:nth-of-type(2) div{
           float: left;
          width:180px;
          height: 34px;
          background:rgba(227,229,232,1);
          border-radius:2px;
          line-height: 34px;
          text-align: center;
          font-size: 14px;
         color:#c5c8ce;
      }
      .item-select>div:nth-of-type(3){
          color: #5897FF;
          font-size: 14px;
      }
       .item-select>div:nth-of-type(3)>span{
           font-size: 16px;
           margin-right: 5px;
       }
       .item-select>div:nth-of-type(3)>div{
           float: left;
           line-height: 34px;
       }
      .item-select>div:nth-of-type(3):hover{
          cursor: pointer;
      }
     .search-form > .projects-content:hover{
          cursor: pointer;
      }
      .request-form{

      }
      .request-form >div{
          margin-top: 14px;
          overflow: hidden;
        
      }
    
    
    .request-form >div span{
           font-size: 14px;
           float:left;
           display: block;
           width:100px;
           line-height: 34px;
       }
       .request-form >div>div:nth-of-type(1){
           float:left;
           width:300px;
       }
       .request-form >div>div:nth-of-type(2){
         float: left;
         height:34px;
         line-height:34px;
         color:red;
         margin-left: 15px;
       }


       .form-info{
             border:1px solid rgba(232,235,240,1);
             border-radius:2px;
             height: 36px;
       }
       .request-form .form-info>span{
            float:none;
        }
      .ivu-select-selected-value{
           font-size: 14px !important;
       }
       .request-form .form-info>input{
           width: 100%;
           height:100%;
           border: 0;
           outline: none;
           text-indent: 7px;
           font-size: 14px;
           color:#515A6E ;
       }
       .request-form >div>span{
           float: left;
           line-height: 30px;
       }
        .request-form>div:nth-of-type(1) , .request-form>div:nth-of-type(2),  .request-form>div:nth-of-type(3) ,.request-form>div:nth-of-type(4){
            /* width: 396px; */
        }
        .request-form >div:nth-of-type(5){
            /* width: 818px; */
        }
         .request-form >div:nth-of-type(5)>div{
             width: 720px;
            height: 128px;
         }
          .request-form >div:nth-of-type(5)>div>span{
              line-height: 1;
          }
        .request-form >div:nth-of-type(5)>div>textarea{
           width: 720px;
            height: 128px;
            font-size:14px;
            resize:none; 
            outline: none;
            text-indent: 7px;
            color:#515A6E ;
        }
        .save-btn{
                width:140px;
                height:48px;
                float:left;
                margin-left: 630px;
                margin-top: 141px;
        }
         .save-btn>button{
                width:100%;
                height:100%;
                outline: none;
                background:#5897FF;
                color: #fff;
                border: 0;
                border-radius: 4px;
         }
         
          .save-btn>button:hover{
              cursor: pointer;
          }

          .save-btn>button:active{
            background: #6da4ff;
         }
        /* 选择项目中的模态框的显示与隐藏 */
        .search-model{
            position:absolute;
            top: 0;
            left:0;
            z-index: 10;
            width:100%;
            height:100%;
            background:rgba(0,0,0,0.3);
            
        }
        .search-model .search-content{
            width: 500px;
            height:300px;
            background:#fff;
            position: absolute;
            top: 275px;
            left: 50%;
            margin-left:-250px;
            
        }
        .search-model .search-content .search-tit{
            margin: 23px 0;
            overflow: hidden;
        }
          .search-model .search-content .search-tit>span:nth-of-type(1){
              float: left;
              margin-left:228px;
              font-size:20px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(51,51,51,1);

          }

           .search-model .search-content .search-tit>span:nth-of-type(2){
               float:right;
               font-size: 20px;
               margin-right: 20px;
               color: #D2D2D2;
           }
         .search-model .search-content .search-input{
             margin-left: 51px;
             overflow: hidden;
         }
          .search-model .search-content .search-input>div:nth-of-type(1){
              width: 300px;
              height: 34px;
              background:#E7E7E7;
              border-radius:2px;
              float: left;
          }
         .search-model .search-content .search-input>div:nth-of-type(1)>input{
               outline: none;
               border: none;
               width:100%;
               height: 100%;
               background:#F1F3F6;
               text-indent: 19px;
               font-size: 14px;
         }
         .search-model .search-content .search-input>div:nth-of-type(2){
            float: left;
            width:80px;
            height:34px;
           margin-left:18px;
            border-radius:2px;
         }
        .search-model .search-content .search-input>div:nth-of-type(2)>button{
            border: 0;
            outline: none;
            width: 100%;
            height:100%;
             background:rgba(88,151,255,1);
             color: #fff;
             border-radius: 4px;
             
        }
        .search-model .search-content .search-input>div:nth-of-type(2)>button:active{
            background: #6da4ff;
        }
        .search-form{
            margin-top: 20px;
            margin-left: 51px;
        }
       .search-form  .projects-content{
           max-height:120px;
            width:240px;
            border: 1px solid rgba(231,231,231,1);
            border-top: 0;
            overflow:auto;
       }
        .search-form>div:nth-of-type(1){
            overflow: hidden;
        }
        .search-form>div:nth-of-type(1)>span{
              float:left;
              display: block;
              width:120px;
              height: 30px;
              background:#F1F3F6;
              font-size: 14px;
              text-align:center;
              line-height: 30px;
              border:1px solid rgba(231,231,231,1);
        }
          .search-item{
               overflow: hidden;
               border-bottom: 1px solid rgba(231,231,231,1);
          }
          .search-item:hover{
              cursor: pointer;
          }
          .search-item>span:nth-of-type(1){
               float:left;
              display: block;
              width:120px;
              height: 30px;
              font-size: 14px;
              text-align:center;
              line-height: 30px;
             border-right: 1px solid rgba(231,231,231,1);
          }
        .search-item>span:nth-of-type(2){
             float:left;
              display: block;
              width:100px;
              height: 30px;
              font-size: 14px;
              text-align:center;
              line-height: 30px;
        }
        .searchNot{
             background:rgba(0,0,0,0.3);
             font-size: 14px;
             position: absolute;
             left: 50%;
             margin-left: -110px;
             color: #fff;
             font-size: 12px;
             padding: 6px;
             width: 220px;
             top:200px;
             border-radius: 2px;
             text-align: center;
        }

    }

    @media screen  and (max-width: 1400px){
        .new-request-form{
            padding-left:65px;
            width:1024px;
            margin: 0 auto;
            box-sizing: border-box;
            height: 100%;
    }
    .new-request-form>div:nth-of-type(1){
            margin-top:58px;
            margin-bottom:41px;
    }
     .new-request-form>div>h2{
         font-weight: 500;
         font-size: 19px;
         color: #333;
         line-height: 1;
     }
     .item-select{
         float: left;
         padding-bottom: 19px;
         border-bottom:1px solid rgba(232,235,240,1); 
     }
     .select-option{
         font-size:12px;
     }
     .item-select>div{
            float: left;
     }
      .item-select>div:nth-of-type(1){
          margin-right: 43px;
      }
       .item-select>div:nth-of-type(2){
           margin-right: 102px;
       }
     .item-select>div>span{
         float: left;
         font-size: 12px;
         line-height: 34px;
         margin-right: 7px;
     }
      .item-select>div:nth-of-type(1) div{
          float: left;
          width:131px;
          height: 34px;
          background:rgba(227,229,232,1);
          border-radius:2px;
          line-height: 34px;
          text-align: center;
          font-size: 12px;
           color:#c5c8ce;
      }
      .item-select>div:nth-of-type(2) div{
           float: left;
          width:131px;
          height: 34px;
          background:rgba(227,229,232,1);
          border-radius:2px;
          line-height: 34px;
          text-align: center;
          font-size: 12px;
           color:#c5c8ce;
      }
      .item-select>div:nth-of-type(3){
          color: #5897FF;
          font-size: 12px;
      }
       .item-select>div:nth-of-type(3)>span{
           font-size: 14px;
           margin-right: 4px;
       }
       .item-select>div:nth-of-type(3)>div{
           float: left;
           line-height: 34px;
       }
      .item-select>div:nth-of-type(3):hover{
          cursor: pointer;
      }
      .request-form{

      }
      .request-form >div{
          margin-top: 12px;
          overflow: hidden;
        
      }
       
    .request-form >div span{
           font-size: 12px;
           float:left;
           display: block;
           width: 73px;
       }
       .request-form >div>div:nth-of-type(1){
           float: left;
           width:219px;
       }
      .request-form >div>div:nth-of-type(2){
         float: left;
         height:34px;
         line-height:34px;
         color:red;
         margin-left: 15px;
       }
       .form-info{
             border:1px solid rgba(232,235,240,1);
             border-radius:2px;
             height: 34px;
       }
      .ivu-select-selected-value{
           font-size: 12px !important;
       }
       .request-form .form-info>input{
           width: 100%;
           height:100%;
           border: 0;
           outline: none;
           text-indent: 7px;
           font-size: 14px;
            color:#515A6E ;
           
       }
       .request-form >div>span{
           float: left;
           line-height: 34px;
       }
        .request-form>div:nth-of-type(1) , .request-form>div:nth-of-type(2),  .request-form>div:nth-of-type(3),.request-form>div:nth-of-type(4){
            /* width: 289px; */
        }
        .request-form >div:nth-of-type(5){
            /* width: 597px; */
        }
         .request-form >div:nth-of-type(5)>div{
             width: 525px;
            height: 93px;
         }
        .request-form >div:nth-of-type(5)>div>textarea{
           width: 525px;
            height: 93px;
            font-size:14px;
            resize:none; 
            text-indent: 10px;
            color:#515A6E ;
            outline: none;
        }   
        .save-btn{
                width:102px;
                height:35px;
                float:left;
                margin-left: 459px;
                margin-top: 103px;
        }
         .save-btn>button{
                width:100%;
                height:100%;
                outline: none;
                background:#5897FF;
                color: #fff;
                border: 0;
         }
        .save-btn>button:active{
             background: #6da4ff;

         }
        /* 选择项目中的模态框的显示与隐藏 */
        .search-model{
            position:absolute;
            top: 0;
            left:0;
            z-index: 10;
            width:100%;
            height:100%;
            background:rgba(0,0,0,0.3);
            
        }
        .search-model .search-content{
            width: 365px;
            height:219px;
            background:#fff;
            position: absolute;
            top: 201px;
            left: 50%;
            margin-left:-182px;
            
        }
        .search-model .search-content .search-tit{
            margin: 17px 0;
            overflow: hidden;
        }
        .search-model .search-content .search-tit>span:nth-of-type(1){
              float: left;
              margin-left:166px;
              font-size:16px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(51,51,51,1);

          }

           .search-model .search-content .search-tit>span:nth-of-type(2){
               float:right;
               font-size: 16px;
               margin-right: 15px;
               color: #D2D2D2;
           }
         .search-model .search-content .search-input{
             margin-left: 37px;
             overflow: hidden;
         }
          .search-model .search-content .search-input>div:nth-of-type(1){
              width: 219px;
              height: 25px;
              background:#E7E7E7;
              border-radius:2px;
              float: left;
          }
         .search-model .search-content .search-input>div:nth-of-type(1)>input{
               outline: none;
               border: none;
               width:100%;
               height: 100%;
               background:#F1F3F6;
               text-indent: 15px;
               font-size: 12px;
         }
         .search-model .search-content .search-input>div:nth-of-type(2){
             float: left;
            width:58px;
            height:25px;
           margin-left:13px;
            border-radius:2px;
         }
        .search-model .search-content .search-input>div:nth-of-type(2)>button{
            border: 0;
            outline: none;
            width: 100%;
            height:100%;
             background:rgba(88,151,255,1);
             color: #fff; 
             border-radius: 4px;
        }
        .search-model .search-content .search-input>div:nth-of-type(2)>button:active{
            background: #6da4ff;

        }
        .search-form{
            margin-top: 15px;
            margin-left: 37px;
        }
         .search-item:hover{
              cursor: pointer;
          }
        .search-form>div:nth-of-type(1){
            overflow: hidden;
        }
        .search-form  .projects-content{

            border: 1px solid rgba(231,231,231,1);
            max-height:88px;
            width:174px;
            overflow:auto;
            border-top: 0;
       }
          .search-form>div:nth-of-type(1)>span{
              float:left;
              display: block;
              width:87px;
              height: 22px;
              background:#F1F3F6;
              font-size: 12px;
              text-align:center;
              line-height: 22px;
              border:1px solid rgba(231,231,231,1);
          }
          .search-item{
               overflow: hidden;
               border-bottom: 1px solid rgba(231,231,231,1);
          }
          .search-item>span:nth-of-type(1){
               float:left;
              display: block;
              width:87px;
              height: 22px;
              font-size: 12px;
              text-align:center;
              line-height: 22px;
              border-right:1px solid rgba(231,231,231,1);
          }
          .search-item>span:nth-of-type(2){
              float:left;
              display: block;
              width:67px;
              height: 22px;
              font-size: 12px;
              text-align:center;
              line-height: 22px;
            
          }
        .searchNot{
             background:rgba(0,0,0,0.1);
             padding:22px 0;
             font-size: 12px;
        }
        .searchNot{
             background:rgba(0,0,0,0.3);
             font-size: 14px;
             position: absolute;
             left: 50%;
             margin-left: -110px;
             color: #fff;
             font-size: 12px;
             padding: 6px;
             width: 220px;
             top:146px;
             border-radius: 2px;
             text-align: center;
        }

    }
</style>