import  Mock  from 'mockjs';
import database from "../../utils/buildBand/buildBand.js";
Mock.mock(/\/apis\/api\/CCB\/GetBankUsers/,"get",database.buildBankInfo);