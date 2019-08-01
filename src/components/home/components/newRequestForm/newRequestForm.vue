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
                             <div class="search-input"><div><input type="text" placeholder="请输入项目编号/项目名称"></div><div><button>搜索</button></div></div>
                             <div class="search-form">
                                    <div><span>项目编号</span><span>项目名称</span></div>
                                    <!-- 下面是获取到的项目信息 -->
                                    <div class="projects-content">
                                             <div class="search-item" v-for="(item,index) in projects"  @click="handleClickProject($event,item)"><span>{{item.name}}</span><span>{{item.projectNumber}}</span></div>
                                    </div>
                                   
                             </div>
                        </div>
                </div>
              
                <div class="request-form">
                        <div>
                            <span>申请类型：</span>
                                <div>
                                     <Select v-model="modelType" class="select-iview" @on-change="handleType">
                                        <Option v-for="item in requestType" :value="item.value" :key="item.value" class="select-option">{{ item.label }}</Option>
                                     </Select>
                                </div>
                        </div>
                        <div>
                            <span>联系人:</span>
                            <div class="form-info">
                                <input type="text" v-model="linkMan">
                            </div>
                        </div>
                        <div>
                            <span>联系电话:</span>
                            <div class="form-info">
                                <input type="text" v-model="linkTel">
                            </div>
                        </div>
                         <div>
                            <span>邮箱地址:</span>
                            <div class="form-info">
                                <input type="text" v-model="linkEmail">
                            </div>
                        </div>
                        <div>
                            <span>备注:</span>
                            <div>
                                <textarea name="" id="" cols="30" rows="10" placeholder="请输入备注..." v-model="remark"></textarea>
                            </div>
                            
                        </div>

                </div>
                <div class="save-btn">
                    <button @click="handleSave">保存</button>
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
                remark:""
             
             }
         },
         computed:{
                ...Vuex.mapState({
                    projects : state =>state.newRequestForm.projects
                })
         },
         methods: {
             ...Vuex.mapActions({
                    //点击生成申请单
                    newRequestForm :"newRequestForm/newRequestForm",
                    //关闭当前页面
                    handleCloseRouter:"home/handleCloseRouter", 
             }),
             //模态框的显示与隐藏
             handelSearchShow(){
                 this.searchModel=true;
             },
             handleSearchHide(){
                 this.searchModel=false;
             },
             //项目选中操作
             handleClickProject($event,item){
                 this.projectsNum = item.projectNumber;
                 this.projectsName =item.name;
                 this.searchModel=false;
             },
             //选中申请单类型
             handleType(value){
                 this.applyType =value;
             },

             //点击保存则新建一张申请单
             handleSave(){
                 var ApplyType = parseInt(this.applyType)
                 var param =JSON.stringify({
                     ProjectNumber:this.projectsNum,
                     Type: ApplyType,
                     linkman:this.linkMan,
                     PhoneNumber:this.linkTel,
                     EmailAddress:this.linkEmail,
                     Remark:this.remark
                 })
                this.newRequestForm(param);
                this.projectsNum ="";
                this.applyType ="";
                this.linkMan ="";
                this.linkTel ="";
                this.linkEmail ="";
                this.remark ="";
                this.handleCloseRouter(this.$route.name)
                this.$router.push('/home');
             },
           
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
     .select-iview{
         width:300px;
         height:38px;
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
         line-height: 38px;
         margin-right: 10px;
     }
      .item-select>div:nth-of-type(1) div{
          float: left;
          width:180px;
          height: 38px;
          background:rgba(227,229,232,1);
          border-radius:2px;
          line-height: 38px;
          text-align: center;
          font-size: 14px;
      }
      .item-select>div:nth-of-type(2) div{
           float: left;
          width:180px;
          height: 38px;
          background:rgba(227,229,232,1);
          border-radius:2px;
          line-height: 38px;
          text-align: center;
          font-size: 14px;
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
           line-height: 38px;
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
       }
       .request-form >div>div{
           float: right;
           width:300px;
          
         
       }
       .form-info{
             border:1px solid rgba(232,235,240,1);
             border-radius:2px;
             height: 30px;
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
           text-indent: 10px;
           font-size: 12px;
           color:#515A6E ;
       }
       .request-form >div>span{
           float: left;
           line-height: 30px;
       }
        .request-form>div:nth-of-type(1) , .request-form>div:nth-of-type(2),  .request-form>div:nth-of-type(3) ,.request-form>div:nth-of-type(4){
            width: 396px;
        }
        .request-form >div:nth-of-type(5){
            width: 818px;
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
            text-indent: 10px;
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
      .select-iview{
         width:219px;
         height:32px;
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
         line-height: 28px;
         margin-right: 7px;
     }
      .item-select>div:nth-of-type(1) div{
          float: left;
          width:131px;
          height: 28px;
          background:rgba(227,229,232,1);
          border-radius:2px;
          line-height: 28px;
          text-align: center;
          font-size: 12px;
      }
      .item-select>div:nth-of-type(2) div{
           float: left;
          width:131px;
          height: 28px;
          background:rgba(227,229,232,1);
          border-radius:2px;
          line-height: 28px;
          text-align: center;
          font-size: 12px;
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
           line-height: 28px;
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
       }
       .request-form >div>div{
           float: right;
           width:219px;
          
         
       }
       .form-info{
             border:1px solid rgba(232,235,240,1);
             border-radius:2px;
             height: 32px;
       }
      .ivu-select-selected-value{
           font-size: 12px !important;
       }
       .request-form .form-info>input{
           width: 100%;
           height:100%;
           border: 0;
           outline: none;
           text-indent: 10px;
           font-size: 12px;
            color:#515A6E ;
           
       }
       .request-form >div>span{
           float: left;
           line-height: 32px;
       }
        .request-form>div:nth-of-type(1) , .request-form>div:nth-of-type(2),  .request-form>div:nth-of-type(3),.request-form>div:nth-of-type(4){
            width: 289px;
        }
        .request-form >div:nth-of-type(5){
            width: 597px;
        }
         .request-form >div:nth-of-type(5)>div{
             width: 525px;
            height: 93px;
         }
        .request-form >div:nth-of-type(5)>div>textarea{
           width: 525px;
            height: 93px;
            font-size:12px;
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

    }
</style>