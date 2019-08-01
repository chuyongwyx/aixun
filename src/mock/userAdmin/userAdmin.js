import  Mock  from 'mockjs';
import database from "../../utils/userAdmin/userAdmin";
Mock.mock(/\/apis\/api\/User\/GetUsers/,"get",database.userInfo);