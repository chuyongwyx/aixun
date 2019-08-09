import http from '../utils/http';

//查询项目品牌总表
export const GetProjectBrands=(param)=>{
    return http("post","/apis/api/ProjectBrandSummaryStatement/GetProjectBrands",param);
} 