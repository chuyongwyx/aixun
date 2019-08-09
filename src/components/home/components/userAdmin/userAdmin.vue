<template>
  <div class="userAdmin">
    <div class="userAdmin-head">
      <h2>人员</h2>
      <div class="addUserAdmin" @click="handelAdduserShow">新增</div>
    </div>
    <div class="userAdminForm">
      <table cellpadding="0" cellspacing="0">
        <caption>
          <th>
            <span>部门</span>
            <span class="iconfont icon-xiala1"></span>
          </th>
          <th>人员名称</th>
          <th>操作</th>
        </caption>
        <tr v-for="(item,index) in userAdmin">
          <td>{{item.DepartmentName}}</td>
          <td>{{item.name}}</td>
          <td>
            <span @click="handleuserAdModify($event)" :data-id="item.id" class="tdhover">编辑</span>
            <span @click="handleUserDelete" :data-id="item.id" class="tdhover">删除</span>
            <span @click="handleResetPassWord($event,item.id)" class="tdhover">重置密码</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- 新增的模态框  -->
  
      <div class="userAdmin-model" v-show ="userAdminModel">
        <!-- 新增人员 -->
        <div class="adduser" v-if="adduserAdmin">
          <div class="adduser-head">
            <span>新增人员</span>
            <span class="iconfont icon-chuyidong" @click="handleAdduserHide"></span>
          </div>
          <div class="adduser-content">
              <div>
              <div>
                <span>部门:</span>
              </div>
              <div>
                <div class="selected">
                  <span class="selected-options" id="selected-optionsOne">请选择</span>
                  <span class="iconfont icon-xiala1 icon" id="selected-iconOne" @click="handleAddSelectShow"></span>
                    <div class="select-options" v-if="selectAdd" @click="handelToAddSelectOption">
                      <div>
                        <span>研发部</span>
                      </div>
                      <div>
                        <span>市场部</span>
                      </div>
                      <div>
                          <span>财务部</span>
                      </div>
                    </div>
                </div>
            
              </div>
            </div>

            <div>
              <div>人员名称：</div>
              <div class="border-box">
                <input type="text" v-model="addName" placeholder="请输入人员名称..."/>
              </div>
            </div>
            <div>
              <div>用户名：</div>
              <div class="border-box">
                <input type="text" v-model="addUserName" placeholder="请输入用户名..."/>
              </div>
            </div>
            <div>
              <div>邮箱：</div>
              <div class="border-box">
                <input type="text" v-model="addEmailAddress" placeholder="请输入邮箱..." />
              </div>
            </div>
            <div>
            <div>
                  <label for=""  class="Modifyuse"  @click="handleToAddStartUse">
                       <span class="iconfont icon-xuanzhong2 user-icon" id="startUseOne"></span>
                      <span>启动</span>
                  </label>  
            </div>
            </div>
          </div>
          <div class="adduserAdmin-footer">
            <button @click="handleToAddSave">保存</button>
          </div>
        </div>
        <!-- 人员编辑 -->
        <div class="userModfiy" v-if="userModify">
          <div class="adduser-head">
            <span>编辑</span>
            <span class="iconfont icon-chuyidong" @click="handleToModelHide"></span>
          </div>
          <div class="adduser-content">
            <div>
              <div>
                <span>部门:</span>
              </div>
              <div>
                <div class="selected">
                  <span class="selected-options" id="selected-options" >{{userInfoById.departmentName}}</span>
                  <span class="iconfont icon-xiala1 icon" id="selected-icon" @click="handleSelectShow"></span>
                    <div class="select-options" v-if="selectModify" @click="handelToSelectOption($event)">
                      <div>
                        <span>研发部</span>
                      </div>
                      <div>
                        <span>市场部</span>
                      </div>
                    </div>
                </div>
            
              </div>
            </div>

            <div>
              <div>人员名称：</div>
              <div class="border-box">
                <input type="text" v-model="userInfoById.name"/>
              </div>
            </div>
            <div>
              <div>用户名：</div>
              <div class="border-box">
                <input type="text" v-model="userInfoById.userName"/>
              </div>
            </div>
            <div>
              <div>邮箱：</div>
              <div class="border-box">
                <input type="text" v-model="userInfoById.emailAddress" />
              </div>
            </div>
            <div>
              <div v-if="userInfoById.isActive">
                  <label for="" class="Modifyuse" @click="handleToStopUse">
                    <span class="iconfont icon-selected user-icon"  id="stopUse"></span> 
                    <span>停用</span>
                  </label>
              </div>
              <div  v-else>
                  <label for="" @click="handleToStartUse" class="Modifyuse">
                       <span class="iconfont icon-xuanzhong2 user-icon" id="startUse"></span>
                      <span>启动</span>
                  </label>  
              </div>
            </div>
          </div>
          <div class="adduserAdmin-footer">
            <button @click="handleModifySave">保存</button>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import Vuex from "vuex";
export default {
  name:"userAdmin",
  data() {
    return {
      userAdminModel:false,
      userModify:false,
      adduserAdmin:false,
      selectAdd:false,
      selectModify:false,
      //添加的用户
      addIsActive:false,
      addUserName:'',
      addName:'',
      addEmailAddress:'',
      DepartmentID:"",
      //修改userAdmin的数据
      ModifyIsActive:'',
    
    };
  },
  computed: {
    ...Vuex.mapState({
      userAdmin: state => state.userAdmin.userAdminInfo,
      // 根据Id获取的单个用户信息
      userInfoById:state=>state.userAdmin.UserInfoById
    })


  },
  methods: {
      ...Vuex.mapActions({
          //获取单个用户信息
          getUserById:"userAdmin/getUserByIdInfo",
          //添加用户信息
          addUserInfo:"userAdmin/handleAddUserInfo",
          //修改用户信息
          replaceUserInfo:"userAdmin/replaceUserInfo",
          //删除用户
          deleteUser:"userAdmin/handleDeleteUser",
          //重置密码
          resetPsw:"userAdmin/resetPsw"
      }),
      //点击编辑信息
      handleuserAdModify($event){
            var Id = $event.target.getAttribute('data-id');
             this.getUserById(Id);
            this.userAdminModel=true;
            this.userModify=true;
           
      },
      //点击显示adduser模态框
      handelAdduserShow(){
            this.userAdminModel=true;
             this.adduserAdmin=true;

      },
      //点击隐藏模态框
      handleAdduserHide(){
          this.adduserAdmin=false;
          this.userAdminModel=false;
      },
      //点击隐藏model
      handleToModelHide(){
          this.userAdminModel=false;
         this.userModify=false;
      },
      //点击修改框中的停用
      handleToStopUse($event){
          //此时字体图标变暗
          var iconId = document.getElementById('stopUse')
         if(iconId.classList.value.indexOf('icon-xuanzhong2') === -1){
              iconId.classList.add('icon-xuanzhong2');
              iconId.classList.remove('icon-selected');
              iconId.nextElementSibling.innerText="启动"
              this.ModifyIsActive=false;
        }else{
              iconId.classList.remove('icon-xuanzhong2');
              iconId.classList.add('icon-selected');
              iconId.nextElementSibling.innerText="停用"
              this.ModifyIsActive=true;
        }
      },
      //点击修改框中的启用
      handleToStartUse($event){
        var iconId = document.getElementById('startUse')
        if(iconId.classList.value.indexOf('icon-xuanzhong2') === -1){
              iconId.classList.add('icon-xuanzhong2');
              iconId.classList.remove('icon-selected');
              iconId.nextElementSibling.innerText="启动"
              this.ModifyIsActive=false;
        }else{
              iconId.classList.remove('icon-xuanzhong2');
              iconId.classList.add('icon-selected');
              iconId.nextElementSibling.innerText="停用"
              this.ModifyIsActive=true;
        }
      },
      //修改中点击显示下拉修改框
      handleSelectShow($event){
          if( this.selectModify==true){
              this.selectModify=false;
              $event.target.classList.add('icon-xiala1');
               $event.target.classList.remove('icon-shangla');
              // console.log($event.target);
             
              
          }else{
              this.selectModify=true;
               $event.target.classList.remove('icon-xiala1');
               $event.target.classList.add('icon-shangla');
          }

         
      },
    //部门选中
    handelToSelectOption($event){
        var options =document.getElementById('selected-options');
        options.innerText=$event.target.innerText;
        var opation =document.getElementById('selected-icon')
         opation.classList.add('icon-xiala1');
         opation.classList.remove('icon-shangla');
         this.selectModify = false;
         
        
    },
      //点击编辑框中的保存按钮就是修改信息
      handleModifySave($event){
          //由于vuex中的数据不能及时更新会慢一步这里统一获取必须加判断
             var param =JSON.stringify({
                    "Name":this.userInfoById.name,
                    "IsActive": this.IsActive
             })
              this.replaceUserInfo(param);
              this.userAdminModel=false;
              this.userModify=false;
      },
    
      //添加人员显示下拉框
      handleAddSelectShow($event){
         if( this.selectAdd==true){
              this.selectAdd=false;
              $event.target.classList.add('icon-xiala1');
               $event.target.classList.remove('icon-shangla');
              // console.log($event.target);
             
              
          }else{
              this.selectAdd=true;
               $event.target.classList.remove('icon-xiala1');
               $event.target.classList.add('icon-shangla');
          }


      },
      //添加操作中部门选中
      handelToAddSelectOption($event){
        var options =document.getElementById('selected-optionsOne');
        options.innerText=$event.target.innerText;
        var opation =document.getElementById('selected-iconOne')
         opation.classList.add('icon-xiala1');
         opation.classList.remove('icon-shangla');
         this.selectAdd = false;
         
        
    },
      //点击添加框中的启用
      handleToAddStartUse($event){
        var iconId = document.getElementById('startUseOne');
        if(iconId.classList.value.indexOf('icon-xuanzhong2') === -1){
              iconId.classList.add('icon-xuanzhong2');
              iconId.classList.remove('icon-selected');
              iconId.nextElementSibling.innerText="启动"
              this.addIsActive=false;
        }else{
              iconId.classList.remove('icon-xuanzhong2');
              iconId.classList.add('icon-selected');
              iconId.nextElementSibling.innerText="停用"
              this.addIsActive=true;
        }

      },
      //添加用户
    handleToAddSave(){
  
     var DepartmentIdText = document.getElementById('selected-optionsOne').innerText;
      if(DepartmentIdText==='研发部'){
         this.DepartmentID =1
      }else if(DepartmentIdText==='市场部'){
        this.DepartmentID =2
      }else if(DepartmentIdText==='财务部'){
        this.DepartmentID=3
      };

      //字段PhoneNumber预留暂时不用
      var params = JSON.stringify({
          "UserName":this.addUserName,
          "Name":this.addName,
          "EmailAddress":this.addEmailAddress,
          "DepartmentID":this.DepartmentID,
          "IsActive":this.addIsActive
      })
      this.addUserInfo(params);
      //发送完毕记得清除内容
      this.addUserName='';
      this.addName='';
      this.addIsActive=false;
      this.addEmailAddress='';
      this.DepartmentID='';
      this.adduserAdmin=false;
      this.userAdminModel=false;
    },
    handleUserDelete($event){
      //删除内部人员  
      var userId = parseInt($event.target.getAttribute('data-id'));
      this.deleteUser(userId);

    },
    //重置密码
    handleResetPassWord($event,param){
       this.resetPsw(param);
    }
     

     
  }
};
</script>
<style scoped>
@media screen and (min-width:1400px){
.userAdmin{
  width:1400px;
  margin:0 auto;
}
.userAdmin-head {
  width: 529px;
  margin-left: 89px;
  margin-top: 75px;
  overflow: hidden;
}
.userAdmin-head > h2 {
  width: 54px;
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  float: left;
}
.userAdmin-head > div {
  float: right;
  width: 100px;
  height: 36px;
  background: #5897ff;
  color: #fff;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  border-radius: 4px;
}
.userAdminForm {
  width: 529px;
  margin-left: 89px;
  margin-top: 49px;
}
.userAdminForm > table {
  width: 529px;
  table-layout: fixed;
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
}
.userAdminForm > table > tr > td {
  border-bottom: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  line-height: 42px;
  text-align: left;
  text-indent: 15px;
  font-size: 14px;
  color: #888888;
}
.tdhover:hover{
  text-decoration: underline;
}
.userAdminForm > caption {
  width: 529px;
  height: 42px;
}

.userAdminForm > table th {
  line-height: 42px;
  text-align: left;
  text-indent: 15px;
  font-size: 14px;
  background: rgba(241, 243, 246, 1);
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  color: #888888;
  height: 42px;
  font-weight: normal;
  font-size: 14px;
}
.userAdminForm > table th:nth-of-type(1) {
  width: 151px;
}
.userAdminForm > table th:nth-of-type(2) {
  width: 180px;
}
.userAdminForm > table th:nth-of-type(3) {
  width: 200px;
}
.userAdminForm > table th:nth-of-type(1)> span:nth-of-type(2) {
  float: right;
  font-size: 18px;
  line-height: 42px;
  margin-right: 14px;
}
.userAdminForm > table > tr > td:nth-of-type(1) {
  width: 150px;
}
.userAdminForm > table > tr > td:nth-of-type(2) {
  width: 180px;
}
.userAdminForm > table > tr > td:nth-of-type(3) {
  text-indent: 0;
  width: 200px;
  color: #7aacff;
}
.userAdminForm > table > tr > td:nth-of-type(3) > span {
  margin-left: 19px;
}
.userAdminForm > table > tr > td:nth-of-type(3) > span:hover {
  cursor: pointer;
}
/* 新增管理员 */
.addUserAdmin:hover {
  cursor: pointer;
}
/* 新增模态框 */
.userAdmin-model {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: rgba(0, 0, 0, 0.3);
}
.adduser,
.userModfiy {
  width: 500px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -250px;
  margin-top: -240px;
}
.user-icon{
    color:#5897FF;
}
.Modifyuse:hover{
  cursor: pointer;
}
.adduser-head {
  margin-top: 35px;
  margin-bottom: 38px;
  overflow: hidden;
}
.adduser-head > span:nth-of-type(1) {
  float: left;
  font-size: 20px;
  margin-left: 203px;
}
.adduser-head > span:nth-of-type(2) {
  float: right;
  font-size: 20px;
  margin-right: 45px;
}
.adduser-content {
}
.adduser-content > div {
  /* overflow: hidden; */
   height: 38px;
  margin-bottom: 20px;
}
.adduser-content > div > div:nth-of-type(1) {
  width: 86px;
  height: 38px;
  float: left;
  line-height: 38px;
  margin-left: 64px;
  font-size: 14px;
}
.adduser-content > div > div:nth-of-type(2) {
  float: left;
  width: 250px;
  height: 38px;
}
.adduser-content > div:nth-of-type(2) {
}
.adduser-content > div > div>input{
  width: 250px;
  /* border: 0; */
  outline: none;
  height: 38px;
  text-indent: 10px;
  font-size: 14px;
  border: 1px solid #E8EBF0;
 color:#333333;
}
.adduser-content > div > div:nth-of-type(1) > input {
  background: #f1f3f6;
  border: 0;
}
/* 下拉框 */
.selected {
  width: 250px;
  height: 38px;
  background: #f1f3f6;
  position: relative;
}
.select-options {
  width: 250px;
  position: absolute;
  top: 38px;
  left: 0;
  background: #fff;
  z-index:10;
  }

.selected-options{
  line-height:38px;
  font-size:14px;
  margin-left:15px;
}

.select-options>div {
  width: 250px;
  line-height: 38px;
  font-size: 14px;
  text-indent: 15px;
}
.select-options > div:hover {
  background: #f1f3f6;
}
.icon {
  float: right;
  font-size: 20px;
  line-height: 38px;
  margin-right: 15px;
}
.adduserAdmin-footer {
  margin: 0 auto;
  width: 185px;
  height: 48px;
  margin-bottom: 35px;
}
.adduserAdmin-footer > button {
  width: 185px;
  height: 48px;
  background: #5897ff;
  color: #fff;
  font-size: 14px;
  border: 0;
  outline: none;
  border-radius: 4px;
}
}

@media screen and (max-width:1400px){
  .userAdmin{
  width:1024px;
  margin:0 auto;
}
.userAdmin-head {
  width: 386px;
  margin-left: 67px;
  margin-top: 55px;
  overflow: hidden;
}
.userAdmin-head > h2 {
  width: 39px;
  font-size: 19px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  float: left;
}
.userAdmin-head > div {
  float: right;
  width: 73px;
  height: 26px;
  background: #5897ff;
  color: #fff;
  line-height: 26px;
  text-align: center;
  font-size: 12px;
  border-radius: 4px;
}
.userAdminForm {
  width: 386px;
  margin-left: 65px;
  margin-top: 35px;
}
.userAdminForm > table {
  width: 386px;
  table-layout: fixed;
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
}
.userAdminForm > table > tr > td {
  border-bottom: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  line-height: 30px;
  text-align: left;
  text-indent: 15px;
  font-size: 12px;
  color: #888888;
}
.userAdminForm > caption {
  width: 386px;
  height: 30px;
}

.userAdminForm > table th {
  line-height: 30px;
  text-align: left;
  text-indent: 15px;
  font-size: 12px;
  background: rgba(241, 243, 246, 1);
  border-top: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  color: #888888;
  height: 30px;
  font-weight: normal;
  font-size: 12px;
}
.tdhover:hover{
  text-decoration: underline;
}
.userAdminForm > table th:nth-of-type(1) {
  width: 110px;
}
.userAdminForm > table th:nth-of-type(2) {
  width: 131px;
}
.userAdminForm > table th:nth-of-type(3) {
  width: 160px;
}
.userAdminForm > table th:nth-of-type(1)> span:nth-of-type(2) {
  float: right;
  font-size: 15px;
  line-height: 30px;
  margin-right: 10px;
}
.userAdminForm > table > tr > td:nth-of-type(1) {
  width: 109px;
}
.userAdminForm > table > tr > td:nth-of-type(2) {
  width: 131px;
}
.userAdminForm > table > tr > td:nth-of-type(3) {
  text-indent: 0;
  width: 160px;
  color: #7aacff;
}
.userAdminForm > table > tr > td:nth-of-type(3) > span {
  margin-left: 14px;
}
.userAdminForm > table > tr > td:nth-of-type(3) > span:hover {
  cursor: pointer;
}
/* 新增管理员 */
.addUserAdmin:hover {
  cursor: pointer;
}
/* 新增模态框 */
.userAdmin-model {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: rgba(0, 0, 0, 0.3);
}
.adduser,
.userModfiy {
  width: 365px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -182px;
  margin-top: -175px;
}
.user-icon{
    color:#5897FF;
}
.Modifyuse:hover{
  cursor: pointer;
}
.adduser-head {
  margin-top: 25px;
  margin-bottom: 28px;
  overflow: hidden;
}
.adduser-head > span:nth-of-type(1) {
  float: left;
  font-size: 16px;
  margin-left: 148px;
}
.adduser-head > span:nth-of-type(2) {
  float: right;
  font-size: 16px;
  margin-right: 33px;
}
.adduser-content {
}
.adduser-content > div {
  /* overflow: hidden; */
   height: 28px;
  margin-bottom: 15px;
}
.adduser-content > div > div:nth-of-type(1) {
  width: 63px;
  height: 28px;
  float: left;
  line-height: 28px;
  margin-left: 47px;
  font-size: 12px;
}
.adduser-content > div > div:nth-of-type(2) {
  float: left;
  width: 182px;
  height: 28px;
}

.adduser-content > div:nth-of-type(2) {
}
.adduser-content > div > div > input {
  width: 182px;
  border: 1px solid ;
  outline: none;
  height: 28px;
 border: 1px solid #E8EBF0;
 color:#333333;
  text-indent: 10px;
  font-size: 12px;
}
.adduser-content > div > div:nth-of-type(1) > input{
   background: #f1f3f6;
   border: 0;
}
/* 下拉框 */
.selected {
  width: 182px;
  height: 28px;
  background: #f1f3f6;
  position: relative;
}
.select-options {
  width: 182px;
  position: absolute;
  top: 28px;
  left: 0;
  background: #fff;
  z-index:10;
}

.selected-options{
  line-height:28px;
  font-size:12px;
  margin-left:11px;
}
.select-options>div {
  width: 182px;
  line-height: 28px;
  font-size: 12px;
  text-indent: 15px;
}
.select-options > div:hover {
  background: #f1f3f6;
}
.icon {
  float: right;
  font-size: 16px;
  line-height: 28px;
  margin-right: 11px;
}
.adduserAdmin-footer {
  margin: 0 auto;
  width: 135px;
  height: 35px;
  margin-bottom: 25px;
}
.adduserAdmin-footer > button {
  width: 135px;
  height: 35px;
  background: #5897ff;
  color: #fff;
  font-size: 12px;
  border: 0;
  outline: none;
  border-radius: 4px;
}
}
</style>
