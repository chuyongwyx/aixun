export default [
        {
            path: "/",
		        redirect: "/login",
        },
        {
          path: '/login',
          name: 'login',
          component: (resolve)=>require(["../components/login/login.vue"],resolve)
        },
        {
          path:'/home',
          name:'home',
          component:(resolve)=>require(["../components/home/home.vue"],resolve),
          meta:{
            Auth:true
          },
          children:[
            {
                path:'/',
                name:'welcome',
                component:(resovle)=>require(["../components/home/welcome/welcome.vue"],resovle),
                meta:{
                  Auth:true,
            
                },
                children:[
                    {
                          path:'/',
                          redirect:"/welcomehome"
                    },
                    {
                      path:'/welcomehome',
                      name:'welcomehome',
                      component:(resovle)=>require(["../components/home/homeComponet/welcomehome.vue"],resovle),
                      meta:{
                        Auth:true,
                      },
                    },
                    {
                       path:'/payItem', 
                       name:"payItem",
                       component:(resovle)=>require(['../components/home/homeComponet/payItem.vue'],resovle), 
                       meta:{
                         Auth:true,
                       }
                    },
                    {
                      path:"/payQuery",
                      name:"payQuery",
                      component:(resovle)=>require(['../components/home/homeComponet/payQuery.vue'],resovle),
                      meta:{
                        Auth:true
                      }
                    },
                    {
                      path:"/intManage",
                      name:"intManage",
                      component:(resovle)=>require(['../components/home/homeComponet/intManage.vue'],resovle),
                      meta:{
                        Auth:true
                      }
                    },
                    {
                      path:"/abnormalMonitoring",
                      name:"abnormalMonitoring",
                      component:(resovle)=>require(['../components/home/homeComponet/abnormalMonitoring.vue'],resovle),
                      meta:{
                        Auth:true
                      }
                    },

                ]
            },
            //新建申请单
            {
                path:'/newRequestForm',
                name:'newRequestForm',
                component:(resovle)=>require(["../components/home/components/newRequestForm/newRequestForm.vue"],resovle),
                meta:{
                  Auth:true,
            
                },
               
            },
            //受理完成申请单
            {
                path:"/requestFormFinished",
                name:"requestFormFinished",
                component:(resovle)=>require(["../components/home/components/requestFormFinished/requestFormFinished.vue"],resovle),
                meta:{
                  Auth:true, 
                  
                },
            },
             //申请品牌认证
             {
              path:"/applyBrandCert",
              name:"applyBrandCert",
              component:(resovle)=>require(["../components/home/components/applyBrandCert/applyBrandCert.vue"],resovle),
              meta:{
                Auth:true,
                
              },
             },
           //提交认证资料
            {
              path:"/submitCertInfo",
              name:"submitCertInfo",
              component:(resovle)=>require(["../components/home/components/submitCertInfo/submitCertInfo.vue"],resovle),
              meta:{
                Auth:true,
                
              },
            },
            //品牌认证
            {
              path:"/brandCert",
              name:"brandCert",
              component:(resovle)=>require(["../components/home/components/brandCert/brandCert.vue"],resovle),
              meta:{
                Auth:true,
              
              },
            },
            //开通云单据
            {
              path:"/openCloudDoc",
              name:"openCloudDoc",
              component:(resovle)=>require(["../components/home/components/openCloudDoc/openCloudDoc"],resovle),
              meta:{
                Auth:true,
              
              },
            },
            //开通云支付
            {
              path:"/openCloudPay",
              name:"openCloudPay",
              component:(resovle)=>require(["../components/home/components/openCloudPay/openCloudPay.vue"],resovle),
              meta:{
                Auth:true,
              
              }
            },
            //申请云支付收款账号
            {
              path:"/applyPayReceipt",
              name:"applyPayReceipt",
              component:(resovle)=>require(["../components/home/components/applyPayReceipt/applyPayReceipt.vue"],resovle),
              meta:{
                Auth:true, 
                keepAlive:true
              },
            },
            //安排培训人员
            {
              path:"/organTrainingInst",
              name:"organTrainingInst",
              component:(resovle)=>require(["../components/home/components/organTrainingInst/organTrainingInst.vue"],resovle),
              meta:{
                Auth:true,
                
              },
            },       
            //建行
            {
                path:"/buildBank",
                name:'buildBank',
                component:(resovle)=>require(["../components/home/components/buildBank/buildBank.vue"],resovle),
                meta:{
                  Auth:true,
                
                },
            },
            //广州培训机构
            {
              path:"/trainingOrg",
              name:'trainingOrg',
              component:(resovle)=>require(["../components/home/components/trainingOrg/trainingOrg.vue"],resovle),
              meta:{
                Auth:true,
              },
            },
            //云支付申请总表
            {
              path:"/summaryCloudPayments",
              name:'summaryCloudPayments',
              component:(resovle)=>require(["../components/home/components/summaryCloudPayments/summaryCloudPayments.vue"],resovle),
              meta:{
                Auth:true,
              },
            },
            //品牌认证申请总表
            {
              path:"/generalApplicationBrandCert",
              name:'generalApplicationBrandCert',
              component:(resovle)=>require(["../components/home/components/generalApplicationBrandCert/generalApplicationBrandCert.vue"],resovle),
              meta:{
                Auth:true,
              },
            },
            //品牌总表
            {
              path:"/summaryBrands",
              name:'summaryBrands',
              component:(resolve)=>require(["../components/home/components/summaryBrands/summaryBrands.vue"],resolve),
              meta:{
                Auth:true,
              },
            },
            //任务跟进总表
            {
              path:"/taskSummaryStatem",
              name:"taskSummaryStatem",
              component:(resolve)=>require(["../components/home/components/taskSummaryStatem/taskSummaryStatem.vue"],resolve),
              meta:{
                Auth:true,
              },
            },
            //数据同步异常
            {
              path:"/dataException",
              name:"dataException",
              component:(resolve)=>require(["../components/home/components/dataException/dataException.vue"],resolve),
              meta:{
                 Auth:true,
              }
            },
            //资金流水核对异常
            { 
              path:"/abnormalCapitalFlow",
              name:"abnormalCapitalFlow",
              component:(resolve)=>require(["../components/home/components/abnormalCapitalFlow/abnormalCapitalFlow.vue"],resolve),
              meta:{
                Auth:true,
              }

            },
            //账号余额异常
            {
              path:"/abnormalAccountBalance",
              name:"abnormalAccountBalance",
              component:(resolve)=>require(["../components/home/components/abnormalAccountBalance/abnormalAccountBalance.vue"],resolve),
              meta:{
                Auth:true,
              }
            },

            //人员
            {
              path:"/userAdmin",
              name:'userAdmin',
              component:(resovle)=>require(["../components/home/components/userAdmin/userAdmin.vue"],resovle),
              meta:{
                Auth:true,
              },
              
            },//权限页面
            {
              path:"/userPermissions",
              name:'userPermissions',
              component:(resovle)=>require(["../components/home/components/permissions/permissions.vue"],resovle),
              meta:{
                Auth:true,
              },
            },
            //设置权限
            // {
            //   path:"/userSetPermissions",
            //   name:'userSetPermissions',
            //   component:(resovle)=>require(["../components/home/components/setPermissions/setPermissions.vue"],resovle),
            //   meta:{
            //     Auth:true,
            //   },
            // }
          ]
        },
        {
          path: "/500",
          name: "error_500",
          meta: {
            title: "500"
          },
          component: (resolve) => require(["../components/error-page/500.vue"], resolve)
        },
        {
          path: "/401",
          name: "error_401",
          meta: {
            title: "401"
          },
          component: (resolve) => require(["../components/error-page/401.vue"], resolve)
        },
        {
          path:'/403',
          name:'error_403',
          meta:{
            title:"403"
          },
          component:(resolve)=>require(["../components/error-page/403.vue"],resolve)
        },
        {
          path: "*",
          name: "error_404",
          meta: {
            title: "404"
          },
          component: (resolve) => require(["../components/error-page/404.vue"], resolve)
        }
      ]


