import {GetProjectBrands} from '../../apis/summaryBrands';
export default{
        //项目品牌总表查询
        async getProjectBrands({commit,state},param){
            let dataList = await GetProjectBrands(param);
                commit("handleSearchDataList",dataList);
        },

        //清楚Vuex中的数据存储
        async  handleClearDataList({commit,state}){
                state.DataList=[];
        }
}