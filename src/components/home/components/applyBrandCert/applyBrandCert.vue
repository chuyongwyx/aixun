<template>
        <div class="applyBrandCert">
                 <div>
                    <h2>申请品牌认证</h2>
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
                            <div  @click="handelSearchShow">
                                   <span class="iconfont icon-sousuo"></span> 
                                     <div><span>选择项目</span></div>    
                            </div>
                        </div> 
                </div>
                 <!-- 这是搜索模态框 -->
                <div class="search-model" v-show="searchModel" @keydown="handleEnterToSearch">
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
                <div class="Verification">
                        
                            <div><span>品牌名称:</span></div>
                            <div>
                                <input type="text" v-model="projectsNameTest" @focus="handleClose()">
                                <div class="opation-tip">
                                        <div v-show="success">
                                        <p  class="ableUser" id="ableUser" v-if="isUnique">*品牌名称可使用</p> <!--v-if="success"-->
                                        <p v-if="isUnique===false?true:false" class="enAble">*品牌名称已被占用</p> 
                                         </div>
                                </div>
                                
                                
                                
                            </div>
                            <div><input  type="button" value="验证唯一性" @click="handelToTest" id="btn" :disabled="success" :class="{'disabled':isUnique}" ></div>
                            <div class="tip" v-if="tip"><p>*最小2个字符，最长8个字符，不能全英文或者全数字</p></div>
                </div>
                <div class="footer">
                     <button @click="handleSaveApplyBrandCert" :class="{'saveBtn':btnBg}"><span v-show="saveLoading==false?true:false">保存</span><span v-show="saveLoading==false?false:true">保存中...</span></button>
                </div>
                <div class="save-success" v-show="saveSuccessTip"><img src="../../../../assets/saveSuccess.png" alt=""></div>
            </div>
   
 
</template> 
<script>
import Vuex  from  "vuex"
export default {
    name:"applyBrandCert",
    data(){
        return{
            searchModel:false, 
            tip:false,
            projectsNum:"",
            projectsName:"",
            projectsNameTest:"",
            searchVal:"",
            saveSuccessTip:false,
            //函数防抖
            timer:null
        }
    },
    watch: {
               saveSuccess(newValue,oldValue){
                    if(newValue){
                        this.projectsNum="";
                        this.projectsName="";
                        this.projectsNameTest="";
                        this.saveSuccessTip=true;
                        var _this = this;
                        var timerTwo = setTimeout(()=>{
                                _this.saveSuccessTip=false;
                                 clearTimeout(timerTwo); 
                        },1000)
                    }
               }
    },
    computed: {
        ...Vuex.mapState({
                projects:state=>state.applyBrandCert.InitialAddDatas,
                //请求是否成功
                success:state=>state.applyBrandCert.success,
                //名称是否被占用
                isUnique:state=>state.applyBrandCert.isUnique,
                //按钮颜色
                btnBg:state=>state.applyBrandCert.btnBg,
                //模糊查询出来的数据
                searchProjects:state=>state.applyBrandCert.searchProjects,
                //查不到
                searchNot:state=>state.applyBrandCert.searchNot,
                //loading状态
                saveLoading:state=>state.applyBrandCert.saveLoading,
                //新建表单成功
                saveSuccess:state=>state.applyBrandCert.saveSuccess
        })
    },
    methods:{
        ...Vuex.mapActions({
            //获取项目信息
            initialAddDatas:"applyBrandCert/initialAddDatas",
            //验证品牌唯一性
            checkBrandName:"applyBrandCert/checkBrandName",
            //得焦时释放按钮
            clearDisable:"applyBrandCert/clearDisable",
            //新建申请单
            addApplicationForm:"applyBrandCert/addApplicationForm",
            //模糊查询
            getSearchVal:"applyBrandCert/getSearchVal",
            //清除查询到的数据
            handleclickClearSearchData:"applyBrandCert/handleclickClearSearchData"

        }),
         //模态框的显示与隐藏
         handelSearchShow(){
             this.initialAddDatas();
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
        //验证项目唯一性
        handelToTest(){
            this.projectsNameTest = this.projectsNameTest.trim();
            var re1 =/^[0-9]{2,8}$/;
            var re2 =/^[a-zA-Z]{2,8}$/
            if(re1.test(this.projectsNameTest)||re2.test(this.projectsNameTest)||this.projectsNameTest.length<2){
                    this.tip=true;
                }else if(this.projectsNameTest.length<=8 && this.projectsNameTest.length>1){
                    
                      var param =JSON.stringify({
                         "BrandName":this.projectsNameTest
                        })
                        this.checkBrandName(param);
                }else{
                     this.tip=true;
            }
        },
      //得焦
      handleClose(){
          this.tip=false;
        //   this.projectsNameTest='';
          this.clearDisable();
      },
     //模糊查询
      handleToSearch(){
            if(this.searchVal!==''){
                     this.getSearchVal(this.searchVal);
            }
                   
     },
     //enter点击查询
     handleEnterToSearch($event){
          if($event.keyCode===13){
                     if(this.searchVal!==''){
                     this.getSearchVal(this.searchVal);
                    }
                 }
     },
      //保存按钮就是新建申请单
      handleSaveApplyBrandCert(){
      
          var _this =this; 
          if(this.timer){
              clearTimeout(this.timer);
          
          }
          if(this.projectsNum==""){
              alert('请选择项目');
          }
         
          if(this.projectsNameTest!==''&&this.projectsNum!==""){
               this.timer =setTimeout(() => {
                var param =JSON.stringify({
                 "ProjectNumber":_this.projectsNum,
                 "BrandName":_this.projectsNameTest
            })
             _this.addApplicationForm(param)
          }, 300);      
        }
         
      }
    },
    created(){
        this.initialAddDatas();
    }
    
}
</script>
<style scoped>
@media screen and (min-width: 1400px) {
  .applyBrandCert{
            padding-left:89px;
            width:1400px;
            margin: 0 auto;
            box-sizing: border-box;
            height: 100%;
            padding-right: 89px;
    }
    .applyBrandCert>div:nth-of-type(1){
            margin-top:80px;
            margin-bottom: 56px;
    }
     .applyBrandCert>div>h2{
         font-weight: 500;
         font-size: 24px;
         color: #333;
         line-height: 1;
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
     .Verification{
         overflow: hidden;
         margin-top: 24px;
     }
     .Verification>div{
         float: left;
         font-size: 14px;
        
     }
      .Verification>div:nth-of-type(1){
          margin-right: 19px;
           line-height: 38px;
      }
      .Verification>div:nth-of-type(2){
          width: 300px;
      }
       .Verification>div:nth-of-type(2)>input{
           width:300px;
           height:38px;
            line-height: 38px;
         text-indent: 15px;
         outline: none;
       }
        .Verification>div:nth-of-type(2)>p{
            margin-top: 12px;
            font-size: 14px;
        }
     .Verification>div:nth-of-type(3){
         margin-left: 19px;
         width:100px;
         height:38px;
        
        
     }
     .Verification>div:nth-of-type(3)>input{
         width: 100%;
         height: 100%;
         background:#fff;
         color: #5897FF;
         outline: none;
         border: 1px solid #5897FF;
         border-radius: 2px;
     }
        /* 禁用 */
     .Verification>div:nth-of-type(3) .disabled{
            background:rgba(243,244,245,1);
            border:1px solid rgba(243,244,245,1);
            color: #B7B8BA;
    }
    .Verification>div:nth-of-type(4){
        line-height: 38px;
        margin-left: 20px;
        color:red;
    }
    .opation-tip{
        height: 23px;
        margin-top:8px; 
    }
     .ableUser{
         color:#0CB709;
     }
     .enAble{
         color:red;
     }
     .footer{
         margin:0 auto;
         margin-top: 390px;
         margin-bottom:98px;
         width: 140px;
         height: 48px;
        
     }
     /* 按钮颜色 */
      .footer> .saveBtn{
        color:#B7B8BA;
        background:rgba(243,244,245,1);
      }
      .footer> .saveBtn:active{
           color:#B7B8BA;
        background:rgba(243,244,245,1);
      }
    .footer>button{
          background:#5897FF;
          width: 140px;
          height: 48px;
          color: #FEFEFE;
          font-size: 14px;
          outline: none;
          border: 0;
          border-radius: 4px;
    }
   .footer>button:active{
       background:#6da4ff;
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
         .search-model .search-content .search-input>div:nth-of-type(2)>button:hover{
             cursor: pointer;
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

@media screen and (max-width: 1400px){
   .applyBrandCert{
            padding-left:65px;
            width:1024px;
            margin: 0 auto;
            box-sizing: border-box;
            height: 100%;
            padding-right: 65px;
    }
    .applyBrandCert>div:nth-of-type(1){
            margin-top:58px;
            margin-bottom: 41px;
    }
     .applyBrandCert>div>h2{
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
         margin-right: 10px;
     }
      .item-select>div:nth-of-type(1) div{
          float: left;
          width:180px;
          height: 27.74px;
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
           margin-right: 5px;
       }
       .item-select>div:nth-of-type(3)>div{
           float: left;
           line-height: 28px;
       }
      .item-select>div:nth-of-type(3):hover{
          cursor: pointer;
      }
     .Verification{
         overflow: hidden;
         margin-top: 17px;
     }
     .Verification>div{
         float: left;
         font-size: 12px;
        
     }
      .Verification>div:nth-of-type(1){
          margin-right: 14px;
           line-height: 28px;
      }
      .Verification>div:nth-of-type(2){
          width: 219px;
      }
       .Verification>div:nth-of-type(2)>input{
           width:219px;
           height:28px;
            line-height: 28px;
         text-indent: 11px;
         outline: none;
       }
        .Verification>div:nth-of-type(2)>p{
            margin-top: 9px;
            font-size: 12px;
        }
     .Verification>div:nth-of-type(3){
         margin-left: 14px;
         width:73px;
         height:28px;
        
        
     }
     .Verification>div:nth-of-type(3)>input{
         width: 100%;
         height: 100%;
         background:#fff;
        color: #5897FF;
        outline: none;
         border: 1px solid #5897FF;
     }
     .Verification>div:nth-of-type(4){
        line-height: 28px;
        margin-left: 15px;
        color:red;
    }
    .opation-tip{
        height: 18px;
        margin-top:6px;
    }
     .ableUser{
         color:#0CB709;
     }
     .enAble{
         color:red;
     }
     .footer{
          margin:0 auto;
         margin-top: 240px;
         margin-bottom:71px;
          width: 102px;
          height: 35px;
        
     }
      .footer>button{
          background:#5897FF;
          width: 102px;
          height: 35px;
          color: #FEFEFE;
          font-size: 12px;
          outline: none;
          border: 0;
          border-radius: 4px;
      } 
       /* 按钮颜色 */
    .footer>.saveBtn{
        color:#B7B8BA;
        background:rgba(243,244,245,1);
      }
    .footer> .saveBtn:active{
           color:#B7B8BA;
        background:rgba(243,244,245,1);
      }
     .footer>button:active{
       background:#6da4ff;
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
         .search-model .search-content .search-input>div:nth-of-type(2)>button:hover{
             cursor: pointer;
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
    /* 禁用 */
    .Verification>div:nth-of-type(3) .disabled{
            background:rgba(243,244,245,1);
            border:1px solid rgba(243,244,245,1);
            color: #B7B8BA;
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
