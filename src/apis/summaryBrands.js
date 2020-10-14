import http from '../utils/http';

//查询项目品牌总表
export const GetProjectBrands=(param)=>{
    return http("post","http://is-test.aserweb.com:50102/api/ProjectBrandSummaryStatement/GetProjectBrands",param);
} 